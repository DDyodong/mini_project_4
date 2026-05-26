import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, updateBook } from "@/api/bookApi";
import BookForm from "@/components/BookForm";

function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setInitialValues(data);
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

  const handleEdit = async (formData) => {
    try {
      // 수정 저장 후 표지 생성 페이지로 자동 이동
      await updateBook(id, { ...formData, coverImageUrl: formData.coverImageUrl || "" });
      console.log("도서가 수정되었습니다.");
      navigate(`/edit/cover/${id}`);
    } catch (error) {
      console.error(error);
      alert("도서 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) return <p>불러오는 중...</p>;
  if (!initialValues) return <p>도서를 찾을 수 없습니다.</p>;

  return (
    <main>
      <section>
        <h2>도서 수정 (1단계)</h2>
        <p>기존 정보를 불러온 뒤 변경된 필드만 저장합니다.</p>

        <BookForm
          initialValues={initialValues}
          submitText="수정 후 표지 생성 →"
          onSubmit={handleEdit}
        />

        <button type="button" onClick={() => navigate(`/books/${id}`)}>
          취소
        </button>
      </section>
    </main>
  );
}

export default BookEditPage;