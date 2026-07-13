# Ma trận bám sát yêu cầu — Khu Công nghệ cao Đà Nẵng

Tài liệu này ánh xạ nội dung nghiệp vụ trong file Excel, feedback khách hàng và định hướng BIM-GIS vào module của sản phẩm.

| Nhóm yêu cầu | Chức năng trong sản phẩm | Module / màn hình |
|---|---|---|
| Quy mô và phân khu Khu CNC | Tổng diện tích, khu chức năng, lô đất, công trình trọng yếu và readiness hạ tầng | Overview; Spatial Command Center; Planning & Parcel Map |
| IOC tập trung | KPI liên miền, incident feed, readiness, hotspot và drill-down | High-Tech Park Overview; IOC Command Center |
| GIS, BIM, 2D/3D | Reality capture, terrain, planning, BIM federation, Digital Thread và hạ tầng ngầm | BIM-GIS & Spatial Data |
| Dữ liệu khảo sát | UAV Photogrammetry, LiDAR, Mobile Mapping, Panorama 360, GNSS RTK, USV/Sonar | Reality Capture; Survey Missions |
| DSM/DTM và địa hình | Cao độ, độ dốc, contour, vùng trũng, cut/fill và dữ liệu nền mô phỏng | Terrain, DSM & DTM |
| Quản lý đất đai/quy hoạch | Lô đất, chỉ tiêu quy hoạch, nhà đầu tư, dự án, utility readiness và compliance | Planning & Parcel Map; Land, Investment & Tenant Services |
| Xúc tiến đầu tư và CRM | Qualified leads, site visit, pipeline, phê duyệt, hợp đồng và SLA | Investor Portal; Investment CRM; Tenant Registry |
| Dịch vụ doanh nghiệp | Yêu cầu doanh nghiệp, hợp đồng, phí, tuân thủ và cảnh báo | Tenant Portal; Contracts & Fees; Compliance |
| Điện và chất lượng nguồn | Substation, feeder, sag/swell, THD, harmonic, frequency và phụ tải nhạy cảm | Infrastructure Operations; Power Quality Twin; Energy & Power |
| Nước, nước thải, thoát nước | Lưu lượng, áp lực, bơm, chất lượng, xả thải, hồ điều tiết và ngập | Infrastructure Network; Water & Utilities; Flood Scenario |
| Môi trường và ESG | AQI, khí thải, nước thải, tiếng ồn, carbon intensity và giấy phép | Environmental Monitoring; Environmental Compliance |
| Chất thải nguy hại | QR traceability, lưu kho, vận chuyển và bằng chứng xử lý | Hazardous Waste Traceability |
| Giao thông và logistics | ANPR, truck appointment, hàng đợi cổng, tuyến nội bộ và loading yard | Traffic & Logistics; Smart Parking |
| An ninh tích hợp | CCTV/VMS, analytics, Access Control, visitor/contractor và perimeter | Safety, Security & Environment; Facility Operations & EBO |
| PCCC và ứng phó | Fire panels, detectors, pumps, evacuation readiness, SOP và incident command | Fire & Life Safety; Emergency Command |
| UAV và không gian tầm thấp | Mission, corridor, geofence, permit, conflict, survey coverage và model update | Low-Altitude Airspace; Survey Missions |
| Facility/EBO/BMS | Enterprise/Automation Server, BACnet/Modbus, alarm, trend, control và audit | Facility Operations & EBO |
| Asset Lifecycle | Asset Registry, criticality, health, predicted failure, work order và inspection | FM & Asset Lifecycle |
| Digital Thread | GIS Feature → BIM Object → Asset → Sensor → Alarm → Work Order → Document | BIM Federation & Digital Thread |
| Mô phỏng ngập | Rainfall, duration, water level, pump availability, impact zone và response comparison | Scenario Studio — Flood & Drainage |
| Mô phỏng phát tán | Release rate, wind, response time, impact zone và tenant notification | Scenario Studio — Pollution Dispersion |
| Mô phỏng mất tiện ích | Isolation point, reserve capacity, sensitive load, tenant impact và transfer option | Scenario Studio — Utility Outage |
| AI và dự báo | Predictive maintenance, energy optimization, anomaly detection và governed automation | AI, Simulation & Optimization |
| Kiến trúc dữ liệu không gian | VN-2000, Hòn Dấu, LAS/SLPK/IFC/RVT/DWG, Web Map/Web Scene và metadata | Spatial Data & CDE |
| CDE và quản trị dữ liệu | WIP → Shared → Published → Archive; version, approval, audit và quality | Spatial Data & CDE; Data Quality |
| Kiến trúc dữ liệu vận hành | Edge → Data Platform → Application; Bronze/Silver/Gold và data products | Unified Data Lakehouse; Edge & Data Architecture |
| Tích hợp hệ thống | BACnet, Modbus, OPC UA, MQTT, API, OGC/WFS, ONVIF/RTSP và event bus | Integration Hub |
| An ninh mạng | Segmentation, MFA, RBAC/ABAC, identity, vulnerability và audit | OT/IT Cybersecurity |
| Điều hành đa khu | Federation và KPI đa site cho các KCN tại Đà Nẵng | Multi-site Operations |
| Digital Twin Maturity | Current L1+; Proposed L2; Next L3; Target L4 | Overview; Digital Twin Maturity |
| Kinh phí và lộ trình | 4 phase, Lean/Target/Advanced, khoảng CAPEX, phụ thuộc và acceptance gate | Implementation Roadmap & Investment |

## Đối chiếu 6 feedback trọng yếu

| Feedback | Cách xử lý trong V2 | Trạng thái |
|---|---|---|
| Mức độ trưởng thành chưa rõ | Tách Current/Proposed/Next/Target và mô tả phạm vi từng mức | Đã nâng cấp |
| What-if chưa thuyết phục | Thêm Scenario Studio có input, kết quả động, impact và comparison | Đã nâng cấp ở mức prototype |
| Chưa đặc thù Khu CNC | Power Quality, hazardous waste, logistics, sensitive loads và tenant impact | Đã có |
| Chưa quản lý không gian tầm thấp | UAV corridor, permit, mission, survey coverage và update workflow | Đã có |
| Chưa có kinh phí | Thêm roadmap, khoảng kinh phí hoạch định và assumptions | Đã có khung; cần survey/BoQ để chốt |
| Chưa kết nối BIM | Thêm BIM-GIS Federation và Digital Thread; chờ dữ liệu BIM thật để nạp | Đã có luồng/UI; dữ liệu thật chưa được cung cấp |

## Nguyên tắc chuyên môn EBO

- EBO là lớp giám sát, tích hợp, điều phối và vận hành facility; không thay thế hoàn toàn VMS, ACS, Fire Alarm hoặc Power SCADA.
- Enterprise Server quản lý enterprise alarm, schedule, historian, user, audit và tích hợp.
- Automation Server thực hiện local control, local alarm/trend và giao tiếp BACnet/Modbus.
- Hành động nhạy cảm cần permission, xác nhận và audit trail.
