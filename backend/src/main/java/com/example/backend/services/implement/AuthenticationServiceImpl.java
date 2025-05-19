package com.example.backend.services.implement;

import com.example.backend.dtos.AuthenticationDTO;
import com.example.backend.dtos.IntrospectDTO;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.AuthenticationService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Date;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    UserRepository userRepository;

    @NonFinal
    @Value("${jwt.secret}")
    private String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Override
    public AuthenticationDTO authenticate(AuthenticationDTO authenticationDTO) {
        var user = userRepository.findByUsername(authenticationDTO.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        boolean authenticated = passwordEncoder.matches(authenticationDTO.getPassword(), user.getPassword());

        if (!authenticated) throw new RuntimeException("Unauthenticated"); // Nhap sai mat khau

        var token = generateToken(user);

        return AuthenticationDTO.builder().
                username(authenticationDTO.getUsername()).
                token(token).
                authenticated(true).
                build();
    }

    @Override
    public IntrospectDTO introspect(IntrospectDTO introspectDTO) throws JOSEException, ParseException {
        var token = introspectDTO.getToken();

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        return IntrospectDTO.builder().valid(verified && expirationTime.after(new Date())).build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); // Lay token voi thuat toan HMAC-SHA512

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder().
                subject(user.getUsername()).
                issuer("chu nig").
                issueTime(new Date()).
                expirationTime(new Date(Instant.now().plusMillis(jwtExpiration).toEpochMilli())). // thoi diem hien tai + tgian het han
                claim("scope", buildScope(user)).
                build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Error generating token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (user.getRoles() != null) {
            stringJoiner.add(user.getRoles());
        }

        return stringJoiner.toString();
    }
}
