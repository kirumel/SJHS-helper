import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method == "GET") {
    try {
      const attendance = await prisma.attendanceObject.findMany();
      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ message: "데이터를 가져오는데 실패했습니다" });
    }
  }
}
