import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, patchBook } from "../api/bookApi";
import Loading from "../components/Loading";

function BookCoverPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [extraPrompt, setExtraPrompt] = useState("");

  // idle | loading | done | error
  const [status, setStatus] = useState("idle");

  const [generatedUrl, setGeneratedUrl] = useState("");

  // 책 정보 불러오기
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error(error);
        alert("도서 정보를 불러오지 못했습니다.");
        navigate("/");
      }
    };

    fetchBook();
  }, [id, navigate]);

  // OpenAI 이미지 생성
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      alert("API Key를 입력해주세요.");
      return;
    }

    setStatus("loading");
    setGeneratedUrl("");

    const prompt = `Book cover for "${book.title}" by ${
      book.author
    }. Genre: ${
      Array.isArray(book.genre)
        ? book.genre.join(", ")
        : book.genre
    }. Description: ${book.content}${
      extraPrompt.trim()
        ? `. Additional style: ${extraPrompt}`
        : ""
    }`;

    try {
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("이미지 생성에 실패했습니다.");
      }

      const data = await res.json();
      const imageUrl = data.data[0].url;

      setGeneratedUrl(imageUrl);
      setStatus("done");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // 이미지 저장
  const handleSave = async () => {
    try {
      await patchBook(id, {
        coverImageUrl: generatedUrl,
      });

      navigate(`/books/${id}`);
    } catch (error) {
      console.error(error);
      alert("표지 저장에 실패했습니다.");
    }
  };

  // 건너뛰기
  const handleSkip = () => {
    const confirmed = window.confirm(
      "표지 이미지 없이 저장하시겠습니까?\n나중에 상세 페이지에서 다시 생성할 수 있습니다."
    );

    if (confirmed) {
      navigate(`/books/${id}`);
    }
  };

  if (!book) {
    return <p>불러오는 중...</p>;
  }

  return (
    <main>
      <section>
        <h2>
          {mode === "edit"
            ? "도서 수정 (2단계)"
            : "새 도서 등록 (2단계)"}
          {" "}— 표지 생성
        </h2>

        <p>
          <strong>{book.title}</strong>의
          표지를 AI로 생성합니다.
        </p>

        {/* API KEY */}
        <div>
          <label htmlFor="apiKey">
            OpenAI API Key
          </label>

          <input
            id="apiKey"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) =>
              setApiKey(e.target.value)
            }
          />
        </div>

        {/* 추가 프롬프트 */}
        <div>
          <label htmlFor="extraPrompt">
            추가 프롬프트 (선택)
          </label>

          <textarea
            id="extraPrompt"
            placeholder="ex) 수채화풍, 따뜻한 색감, 판타지 분위기"
            value={extraPrompt}
            onChange={(e) =>
              setExtraPrompt(e.target.value)
            }
            rows={3}
            style={{
              width: "100%",
              resize: "vertical",
            }}
          />
        </div>

        {/* 생성 버튼 */}
        <button
          onClick={handleGenerate}
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "생성 중..."
            : "표지 생성"}
        </button>

        {/* 미리보기 영역 */}
        <div style={{ marginTop: "24px" }}>
          {/* idle */}
          {status === "idle" && (
            <div>
              <p>
                표지를 생성하면 이곳에
                미리보기가 표시됩니다.
              </p>
            </div>
          )}

          {/* loading */}
          {status === "loading" && (
            <Loading />
          )}

          {/* error */}
          {status === "error" && (
            <p>
              ❌ 생성에 실패했습니다.
              API Key와 네트워크를 확인해주세요.
            </p>
          )}

          {/* done */}
          {status === "done" &&
            generatedUrl && (
              <div>
                <p>✅ 생성 완료!</p>

                <img
                  src={generatedUrl}
                  alt="생성된 표지"
                  style={{
                    width: "220px",
                    borderRadius: "12px",
                    marginTop: "16px",
                  }}
                />

                <div
                  style={{
                    marginTop: "16px",
                  }}
                >
                  <button onClick={handleSave}>
                    이 표지로 저장
                  </button>
                </div>
              </div>
            )}
        </div>

        {/* 건너뛰기 */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSkip}>
            건너뛰기
          </button>
        </div>
      </section>
    </main>
  );
}

export default BookCoverPage;