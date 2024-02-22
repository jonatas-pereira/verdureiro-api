import {Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const isAuthenticate = (request: Request, response: Response, next: NextFunction) => {

  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Acess token not present",
    });
  }

  const [Bearer, token] = authHeaders.split(" ");

  if (!token) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Acess token not present",
    });
  }

  try {
    const decodedToken = verify(token, auth.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;
    request.user = {
      id: sub
    }
    next();
  } catch {
    return response.status(401).json({
      error: true,
      code: "token.expired",
      message: "Acess token not presenta",
    });
  }
}

export default isAuthenticate;
