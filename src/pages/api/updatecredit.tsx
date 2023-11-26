// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();
// import { prisma } from "~/lib/prisma";
// export default async function updateCredit(req:any, res:any) {
//     const { method } = req;

//     switch (method) {
//         case 'POST':
//             const query = req.query;
//             const { id } = query;
//             const {userId, characterId} = query;
//             console.log("ueei", userId, "chtee", characterId);
//             //const user = await prisma.user.findMany();
//             const userbalance = await prisma.userBalance.findUnique({
//               where: {
//                 userId_characterId: {
//                   userId: userId, 
//                   characterId: parseInt(characterId)
//                 }  
//               }
//             })
//             console.log("potential", userbalance);
            
//             if(userbalance && userbalance.balance - 1 >= 0){
//               const data =  await prisma.userBalance.update({
//                   where: { 
//                     userId_characterId: {
//                       userId: userId, 
//                       characterId: parseInt(characterId),
//                     }
//                   },
//                   data: {
//                     balance: { decrement: 1 }  
//                   } 
//                 })
            
//               res.status(201).json(data);
//               console.log("user", data);
//               return userbalance.balance;

//             } else if(userbalance && userbalance.balance - 1 < 0) {
//               const data =  await prisma.userBalance.update({
//                 where: { 
//                   userId_characterId: {
//                     userId: userId, 
//                     characterId: parseInt(characterId),
//                   }
//                 },
//                 data: {
//                   balance: 0  
//                 } 
//               })
          
//               res.status(201).json(data);
//               console.log("user", data);
//               return userbalance.balance;
//             }
//             break;
//         default:
//             res.status(405).end(`Method ${method} Not Allowed`)
//     }
// }