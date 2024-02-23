import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "@prisma/client";
import { UpdateUserDTO } from "../../dtos/UpadateUserDTO";

type UpdateProfileParams = {
  userId: string
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute({ userId }: UpdateProfileParams, { name, contact }: UpdateUserDTO): Promise<User> {
    const userAvatarExists = await this.usersRepository.findById(userId);

    return this.usersRepository.update(
      userId,
      {
        name,
        contact
      },
    );
  }
}
