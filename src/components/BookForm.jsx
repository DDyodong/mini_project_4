import { useEffect, useState } from "react";

const DEFAULT_INITIAL_VALUES = {
  title: "",
  author: "",
  genre: [],
  content: "",
  coverImageUrl: "",
};

const GENRE_OPTIONS = ["에세이", "소설", "자기계발", "판타지", "스릴러", "기타"];

function BookForm({
  initialValues = DEFAULT_INITIAL_VALUES,
  submitText = "저장",
  onSubmit,
}) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData({
      title: initialValues.title || "",
      author: initialValues.author || "",
      genre: Array.isArray(initialValues.genre)
        ? initialValues.genre
        : initialValues.genre
        ? [initialValues.genre]
        : [],
      content: initialValues.content || "",
      coverImageUrl: initialValues.coverImageUrl || "",
    });
  }, [
    initialValues.title,
    initialValues.author,
    initialValues.genre,
    initialValues.content,
    initialValues.coverImageUrl,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleGenreChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
        const currentGenres = Array.isArray(prev.genre) ? prev.genre : [];

        return {
        ...prev,
        genre: checked
            ? [...currentGenres, value]
            : currentGenres.filter((genre) => genre !== value),
        };
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.author.trim()) {
      alert("저자를 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (formData.genre.length === 0) {
      alert("장르를 하나 이상 선택해주세요.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>제목</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="도서 제목을 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>저자</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="저자명을 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>장르</label>

        <div className="genre-checkbox-group">
          {GENRE_OPTIONS.map((genre) => (
            <label key={genre} className="genre-checkbox">
              <input
                type="checkbox"
                value={genre}
                checked={formData.genre.includes(genre)}
                onChange={handleGenreChange}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>표지 이미지 URL</label>
        <input
          name="coverImageUrl"
          value={formData.coverImageUrl}
          onChange={handleChange}
          placeholder="이미지 주소를 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>내용</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="도서 설명을 입력하세요"
          rows="6"
        />
      </div>

      <button type="submit" className="submit-button">
        {submitText}
      </button>
    </form>
  );
}

export default BookForm;