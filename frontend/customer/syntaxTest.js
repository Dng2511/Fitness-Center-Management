async function test() {
    const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'admin',
            password: 'admin',
        }),
    });
    console.log(response.data);
}

test();