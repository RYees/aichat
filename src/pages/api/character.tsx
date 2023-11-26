// src/pages/api/character.tsx

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const currentCharacter =
      typeof req.query.character === "string" ? req.query.character : null;
    const userId = req.query.userId as string;
    const characterName = req.query.characterName as string;
    console.log("testpara", userId, characterName, req.query)
    const characterData = await prisma.character.findFirst({
      where: {
        name: characterName,
        // userId: userId,
      },
    });

    const planData = await prisma.plan?.findMany();

    res.json({ character: characterData, plan: planData });
  } else if (req.method === "POST") {
    const { userId, stripeAccountId, stripeAccountLink, characterId } =
      req.body;
    // Check if characterId is undefined
    if (!characterId) {
      return res.status(400).json({ message: "characterId is required" });
    }
    if (stripeAccountId && stripeAccountLink) {
      // Update the Character record with the Stripe account ID
      const updatedCharacter = await prisma.character.update({
        where: { id: characterId },
        data: {
          stripeAccountId: stripeAccountId,
          stripeAccountLink: stripeAccountLink,
        },
      });

      res.json(updatedCharacter);
    } else {
      const characterData = await prisma.character.findFirst({
        where: { userId: userId },
      });

      res.json(characterData);
    }
  } else if (req.method === "PUT") {
    const {
      userId,
      stripeAccountId,
      stripeAccountLink,
      stripeAccountLinkExpiresAt,
      characterId,
    } = req.body;

    if (!characterId) {
      return res.status(400).json({ message: "characterId is required" });
    }

    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: {
        stripeAccountId: stripeAccountId,
        stripeAccountLink: stripeAccountLink,
        stripeAccountLinkExpiresAt: stripeAccountLinkExpiresAt,
      },
    });

    res.json(updatedCharacter);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
