"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function cafe() {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
    setIsLoading(false);
  }, []);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>게시판</h1>
      <Link href="/write">새 글 쓰기</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/${post.id}`}>
              <div>{post.title}</div>
              <div>{post.nickname}</div>
              <div>{post.createdAt}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
