# HỆ THỐNG QUẢN LÝ TRUNG TÂM THỂ HÌNH

Một hệ thống quản lý toàn diện dành cho các trung tâm thể hình, được xây dựng với backend Spring Boot và frontend React. Hệ thống này cung cấp giải pháp đầy đủ để quản lý hoạt động của trung tâm thể hình, quản lý hội viên, lịch học, và theo dõi thiết bị và phòng tập.

## Tổng Quan Dự Án

Dự án bao gồm hai thành phần chính:

* Backend: Ứng dụng Rest API Spring Boot (Java 21)
* Frontend: Ứng dụng React (Giao diện quản trị và giao diện khách hàng)

### Tính Năng Chính

* Quản lý người dùng và hội viên
* Quản lý kho thiết bị
* Quản lý các gói tập
* Quản lý phòng tập
* Quản lý nhân sự và HLV
* Hệ thống phản hồi
* Hệ thống đăng ký gói tập - đăng ký hội viên
* Xử lý thanh toán qua VNPay
* Phân tích và báo cáo
* Thiết kế đáp ứng trên mọi thiết bị

## Công nghệ sử dụng

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Spring WebFlux
* Spring Validation
* Redis để cache
* Cơ sở dữ liệu MySQL
* Maven
* Docker
* Lombok
* MapStruct
* SpringDoc OpenAPI (Swagger)
* Postman

### Frontend

* React
* Material-UI 7.1.1
* React Router 7.5.0
* Axios để gọi API
* Chart.js và Recharts để hiển thị biểu đồ
* Date-fns để xử lý ngày giờ
* Vite làm công cụ build
* ESLint để kiểm tra chất lượng mã
* Emotion để tạo styled components
* Expo Go trên điện thoại

## Cấu trúc dự án

```
├── backend/              
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      
│   │   │   │   ├── controllers/  
│   │   │   │   ├── models/      
│   │   │   │   ├── repositories/ 
│   │   │   │   ├── services/     
│   │   │   │   └── config/     
│   │   │   └── resources/ 
│   │   └── test/         
│   ├── sql_backup/     
│   ├── init/         
│   ├── Dockerfile       
│   └── docker-compose.yml
│
├── frontend/             
│   ├── admin/           
│   │   ├── src/
│   │   │   ├── components/  
│   │   │   ├── pages/      
│   │   │   ├── services/    
│   │   │   ├── styles/       
│   │   │   └── assets/      
│   │   └── public/       
│   │
│   └── customer/        
│          | 
│          ├── src/
|          |   ├── components/       
│          |   └── screens/         
│          ├── utils/       
│          └── assets/      
│           
│
└── Requirement/          
```

## Các tính năng

### Cổng quản trị

* **Bảng điều khiển**

  * Thống kê thời gian thực
  * Theo dõi doanh thu
  * Biểu đồ tăng trưởng hội viên
  * Biểu đồ số liệu và doanh thu gói tập
  * Số lượng giao dịch đã thực hiện

* **Quản lý hội viên**

  * Quản lý hồ sơ cá nhân
  * Theo dõi gói hội viên


* **Quản lý thiết bị**

  * Theo dõi thiết bị
  * Lên lịch bảo trì
  * Thống kê sử dụng
  * Quản lý sự phân bố của các thiết bị đến các phòng tập
  * Quản lý các thông tin của thiết bị

* **Quản lý nhân viên**

  * Theo dõi hiệu suất
  * Quản lý lương
  * Lưu trữ hồ sơ đào tạo
  * Quản lý tài khoản của nhân viên 

  **Quản lý huấn luyện viên**

  * Theo dõi hiệu suất
  * Lưu trữ hồ sơ đào tạo
  * Quản lý tài khoản của huấn luyện viên

* **Quản lý phản hồi**

  * Thu thập ý kiến hội viên
  * Quản lý phản hồi
  * Báo cáo phân tích
  * Theo dõi cải thiện

### Cổng khách hàng

* **Quản lý hồ sơ**

  * Thông tin cá nhân
  * Chi tiết gói hội viên
  * Theo dõi tiến trình

* **Sử dụng thiết bị**

  * Theo dõi sử dụng
  * Theo dõi thông tin và tình trạng của thiết bị

* **Sử dụng phòng tập**

  * Theo dõi sử dụng phòng tập
  * Theo dõi thông tin và tình trạng của phòng tập
  * Xem thông tin các thiết bị có trong phòng tập

* **Hệ thống phản hồi**

  * Gửi phản hồi
  * Đánh giá
  * Góp ý
  * Xem phản hồi từ trung tâm

* **Hệ thống phản hồi**

  * Gửi phản hồi
  * Đánh giá
  * Góp ý
  * Xem phản hồi từ trung tâm

* **Sử dụng gói tập**

  * Hiển thị các gói tập đã có
  * Theo dõi và đăng lý các gói tập mong muốn

* **Thanh toán**

  * Thanh toán gói tập qua VNPay
  * Xác nhận gói tập đã sở hữu ngay sau khi thanh toán xong

* **Điểm danh**

  * Quét mã QR khi tham gia phòng tập

## Hướng dẫn bắt đầu

### Yêu Cầu Trước Khi Cài Đặt

* Java 21 trở lên
* Node.js 16 trở lên
* MySQL 8.0 trở lên
* Docker và Docker Compose (tùy chọn)
* Maven 3.8 trở lên
* Git

### Cài Đặt Backend

* Cài đặt IDE Intelliji hỗ trợ Spring Boot

* Đóng gói maven bằng lệnh 
```bash
./mvnw clean package -DskipTests
```
* Chạy Docker
```bash
docker compose up --build
```
! Nếu Docker bị lỗi có thể chạy lại bằng lệnh 
```bash
docker-compose build --no-cache
docker compose up
```

### Cài Đặt Frontend

#### Cổng Quản Trị (Admin)

* Trên Git không cho push file .env vì vấn đề bảo mật nên có thể xin chủ hoặc những thành viên trong dự án để được sở hữu

```bash
cd frontend/admin
npm i
```

```bash
npm run dev
```

#### Cổng Khách Hàng (Customer)

* Cấu hình file `.env` như trên

```bash
cd frontend/customer
npm i
npm start 
```
hoặc
```bash
cd frontend/customer
npm i
npx expo start
```
* Trên Terminal sẽ hiện QR để truy cập sử dụng ứng dụng


* Truy cập:

  * Backend: [http://localhost:8000](http://localhost:8000)
  * Admin: [http://localhost:5173](http://localhost:5173)
  * Customer: [http://localhost:3000](http://localhost:3000)

## Tài Liệu API

* Swagger UI: `http://localhost:8000/swagger-ui.html`

### Một Số Endpoint Chính

* Xác thực: `/api/authService/*`
* Bảng thống kê: `/api/dashboard/*`
* Hội viên: `/api/members/*`
* Nhân viên: `/api/staff/*`
* Huấn luyện viên: `/api/trainer/*`
* Phòng tập: `/api/room/*`
* Thiết bị: `/api/equipment/*`
* Gói tập: `/api/package/*`
* Phản hồi: `/api/feedback/*`

## Bảo Mật

* **Xác thực và Phân quyền**
  * Xác thực bằng JWT (JSON Web Token)
  * Phân quyền theo vai trò: ADMIN, STAFF, TRAINER, MEMBER
  * Hệ thống refresh token
  * Blacklist token khi logout
  * Token introspection để kiểm tra tính hợp lệ

* **Bảo mật dữ liệu**
  * Mã hóa mật khẩu bằng BCrypt
  * Lưu trữ token trong Redis
  * Bảo vệ chống SQL Injection
  * Bảo vệ chống XSS (Cross-Site Scripting)

* **Cấu hình bảo mật**
  * CORS (Cross-Origin Resource Sharing)
  * Xác thực đầu vào với Spring Validation
  * Custom Authentication Entry Point
  * Global Exception Handler

* **Quản lý phiên**
  * Token expiration
  * Refresh token mechanism
  * Token blacklisting
  * Session management


## Quy Tắc Phát Triển

### Quy Ước Viết Mã

#### Backend (Java/Spring Boot)

* **Cấu trúc Package**
  * `controllers`: Chứa các REST controllers
  * `services`: Chứa business logic
  * `repositories`: Chứa data access layer
  * `models`: Chứa entity classes
  * `dtos`: Chứa data transfer objects
  * `config`: Chứa configuration classes
  * `exception`: Chứa custom exceptions

* **Quy ước đặt tên**
  * Class: PascalCase (ví dụ: `UserService`)
  * Method: camelCase (ví dụ: `getUserById`)
  * Variable: camelCase (ví dụ: `userName`)
  * Constant: UPPER_SNAKE_CASE (ví dụ: `MAX_RETRY_COUNT`)
  * Package: lowercase (ví dụ: `com.example.backend`)

* **Annotation và Documentation**
  * Sử dụng `@Slf4j` cho logging
  * Sử dụng `@RequiredArgsConstructor` cho dependency injection
  * Sử dụng `@FieldDefaults` cho field visibility
  * Thêm JavaDoc cho public methods
  * Sử dụng `@Builder` cho DTOs

* **Exception Handling**
  * Sử dụng custom exceptions
  * Xử lý exception trong `GlobalExceptionHandler`
  * Log đầy đủ thông tin lỗi
  * Trả về response phù hợp với HTTP status

#### Frontend (React)

* **Cấu trúc Thư mục**
  * `components`: Chứa reusable components
  * `pages`: Chứa page components
  * `services`: Chứa API calls
  * `styles`: Chứa CSS/styled components
  * `utils`: Chứa utility functions
  * `assets`: Chứa static files

* **Quy ước đặt tên**
  * Component: PascalCase (ví dụ: `UserProfile`)
  * File: PascalCase cho components, camelCase cho utilities
  * CSS Module: `[ComponentName].module.css`
  * Hook: camelCase với prefix 'use' (ví dụ: `useAuth`)

* **Component Structure**
  * Sử dụng functional components
  * Tách logic vào custom hooks
  * Sử dụng TypeScript cho type safety
  * Sử dụng PropTypes hoặc TypeScript interfaces

* **State Management**
  * Sử dụng React Context cho global state
  * Sử dụng local state cho component-specific state
  * Sử dụng custom hooks cho shared logic

* **Styling**
  * Sử dụng CSS Modules hoặc styled-components
  * Tuân thủ BEM naming convention
  * Responsive design với mobile-first approach
  * Sử dụng theme variables cho consistency

### Quy Trình Git

* **Branch Strategy**
  * `main`: Branch chính, chứa code production
  * `develop`: Branch phát triển
  * Feature branches: `feature/[tên-tính-năng]`
  * Hotfix branches: `hotfix/[tên-sửa-lỗi]`

* **Commit Message Format**
  ```
  <type>(<scope>): <subject>

  <body>

  <footer>
  ```
  * Types: feat, fix, docs, style, refactor, test, chore
  * Scope: component/module được thay đổi
  * Subject: mô tả ngắn gọn thay đổi
  * Body: mô tả chi tiết (nếu cần)
  * Footer: breaking changes, issue references

* **Code Review Process**
  * Tạo pull request với mô tả rõ ràng
  * Review code theo checklist
  * Yêu cầu ít nhất 1 reviewer approve
  * Resolve conflicts trước khi merge

### Kiểm Thử

* **Backend Testing**
  * Unit tests với JUnit 5
  * Integration tests với Spring Test
  * Mock external dependencies
  * Test coverage tối thiểu 80%

* **Frontend Testing**
  * Unit tests với Jest
  * Component tests với React Testing Library
  * E2E tests với Cypress
  * Test coverage tối thiểu 70%

* **API Testing**
  * Postman collections cho API testing
  * Automated API tests
  * Performance testing
  * Security testing

### Code Quality Tools

* **Backend**
  * Checkstyle cho code style
  * PMD cho code analysis
  * JaCoCo cho code coverage
  * SonarQube cho code quality

* **Frontend**
  * ESLint cho code linting
  * Prettier cho code formatting
  * Husky cho pre-commit hooks
  * Jest cho unit testing

## Đóng Góp

1. Fork repository
2. Tạo nhánh tính năng:

   ```bash
   git checkout -b tên nhánh
   ```
3. Commit thay đổi
4. Push lên nhánh
5. Tạo pull request

## Giấy Phép

Dự án được cấp phép theo MIT License – xem [LICENSE](LICENSE)

## HỖ TRỢ

1. Đọc tài liệu
2. Tìm kiếm các lỗi có sẵn
3. Tạo issue mới, kèm:

   * Mô tả chi tiết
   * Các bước tái tạo lỗi
   * Hành vi mong đợi & thực tế
   * Thông tin môi trường
