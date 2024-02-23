import { User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpadateUserDTO";

export interface IUserRepository {
  create({ email, name, password, contact }: CreateUserDTO): Promise<User>;
  update(userId: string, { name, contact }: UpdateUserDTO): Promise<User>;
  delete(userId: string): Promise<User>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
