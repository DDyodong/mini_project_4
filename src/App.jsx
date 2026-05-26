import { useState } from "react";

import BookListPage from "./pages/BookListPage.jsx";
import BookDetailAiPage from "./pages/BookDetailAiPage.jsx";
import BookRegisterPage from "./pages/BookRegisterPage.jsx";
import BookEditPage from "./pages/BookEditPage.jsx";

function App() {
  const [page, setPage] = useState("register");

  return (
    <>
      <div className="page">
        <div className="button-area button-area-left">
          <button className="btn btn-primary" onClick={() => setPage("list")}>
            도서 목록
          </button>

          <button className="btn btn-primary" onClick={() => setPage("detail")}>
            도서 상세 + AI
          </button>

          <button className="btn btn-primary" onClick={() => setPage("register")}>
            도서 등록
          </button>

          <button className="btn btn-primary" onClick={() => setPage("edit")}>
            도서 수정
          </button>
        </div>
      </div>

      {page === "list" && <BookListPage />}
      {page === "detail" && <BookDetailAiPage />}
      {page === "register" && <BookRegisterPage />}
      {page === "edit" && <BookEditPage />}
    </>
  );
}

export default App;