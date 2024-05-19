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
      return res.status(400).json({ message: "제목이 비어있습니다" });
    }
    if (!content) {
      return res.status(400).json({ message: "내용이 비어있습니다" });
    }
    if (!author) {
      return res.status(400).json({ message: "로그인이 필요합니다" });
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
      res.status(500).json({ message: "요청 실패입니다" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
