import { Link } from "react-router-dom";
import "../styles/global.css";

function HomePage() {
  const books = [
    {
      id: 1,
      title: "별빛 아래의 서점",
      author: "홍길동",
      date: "2026.04.24",
      genre: "에세이",
    },
    {
      id: 2,
      title: "여름의 문장",
      author: "김민수",
      date: "2026.04.24",
      genre: "소설",
    },
    {
      id: 3,
      title: "푸른 행성 기록",
      author: "이서연",
      date: "2026.04.24",
      genre: "SF",
    },
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>도서 목록</h1>
        <p>표지 중심으로 내 작품을 한눈에 확인합니다.</p>
      </header>

      <div className="home-controls">
        <input type="text" placeholder="제목/작가명으로 검색" />
        <button>장르 필터</button>

        <Link to="/books/create">
          <button className="primary-button">도서 등록</button>
        </Link>
      </div>

      <section className="book-grid">
        {books.map((book) => (
          <Link to={`/books/${book.id}`} className="book-card" key={book.id}>
            <div className="cover-box">표지 이미지</div>

            <span className="genre-tag">{book.genre}</span>

            <h3>{book.title}</h3>
            <p>저자: {book.author}</p>
            <small>등록일: {book.date}</small>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default HomePage;