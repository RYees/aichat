import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient();
 import { prisma } from "~/lib/prisma";
export default async function submitForm(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const {
                name,        
                description, 
                personality,     
                hobby,          
                story,          
                topic,           
                emoji,
                explicitContent,
                uniqueTopics, 
                avoidTopics,
                audio,
                image,
                // active,
                // voiceid,
                userId
            } = req.body;

            const data = await prisma.character.create({
                data: { 
                    name,        
                    description, 
                    personality,     
                    hobby,          
                    story,          
                    topic,           
                    emoji,
                    explicitContent,
                    uniqueTopics, 
                    avoidTopics,
                    audio,
                    image,
                    // active,
                    // voiceid ,
                    userId                              
                },
            })
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

