import '@fontsource-variable/noto-serif'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/700.css'
import { createRoot } from 'react-dom/client'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Quiz } from './Quiz'
import { context, references, timeline } from './timeline'
import './style.css'

const members = [
  ['23127047', 'Lưu Huy Hoàng'], ['23127052', 'Dương Gia Huy'], ['23127054', 'Nguyễn Gia Huy'],
  ['23127125', 'Nguyễn Hiếu Thuận'], ['23127448', 'Lưu Vĩnh Phát'], ['23127462', 'Nguyễn Minh Quang'],
  ['23127463', 'Nguyễn Vũ Minh Quang'],
]

/** Present the course project as one continuous reading and practice experience. */
function App() {
  return <>
    <a className="skip" href="#noi-dung">Đến nội dung chính</a>
    <header className="site-header">
      <nav className="wrap nav" aria-label="Điều hướng chính">
        <a className="brand" href="#noi-dung"><span className="brand-mark" aria-hidden="true"></span>Nhóm 5</a>
        <div className="nav-links"><a href="#timeline">Dòng thời gian</a><a href="#quiz">Ôn tập</a><a href="#tai-lieu">Tài liệu</a></div>
      </nav>
    </header>
    <main id="noi-dung">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">Đồ án môn học · Nhóm 5</p>
            <h1>Hành trình Lịch sử Đảng<br className="desktop-break" /> Cộng sản Việt Nam</h1>
            <p className="intro">Tìm hiểu 15 mốc lịch sử qua 5 giai đoạn và củng cố kiến thức với 40 câu hỏi có giải thích.</p>
            <div className="actions"><a className="button primary" href="#timeline">Xem dòng thời gian <span aria-hidden="true">↓</span></a><a className="button secondary" href="#quiz">Làm bài ôn tập <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-index" aria-label="Mục lục theo giai đoạn">
            {timeline.map((period, index) => <a key={period.range} href={'#giai-doan-' + (index + 1)}><span>{period.range}</span><span aria-hidden="true">↘</span></a>)}
          </div>
        </div>
      </section>
      <section className="wrap timeline-section" id="timeline" aria-labelledby="timeline-title">
        <div className="section-head"><h2 id="timeline-title">Dòng thời gian</h2><p>Chọn một mốc để đọc thêm về sự kiện và ý nghĩa lịch sử.</p></div>
        {timeline.map((period, index) => <section className="period" id={'giai-doan-' + (index + 1)} key={period.range}>
          <div className="period-head"><p className="period-date">{period.range}</p><h3>{period.name}</h3></div>
          {index === 0 && <details className="context"><summary>Bối cảnh bổ sung</summary><div className="detail"><Markdown remarkPlugins={[remarkGfm]}>{context}</Markdown></div></details>}
          <ol className="events">
            {period.events.map(event => <li className="event" key={event.date}>
              <article className="event-card"><p className="event-date">{event.date}</p><h4>{event.title}</h4><p className="event-summary">{event.summary}</p>
                <details><summary>Xem chi tiết</summary><div className="detail"><Markdown remarkPlugins={[remarkGfm]}>{event.body}</Markdown></div></details>
              </article>
            </li>)}
          </ol>
        </section>)}
      </section>
      <section id="quiz" className="quiz-section" aria-labelledby="practice-title"><div className="wrap quiz-grid">
        <div className="section-head"><h2 id="practice-title">Ôn tập</h2><p>Kiểm tra kiến thức và đọc giải thích ngay sau mỗi câu trả lời.</p></div><Quiz />
      </div></section>
      <section id="tai-lieu" className="wrap references" aria-labelledby="refs-title"><h2 id="refs-title">Tài liệu tham khảo</h2><Markdown remarkPlugins={[remarkGfm]}>{references}</Markdown></section>
    </main>
    <footer className="site-footer"><div className="wrap footer-grid">
      <div><p className="kicker">Nhóm 5</p><h2>Lịch sử Đảng Cộng sản Việt Nam</h2><p>Giảng viên · Cô Trần Thị Châu</p></div>
      <div><h3>Thành viên</h3><ul>{members.map(([id, name]) => <li key={id}><span>{name}</span><span>{id}</span></li>)}</ul></div>
    </div></footer>
  </>
}

createRoot(document.getElementById('root')!).render(<App />)
