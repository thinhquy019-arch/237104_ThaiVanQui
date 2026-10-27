# HỆ THỐNG QUẢN LÝ NHÂN SỰ

**Sinh viên:** Thái Văn Quí  
**MSSV:** 237104  
**Lớp:** DH23TIN09
## 1. Giới thiệu

Ứng dụng web quản lý nhân sự cho phép xem danh sách, thêm mới, tìm kiếm, cập nhật và xóa thông tin nhân viên. Frontend React giao tiếp với Backend REST API, dữ liệu được lưu trữ trên MongoDB Atlas. Ứng dụng được đóng gói bằng Docker và triển khai trên Render.

## 2. Công nghệ sử dụng

- **Frontend:** React, Vite, Nginx
- **Backend:** Node.js, Express, Mongoose
- **Cơ sở dữ liệu:** MongoDB Atlas
- **Container:** Docker
- **Image Registry:** Docker Hub
- **Cloud Hosting:** Render
- **Quản lý mã nguồn:** Git, GitHub

## 3. Cấu trúc dự án

```text
237104_ThaiVanQui/
├── backend/               
│   ├── .env.example      
│   └── Dockerfile
├── frontend/             
│   ├── src/
│   ├── nginx.conf
│   └── Dockerfile
├── .gitignore
└── README.md
```

## 4. Hướng dẫn chạy ở môi trường phát triển

### Yêu cầu

- Node.js và npm
- Một cơ sở dữ liệu MongoDB Atlas có quyền truy cập

### Backend

Tạo file `backend/.env` dựa trên `backend/.env.example` và điền chuỗi kết nối MongoDB thật (không commit file `.env` lên GitHub):

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE
```

Chạy Backend:

```bash
cd backend
npm install
npm start
```

Kiểm tra API tại `http://localhost:5000/health` và `http://localhost:5000/api/employees`.

### Frontend

Mở terminal khác:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Mở `http://localhost:5173`. Cần bảo đảm cấu hình gọi API hoặc proxy của Vite trỏ tới Backend đang chạy tại cổng `5000`.

## 5. Các chức năng

- Hiển thị danh sách nhân viên
- Thêm nhân viên
- Tìm kiếm nhân viên
- Cập nhật thông tin nhân viên
- Xóa nhân viên

## 6. Thông tin cơ sở dữ liệu

- **Database:** `237104_ThaiVanQui`
- **Collection:** `employees`
- **Hệ quản trị:** MongoDB Atlas

## 7. Liên kết nộp bài

1. **GitHub Repository:** https://github.com/thinhquy019-arch/237104_ThaiVanQui
2. **Docker Hub Backend:** https://hub.docker.com/r/qui237104/237104thaivanqui-backend
3. **Docker Hub Frontend:** https://hub.docker.com/r/qui237104/237104thaivanqui-frontend
4. **Render Frontend:** https://web-237104.onrender.com
5. **Render Backend API:** https://api-237104.onrender.com/api/employees
6. **MongoDB Atlas:** https://cloud.mongodb.com/

> **Lưu ý:** Hai link Docker Hub theo tên image mới chỉ dùng khi bạn đã push các image tương ứng. Nếu chưa đổi image, hãy sử dụng các link `qui237104/employee-backend` và `qui237104/employee-frontend` đang hoạt động. URL MongoDB Atlas trên là trang quản lý chung, không phải link riêng tới cluster.

## 8. Bảo mật

File `.env` chứa thông tin đăng nhập cơ sở dữ liệu không được đưa lên GitHub. Chỉ commit `.env.example` với giá trị mẫu và lưu biến `MONGODB_URI` trong mục Environment của Backend trên Render.
