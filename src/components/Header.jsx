import React from 'react';

import { Link } from 'react-router-dom';
 
const Header = () => {

  return (
<header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #ddd' }}>
<div className="logo">
<Link to="/" style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>

          도서 관리 시스템
</Link>
</div>
<nav>
<Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#666' }}>도서 목록</Link>
<Link to="/create" style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#007bff', padding: '8px 12px', borderRadius: '4px' }}>새 도서 등록</Link>
</nav>
</header>

  );

};
 
export default Header;
 