//@ts-nocheck
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import { prisma } from "~/lib/prisma";
export default async function submitForm(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { sender, text, userId, characterId, answeraudio } = req.body;

      console.log(req.body);

      const data = await prisma.characterChat.create({
        data: {
          sender,
          text,
          userId,
          characterId,
          answeraudio: answeraudio || "null",
        },
      });
      res.status(201).json(data);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
