import { useNavigate } from "react-router";
import { createBook } from "../api/bookApi";
import BookForm from "../components/BookForm";

function BookCreatePage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createBook(formData);
      console.log("도서가 성공적으로 등록되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      console.log("도서 등록에 실패했습니다.");
      alert("도서 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main>
      <section>
        <h2>새 도서 등록</h2>
        <p>제목, 작가명, 내용을 입력해 새 작품을 등록합니다.</p>

        <BookForm submitText="저장" onSubmit={handleCreate} />

        <button type="button" onClick={() => navigate("/")}>
          취소
        </button>
      </section>
    </main>
  );
}

export default BookCreatePage;