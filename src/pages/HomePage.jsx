import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "@/api/bookApi";
import "@/styles/global.css";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();

        if (Array.isArray(data)) {
          setBooks(data);
        } else if (data && data.books) {
          setBooks(data.books);
        } else {
          console.warn("데이터 형식이 예상과 다릅니다.");
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  if (books.length === 0) return <div>등록된 도서가 없습니다.</div>;

  return (
    <div className="home-page">
      <section className="book-grid">
        {books.map((book) => (
          <Link to={`/books/${book.id}`} className="book-card" key={book.id}>
            <div className="cover-box">{book.coverImageUrl || "표지 없음"}</div>
            {/* 데이터가 비어있을 경우 대비하여 옵셔널 체이닝 추가 */}
            <span className="genre-tag">{book.genre?.join(", ") || "장르 없음"}</span>
            <h3>{book.title}</h3>
            <p>저자: {book.author}</p>
            <small>등록일: {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "날짜 없음"}</small>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default HomePage;