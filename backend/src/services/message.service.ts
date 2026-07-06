import prisma from "../config/prisma";
import { askAI } from "./ai.service";

export const sendMessage = async (
  chatId: number,
  userId: number,
  content: string
) => {
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });

  if (!chat) {
    throw new Error("Chat not found");
  }

  await prisma.message.create({
    data: {
      chatId,
      sender: "USER",
      content,
    },
  });

  const aiReply = await askAI(content);

  await prisma.message.create({
    data: {
      chatId,
      sender: "AI",
      content: aiReply,
    },
  });

  return aiReply;
};
