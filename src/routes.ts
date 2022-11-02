import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    data: {},
    message: "it works",
  });
});

export default router;
