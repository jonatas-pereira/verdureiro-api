declare namespace Express {
    export interface Request {
      user: {
        id: string
      },
      file?: {
        firebaseUrl?: string;
      };
    }
}