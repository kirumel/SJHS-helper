import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "데이터를 가져오는데 실패했습니다" });
    }
  } else if (req.method === "POST") {
    const { title, content, nickname, author } = req.body;

    if (!title) {
      return res.status(400).json({ message: "이메일을 입력해주세요" });
    }
    if (!content) {
      return res.status(400).json({ message: "비밀번호를 입력해주세요" });
    }
    if (!author) {
      return res.status(400).json({ message: "이름을 입력해주세요" });
    }
    if (!nickname) {
      return res.status(400).json({ message: "닉네임을 설정해주세요" });
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          nickname,
          author,
        },
      });
      res.status(201).json({ message: "성공", post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "오류가 발생했습니다 콘솔을 확인해주세요" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
