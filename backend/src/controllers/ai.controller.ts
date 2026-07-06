import { Request, Response } from "express";
import { sendMessage } from "../services/message.service";

export const generateRecipe = async (
  req: Request,
  res: Response
) => {
  try {
    const { message } = req.body;

    const reply = await sendMessage(
      Number(req.params.id),
      req.userId!,
      message
    );

    return res.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
