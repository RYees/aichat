// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import { prisma } from "~/lib/prisma";
export default async function handle(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { userId, characterId } = req.body;
            //console.log("chksubsc", req.body);
            const data = await prisma.userPlan.findMany({
                where:{                  
                    userId: userId,
                    characterId: characterId,
                    status: 'active'                 
                }
            });
           
            //console.log("subscription", data);
            return res.json(data); 
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}