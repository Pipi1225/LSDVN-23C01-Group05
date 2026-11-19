# ĐẶC TẢ DỰ ÁN: WEBSITE TIMELINE & ÔN TẬP LỊCH SỬ ĐẢNG (NHÓM 5)

## 1. Mục đích & Bối cảnh (Business Overview)
- **Bài toán giải quyết:** Thay thế cách làm đồ án chữ viết khô khan truyền thống bằng một sản phẩm công nghệ mang đậm dấu ấn sinh viên ngành Công nghệ thông tin, hệ thống hóa tiến trình gần 100 năm lịch sử của Đảng (1930 – nay) một cách trực quan, dễ nhớ.
- **Người dùng cuối (End-user):**
  - Giảng viên chấm thi (đánh giá độ chuẩn xác kiến thức trọng tâm và khả năng ứng dụng CNTT).
  - Sinh viên trong lớp (sử dụng làm công cụ ôn thi / kiểm tra kiến thức cuối kỳ).
- **Kỳ vọng lớn nhất:** Giao diện mượt mà, trực quan, phân chia 5 giai đoạn rõ ràng. Chức năng Quiz phản hồi tức thì (chấm điểm, báo đúng/sai, hiện giải thích) không độ trễ.

## 2. Cấu trúc & Nội dung (Scope & Content)
- **Quy mô trang web:** Ứng dụng một trang (Single-page Application) chia làm 2 khu vực tính năng chính (**Timeline** và **Quiz**), có thanh điều hướng nhanh (Sticky Nav) ở trên cùng.
- **Các thành phần (Block) chính:**
  - **Hero Banner:** Tiêu đề dự án (*"Hành trình Lịch sử Đảng Cộng sản Việt Nam: 1930 – Nay"*), thông tin Nhóm 5 và nút cuộn nhanh xuống Timeline / Quiz.
  - **Vertical Timeline:** Dòng thời gian cuộn dọc ở giữa chia thành 5 giai đoạn (`1930–1945`, `1945–1954`, `1954–1975`, `1975–1986`, `1986–Nay`), mỗi giai đoạn hiển thị đúng 3 thẻ mốc chính xen kẽ trái/phải (tổng 15 mốc).
    - Riêng Giai đoạn 1 có thêm nút **"Bối cảnh bổ sung / Xem thêm"** (mở dạng Modal hoặc Accordion) để đọc phần nội dung nền mà không làm lệch bố cục trục thời gian.
    - *Responsive:* Trên màn hình nhỏ / điện thoại (mobile), trục thời gian tự động gom gọn về bố cục 1 cột dọc để không bị vỡ giao diện.
  - **Interactive Quiz:** Khu vực ôn tập từ ngân hàng 40 câu hỏi trắc nghiệm, có bộ đếm câu hỏi, điểm số và hỗ trợ chọn chế độ: **Thi thử 15 câu ngẫu nhiên** hoặc **Làm toàn bộ 40 câu**.
  - **Footer:** Thông tin môn học và danh sách thành viên thực hiện của Nhóm 5:
    - `23127047` – Lưu Huy Hoàng
    - `23127052` – Dương Gia Huy
    - `23127054` – Nguyễn Gia Huy
    - `23127125` – Nguyễn Hiếu Thuận
    - `23127448` – Lưu Vĩnh Phát
    - `23127462` – Nguyễn Minh Quang
    - `23127463` – Nguyễn Vũ Minh Quang
- **Tình trạng nội dung:** Đã hoàn thiện 100% và tách biệt hoàn toàn với UI, gồm:
  - File Markdown nội dung lịch sử (`noi_dung_lsd.md`) dùng để chuyển thành data render Timeline.
  - File `quiz_lich_su_dang_40_cau.json` chứa sẵn mảng `periods` (5 giai đoạn) và `questions` (40 câu hỏi kèm `period_id`, `is_core`, `options`, `correct_answer`, `explanation`).

## 3. Tương tác & Xử lý Logic (Functional Requirements)
- **Xử lý Data:** Hoàn toàn Client-side (không dùng Backend/Database) để tối ưu tốc độ tải trang và dễ deploy lên Vercel/GitHub Pages. Toàn bộ tiến trình làm bài, trộn câu hỏi và chấm điểm xử lý bằng Local State ngay trên trình duyệt.
- **Dữ liệu hiển thị:** Render động bằng vòng lặp từ dữ liệu JSON (Data-driven UI) để dễ dàng chỉnh sửa nội dung, chính tả hoặc mở rộng câu hỏi sau này mà không cần sửa code logic.
- **Hiệu ứng (Animation):**
  - **Timeline Scroll:** Các thẻ sự kiện mờ dần và trượt nhẹ vào giữa khi người dùng cuộn chuột tới (Scroll Reveal); bấm vào thẻ có thể xem chi tiết đầy đủ.
  - **Quiz Feedback:** Đổi màu tức thì khi chọn đáp án (Xanh = Đúng, Đỏ = Sai), khóa lựa chọn câu đó và trượt xuống khung **"Giải thích"** lấy từ trường `explanation`.

## 4. "Elevator Pitch" – Tóm tắt lõi (Core Vision)
1. Sản phẩm là một **Nền tảng Ôn tập Lịch sử Đảng Tương tác**, kết hợp giữa việc hệ thống hóa kiến thức theo trục thời gian (Timeline) và luyện tập trắc nghiệm phản hồi tức thì (Quiz).
2. Điểm nhấn công nghệ cốt lõi là kiến trúc **Data-driven UI** chạy hoàn toàn phía trình duyệt bằng dữ liệu tĩnh, đảm bảo tốc độ phản hồi ngay lập tức và tách biệt hoàn toàn dữ liệu khỏi giao diện.
3. Nội dung được Nhóm 5 biên soạn chuẩn hóa từ giáo trình, cô đọng thành **15 mốc son trọng tâm** trải dài qua 5 giai đoạn (1930 – nay) cùng **ngân hàng 40 câu hỏi trắc nghiệm** có giải thích chi tiết.
4. Dự án không chỉ đáp ứng tiêu chí đồ án môn học mà còn là công cụ ôn thi cuối kỳ thực tế, dễ dùng cho toàn bộ sinh viên trong lớp.
5. **Call-to-Action cuối cùng:** Người dùng cuộn theo dòng thời gian để nắm vững 15 mốc lịch sử cốt lõi, sau đó chuyển ngay xuống khu vực Quiz để chọn chế độ luyện tập, kiểm tra điểm số và xem giải thích ngay lập tức.