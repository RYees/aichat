/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { v4 as uuid } from 'uuid';

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const URL = process.env.URL;
const bucket = process.env.BUCKET;
import { Credentials } from "@aws-sdk/types";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try{
          if (req.method == "POST") {
            console.log("no it is not")
            let bodyBuffer = Buffer.alloc(0);
      
            req.on('data', chunk => {
              bodyBuffer = Buffer.concat([bodyBuffer, chunk]);
            });            
            
            req.on('end', async () => {
          
              // bodyBuffer contains audio blob from client          
              const audioBlob = bodyBuffer;
              // await uploadToS3(audioBlob);
              //console.log("fam", audioBlob)
              const key = `${uuid()}.webm`;
              const record = `https://pub-e23c9e8d742940a68f4f4bfc8ea2d387.r2.dev/inchy/${key}`
              //res.send('Uploaded!');
              const params = {
                // Headers: {
                //   'Content-Length': f.size 
                // },
                Bucket: bucket,
                Key: key,
                Body: audioBlob,
                ACL: "public-read",
              };
              try {
                const command = new PutObjectCommand(params);
                const value = await S3.send(command);
                console.log(
                  await getSignedUrl(S3, new GetObjectCommand({Bucket: 'inchy', Key: key}), { expiresIn: 3600 })
                )
                if(value){
                  const recordurl = {
                    record: record
                  }
                  return res.status(201).send(recordurl);
                }
                //res.status(200).send(value);    
              // return image;
              } catch (error) {
                console.log(error);
                res.status(500).send("no file uploaded");
              }
          
            });

                // const readStream = fs.createReadStream(f.filepath);
                // const key = f.originalFilename;
                // const imageUrl = `https://d4e1d76322b7d7d72b50b17a03567387.r2.cloudflarestorage.com/${bucket}/${key}`;
                // const image = `https://inchy.d4e1d76322b7d7d72b50b17a03567387.r2.cloudflarestorage.com/inchy/${key}`
                
          }

       // const form = formidable();
        // form.parse(req, async (err: any, fields: any, files: any) => {
        //    const blob = files;
        //     const f = file["PersistentFile"];
        //     console.log("filesrun", f.size)
        //    console.log("together", blob)
        //   if(!files || !files.file) {
        //     res.status(400).json({ message: 'No file selected' });
        //     return;           
        //   // if (!files.image) {
        //   //   res.status(400).send("No file uploaded");
        //   //   return;
        //   } else {
        //     // const {file}  = files;
        //     // const f = file[0];
        //     const blob = files;
        //     // const f = file["PersistentFile"];
        //     //console.log("filesrun", f.size)
        //     console.log("together", blob)
        // }
        
        //     const readStream = fs.createReadStream(f.filepath);
        //     const key = f.originalFilename;
        //     const imageUrl = `https://d4e1d76322b7d7d72b50b17a03567387.r2.cloudflarestorage.com/${bucket}/${key}`;
        //     const image = `https://inchy.d4e1d76322b7d7d72b50b17a03567387.r2.cloudflarestorage.com/inchy/${key}`
        //     const params = {
        //       Headers: {
        //         'Content-Length': f.size 
        //       },
        //       Bucket: bucket,
        //       Key: 'auio.webm',
        //       Body: readStream,
        //       ACL: "public-read",
        //     };
        //     try {
        //       const command = new PutObjectCommand(params);
        //       const value = await S3.send(command);
        //       console.log(
        //         await getSignedUrl(S3, new GetObjectCommand({Bucket: 'inchy', Key: 'auio.webm'}), { expiresIn: 3600 })
        //       )
        //       if(value){
        //         const imgurl = {
        //           image: image
        //         }
        //         return res.status(201).send(imgurl);
        //       }
        //       //console.log("free", value, imageUrl);
        //       // console.log(
        //       //   await S3.send(
        //       //     new ListObjectsV2Command({ Bucket: 'inchy' })
        //       //   )
        //       // );
              
        //      // return image;
        //     } catch (error) {
        //       console.log(error);
        //       res.status(500).send("no file uploaded");
        //     }
        //   }
        // });
        
      }
    catch(error){
      console.log("error", error)
    }
}