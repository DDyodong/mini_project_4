import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from '../pages/HomePage';
import BookDetailPage from '../pages/BookDetailPage';
import BookCreatePage from '../pages/BookCreatePage';
import BookEditPage from '../pages/BookEditPage';
 
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 홈/목록 화면 */}
        <Route path="/" element={<HomePage />} />
       
        {/* 새 도서 등록 화면 */}
        <Route path="/create" element={<BookCreatePage />} />
       
        {/* 도서 상세 화면 (고유 ID 파라미터 포함) */}
        <Route path="/books/:id" element={<BookDetailPage />} />
       
        {/* 도서 정보 수정 화면 (고유 ID 파라미터 포함) */}
        <Route path="/edit/:id" element={<BookEditPage />} />
      </Routes>
    </BrowserRouter>
  );
};
 
export default AppRouter;