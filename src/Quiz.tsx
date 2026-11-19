import { useState } from 'react'
import bank from './data/quiz.json'

type Question = typeof bank.questions[number]

/** Shuffle a copy so starting a new attempt leaves the source bank intact. */
function shuffle<T>(items: T[]) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]]
  }
  return shuffled
}

/** Run one attempt in browser memory and show feedback before moving forward. */
export function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const active = questions[index]
  const selected = answers[index]
  const score = answers.filter((answer, number) => answer === questions[number].correct_answer).length

  /** Keep the short attempt evenly distributed across all five periods. */
  function start(count: number) {
    const pool = count === 40 ? bank.questions : bank.periods.flatMap(period =>
      shuffle(bank.questions.filter(question => question.period_id === period.id)).slice(0, 3),
    )
    setQuestions(shuffle(pool))
    setAnswers([])
    setIndex(0)
    setFinished(false)
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#quiz-title')?.focus())
  }

  /** Advance only after answering, and retain the final answer for review. */
  function advance() {
    if (!selected) return
    if (index + 1 === questions.length) setFinished(true)
    else setIndex(index + 1)
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#quiz-title')?.focus())
  }

  return <div className="quiz-panel">
    {!active && <>
      <h3 id="quiz-title" tabIndex={-1}>Bạn muốn ôn tập thế nào?</h3>
      <div className="modes">
        <button className="mode" onClick={() => start(15)}><strong>Thi thử 15 câu</strong><span>3 câu ngẫu nhiên mỗi giai đoạn</span><span aria-hidden="true">→</span></button>
        <button className="mode" onClick={() => start(40)}><strong>Làm đủ 40 câu</strong><span>Ôn toàn bộ ngân hàng câu hỏi</span><span aria-hidden="true">→</span></button>
      </div>
    </>}
    {active && !finished && <div data-question-id={active.id} data-period={active.period_id}>
      <div className="quiz-meta"><span>Câu {index + 1}/{questions.length}</span><span>Đúng {score} câu</span></div>
      <progress aria-label="Tiến độ làm bài" max={questions.length} value={answers.length} />
      <h3 id="quiz-title" tabIndex={-1}>{active.question}</h3>
      <div className="options">
        {Object.entries(active.options).map(([letter, value]) => {
          const correct = selected && letter === active.correct_answer
          const wrong = selected === letter && !correct
          return <button key={letter} disabled={Boolean(selected)} aria-pressed={selected === letter}
            className={correct ? 'correct' : wrong ? 'wrong' : ''}
            onClick={() => setAnswers(previous => previous.length === index ? [...previous, letter] : previous)}>
            <span className="letter">{letter}</span><span>{value}{correct && <small>Đáp án đúng</small>}{wrong && <small>Bạn đã chọn</small>}</span>
          </button>
        })}
      </div>
      {selected && <div className="feedback" role="status"><strong>{selected === active.correct_answer ? 'Đúng' : 'Chưa đúng'}</strong><p>{active.explanation}</p></div>}
      <button className="button primary next" disabled={!selected} onClick={advance}>{index + 1 === questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}</button>
    </div>}
    {finished && <>
      <h3 id="quiz-title" tabIndex={-1}>Kết quả ôn tập</h3>
      <p className="score">{score}<span> / {questions.length}</span></p>
      <p>{score === questions.length ? 'Bạn đã trả lời đúng tất cả các câu.' : 'Mở từng câu bên dưới để xem lại đáp án và giải thích.'}</p>
      {questions.map((question, number) => answers[number] !== question.correct_answer && <details key={question.id} className="review">
        <summary>Câu {number + 1} · {question.question}</summary>
        <div className="detail"><p><strong>Bạn chọn</strong> {question.options[answers[number] as keyof Question['options']]}</p>
          <p><strong>Đáp án đúng</strong> {question.options[question.correct_answer as keyof Question['options']]}</p><p>{question.explanation}</p></div>
      </details>)}
      <div className="actions next"><button className="button primary" onClick={() => start(questions.length)}>Làm lại</button>
        <button className="button secondary" onClick={() => {
          setQuestions([])
          setAnswers([])
          setFinished(false)
          requestAnimationFrame(() => document.querySelector<HTMLElement>('#quiz-title')?.focus())
        }}>Chọn chế độ khác</button></div>
    </>}
  </div>
}
