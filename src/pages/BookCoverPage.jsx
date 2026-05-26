import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "@/api/bookApi";
import BookCover from "@/components/BookCover";
import Loading from "@/components/Loading";

const MAX_STORED_COVER_BYTES = 88 * 1024;

function buildPrompt(book) {
  const genres = Array.isArray(book.genre) ? book.genre.join(", ") : book.genre;
  return [
    `Create a compelling Korean book cover for "${book.title}" by ${book.author}.`,
    `Genre: ${genres}.`,
    `Story concept: ${book.content}`,
    "Portrait book cover composition, refined typography space, no readable text, atmospheric lighting, professional publishing design.",
  ].join("\n");
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("표지 이미지를 저장용으로 변환하지 못했습니다."));
    image.src = dataUrl;
  });
}

async function optimizeCoverForStorage(dataUrl) {
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("이 브라우저에서는 이미지 저장 처리를 지원하지 않습니다.");
  }

  let width = 420;
  let optimizedImage = "";

  while (width >= 180) {
    canvas.width = width;
    canvas.height = Math.round(width * (image.height / image.width));
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (let quality = 0.82; quality >= 0.34; quality -= 0.08) {
      optimizedImage = canvas.toDataURL("image/jpeg", quality);
      if (new Blob([optimizedImage]).size <= MAX_STORED_COVER_BYTES) {
        return optimizedImage;
      }
    }

    width = Math.round(width * 0.8);
  }

  return optimizedImage;
}

function BookCoverPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await getBookById(id);
        setBook(data);
        setPrompt(buildPrompt(data));
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadBook();
  }, [id]);

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("OpenAI API Key를 입력해주세요.");
      return;
    }
    if (!prompt.trim()) {
      setError("표지 생성 프롬프트를 입력해주세요.");
      return;
    }

    try {
      setStatus("loading");
      setGeneratedUrl("");
      setError("");

      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt: prompt.trim(),
          n: 1,
          size: "1024x1536",
          quality: "medium",
          output_format: "png",
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error?.message || "표지 이미지 생성에 실패했습니다.");
      }

      const result = await response.json();
      const base64Image = result.data?.[0]?.b64_json;
      if (!base64Image) throw new Error("생성된 이미지 데이터를 받지 못했습니다.");

      setGeneratedUrl(`data:image/png;base64,${base64Image}`);
      setStatus("done");
    } catch (generateError) {
      setError(generateError.message);
      setStatus("error");
    }
  };

  const handleSave = async () => {
    if (!generatedUrl) return;

    try {
      setSaving(true);
      setError("");
      const optimizedCover = await optimizeCoverForStorage(generatedUrl);
      await updateBook(id, { coverImageUrl: optimizedCover });
      navigate(`/books/${id}`);
    } catch (saveError) {
      setError(saveError.message);
      setSaving(false);
    }
  };

  if (!book && !error) return <div className="container page-state">도서 정보를 불러오는 중입니다.</div>;
  if (!book) {
    return (
      <div className="container page-state error">
        <p>{error}</p>
        <Link className="button button-secondary" to="/">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <section className="container page-section cover-generator">
      <div className="page-heading">
        <p className="eyebrow">{mode === "create" ? "STEP 2 OF 2" : "NEW COVER"}</p>
        <h1>{mode === "create" ? "AI 표지를 생성해 등록을 완료하세요" : "AI 표지 재생성"}</h1>
        <p>{book.title} - {book.author}</p>
      </div>

      <div className="generator-layout">
        <div className="panel prompt-panel">
          <label className="field">
            <span>OpenAI API Key <strong>필수</strong></span>
            <input
              type="password"
              autoComplete="off"
              placeholder="sk-..."
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
            />
            <small className="field-help">입력한 키는 브라우저에 저장되지 않습니다.</small>
          </label>
          <label className="field">
            <span>표지 생성 프롬프트 <strong>수정 가능</strong></span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows="13"
            />
          </label>
          {error && <p className="form-message error">{error}</p>}
          <button className="button button-primary button-wide" onClick={handleGenerate} disabled={status === "loading"}>
            {status === "loading" ? "표지를 생성하는 중..." : generatedUrl ? "다시 생성하기" : "AI 표지 생성하기"}
          </button>
          {mode === "edit" && (
            <Link className="button button-ghost button-wide" to={`/books/${id}`}>
              기존 표지 유지하고 돌아가기
            </Link>
          )}
        </div>

        <div className="panel preview-panel">
          <h2>표지 미리보기</h2>
          {status === "loading" && <Loading />}
          {status !== "loading" && generatedUrl && (
            <>
              <img className="generated-cover" src={generatedUrl} alt={`${book.title} 생성 표지 미리보기`} />
              <p className="preview-guide">
                저장 시 로컬 데이터 서버에 맞게 표지 이미지를 자동 최적화합니다.
              </p>
              <button className="button button-accent button-wide" onClick={handleSave} disabled={saving}>
                {saving ? "표지를 저장하는 중..." : "이 표지로 저장하기"}
              </button>
            </>
          )}
          {status !== "loading" && !generatedUrl && (
            <>
              <BookCover book={book} className="generated-cover preview-empty" />
              <p className="preview-guide">
                프롬프트를 다듬고 표지를 생성하면 결과를 저장하기 전에 확인할 수 있습니다.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookCoverPage;
