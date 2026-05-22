import { useState } from "react";
import Loading from "../components/Loading";

function BookCreatePage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <header>
        <h1>걷기가 서재</h1>

        <nav>
          <a href="/">도서 목록</a>
          <a href="/books/create">등록</a>
          <button>새 글</button>
        </nav>
      </header>

      <main>
        <section>
          <h2>새 도서 등록</h2>
          <p>제목, 작가명, 내용을 입력해 새 작품을 등록합니다.</p>

          {/* AI 표지 미리보기 영역 */}
          <div>
            <h3>AI 표지 미리보기</h3>

            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <div>
                  <p>아직 생성된 표지가 없습니다.</p>
                </div>
              )}
            </div>

            <button type="button" onClick={() => setIsLoading(!isLoading)}>
              로딩 테스트
            </button>
          </div>

          <form>
            <div>
              <label htmlFor="title">도서 제목 *</label>
              <input
                id="title"
                type="text"
                placeholder="예: 별빛 아래의 서점"
              />
            </div>

            <div>
              <label htmlFor="author">작가명 *</label>
              <input
                id="author"
                type="text"
                placeholder="예: 홍길동"
              />
            </div>

            <div>
              <label htmlFor="genre">장르</label>
              <input
                id="genre"
                type="text"
                placeholder="에세이 / 소설 / 자기계발 / 기타"
              />
            </div>

            <div>
              <label htmlFor="content">도서 내용 *</label>
              <textarea
                id="content"
                placeholder="AI 표지 생성 프롬프트에 활용될 핵심 내용입니다."
              />
            </div>

            <p>유효성: 제목/작가명/내용 공백 금지</p>

            <div>
              <button type="button" onClick={() => setIsLoading(true)}>
                AI 표지 생성
              </button>

              <button type="submit">저장</button>
              <button type="button">취소</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default BookCreatePage;