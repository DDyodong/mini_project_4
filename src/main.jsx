import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/common.css';

import './styles/components/button.css';
import './styles/components/modal.css';
import './styles/components/form.css';
import './styles/components/card.css';

import './styles/pages-css/book_list_page.css';
import './styles/pages-css/book_detail_ai_page.css';
import './styles/pages-css/book_register_page.css';
import './styles/pages-css/book_edit_page.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);