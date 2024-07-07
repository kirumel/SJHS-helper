export default async function Write() {
  return (
    <div className="p-20">
      <div>
        <form action="/api/post/posts" method="POST">
          <input name="title" placeholder="글제목" />
          <input name="content" placeholder="글내용" />
          <input name="author" value="기본값" style={{ display: "none" }} />
          <input name="nickname" value="기본값" style={{ display: "none" }} />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}
