function BookEditPage() {
  return (
    <div>
      <header>
        <h1>걷기가 서재</h1>

        <nav>
          <a href="/">도서 목록</a>
          <a href="/books/new">등록</a>
          <button>새 글</button>
        </nav>
      </header>

      <main>
        <section>
          <h2>도서 수정</h2>
          <p>기존 정보를 불러온 뒤 변경된 필드만 저장합니다.</p>

          <form>
            <div>
              <div>
                <div>현재 표지</div>
              </div>

              <p>표지는 상세 페이지의 AI 생성 영역에서 변경</p>
            </div>

            <div>
              <label htmlFor="title">도서 제목 *</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="별빛 아래의 서점"
              />
            </div>

            <div>
              <label htmlFor="author">작가명 *</label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="genre">장르</label>
              <input
                id="genre"
                name="genre"
                type="text"
                placeholder="에세이"
              />
            </div>

            <div>
              <label htmlFor="content">도서 내용 *</label>
              <textarea
                id="content"
                name="content"
                placeholder="작은 마을 서점의 1년을 담은 에세이..."
              />
            </div>

            <div>
              <button type="submit">수정 저장</button>
              <button type="button">취소</button>
            </div>
          </form>

          <p>PATCH /books/:id, updatedAt 갱신, 저장 후 상세 페이지 이동</p>
        </section>
      </main>
    </div>
  );
}

export default BookEditPage;