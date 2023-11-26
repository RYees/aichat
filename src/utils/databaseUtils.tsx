//@ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCharacterNameFromDatabase(stripeAccountId) {
  // Fetch the character record from your database using the Stripe account ID
  const character = await prisma.character.findFirst({ where: { stripeAccountId: stripeAccountId } });

  // Return the character's name
  return character ? character.name : null;
}