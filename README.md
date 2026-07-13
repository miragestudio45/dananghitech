# Da Nang High-Tech Park Digital Twin Platform — BIM-GIS Upgrade

Bản source độc lập dành cho **Khu Công nghệ cao Đà Nẵng**, nâng cấp từ nền tảng Airport Digital Twin nhưng đã tái cấu trúc theo nghiệp vụ khu công nghệ cao, khu công nghiệp và nền tảng BIM-GIS vận hành.

## Điểm nâng cấp chính

- Overview 2D sử dụng ảnh Khu Công nghệ cao do người dùng cung cấp, đã tối ưu WebP để tải nhanh hơn.
- Overview 3D tải model `ff_opt.glb` từ URL cấu hình của người dùng và tự động căn camera theo kích thước model.
- Bổ sung module cấp cao **BIM-GIS & Spatial Data** làm nền tảng dữ liệu không gian của toàn hệ thống.
- Nâng cấp quản lý đất đai và quy hoạch thành bản đồ lô đất tương tác, có hồ sơ quy hoạch, nhà đầu tư, hạ tầng và trạng thái triển khai.
- Nâng cấp What-if thành Scenario Studio có tham số, kết quả động, so sánh phương án và cảnh báo về mức độ hiệu chỉnh mô hình.
- Làm rõ Digital Twin Maturity theo Current State → Proposed Scope → Next → Target.
- Bổ sung Implementation Roadmap & Investment với 4 giai đoạn, phạm vi, phụ thuộc, tiêu chí nghiệm thu và khoảng kinh phí hoạch định.
- Giữ nguyên kiến trúc và trải nghiệm **Facility Operations & EBO** đã được đánh giá tốt ở bản trước.

## Cấu trúc giải pháp

1. High-Tech Park Overview
2. BIM-GIS & Spatial Data
3. Infrastructure & Park Operations
4. Land, Planning, Investment & Tenant Services
5. FM & Asset Lifecycle
6. Facility Operations & EBO
7. AI, Simulation & Optimization
8. Safety, Security & Environment
9. Systems, Data & Integration

## BIM-GIS & Spatial Data

Module mới bao gồm:

- Spatial Command Center.
- Reality Capture: UAV Photogrammetry, UAV LiDAR, Mobile Mapping, Panorama 360, GNSS RTK và USV/Sonar.
- Terrain, DSM & DTM: cao độ, độ dốc, đường đồng mức, cut/fill và phân tích thoát nước.
- Planning & Parcel Map: lô đất, khu chức năng, chỉ tiêu quy hoạch, nhà đầu tư và readiness hạ tầng.
- Infrastructure Network: đường, điện, cấp nước, nước thải, thoát nước, viễn thông và hạ tầng ngầm.
- BIM Federation & Digital Thread.
- Survey Missions và Change Detection.
- Spatial Data & CDE theo luồng WIP → Shared → Published → Archive.

Digital Thread được mô tả theo chuỗi:

```text
GIS Feature → BIM Object → Asset → IoT Sensor → Alarm → Work Order → Document
```

## Digital Twin Maturity

- **L1+ Current:** Digital Spatial Foundation — khảo sát, GIS, point cloud, DSM/DTM, BIM hiện trạng.
- **L2 Proposed:** Connected Monitoring — IoT, SCADA, EBO/BMS, Power Quality, nước, môi trường và an ninh.
- **L3 Next:** Simulation & Prediction — ngập, phát tán ô nhiễm, gián đoạn tiện ích, predictive maintenance.
- **L4 Target:** Integrated Optimization — tối ưu liên miền, điều phối đa khu và tự động hóa có phê duyệt.

## Facility Operations & EBO

Phần này tiếp tục giữ cấu trúc đã có:

- BMS/HVAC full-height.
- Chiller Plant và HVAC Floor Plan.
- Energy & Power, sơ đồ một sợi và power quality.
- CCTV/VMS, Access Control, Smart Parking.
- Fire & Life Safety, Water & Utilities, Lighting, Vertical Transport.
- Cross-domain Alarms, Historian, Trends & Reports.
- Asset Location, Asset Information, command demo và audit trail.

## Chạy nhanh trên Windows

Nhấp đúp:

```text
OPEN_DA_NANG_HIGH_TECH_PARK.cmd
```

Project sẽ mở tại:

```text
http://localhost:5173/site/da-nang-high-tech-park
```

Để build production, nhấp đúp:

```text
BUILD_DA_NANG_HIGH_TECH_PARK.cmd
```

## Chạy bằng terminal

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```

Build:

```bash
npm run build
```

## Cấu hình hình ảnh và model Overview

### 2D

File local đã tối ưu:

```text
src/assets/airport/Overview_HighTechPark.webp
```

Component sử dụng:

```text
src/app/airport/overview/AirportOverview2D.tsx
```

### 3D

URL model được cấu hình tại:

```text
src/app/airport/overview/airport3DConfig.ts
```

Model 3D hiện tải trực tiếp từ URL người dùng cung cấp. Máy chạy demo cần có Internet để tải model. Có thể đổi sang file local sau bằng cách đặt GLB trong `public/models/` và sửa `modelUrl`.

Mapping nhóm đối tượng tương tác nằm tại:

```text
src/app/airport/overview/airport3DTargets.ts
```

## Lưu ý dữ liệu thật

Bản này là prototype sản phẩm có luồng nghiệp vụ và dữ liệu demo. Để triển khai thực tế cần tiếp nhận và hiệu chỉnh thêm:

- Geodatabase, Web Map/Web Scene hoặc dịch vụ ArcGIS.
- LAS/LAZ, SLPK, orthophoto, DSM/DTM.
- IFC/RVT/GLB và property set BIM.
- Danh mục tài sản, common ID và hồ sơ pháp lý.
- Point list BMS/SCADA/IoT, ngưỡng alarm và sequence of operation.
- Dữ liệu lịch sử để hiệu chỉnh mô hình What-if và AI.
- Khảo sát kỹ thuật và BoQ để chốt CAPEX/OPEX.

## Tài liệu kèm theo

- `UPGRADE_HIGH_TECH_PARK_BIM_GIS_V2.md`: nội dung nâng cấp chi tiết.
- `CHANGES_HIGH_TECH_PARK.md`: lịch sử chuyển đổi sản phẩm.
- `REQUIREMENTS_TRACEABILITY.md`: ma trận bám sát yêu cầu nghiệp vụ.
- `VERIFICATION.md`: kết quả build và kiểm tra route.
