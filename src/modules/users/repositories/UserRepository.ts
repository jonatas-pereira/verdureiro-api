import { User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpadateUserDTO";
import { IUserRepository } from "./IUserRepository";
import { prisma } from "../../../prisma/client";

export class UserRepository implements IUserRepository{
  async create({ email, name, password, contact }: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        contact,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        contact: true,
        created_at: true,
        update_at: true
      }
    });

    return user as User;
  }

  async update(userId: string, { name, contact }: UpdateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        contact,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        contact: true,
        created_at: true,
        update_at: true
      }
    });

    return user as User;
  }

  async delete(userId: string): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      }
    });

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        contact: true,
        created_at: true,
        update_at: true
      }
    });
    return user as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    });

    return user as User;
  }
}
