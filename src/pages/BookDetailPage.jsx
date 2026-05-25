import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, deleteBook } from "../api/bookApi";

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error(error);
        alert("도서 정보를 불러오지 못했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBook(id);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) return <p>불러오는 중...</p>;
  if (!book) return <p>도서를 찾을 수 없습니다.</p>;

  return (
    <main>
      <section>

        {/* 상단 버튼 영역 */}
        <div>
          <button onClick={() => navigate("/")}>← 목록</button>
          <div>
            {/* 수정 버튼 → 1단계 수정 폼으로 */}
            <button onClick={() => navigate(`/edit/${id}`)}>수정</button>
            {/* 삭제 버튼 */}
            <button onClick={handleDelete}>삭제</button>
          </div>
        </div>

        {/* 표지 이미지 + 책 정보 */}
        <div>

          {/* 표지 이미지 */}
          <div>
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={`${book.title} 표지`}
                style={{ width: "220px", borderRadius: "12px" }}
              />
            ) : (
              <div>표지 없음</div>
            )}

            {/* ✅ 표지 재생성 버튼 → /edit/cover/:id 로 이동 */}
            <button onClick={() => navigate(`/edit/cover/${id}`)}>
              표지 재생성
            </button>
          </div>

          {/* 책 정보 */}
          <div>
            <h2>{book.title}</h2>
            <p>저자: {book.author}</p>
            <p>
              장르:{" "}
              {Array.isArray(book.genre)
                ? book.genre.join(", ")
                : book.genre}
            </p>
            <p>등록일: {book.createdAt}</p>
            <p>수정일: {book.updatedAt}</p>
            <p>{book.content}</p>
          </div>

        </div>

      </section>
    </main>
  );
}

export default BookDetailPage;