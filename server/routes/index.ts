import { Router } from "express";
import userRouter from "./user.route";
import challengeRoutes from "./challenge.route";

const router: Router = Router();

router.use("/v1/user", userRouter);
router.use('/v1/challenge', challengeRoutes);
export default router;
