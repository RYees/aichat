//@ts-nocheck
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
 import { prisma } from "~/lib/prisma";
export default async function fetchuser(req: any, res: any) {
  const { method } = req;

    switch (method) {
        case 'GET':
            const data = await prisma.character.findMany();
          
            res.json(data);
            //console.log("user", data);
            
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
