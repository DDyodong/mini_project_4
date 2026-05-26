function BookEditPage() {
  return (
    <main className="page book-edit-page">
      <div className="page-header">
        <h1 className="page-title">도서 수정</h1>
        <p className="page-desc">등록된 도서 정보를 수정할 수 있습니다.</p>
      </div>

      <section className="card book-edit-layout">
        <div className="book-edit-cover-area">
          <div className="cover-box book-edit-current-cover">현재 표지</div>
          <p className="book-edit-cover-text">
            현재 등록된 도서 표지입니다.
          </p>
        </div>

        <div className="book-edit-form-area">
          <p className="book-edit-notice">
            수정 후 저장 버튼을 누르면 변경사항이 반영됩니다.
          </p>

          <form className="book-edit-form">
            <div className="form-group">
              <label className="form-label">도서 제목</label>
              <input className="form-input" defaultValue="어린 왕자" />
            </div>

            <div className="book-edit-row">
              <div className="form-group">
                <label className="form-label">저자</label>
                <input className="form-input" defaultValue="생텍쥐페리" />
              </div>

              <div className="form-group">
                <label className="form-label">장르</label>
                <input className="form-input" defaultValue="소설" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">도서 설명</label>
              <textarea
                className="form-textarea"
                defaultValue="어린 왕자는 관계의 의미와 순수함을 이야기하는 작품입니다."
              ></textarea>
            </div>

            <div className="form-actions book-edit-actions">
              <button className="btn btn-cancel" type="button">
                취소
              </button>
              <button className="btn btn-primary" type="submit">
                수정하기
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default BookEditPage;