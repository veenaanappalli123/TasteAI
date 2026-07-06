import prisma from "../config/prisma";

export const createChat = async (
  userId: number,
  title: string
) => {
  return prisma.chat.create({
    data: {
      title,
      userId,
    },
  });
};

export const getChats = async (userId: number) => {
  return prisma.chat.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getChatMessages = async (
  chatId: number,
  userId: number
) => {

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!chat)
    throw new Error("Chat not found");

  return chat;
};

export const deleteChat = async (
  chatId: number,
  userId: number
) => {

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });

  if (!chat)
    throw new Error("Chat not found");

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });

  return true;
};
