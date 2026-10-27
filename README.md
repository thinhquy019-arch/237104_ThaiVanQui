# HỆ THỐNG QUẢN LÝ NHÂN SỰ

## 1. Thông tin sinh viên

- **Họ và tên:** Thái Văn Qui
- **Mã số sinh viên:** 237104
- **Lớp:** DH23TIN09
- **Tên đề tài:** Xây dựng hệ thống quản lý nhân sự sử dụng React, Node.js và MongoDB

## 2. Giới thiệu dự án

Hệ thống quản lý nhân sự là ứng dụng Web giúp quản lý thông tin nhân viên trong tổ chức hoặc doanh nghiệp.

Ứng dụng cho phép người dùng xem danh sách nhân viên, thêm nhân viên mới, tìm kiếm, cập nhật và xóa thông tin nhân viên.

Hệ thống được xây dựng theo mô hình Frontend – Backend tách biệt, sử dụng MongoDB Atlas để lưu trữ dữ liệu, Docker để đóng gói ứng dụng và Render để triển khai trực tuyến.

## 3. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Kết nối cơ sở dữ liệu | Mongoose |
| Database | MongoDB Atlas |
| Container | Docker |
| Web Server Frontend | Nginx |
| Docker Registry | Docker Hub |
| Cloud Hosting | Render |
| Quản lý mã nguồn | Git, GitHub |
| Môi trường phát triển | GitHub Codespaces |

## 4. Cấu trúc thư mục dự án

```text
237104_ThaiVanQui/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

## 5. Chức năng hệ thống

1. **Hiển thị danh sách nhân viên:** Xem thông tin nhân viên được lưu trong MongoDB Atlas.
2. **Thêm nhân viên:** Nhập và lưu thông tin nhân viên mới.
3. **Tìm kiếm nhân viên:** Tìm nhân viên theo thông tin được hỗ trợ.
4. **Cập nhật nhân viên:** Chỉnh sửa thông tin nhân viên.
5. **Xóa nhân viên:** Xóa nhân viên khỏi hệ thống.

## 6. Hướng dẫn chạy ứng dụng trong môi trường phát triển

### 6.1. Yêu cầu

- Node.js và npm
- Git
- MongoDB Atlas
- Trình duyệt Web

### 6.2. Tải mã nguồn

```bash
git clone https://github.com/thinhquy019-arch/237104_ThaiVanQui.git
cd 237104_ThaiVanQui
```

### 6.3. Cấu hình Backend

Di chuyển vào thư mục Backend:

```bash
cd backend
npm install
```

Tạo file `.env` dựa trên `.env.example`:

```env
PORT=5000
MONGODB_URI=CHUOI_KET_NOI_MONGODB_ATLAS
```

Thay `CHUOI_KET_NOI_MONGODB_ATLAS` bằng chuỗi kết nối MongoDB Atlas hợp lệ.

Không đưa file `.env` chứa mật khẩu lên GitHub.

Khởi động Backend:

```bash
npm start
```

Backend chạy tại:

```text
http://localhost:5000
```

Kiểm tra API:

```text
http://localhost:5000/health
http://localhost:5000/api/employees
```

### 6.4. Khởi động Frontend

Mở Terminal mới tại thư mục gốc dự án:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Frontend chạy tại:

```text
http://localhost:5173
```

Đảm bảo cấu hình Vite chuyển tiếp yêu cầu `/api` đến Backend đang chạy ở cổng `5000`.

Truy cập địa chỉ trên bằng trình duyệt để sử dụng hệ thống.

## 7. Thông tin MongoDB Atlas

- **Database:** `237104_ThaiVanQui`
- **Collection:** `employees`
- **Hệ quản trị cơ sở dữ liệu:** MongoDB Atlas

Dữ liệu nhân viên được lưu trên MongoDB Atlas và được truy xuất thông qua Backend API.

## 8. Triển khai ứng dụng

Ứng dụng được đóng gói thành hai Docker image riêng biệt:

- Docker image Backend
- Docker image Frontend

Hai image được lưu trên Docker Hub và triển khai thành hai Web Service trên Render.

Frontend gửi yêu cầu API đến Backend để thực hiện các chức năng quản lý nhân viên.

## 9. Liên kết nộp bài

| STT | Nội dung | Đường link |
|---|---|---|
| 1 | GitHub Repository | https://github.com/thinhquy019-arch/237104_ThaiVanQui |
| 2 | Docker Hub Backend | https://hub.docker.com/r/qui237104/237104thaivanqui-backend |
| 3 | Docker Hub Frontend | https://hub.docker.com/r/qui237104/237104thaivanqui-frontend |
| 4 | Render Frontend | https://web-237104.onrender.com |
| 5 | Render Backend API | https://api-237104.onrender.com/api/employees |
| 6 | MongoDB Atlas | https://cloud.mongodb.com/ |

## 10. Bảo mật và quản lý mã nguồn

Dự án sử dụng `.gitignore` để loại trừ các file không cần thiết và thông tin nhạy cảm:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
build/
*.log
*.pem
*.key
```

Thông tin kết nối MongoDB được cấu hình thông qua biến môi trường `MONGODB_URI`.

Mật khẩu và chuỗi kết nối có thông tin đăng nhập không được lưu công khai trong mã nguồn.

## 11. Kết luận

Dự án xây dựng hệ thống quản lý nhân sự sử dụng React, Node.js, Express và MongoDB Atlas.

Hệ thống hỗ trợ các chức năng cơ bản như hiển thị danh sách, thêm, tìm kiếm, cập nhật và xóa nhân viên.

Ứng dụng được đóng gói bằng Docker, lưu trữ image trên Docker Hub, quản lý mã nguồn bằng GitHub và triển khai trên Render.
