import { Request, Response } from "express";

import { registerSchema, loginSchema } from "../validators/auth.validator";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};
