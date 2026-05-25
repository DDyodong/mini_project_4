import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import BookDetailPage from '../pages/BookDetailPage';
import BookCreatePage from '../pages/BookCreatePage';
import BookEditPage from '../pages/BookEditPage';
import BookCoverPage from '../pages/BookCoverPage'; // ✅ 추가

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ minHeight: '70vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<BookCreatePage />} />
          <Route path="/create/cover/:id" element={<BookCoverPage mode="create" />} /> {/* ✅ 추가 */}
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/edit/:id" element={<BookEditPage />} />
          <Route path="/edit/cover/:id" element={<BookCoverPage mode="edit" />} /> {/* ✅ 추가 */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;