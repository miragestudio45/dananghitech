# Thay đổi chính — Da Nang High-Tech Park Digital Twin Platform

## V2 — BIM-GIS Upgrade

### 1. Thay asset Overview

- Overview 2D: thay bằng ảnh Khu Công nghệ cao do người dùng cung cấp và tối ưu thành WebP local.
- Overview 3D: cấu hình tải `ff_opt.glb` từ URL người dùng cung cấp.
- Cập nhật hotspot, data layer và nhóm tương tác 3D theo bối cảnh Khu Công nghệ cao.

### 2. Bổ sung BIM-GIS & Spatial Data

Tạo module cấp cao mới gồm:

- Spatial Command Center.
- Reality Capture.
- Terrain, DSM & DTM.
- Planning & Parcel Map.
- Infrastructure Network.
- BIM Federation & Digital Thread.
- Survey Missions.
- Change Detection.
- Spatial Data & CDE.

### 3. Nâng cấp Land & Planning

- Bản đồ lô đất tương tác.
- Hồ sơ lô đất, quy hoạch, nhà đầu tư, tiến độ và utility readiness.
- Bộ lọc trạng thái phát triển và tuân thủ.

### 4. Nâng cấp Digital Twin Maturity

Chuyển từ danh sách L1–L4 chung sang:

- L1+ Current.
- L2 Proposed.
- L3 Next.
- L4 Target.

### 5. Nâng cấp What-if

- Thêm input tham số.
- Kết quả thay đổi theo kịch bản.
- So sánh baseline/response.
- Impact zone và recommended actions.
- Disclaimer về hiệu chỉnh mô hình.

### 6. Bổ sung lộ trình và kinh phí

- 4 phase triển khai.
- Lean/Target/Advanced.
- Khoảng CAPEX hoạch định.
- Cấu phần chi phí, phụ thuộc, acceptance criteria và decision gate.

### 7. Responsive navigation

- Bottom navigation hỗ trợ cuộn ngang trên màn hình nhỏ.
- Giảm min-width và giữ module không bị tràn khỏi viewport.

### 8. Facility Operations & EBO

Giữ nguyên kiến trúc và trải nghiệm đã có ở bản trước, không chuyển đổi lan sang UI khác.

## Route mặc định

```text
http://localhost:5173/site/da-nang-high-tech-park
```

## Công nghệ

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Three.js.
- Framer Motion.
- Recharts.
