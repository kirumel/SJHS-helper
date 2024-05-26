"use client";
import { useEffect } from "react";

const VerifyEmailPage = () => {
  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const email = queryParams.get("email");
      const token = queryParams.get("token");

      if (!email || !token) {
        console.error("이메일 및 토큰 정보가 없습니다.");
        return;
      }

      try {
        const response = await fetch(
          `/api/verify-email?email=${email}&token=${token}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("이메일 인증 성공:", data);
        } else {
          throw new Error("이메일 인증 실패");
        }
      } catch (error) {
        console.error("이메일 인증 요청 중 오류 발생:", error);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div>
      <p>이메일 인증을 진행 중입니다...</p>
    </div>
  );
};

export default VerifyEmailPage;
