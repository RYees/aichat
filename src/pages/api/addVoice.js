import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';
// import { prisma } from "~/lib/prisma";

export default async function addVoice(req, res) {
//   const { xi_api_key, voice_name, description, labels, filename } = req.body;
//   //const file = fs.createReadStream(filename);
//   console.log("alison", req.body);
//   const form = new FormData();
//   form.append('name', voice_name);
//   form.append('description', description);
//   form.append('labels', labels);
//   form.append('files', file, { filename: filename, contentType: 'audio/mpeg' });
  
//   const result = await fetch('https://api.elevenlabs.io/v1/voices/add', {
//     method: 'POST',
//     headers: {
//       'accept': 'application/json',
//       'xi-api-key': xi_api_key,
//       ...form.getHeaders()
//     },
//     body: form,
//   });

//   const data = await result.json();
  
//   res.status(result.status).json(data);

const XI_API_KEY = process.env.PAID_ELEVEN_API_KEY;
const VOICE_ID = 'MQHkId1MilWzsxHkAXng'; // replace with the ID of the voice you just created
const text = 'Text you want the voice to read out';

try {
  const response = await axios({
    method: 'post',
    url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    headers: {
      'accept': 'audio/mpeg',
      'xi-api-key': XI_API_KEY,
      'Content-Type': 'application/json',
    },
    data: {
      "text": text,
      // Additional data parameters can be added here.
    }
  });

  res.status(200).json({audio: response.data});
} catch (error) {
  console.log(error)
  res.status(400).json({error: 'An error occurred.'})
}

}