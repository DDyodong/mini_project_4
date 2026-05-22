import { Link, useParams } from "react-router-dom";
import "./BookDetailPage.css";
 
function BookDetailPage() {
  const { id } = useParams();
 
  const book = {
    id,
    title: "별빛 아래의 서점",
    author: "홍길동",
    genre: "에세이",
    description:
      "작은 마을 서점에서 벌어지는 따뜻한 이야기입니다. 도시를 떠난 주인공이 오래된 서점에서 사람들과 만나며 성장하는 내용을 담고 있습니다.",
    createdAt: "2026.04.24",
    updatedAt: "2026.04.24",
  };
 
  return (
<div className="detail-page">
<div className="detail-top">
<Link to="/">
<button>← 목록</button>
</Link>
 
        <div>
<Link to={`/books/${id}/edit`}>
<button className="edit-button">수정</button>
</Link>
 
          <button className="delete-button">삭제</button>
</div>
</div>
 
      <h1>도서 상세</h1>
 
      <section className="detail-card">
<div className="detail-cover">표지</div>
 
        <div className="detail-info">
<h2>{book.title}</h2>
 
          <p>저자명: {book.author}</p>
<p>장르: {book.genre}</p>
<p>등록일: {book.createdAt}</p>
<p>수정일: {book.updatedAt}</p>
 
          <p className="description">{book.description}</p>
</div>
</section>
 
      <section className="ai-section">
<h2>AI 표지 생성 영역</h2>
 
        <p>
          도서 제목과 내용을 기반으로 표지를 생성하고 저장합니다.
</p>
 
        <label>OpenAI API Key</label>
 
        <div className="ai-form">
<input
            type="password"
            placeholder="password 타입 입력"
          />
 
          <select>
<option>화풍 선택</option>
<option>감성풍</option>
<option>판타지풍</option>
<option>미니멀풍</option>
<option>SF풍</option>
</select>
 
          <button className="primary-button">
            생성
</button>
</div>
 
        <p className="status-text">
          상태: 생성 중 / 에러 / 생성 완료 안내
</p>
</section>
</div>
  );
}
 
export default BookDetailPage;