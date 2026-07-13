# Xác minh kỹ thuật

Ngày kiểm tra: 2026-07-13

## Build production

Lệnh:

```bash
npm run build
```

Kết quả:

- Build thành công.
- Vite 6.4.3.
- 2.670 module được transform.
- Không có TypeScript error hoặc lỗi chặn build.
- `dist/` đã được tạo lại sau khi thay ảnh Overview 2D và nâng cấp module.
- Ảnh WebP production: khoảng 624 kB.

## Route

Đã kiểm tra bằng HTTP dev server:

- `/site/da-nang-high-tech-park`: HTTP 200.
- `/`: HTTP 200 và React Router xử lý điều hướng.
- SPA fallback giữ route ứng dụng khi truy cập trực tiếp.
- HTML title: `Da Nang High-Tech Park Digital Twin Platform`.

## Kiểm tra source quan trọng

- Overview 2D import `Overview_HighTechPark.webp`.
- Overview 3D `modelUrl` trỏ tới `ff_opt.glb` do người dùng cung cấp.
- Module `SPATIAL` đã được khai báo trong registry và routing.
- `ScenarioStudio` được gán cho Flood, Pollution và Utility Outage.
- `ImplementationRoadmapModule` được gán tại Systems → Implementation Roadmap & Investment.
- Facility Operations & EBO tiếp tục dùng module hiện có, không bị thay layout tổng thể.
- Bottom navigation có giới hạn theo viewport và cuộn ngang khi cần.

## Cảnh báo không chặn build

Vite cảnh báo bundle chính lớn hơn 500 kB do Three.js và dashboard. Đây là cảnh báo tối ưu hiệu năng, không phải lỗi chức năng.

## Giới hạn kiểm thử

- Route và build đã được kiểm tra thành công.
- Môi trường đóng gói không hoàn tất được phiên chụp giao diện tự động bằng Chromium local, vì vậy không ghi nhận visual-regression screenshot.
- Model 3D Overview được tải từ URL public khi runtime; cần Internet và chính sách CORS của nguồn phải cho phép trình duyệt tải GLB.
- Scenario Studio, chi phí và dữ liệu BIM-GIS trong bản này là prototype/data demo; cần dữ liệu khách hàng để hiệu chỉnh và nghiệm thu triển khai thật.
