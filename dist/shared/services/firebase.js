"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageProduct = void 0;
const crypto_1 = __importDefault(require("crypto"));
const admin = __importStar(require("firebase-admin"));
const BUCKET_URL = 'projetoverdureiro.appspot.com';
var serviceAccount = require("../../config/firebase-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET_URL,
});
const bucket = admin.storage().bucket();
const uploadImageProduct = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.file) {
            return next();
        }
        const avatar = request.file;
        const fileHash = crypto_1.default.randomBytes(10).toString('hex');
        const filename = `${fileHash}_${avatar.originalname}`;
        const file = bucket.file(filename);
        const stream = file.createWriteStream({
            metadata: {
                contentType: avatar.mimetype,
            },
        });
        stream.on('error', (e) => {
            console.error(e);
            next(e);
        });
        stream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            yield file.makePublic();
            avatar.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${filename}`;
            next();
        }));
        stream.end(avatar.buffer);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.uploadImageProduct = uploadImageProduct;
//# sourceMappingURL=firebase.js.map