"use client";
import { useEffect , useState} from "react";

export default function VerifyEmailPage() {

  const [message, setMessage] = useState("");
  
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
          setMessage('이메일 인증이 완료되었습니다');
        } else {
          setMessage("이메일 및 토큰 정보가 없습니다");
        }
      } catch (error) {
        setMessage(" 오류가 발생했습니다");}
    };

    verifyEmail();
  }, []);

  return (
  <div className="dish-display">
    <div className="insert main-container">
      {message}
    </div>
  </div>)
}



