// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
//@ts-nocheck
//@ts-ignore
 import { prisma } from "~/lib/prisma";
export default async function handle(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { userId, characterId, planId } = req.body;
            //console.log("chksubsc", req.body);
            const data = await prisma.userPlan.findUnique({
                where:{
                  userId_characterId: {
                    userId: userId,
                    characterId: characterId,
                    //planId: planId                    
                  }                  
                }
            });
           
            //console.log("user", data);
            return res.json(data); 
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}