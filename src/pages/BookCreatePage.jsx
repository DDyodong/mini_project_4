import { useNavigate } from "react-router-dom";
import { createBook } from "@/api/bookApi";
import BookForm from "@/components/BookForm";

function BookCreatePage() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const newBook = await createBook({ ...formData, coverImageUrl: "" });
      console.log("도서가 임시 저장되었습니다.");

      navigate(`/create/cover/${newBook.id}`);
    } catch (error) {
      console.error(error);
      alert("도서 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main>
      <section>
        <h2>새 도서 등록 (1단계)</h2>
        <p>제목, 작가명, 내용을 입력해 새 작품을 등록합니다.</p>

        <BookForm submitText="저장 후 표지 생성 →" onSubmit={handleCreate} />

        <button type="button" onClick={() => navigate("/")}>
          취소
        </button>
      </section>
    </main>
  );
}

export default BookCreatePage;