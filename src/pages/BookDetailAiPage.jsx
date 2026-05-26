function BookDetailAiPage() {
  return (
    <main className="page book-detail-page">
      <div className="book-detail-header">
        <div className="book-detail-title-group">

          <h1 className="page-title">도서 상세</h1>
          <p className="page-desc">
            도서 정보를 확인하고 AI 표지를 생성할 수 있습니다.
          </p>
        </div>

        <div className="book-detail-actions">
          <button className="btn btn-accent">수정</button>
          <button className="btn btn-danger">삭제</button>
        </div>
      </div>

      <section className="card book-detail-card">
        <div className="cover-box book-detail-cover">표지</div>

        <div className="book-detail-info">
          <h2 className="book-detail-title">어린 왕자</h2>
          <p className="book-detail-author">생텍쥐페리</p>

          <span className="genre-chip">소설</span>

          <p className="book-detail-date">등록일: 2026.05.22</p>

          <p className="book-detail-content">
            어린 왕자는 어른이 되어가며 잊기 쉬운 순수함과 관계의 의미를
            이야기하는 작품입니다. 책을 읽고 느낀 점이나 주요 내용을 이 영역에
            작성하면 됩니다.
          </p>
        </div>
      </section>

      <section className="card ai-cover-card">
        <h2 className="ai-cover-title">AI 표지 생성</h2>
        <p className="ai-cover-desc">
          도서 정보를 기반으로 AI 표지를 생성합니다.
        </p>

        <div className="ai-form-row">
          <input
            className="form-input ai-api-key-input"
            placeholder="API Key를 입력하세요"
          />

          <select className="form-select ai-style-select">
            <option>감성</option>
            <option>판타지</option>
            <option>미니멀</option>
            <option>빈티지</option>
          </select>

          <button className="btn btn-primary">생성</button>
        </div>

        <p className="ai-status">아직 생성된 표지가 없습니다.</p>
        <p className="ai-guide-text">
          생성된 표지는 도서 정보에 반영할 수 있습니다.
        </p>
      </section>
    </main>
  );
}

export default BookDetailAiPage;