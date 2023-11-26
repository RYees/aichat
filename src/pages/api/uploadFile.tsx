/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import formidable from "formidable";
import AWS from "aws-sdk";
import fs from "node:fs";
import { Credentials } from "@aws-sdk/types";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
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
export const config = {
  api: {
    bodyParser: false,
  },
};
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try{
      if (req.method == "POST") {
        //const { name } = req.query;
        const form = formidable();
        form.parse(req, async (err: any, fields: any, files: any) => {
          if(!files || !files.file) {
            res.status(400).json({ message: 'No file selected' });
            return;           
          // if (!files.image) {
          //   res.status(400).send("No file uploaded");
          //   return;
          } else {
            const {file}  = files;
            const f = file[0];
            // const f = file["PersistentFile"]; type:"audio/mpeg" type:"image/jpeg"
            console.log("filesrun", f.mimetype)
            const readStream = fs.createReadStream(f.filepath);
            const key = f.originalFilename;
            const imageUrl = `https://d4e1d76322b7d7d72b50b17a03567387.r2.cloudflarestorage.com/${bucket}/${key}`;
            const image = `https://pub-e23c9e8d742940a68f4f4bfc8ea2d387.r2.dev/inchy/${key}`
            const params = {
              Headers: {
                'Content-Length': f.size 
              },
              Bucket: bucket,
              Key: f.originalFilename,
              Body: readStream,
              ACL: "public-read",
            };
            try {
              const command = new PutObjectCommand(params);
              const value = await S3.send(command); 
              console.log(
                await getSignedUrl(S3, new GetObjectCommand({Bucket: 'inchy', Key: f.originalFilename}), { expiresIn: 3600 })
              )
              if(value){
                const imgurl = {
                  image: image
                }
                console.log("support", imgurl)
                return res.status(201).send(imgurl);
              }
            } catch (error) {
              console.log(error);
              res.status(500).send("no file uploaded");
            }
          }
        });
      }
    }catch(error){
      console.log("error", error)
    }
}