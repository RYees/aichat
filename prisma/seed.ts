/* eslint-disable @typescript-eslint/no-floating-promises */
//@ts-nocheck
import { PrismaClient } from "@prisma/client";
// test

//LIST OF MIN
// const PLAN_LIST = [
//   {
//     id: 1,
//     name: "Starter",
//     description: "with 50 voice messages",
//     priceId: "price_1Ngpi2ErDRhkEd5OWoH71c8M",
//     planprodId: "prod_OTnIqQbqljfCgZ",
//     interval: "month",
//     currency: "usd",
//     price: 15,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 2,
//     name: "Engage",
//     description: "with 120 voice messages",
//     priceId: "price_1NgppGErDRhkEd5Ooy1IFPEp",
//     planprodId: "prod_OTnQ1Sael7svk5",
//     interval: "month",
//     currency: "usd",
//     price: 25,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 3,
//     name: "Ultimate",
//     description: "with 300 voice messages",
//     priceId: "price_1NgpqhErDRhkEd5OrOOGi0E8",
//     planprodId: "prod_OTnRbYlBIdKJ8F",
//     interval: "month",
//     currency: "usd",
//     price: 50,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 4,
//     name: "Starter",
//     description: "with 400 voice messages",
//     priceId: "price_1NgpsxErDRhkEd5OjSjjUxTS",
//     planprodId: "prod_OTnTUzx4TMevMJ",
//     interval: "year",
//     currency: "usd",
//     price: 100,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 5,
//     name: "Engage",
//     description: "with 1000 voice messages",
//     priceId: "price_1NgpvrErDRhkEd5OifivYPc5",
//     planprodId: "prod_OTnWtWjSOcbSqi",
//     interval: "year",
//     currency: "usd",
//     price: 200,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 6,
//     name: "Ultimate",
//     description: "with 2500 voice messages",
//     priceId: "price_1Ngq0TErDRhkEd5OaiLmNuc3",
//     planprodId: "prod_OTnb7OmCJV1EV3",
//     interval: "year",
//     currency: "usd",
//     price: 400,
//     usagetype: "recurring",
//     image: ""
//   }

// ];

//prod test
const PLAN_LIST = [
  {
    id: 1,
    name: "Starter",
    description: "with 50 voice messages",
    priceId: "price_1NjzFUF14KBJQ45zl1keBxZw",
    planprodId: "prod_OX3MITP1zBwNwf",
    interval: "month",
    currency: "usd",
    price: 15,
    usagetype: "recurring",
    image: "",
    voiceMessageLimit: 50
  },
  {
    id: 2,
    name: "Engage",
    description: "with 120 voice messages",
    priceId: "price_1NjzFzF14KBJQ45zxKyapeAY",
    planprodId: "prod_OX3M0IPusmRz9h",
    interval: "month",
    currency: "usd",
    price: 25,
    usagetype: "recurring",
    image: "",
    voiceMessageLimit: 120,
  },
  {
    id: 3,
    name: "Ultimate",
    description: "with 300 voice messages",
    priceId: "price_1NjzGZF14KBJQ45zbzgauxub",
    planprodId: "prod_OX3NNZV0DXycjn",
    interval: "month",
    currency: "usd",
    price: 50,
    usagetype: "recurring",
    image: "",
    voiceMessageLimit: 300,
  },
  {
    id: 4,
    name: "Starter",
    description: "with 400 voice messages",
    priceId: "price_1NjzHRF14KBJQ45zX3nxfHlg",
    planprodId: "prod_OX3OJqfUzgBLu1",
    interval: "year",
    currency: "usd",
    price: 100,
    usagetype: "recurring",
    image: "",
    voiceMessageLimit: 400
  },
  {
    id: 5,
    name: "Engage",
    description: "with 1000 voice messages",
    priceId: "price_1NjzI0F14KBJQ45zoiyhm33Y",
    planprodId: "prod_OX3OeAtrqEHAhR",
    interval: "year",
    currency: "usd",
    price: 200,
    usagetype: "recurring",
    image: "",
    voiceMessageLimit: 1000
  },
  {
    id: 6,
    name: "Ultimate",
    description: "with 2500 voice messages",
    priceId: "price_1NjzITF14KBJQ45zSHvn5nlm",
    planprodId: "prod_OX3PV5JjpM7U9N",
    interval: "year",
    currency: "usd",
    price: 400,
    usagetype: "recurring",
    image: "",
    voiceMessageLimit: 2500
  }

];


// production
// const PLAN_LIST = [
//   {
//     id: 1,
//     name: "Starter",
//     description: "with 50 voice messages",
//     priceId: "price_1NjzL4F14KBJQ45z8KneNQO4",
//     planprodId: "prod_OX3R33S3JTfEFG",
//     interval: "month",
//     currency: "usd",
//     price: 15,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 2,
//     name: "Engage",
//     description: "with 120 voice messages",
//     priceId: "price_1Ng5kVF14KBJQ45zknCrGgJa",
//     planprodId: "prod_OT1oJklsN5PL4L",
//     interval: "month",
//     currency: "usd",
//     price: 25,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 3,
//     name: "Ultimate",
//     description: "with 300 voice messages",
//     priceId: "price_1Ng5krF14KBJQ45z7RFWMm5o",
//     planprodId: "prod_OT1oW5bSoD9yzc",
//     interval: "month",
//     currency: "usd",
//     price: 50,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 4,
//     name: "Starter",
//     description: "with 400 voice messages",
//     priceId: "price_1NiVsoF14KBJQ45zdDRhxeV2",
//     planprodId: "prod_OVWw7ZtThE7SeD",
//     interval: "year",
//     currency: "usd",
//     price: 100,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 5,
//     name: "Engage",
//     description: "with 1000 voice messages",
//     priceId: "price_1NiVtVF14KBJQ45zH2s9SGQp",
//     planprodId: "prod_OVWx0m2OQsRRjy",
//     interval: "year",
//     currency: "usd",
//     price: 200,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 6,
//     name: "Ultimate",
//     description: "with 2500 voice messages",
//     priceId: "price_1NiVvDF14KBJQ45zRlO7215m",
//     planprodId: "prod_OVWzNSbdsm94Lg",
//     interval: "year",
//     currency: "usd",
//     price: 400,
//     usagetype: "recurring",
//     image: ""
//   }

// ];

const prisma = new PrismaClient();

const data = PLAN_LIST.map((plan) => ({
  id: plan.id,
  name: plan.name,
  description: plan.description,
  priceId: plan.priceId,
  planprodId: plan.planprodId,
  interval: plan.interval,
  currency: plan.currency,
  price: plan.price,
  usagetype: plan.usagetype,
  image: plan.image
}));

async function main() {
  await prisma.plan.createMany({
    data,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

