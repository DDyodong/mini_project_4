function BookRegisterPage() {
  return (
    <main className="page page-narrow book-register-page">
      <div className="page-header">
        <h1 className="page-title">도서 등록</h1>
        <p className="page-desc">새로운 도서 정보를 입력해주세요.</p>
      </div>

      <form className="form book-register-form">
        <p className="book-register-guide">
          읽은 책의 제목, 저자, 장르, 설명을 입력해주세요.
        </p>

        <div className="form-group">
          <label className="form-label" htmlFor="title">
            도서 제목
          </label>
          <input
            id="title"
            className="form-input"
            type="text"
            placeholder="도서 제목을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="author">
            저자
          </label>
          <input
            id="author"
            className="form-input"
            type="text"
            placeholder="저자명을 입력하세요"
          />
        </div>

        <div className="book-register-row">
          <div className="form-group">
            <label className="form-label" htmlFor="genre">
              장르
            </label>
            <input
              id="genre"
              className="form-input"
              type="text"
              placeholder="장르를 입력하세요"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">
              등록일
            </label>
            <input id="date" className="form-input" type="date" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            도서 설명
          </label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="도서 설명을 입력하세요"
          ></textarea>
        </div>

        <p className="form-error">필수 입력 항목을 모두 작성해주세요.</p>

        <div className="form-actions book-register-actions">
          <button className="btn btn-cancel" type="button">
            취소
          </button>
          <button className="btn btn-primary" type="submit">
            저장
          </button>
        </div>
      </form>
    </main>
  );
}

export default BookRegisterPage;