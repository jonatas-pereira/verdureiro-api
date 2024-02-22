import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import * as admin from "firebase-admin";

const BUCKET_URL = 'projetoverdureiro.appspot.com';

var serviceAccount = require("../../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

const bucket = admin.storage().bucket();


interface ExtendedFile extends Express.Multer.File {
  firebaseUrl?: string;
}

export const uploadImageProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (!request.file) {
      return next();
    }

    const avatar = request.file as ExtendedFile;

    const fileHash = crypto.randomBytes(10).toString('hex');
    const filename = `${fileHash}_${avatar.originalname}`;

    const file = bucket.file(filename);

    const stream = file.createWriteStream({
      metadata: {
        contentType: avatar.mimetype,
      },
    });

    stream.on('error', (e: Error) => {
      console.error(e);
      next(e);
    });

    stream.on('finish', async () => {
      await file.makePublic();
      avatar.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${filename}`;
      next();
    });

    stream.end(avatar.buffer);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
