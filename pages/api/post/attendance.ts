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

  if (req.method == "POST") {
    try {
      const reqObject = req.body;
      {
        reqObject.map(async (a: any, i: any) => {
          const { name, grade, clss, studentnumber } = a;
          const afterGrade = parseInt(grade, 10);
          const afterclass = parseInt(clss, 10);
          const afterstudentnumber = parseInt(studentnumber, 10);
          console.log(a);
          const createAttendance = await prisma.attendanceObject.create({
            data: {
              name,
              grade: afterGrade,
              class: afterclass,
              studentnumber: afterstudentnumber,
            },
          });
          res.status(200).json(createAttendance);
        });
      }
    } catch (error) {
      res.status(500).json({ message: "ㄴㄴ" });
    }
  }
}
