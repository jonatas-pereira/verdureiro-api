import { User } from "@prisma/client";
import { CreateSessionDTO } from "../../dtos/CreateSessionDTO";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import AppError from "../../../../shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth";

type IResponse = {
  user: User,
  acessToken: string
}

@injectable()
export class CreateSessionUseCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
  ) { }
  async execute({ email, password }: CreateSessionDTO): Promise<IResponse>{

    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const acessToken = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      user,
      acessToken
    }
  }
}
