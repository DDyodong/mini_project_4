function BookListPage() {
  return (
    <main className="page book-list-page">
      <div className="page-header">
        <h1 className="page-title">도서 목록</h1>
        <p className="page-desc">등록된 도서를 확인할 수 있습니다.</p>
      </div>

      <div className="book-list-top-bar">
        <input
          className="form-input book-list-search"
          placeholder="도서명을 검색하세요"
        />

        <button className="btn btn-primary">검색</button>
        <button className="btn btn-accent">도서 등록</button>
      </div>

      <div className="book-list-grid">
        <article className="book-card">
          <div className="book-card-cover">표지</div>
          <span className="genre-chip">소설</span>
          <h3 className="book-card-title">어린 왕자</h3>
          <p className="book-card-meta">생텍쥐페리 · 2026.05.22</p>
        </article>

        <article className="book-card">
          <div className="book-card-cover">표지</div>
          <span className="genre-chip">에세이</span>
          <h3 className="book-card-title">기록의 쓸모</h3>
          <p className="book-card-meta">이승희 · 2026.05.22</p>
        </article>

        <article className="book-card">
          <div className="book-card-cover">표지</div>
          <span className="genre-chip">자기계발</span>
          <h3 className="book-card-title">아주 작은 습관의 힘</h3>
          <p className="book-card-meta">제임스 클리어 · 2026.05.22</p>
        </article>
      </div>
    </main>
  );
}

export default BookListPage;