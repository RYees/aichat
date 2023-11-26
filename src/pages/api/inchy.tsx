// the inchy api as a service work in progress
//@ts-nocheck

import { PrismaClient } from "@prisma/client";
// import { OpenAI, PromptTemplate } from "langchain";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import axios from 'axios';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P, { apiVersion: '2020-08-27' });

const template = `Suppose You have this kind of character and defintion like {context} and answer the following question with sexy tone: {question} with {behavior} behavior.`;

const davinci = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const prompt = new PromptTemplate({
  template,
  inputVariables: ["question", "context", "behavior"],
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, personality, hobby, story, topic, emoji, audio, image, voiceid, active, userId } = req.body;

    const character = await prisma.character.create({
      data: {
        name,
        description,
        personality,
        hobby,
        story,
        topic,
        emoji,
        audio,
        image,
        voiceid,
        active,
        userId
      },
    });

    return res.status(201).json(character);
  }

  if (req.method === "GET") {
    const characters = await prisma.character.findMany();
    return res.status(200).json(characters);
  }

  if (req.method === "PUT") {
    const { id, ...data } = req.body;
    const character = await prisma.character.update({
      where: { id },
      data,
    });

    return res.status(200).json(character);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const character = await prisma.character.delete({
      where: { id },
    });

    return res.status(200).json(character);
  }

  if (req.method === "PATCH") {
    const { id, query, context, behavior } = req.body;

    const llm_chain = new LLMChain({
      prompt,
      llm: davinci,
    });

    const answer = await llm_chain.call({
      question: query,
      context,
      behavior,
    });

    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': process.env.PAID_ELEVEN_API_KEY,
        'accept': 'application/json'
      }
    });

    const character = await prisma.character.update({
      where: { id },
      data: {
        text: answer.text,
        audio: response.data.audio,
      },
    });

    const usageRecord = await stripe.usageRecords.create({
      quantity: 1,
      timestamp: 'now',
      action: 'increment',
    });

    return res.status(200).json({ character, usageRecord });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
