import prisma from "../config/prisma";
import { hashPassword } from "../utils/password";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterInput) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
};
