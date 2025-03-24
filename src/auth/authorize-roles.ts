import { Request, Response, NextFunction } from "express";

export const authorizeRole = (...roles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.roleId;
    if (!role) {
      res.status(422).json({ msg: "unprocessable entity" });
    } else if (!roles.includes(role)) {
      res.status(403).json({ msg: "unauthorized" });
    } else next();
  };
};
