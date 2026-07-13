# High-Tech Park BIM-GIS Upgrade V2

## 1. Mục tiêu

Nâng bản Da Nang High-Tech Park Digital Twin Platform từ một dashboard IOC tổng hợp thành nền tảng Digital Twin có **BIM-GIS và dữ liệu không gian làm xương sống**, đồng thời giải quyết trực tiếp các feedback:

1. Làm rõ Digital Twin Maturity.
2. Có trải nghiệm What-if thay vì chỉ hiển thị trạng thái.
3. Bổ sung nghiệp vụ đặc thù Khu Công nghệ cao.
4. Quản lý không gian tầm thấp và nhiệm vụ UAV.
5. Có lộ trình và khoảng kinh phí hoạch định.
6. Kết nối BIM-GIS và Digital Thread.

## 2. Overview

### 2D

- Đã thay bằng ảnh Khu Công nghệ cao do người dùng cung cấp.
- Đã tạo bản WebP tối ưu local để giảm thời gian tải.
- Hotspot đã đổi sang các vùng nghiệp vụ Khu Công nghệ cao.
- Data Layers đã bổ sung Orthophoto, Survey, Point Cloud, Terrain, Planning, BIM-GIS và Infrastructure.

### 3D

- Đã chuyển cấu hình sang model `ff_opt.glb` do người dùng cung cấp.
- Viewer Three.js tự tính bounding box, scale và camera fit.
- Nhóm tương tác được đổi từ sân bay sang công trình, đường/hạ tầng kỹ thuật, cảnh quan và mặt nước.

## 3. BIM-GIS & Spatial Data

Đã tạo module cấp cao mới, không còn để BIM-GIS chỉ là một màn phụ trong FM.

### Spatial Command Center

- Tổng quan độ phủ dữ liệu không gian.
- Tình trạng lớp bản đồ và mô hình.
- Điểm trọng yếu: Ban Quản lý, trạm 110 kV Hòa Liên, nhà máy nước, nhà máy xử lý nước thải và khu sản xuất công nghệ cao.

### Reality Capture

- UAV Photogrammetry.
- UAV LiDAR.
- Mobile Mapping.
- Panorama 360.
- GNSS RTK.
- USV/Sonar.

### Terrain, DSM & DTM

- Terrain profile.
- Elevation, slope, contour.
- Cut/fill và vùng trũng.
- Sản phẩm phân tích phục vụ thoát nước và quy hoạch.

### Planning & Parcel Map

- Bản đồ lô đất tương tác.
- Click lô đất để xem Plot ID, khu chức năng, diện tích, mật độ, tầng cao, FAR, trạng thái đầu tư và readiness tiện ích.
- Lọc đất trống, kêu gọi đầu tư, đang xây dựng, đang hoạt động, chậm tiến độ và vi phạm.

### Infrastructure Network

- Road.
- Power.
- Water Supply.
- Wastewater.
- Stormwater Drainage.
- Telecom.
- Underground Utilities.

### BIM Federation & Digital Thread

Luồng liên kết:

```text
GIS Feature → BIM Object → Asset → Sensor → Alarm → Work Order → Document
```

### Survey Missions & Change Detection

- Quản lý nhiệm vụ UAV khảo sát/kiểm tra.
- Theo dõi dữ liệu thô, xử lý point cloud và xuất bản model.
- So sánh phiên bản để phát hiện thay đổi công trình, hạ tầng và sử dụng đất.

### Spatial Data & CDE

- VN-2000 và hệ cao độ Hòn Dấu.
- LAS/SLPK/IFC/RVT/DWG/Feature Class/Multipatch/Web Map/Web Scene.
- WIP → Shared → Published → Archive.
- Metadata, approval, version, audit trail và data quality.

## 4. Digital Twin Maturity

Màn maturity đã được chuyển thành:

- **Current — L1+:** Digital Spatial Foundation.
- **Proposed — L2:** Connected Monitoring.
- **Next — L3:** Simulation & Prediction.
- **Target — L4:** Integrated Optimization.

Cách trình bày này tách rõ phạm vi hiện tại, phạm vi đề xuất và định hướng dài hạn.

## 5. What-if Scenario Studio

Đã thay màn mô phỏng tĩnh bằng Scenario Studio có tham số và kết quả động.

### Flood & Drainage

- Cường độ mưa.
- Thời gian mưa.
- Mực nước hạ lưu/hồ điều tiết.
- Tỷ lệ bơm khả dụng.
- Vùng ảnh hưởng, độ sâu, số lô đất và tài sản có nguy cơ.
- So sánh baseline và phương án ứng phó.

### Pollution Dispersion

- Tốc độ phát thải.
- Hướng và tốc độ gió.
- Thời gian ứng phó.
- Vùng ảnh hưởng và tenant cần cảnh báo.

### Utility Outage

- Số điểm cô lập.
- Công suất dự phòng.
- Thời gian phản ứng.
- Tải nhạy cảm, doanh nghiệp bị ảnh hưởng và phương án chuyển nguồn.

Các màn đều có cảnh báo rõ đây là mô hình demo cần dữ liệu kỹ thuật và hiệu chỉnh trước khi dùng cho quyết định vận hành thật.

## 6. Implementation Roadmap & Investment

Đã bổ sung 4 giai đoạn:

1. Digital Spatial Foundation.
2. Connected Operations.
3. Digital Twin Intelligence.
4. Multi-site & Governed Automation.

Mỗi giai đoạn có:

- Thời gian.
- Phạm vi.
- Khoảng kinh phí hoạch định.
- Phụ thuộc dữ liệu/kỹ thuật.
- Tiêu chí nghiệm thu.
- Decision gate.

Có 3 kịch bản Lean, Target và Advanced. Kinh phí được ghi rõ là **ước tính phục vụ lập kế hoạch, không phải báo giá thương mại**.

## 7. Facility Operations & EBO

Không làm lại kiến trúc phần này. Bản nâng cấp giữ:

- BMS/HVAC full-height.
- Chiller, Energy, CCTV, Access, Parking, Fire, Water, Lighting, Vertical Transport.
- Alarm, Historian, Trend, Reports.
- Asset Location và command/audit workflow.

## 8. Phạm vi còn cần dữ liệu khách hàng

- Dữ liệu ArcGIS thật và service endpoint.
- Point cloud/terrain/model BIM chính thức.
- Common ID và master data.
- IoT/SCADA/BMS point list.
- Mạng thoát nước, thông số thủy lực và dữ liệu mưa.
- Nguồn phát thải, mô hình khí tượng và quy trình ứng phó.
- Sơ đồ điện, tải ưu tiên, BESS/microgrid và sequence chuyển nguồn.
- Khảo sát, BoQ, licensing và procurement để chốt chi phí.
