// src/pages/api/characters.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = req.query.userId as string;
    const characterData = await prisma.character.findMany({
      where: { userId: userId },
    });

    res.json({ characters: characterData });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
