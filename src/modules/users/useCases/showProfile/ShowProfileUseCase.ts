import { inject, injectable } from "tsyringe"
import { IUserRepository } from "../../repositories/IUserRepository"
import { User } from "@prisma/client"
import AppError from "../../../../shared/errors/AppError"

type ShowProfileParams = {
  userId: string
}

@injectable()
export class ShowProfileUseCasa {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
  ) { }

  async execute({ userId }: ShowProfileParams): Promise<User> {

    const user = await this.usersRepository.findById(userId);
  
    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }
}
