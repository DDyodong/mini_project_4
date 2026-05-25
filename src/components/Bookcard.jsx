import { Link } from "react-router";

 

function BookCard({ book }) {
  return (
    <Link
        to={`/books/${book.id}`}
        className="book-card"
    >
    <div className="cover-box">
        표지 이미지
    </div>
    <span className="genre-tag">
        {book.genre}
    </span>

    <h3>{book.title}</h3>
    <p>저자: {book.author}</p>
    <small>
        등록일: {book.date}
    </small>
</Link>
  );
}

 

export default BookCard;