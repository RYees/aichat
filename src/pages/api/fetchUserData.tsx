//@ts-nocheck
//import { PrismaClient } from "@prisma/client";
import { prisma } from "~/lib/prisma";

// const prisma = new PrismaClient();
export default async function fetchHistory(req: any, res: any) {
  const { method } = req;

    try{
            const query = req.query;
            const {userId, characterId} = query;

            const data = await prisma.user.findUnique(
                {
                    where: {
                        id: userId,
                    },
                    include: {
                        plan: true
                    },
                }
            )
            res.status(201).json(data);
            console.log("userdata", data);
    }catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}
