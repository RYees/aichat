// src/pages/api/checkName.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const name = req.query.name;
  const character = await prisma.character?.findFirst({
    where: {
        name: {
            equals: name as string,
            mode: 'insensitive', // This makes the comparison case-insensitive
          },
    },
  });

  res.json({ exists: !!character });
}