const BASE_URL = "http://localhost:4000/books";

// 한국 시간으로 저장.
const getKoreaTime = () => {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  return koreaTime.toISOString().replace("Z", "+09:00");
};


// 전체 책 목록 조회
export async function getBooks() {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("책 목록을 불러오지 못했습니다.");
  }

  const data = await res.json();
  return data;
}

// 책 상세 조회
export async function getBookById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("책 정보를 불러오지 못했습니다.");
  }

  const data = await res.json();
  return data;
}

// 책 등록
export async function createBook(bookData) {
  const now = getKoreaTime();

  const newBook = {
    ...bookData,
    coverImageUrl: bookData.coverImageUrl || "",
    createdAt: now ,
    updatedAt: now ,
    views: 0,
    likes: 0,
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!res.ok) {
    throw new Error("책 등록에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

// 책 수정
export async function updateBook(id, bookData) {
  const updatedBook = {
    ...bookData,
    updatedAt: getKoreaTime(),
  };

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (!res.ok) {
    throw new Error("책 수정에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

// 책 일부 수정
export async function patchBook(id, bookData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...bookData,
      updatedAt: getKoreaTime(),
    }),
  });

  if (!res.ok) {
    throw new Error("책 수정에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

// 책 삭제
export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("책 삭제에 실패했습니다.");
  }

  return true;
}

// 조회수 증가
export async function increaseViews(id, currentViews) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      views: currentViews + 1,
    }),
  });

  if (!res.ok) {
    throw new Error("조회수 증가에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

// 좋아요 증가
export async function increaseLikes(id, currentLikes) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: currentLikes + 1,
    }),
  });

  if (!res.ok) {
    throw new Error("좋아요 증가에 실패했습니다.");
  }

  const data = await res.json();
  return data;
}