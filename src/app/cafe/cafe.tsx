"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./cafe.css";

interface Post {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: Date;
}

export default function Cafe() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/post/posts")
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="video-container">
        <video className="로딩" src="/로딩.mp4" autoPlay muted loop></video>
      </div>
    );
  }

  return (
    <>
      {posts.length > 0 && (
        <>
          {posts.map((post: Post) => {
            const postDate = new Date(post.createdAt);
            const today = new Date();
            const isToday = postDate.toDateString() === today.toDateString();
            const isSameYear = postDate.getFullYear() === today.getFullYear();

            let formattedDate;
            if (isToday) {
              formattedDate = `오늘 ${postDate.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            } else if (isSameYear) {
              formattedDate = postDate.toLocaleDateString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
            } else {
              formattedDate = postDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
            }

            return (
              <Link
                className=" display-flex"
                href={`../posts/${post.id}`}
                key={post.id}
              >
                <div className="padding1">
                  <h3 className="cafe-post-title">{post.title}</h3>
                  <img className="cafe-insta-img" src="/logofull.jpg"></img>
                  <div>{post.nickname}</div>
                  <div>{formattedDate}</div>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </>
  );
}
