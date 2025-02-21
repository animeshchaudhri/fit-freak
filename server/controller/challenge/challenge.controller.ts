import { type NextFunction, type Request, type RequestHandler, type Response } from "express";
import { AppError } from "../../lib/appError";
import { createChallenge, getUserChallenges, inviteToChallenge, updateChallengeProgress } from "../../service/challenge/challenge.service";
import { ChallengeResponse, ChallengeListResponse, CreateChallengeRequest } from "../../types/challenge.types";

export const createChallengeController: RequestHandler = async (
  req: Request<{}, {}, CreateChallengeRequest>,
  res: Response<ChallengeResponse>,
  next: NextFunction
) => {
  try {
    // Calculate end date if not provided
    if (!req.body.start_date) {
      req.body.start_date = new Date();
    }
    if (!req.body.end_date) {
      const startDate = new Date(req.body.start_date);
      req.body.end_date = new Date(startDate.setDate(startDate.getDate() + req.body.duration));
    }

    const challenge = await createChallenge({
      ...req.body,
      creator_id: req.user.userId
    });

    return res.status(201).json({
      message: "Challenge created successfully",
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};

export const getUserChallengesController: RequestHandler = async (
  req: Request,
  res: Response<ChallengeListResponse>,
  next: NextFunction
) => {
  try {
    const challenges = await getUserChallenges(req.user.userId);
    
    return res.status(200).json({
      message: "Challenges retrieved successfully",
      data: challenges
    });
  } catch (error) {
    next(error);
  }
};

export const inviteToChallengeController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await inviteToChallenge(req.params.challengeId, req.params.userId);
    
    return res.status(200).json({
      message: "User invited to challenge successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const updateChallengeProgressController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateChallengeProgress({
      challengeId: req.params.challengeId,
      userId: req.user.userId,
      progress: req.body.progress
    });
    
    return res.status(200).json({
      message: "Challenge progress updated successfully"
    });
  } catch (error) {
    next(error);
  }
}; 