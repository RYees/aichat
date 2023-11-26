//@ts-nocheck
//import { PrismaClient } from "@prisma/client";
 import { prisma } from "~/lib/prisma";

// const prisma = new PrismaClient();
export default async function fetchHistory(req: any, res: any) {
  const { method } = req;

    // switch (method) {
    //     case 'GET':
    try{
            const query = req.query;
            const {userId, characterId} = query;
            //console.log("ui", userId, "cht", characterId);

            const data = await prisma.characterChat.findMany({
                where: {
                //userId_characterId: {
                    userId: userId,
                    characterId: parseInt(characterId)
                //}
                },
            })
          
            res.status(201).json(data);
            //console.log("user", data);
            
        //     break;
        // default:
        //     res.status(405).end(`Method ${method} Not Allowed`)
    }catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}
