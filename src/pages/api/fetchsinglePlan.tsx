//@ts-nocheck
//import { PrismaClient } from "@prisma/client";
import { trueDependencies } from "mathjs";
import { prisma } from "~/lib/prisma";

// const prisma = new PrismaClient();
export default async function fetchHistory(req: any, res: any) {
  const { method } = req;

    // switch (method) {
    //     case 'GET':
    try{
            const query = req.query;
            const {userId, characterId} = req.body;
   
            const data = await prisma.userPlan.findUnique({
              where:{
                userId_characterId:{
                  userId: userId,
                  characterId: parseInt(characterId)
                  // planId: planId
                }
              }
              })

            const result = await prisma.userPlan.findMany({
                where: {
                    AND: [
                      {userId}, 
                      {characterId},
                      {planId: data?.planId}
                    ]
                  },
                  include: {
                    user: true,
                    plan: true
                  }
              })
              res.status(201).json(result);
              //console.log("user", result);
            
    }catch (err:any) {
       console.log("error", err)
        //res.status(500).json({ message: err.message })
        
    }
}
