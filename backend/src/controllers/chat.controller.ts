import { Request, Response } from "express";

import {
  createChat,
  deleteChat,
  getChatMessages,
  getChats,
} from "../services/chat.service";

export const create = async (
  req: Request,
  res: Response
) => {

  try {

    const { title } = req.body;

    const chat = await createChat(
      req.userId!,
      title
    );

    return res.status(201).json({
      success: true,
      data: chat,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

export const getAll = async (
  req: Request,
  res: Response
) => {

  const chats = await getChats(req.userId!);

  return res.json({
    success: true,
    data: chats,
  });

};

export const getMessages = async (
  req: Request,
  res: Response
) => {

  const chat = await getChatMessages(
    Number(req.params.id),
    req.userId!
  );

  return res.json({
    success: true,
    data: chat,
  });

};

export const remove = async (
  req: Request,
  res: Response
) => {

  await deleteChat(
    Number(req.params.id),
    req.userId!
  );

  return res.json({
    success: true,
    message: "Chat deleted",
  });

};
