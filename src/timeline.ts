import source from './data/noi_dung_lsd.md?raw'

const normalizedSource = source.replace(/\r\n/g, '\n')
const chapters = normalizedSource.split(/^## GIAI ĐOẠN \d[^\n]*\n/gm).slice(1)
const names = [
  'Sự ra đời của Đảng và lãnh đạo giành chính quyền',
  'Bảo vệ chính quyền và kháng chiến chống Pháp',
  'Xây dựng CNXH ở miền Bắc và kháng chiến chống Mỹ',
  'Cả nước quá độ lên CNXH và trước thềm Đổi mới',
  'Đổi mới và hội nhập quốc tế',
]
const ranges = ['1930–1945', '1945–1954', '1954–1975', '1975–1986', '1986–Nay']
const headings = [
  [['02/1930', 'Thành lập Đảng Cộng sản Việt Nam và Cương lĩnh chính trị đầu tiên'], ['05/1941', 'Hội nghị Trung ương 8 và thành lập Mặt trận Việt Minh'], ['19/08/1945', 'Khởi nghĩa giành chính quyền ở Hà Nội và Cách mạng Tháng Tám']],
  [['12/1946', 'Toàn quốc kháng chiến'], ['02/1951', 'Đại hội đại biểu toàn quốc lần thứ II'], ['05–07/1954', 'Điện Biên Phủ và Hiệp định Genève']],
  [['09/1960', 'Đại hội đại biểu toàn quốc lần thứ III'], ['01/1973', 'Hiệp định Paris'], ['04/1975', 'Chiến dịch Hồ Chí Minh']],
  [['07/1976', 'Hoàn thành thống nhất đất nước về mặt Nhà nước'], ['01/1981', 'Chỉ thị 100 – Khoán 100'], ['06/1985', 'Hội nghị Trung ương 8 khóa V']],
  [['12/1986', 'Đại hội VI – Khởi xướng Đổi mới'], ['06/1991', 'Cương lĩnh năm 1991'], ['2021 – Nay', 'Đại hội XIII và tầm nhìn phát triển đến 2045']],
]

const summaries = [
  [
    'Hội nghị hợp nhất (6/1–7/2/1930) do Nguyễn Ái Quốc chủ trì đã thành lập Đảng Cộng sản Việt Nam và thông qua Cương lĩnh chính trị đầu tiên.',
    'Hội nghị Trung ương 8 đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và quyết định thành lập Mặt trận Việt Minh.',
    'Ngày 19/8/1945, nhân dân Hà Nội giành chính quyền trong cuộc Tổng khởi nghĩa Tháng Tám.',
  ],
  [
    'Cuộc kháng chiến toàn quốc bùng nổ ngày 19/12/1946 để bảo vệ nền độc lập trước cuộc xâm lược của thực dân Pháp.',
    'Đại hội II quyết định đưa Đảng ra hoạt động công khai ở Việt Nam với tên Đảng Lao động Việt Nam.',
    'Chiến thắng Điện Biên Phủ tạo bước ngoặt cho việc ký Hiệp định Genève về đình chỉ chiến sự ở Việt Nam.',
  ],
  [
    'Đại hội III xác định vai trò quyết định nhất của cách mạng xã hội chủ nghĩa ở miền Bắc đối với sự nghiệp cách mạng cả nước.',
    'Hiệp định Paris quy định chấm dứt chiến tranh ở Việt Nam và yêu cầu Hoa Kỳ rút quân trong vòng 60 ngày.',
    'Chiến dịch Hồ Chí Minh kết thúc thắng lợi ngày 30/4/1975, giải phóng hoàn toàn miền Nam.',
  ],
  [
    'Quốc hội khóa VI quyết định đặt tên nước là Cộng hòa xã hội chủ nghĩa Việt Nam, hoàn thành thống nhất về mặt Nhà nước.',
    'Chỉ thị 100 áp dụng khoán sản phẩm đến nhóm lao động và người lao động trong hợp tác xã nông nghiệp.',
    'Hội nghị chủ trương xóa bỏ cơ chế tập trung quan liêu, bao cấp và chọn giá – lương – tiền làm khâu đột phá.',
  ],
  [
    'Đại hội VI khởi xướng công cuộc Đổi mới và tập trung vào ba chương trình lương thực – thực phẩm, hàng tiêu dùng và hàng xuất khẩu.',
    'Đại hội VII thông qua Cương lĩnh năm 1991, xác định sáu đặc trưng của xã hội xã hội chủ nghĩa ở Việt Nam.',
    'Từ Đại hội XIII (2021) đến nay, Đảng xác lập lộ trình chiến lược 2025 – 2030 – 2045 và thúc đẩy các động lực tăng trưởng mới để đưa Việt Nam trở thành nước phát triển, thu nhập cao.',
  ],
]

/** Keep the source's detailed text intact while grouping it into the approved 15 cards. */
const sections = chapters.map(chapter => Array.from(
  chapter.matchAll(/^### \d+\. (.+)\n([\s\S]*?)(?=^#{2,3} |$\n?(?![\s\S]))/gm),
  ([, title, body]) => ({ title, body: body.trim().replace(/\n+---$/, '') }),
))

// The source combines the 1941 and 1945 milestones in one section. Split at its own headings.
const [strategicShift, preparation, uprising] = sections[0][5].body.split(
  /(?=^\* \*\*Chuẩn bị lực lượng vũ trang|^\* \*\*Cao trào kháng Nhật)/m,
)
const firstPeriodBodies = [
  sections[0][2].body,
  [strategicShift.trim(), preparation.trim()].join('\n\n'),
  uprising.trim(),
]
const backgroundSections = [sections[0][0], sections[0][1], sections[0][3], sections[0][4]]

export const context = backgroundSections
  .map(({ title, body }) => '#### ' + title + '\n\n' + body)
  .join('\n\n')

const outlook = '**Tiếp nối thực tiễn hiện nay:** *Trên nền tảng tổng kết 40 năm Đổi mới (1986 – 2026), toàn Đảng và toàn dân tiếp tục đẩy mạnh hiện thực hóa các mục tiêu phát triển giai đoạn 2025 – 2030, tập trung vào chuyển đổi số, đổi mới sáng tạo, khoa học – công nghệ, kinh tế xanh và hoàn thiện thể chế nhằm tạo đà vững chắc hướng tới tầm nhìn năm 2045.*'
const finalPeriodBodies = sections[4].map(({body}, index) =>
  index === 2 ? body + '\n\n' + outlook : body,
)

const periodBodies = sections.map(period => period.map(section => section.body))
periodBodies[0] = firstPeriodBodies
periodBodies[4] = finalPeriodBodies

export const timeline = headings.map((events, period) => ({
  name: names[period],
  range: ranges[period],
  events: events.map(([date, title], index) => ({
    date,
    title,
    body: periodBodies[period][index],
    summary: summaries[period][index],
  })),
}))

export const references = normalizedSource.split(/^## TÀI LIỆU THAM KHẢO[^\n]*\n/m)[1]
