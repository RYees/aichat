import axios from 'axios';
import { writeFile } from 'fs/promises';
// import { AudioResponse } from './types';
import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand
  } from "@aws-sdk/client-s3";
  import { Credentials } from "@aws-sdk/types";
  const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
  const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
  const URL = process.env.URL;
  const bucket = process.env.BUCKET;
  const credentials = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY  
  } as Credentials;
  
  const S3 = new S3Client({
    region: "auto",
    endpoint: URL,
    credentials,
  });

  import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
  import { v4 as uuid } from 'uuid';


  export default async function (req:any, res:any) {
    const { text, voice_id } = req.body;   
    try {
        const key = '946bb6a61a0f0a0a7fa49de41142dc83';
        const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5,
            },
        }, {
            headers: {
                'xi-api-key': key, // replace <xi-api-key> with your actual API key
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer'
        });
        //console.log("timesheet", response.data);
        // get response data as ArrayBuffer
        const data = response.data;
        // // write to file
        //await writeFile('./src/pages/api/audio.wav', data);

        // // Convert the binary data to a base64 string
        const audioDataUrl = `data:audio/wav;base64,${response.data.toString('base64')}`;
        // Return the DataURL instead of binary data const audio = `https://pub-e23c9e8d742940a68f4f4bfc8ea2d387.r2.dev/inchy/${key}`
        const audio_key = `${uuid()}.wav`;
            const params = {
                Bucket: bucket,
                Key: audio_key,
                Body: Buffer.from(audioDataUrl.replace(/^data:audio\/\w+;base64,/, ''), 'base64'),
                ContentType: 'audio/wav',
                ACL: 'public-read',
            };
              try {
                const audio = `https://pub-e23c9e8d742940a68f4f4bfc8ea2d387.r2.dev/inchy/${audio_key}`
                const command = new PutObjectCommand(params);
                const value = await S3.send(command);
                if(value){
                  const audiourl = {
                    audio: audio
                  }
                  return res.status(201).send(audiourl);
                }
              } catch (error) {
                console.log(error);
                res.status(500).send("no file uploaded");
              }



        res.status(200).json({ audioDataUrl });
        return audioDataUrl;
        
    } catch (error) {
        console.error("error", error);
        res.status(error || 500).end('API request failed');
    }
};
