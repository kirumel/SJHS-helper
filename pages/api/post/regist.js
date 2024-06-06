import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../../../util/sendemail";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name, nickname, handle } = req.body;

    if (!email || !password || !name || !nickname) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요" });
    }

    const generateToken = () => {
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);
      return { token, expires };
    };

    const { token, expires } = generateToken();

    try {
      await sendVerificationEmail(email, expires, token);

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.unverifiedUser.create({
        data: {
          email,
          password: hashedPassword,
          name,
          nickname,
          handle,
          token,
          expires,
        },
      });

      res.status(201).json({ message: "이메일에 인증 링크가 발송되었습니다." });
    } catch (error) {
      console.error("회원 가입 중 오류 발생:", error);
      res.status(500).json({ message: "회원 가입 중 오류가 발생했습니다." });
    }
  } else {
    res.status(405).json({ message: "허용되지 않는 메서드입니다." });
  }
}
