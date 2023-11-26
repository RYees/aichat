import { prisma } from "~/lib/prisma";
export default async function handle(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case "POST":
      const query = req.query;
      const { userId, characterId } = query;
      const data = await prisma.userPlan.findMany({
        where: {
          userId: userId.toString(),
          characterId: {
            equals: parseInt(characterId),
          },
        },
      });

      //console.log("subscription", data);
      return res.json(data);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
