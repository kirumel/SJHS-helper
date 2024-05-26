export default async function Write() {
  return (
    <div className="p-20">
      <div>
        <form action="/api/post/regist" method="POST">
          <input name="email" placeholder="이메일" />
          <input name="password" placeholder="비밀번호" />
          <input name="name" placeholder="이름" />
          <input name="nickname" placeholder="닉네임" />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}
