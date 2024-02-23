import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "@prisma/client";
import AppError from "../../../../shared/errors/AppError";

type DeleteProfileParams = {
  userId: string
}

@injectable()
export class DeleteProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
  ) { }

  async execute({ userId }: DeleteProfileParams): Promise<User>{

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError("User not found");
    }

    const user = await this.usersRepository.delete(userExists.id);

    return user;
  }
}
