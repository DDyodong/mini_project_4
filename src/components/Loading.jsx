import Lottie from "lottie-react";
import bookLoading from "../assets/book-loading.json";
import "../styles/Loading.css";

function Loading() {
  return (
    <div className="cover-loading">
      <Lottie
        animationData={bookLoading}
        loop={true}
        className="lottie-book"
      />

      <p>AI 표지를 생성중입니다...</p>
      <span>잠시만 기다려주세요</span>
    </div>
  );
}

export default Loading;