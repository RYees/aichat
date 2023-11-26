/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
//@ts-nocheck
//import { LLMChain, OpenAI, PromptTemplate } from "langchain"
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChainValues } from "langchain/dist/schema";
import { openaiPresets } from '../../common/openai';

const preset = openaiPresets.openai; 


// const template = `Suppose You have this kind of character and defintion like {context} and answer the following question with sexy tone: {question} with {behavior} behavior.`;

const template = `Suppose You have this kind of character and defintion like {context} and answer the following question with sexy tone: {question} with {behavior} behavior. You will write characters's next reply in a dialogue between you and the user. Do not decide what user says or does. Be proactive, creative, drive the conversation forward. Write at least 3 words, up to 1 paragraph. Always stay in character. Always keep the conversation going. (Repetition is highly discouraged)`;

const davinci = new OpenAI({
  openAIApiKey: "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",
  temperature: 0.9,
});

const prompt = new PromptTemplate({
  template,
  inputVariables: ["question", "context", "behavior"],
});

export default async function handler(
  req: { method: string; body: { context: any; query: any; behavior: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { error?: string; answer?: ChainValues }): any;
        new (): any;
      };
    };
  }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { context, query, behavior  } = req.body;
    console.log(context, query, behavior)

    const llm_chain = new LLMChain({
      prompt,
      llm: davinci,
    });

    console.log('Starting llm_chain.call()');

    const answer = await llm_chain.call({
      question: query,
      context,
      behavior,
    });
    console.log('Finished llm_chain.call()');

    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
