// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
 import { prisma } from "~/lib/prisma";
export default async function updateCredit(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':            
            const {userId, characterId, planId, status} = req.body;
            //console.log("ui", userId, "chi", characterId, "plan", planId, "status", status);
               
              const data =  await prisma.userPlan.update({
                    where: {
                      userId_characterId: {
                        userId,
                        characterId                
                      }
                    },
                    data: {
                      status: status  
                    } 
                })       
                
              // const data = await prisma.userPlan.update({
              //     where: {
              //       userId_planId_characterId: {
              //           userId: "cllr0xmkt0000vai0dkhkjzf1",
              //           planId: 2,
              //           characterId: 1
              //       }
              //     },
              //     data: {
              //       planId: 1
              //     },
              //   });
              
            
              
              //console.log("updatesub", data);
              return res.status(201).json(data);
            
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}