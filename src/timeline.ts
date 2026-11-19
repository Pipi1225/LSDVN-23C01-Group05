import source from './data/noi_dung_lsd.md?raw'

const chapters = source.split(/^## GIAI ĐOẠN \d[^\n]*\n/gm).slice(1)
const names = [
  'Sự ra đời của Đảng và lãnh đạo giành chính quyền',
  'Bảo vệ chính quyền và kháng chiến chống Pháp',
  'Xây dựng CNXH ở miền Bắc và kháng chiến chống Mỹ',
  'Cả nước quá độ lên CNXH và trước thềm Đổi mới',
  'Đổi mới và hội nhập quốc tế',
]
const ranges = ['1930–1945', '1945–1954', '1954–1975', '1975–1986', '1986–Nay']
const headings = [
  [['02/1930', 'Thành lập Đảng Cộng sản Việt Nam'], ['1930–1935', 'Xô Viết Nghệ–Tĩnh và Đại hội I'], ['1939–1945', 'Chuyển hướng chiến lược và Cách mạng Tháng Tám']],
  [['12/1946', 'Toàn quốc kháng chiến'], ['02/1951', 'Đại hội đại biểu toàn quốc lần thứ II'], ['05–07/1954', 'Điện Biên Phủ và Hiệp định Genève']],
  [['09/1960', 'Đại hội đại biểu toàn quốc lần thứ III'], ['01/1973', 'Hiệp định Paris'], ['04/1975', 'Chiến dịch Hồ Chí Minh']],
  [['07/1976', 'Hoàn thành thống nhất đất nước về mặt Nhà nước'], ['01/1981', 'Chỉ thị 100 – Khoán 100'], ['06/1985', 'Hội nghị Trung ương 8 khóa V']],
  [['12/1986', 'Đại hội VI – Khởi xướng Đổi mới'], ['06/1991', 'Cương lĩnh năm 1991'], ['01/2021', 'Đại hội XIII – Tầm nhìn 2045']],
]

/** Keep the source's detailed text intact while grouping it into the approved 15 cards. */
const sections = chapters.map(chapter => Array.from(
  chapter.matchAll(/^### \d+\. (.+)\n([\s\S]*?)(?=^#{2,3} |$\n?(?![\s\S]))/gm),
  ([, title, body]) => ({ title, body: body.trim().replace(/\n+---$/, '') }),
))

export const context = sections[0].slice(0, 2).map(section => (
  '#### ' + section.title + '\n\n' + section.body
)).join('\n\n')

export const timeline = headings.map((events, period) => ({
  name: names[period],
  range: ranges[period],
  events: events.map(([date, title], index) => {
    const section = sections[period][index + (period === 0 ? (index === 2 ? 3 : 2) : 0)]
    const body = period === 0 && index === 2
      ? '#### ' + sections[0][4].title + '\n\n' + sections[0][4].body + '\n\n#### ' + section.title + '\n\n' + section.body
      : section.body
    const plain = section.body.replace(/\*\*/g, '')
    const line = plain.split('\n').find(item => item.trim().length > 90) ?? section.title
    const summary = line.replace(/^\s*\*\s*/, '').replace(/^.{1,45}:\s/, '')
    const cutoff = summary.lastIndexOf(' ', 161)
    return { date, title, body, summary: summary.length > 165 ? summary.slice(0, cutoff) + '…' : summary }
  }),
}))

export const references = source.split(/^## TÀI LIỆU THAM KHẢO[^\n]*\n/m)[1]
