import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "@prisma/client";
import AppError from "../../../../shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
  ) { }

  async execute({ email, name, password, avatar, contact }: CreateUserDTO): Promise<User>{
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    // Criptografando senha do usuário.
    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      avatar,
      contact
    });

    return user;
  }
}
