//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let { duration, userId } = req.body;

    // Convert duration to a number
    const durationNumber = parseFloat(duration);

    // Check if duration is a valid number
    if (isNaN(durationNumber)) {
      res.status(400).json({ message: 'Invalid duration' });
      return;
    }

    // Save duration to the database
    await prisma.minute.create({
      data: {
        voiceamt: durationNumber.toString(),
        userId: userId,
      },
    });

    // Get the user's current credit
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Check if user.credit is a valid number
    if (typeof user.credit !== 'number') {
      res.status(400).json({ message: 'Invalid user credit' });
      return;
    }

    // Deduct the duration from the user's credit
    const newCredit = user.credit - durationNumber;

    // Update the user's credit in the database
    await prisma.user.update({
      where: { id: userId },
      data: { credit: newCredit },
    });

    res.status(200).json({ message: 'Duration saved and credit updated' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}