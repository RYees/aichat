//@ts-nocheck
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// // import { prisma } from "~/lib/prisma";
// export default async function fetchuser(req:any, res:any) {
//     //const { method } = req;

//     // switch (method) {
//     //     case 'GET':
//     try{
//             const query = req.query;
//             // const { id } = query;
//             const {userId, characterId} = query;
//             //console.log("ui", userId, "cht", characterId);
//             //const yell = await prisma.user.findMany();

//             const data = await prisma.userBalance.findUnique({
//                 where: {
//                 userId_characterId: {
//                     userId: userId,
//                     characterId: parseInt(characterId)
//                 }
//                 },
//             })
          
//             res.status(201).json(data);
//             //console.log("user", data);
            
//         //     break;
//         // default:
//         //     res.status(405).end(`Method ${method} Not Allowed`)
//     } catch (err:any) {
//         res.status(500).json({ message: err.message })
//       }
// }





import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract the user ID from the request body
  const { userId } = req.body;

  try {
    // Fetch the user's current plan
    const userPlan = await prisma.userPlan.findFirst({
      where: {
        userId: userId,
        status: 'active'
      },
      include: {
        plan: true
      }
    });

    // Fetch the user's message count
    const userMessage = await prisma.userMessage.findUnique({
      where: {
        userId: userId
      }
    });

    // Return the user's current plan and message count
    res.status(200).json({
      plan: userPlan?.plan,
      messageCount: userMessage?.messageCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}