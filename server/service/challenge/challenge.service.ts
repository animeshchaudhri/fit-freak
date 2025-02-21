import { AppError } from "../../lib/appError";
import { 
  createChallengeInDB, 
  getChallengeByIdFromDB,
  getUserChallengesFromDB,
  inviteToChallengeInDB,
  updateChallengeProgressInDB 
} from "../../model/challenge/challenge.model";
import { ChallengeData, CreateChallengeRequest } from "../../types/challenge.types";
import logger from "../../config/logger";

export const createChallenge = async (
  data: CreateChallengeRequest & { creatorId: string }
): Promise<ChallengeData> => {
  try {
    const challenge = await createChallengeInDB(data);
    
    if (data.invitedUsers?.length) {
      await Promise.all(
        data.invitedUsers.map(userId => 
          inviteToChallengeInDB(challenge.id, userId)
        )
      );
    }
    
    return challenge;
  } catch (error) {
    logger.error('Error in createChallenge service:', error);
    throw new AppError(
      "Failed to create challenge",
      500,
      "Error creating challenge",
      true
    );
  }
};

export const getChallengeById = async (
  challengeId: string
): Promise<ChallengeData> => {
  const challenge = await getChallengeByIdFromDB(challengeId);
  
  if (!challenge) {
    throw new AppError(
      "Challenge not found",
      404,
      "Challenge with given ID does not exist",
      false
    );
  }
  
  return challenge;
};

export const getUserChallenges = async (
  userId: string
): Promise<ChallengeData[]> => {
  return await getUserChallengesFromDB(userId);
};

export const inviteToChallenge = async (
  challengeId: string,
  userId: string
): Promise<void> => {
  await inviteToChallengeInDB(challengeId, userId);
};

export const updateChallengeProgress = async (data: {
  challengeId: string,
  userId: string,
  progress: number
}): Promise<void> => {
  await updateChallengeProgressInDB(data.challengeId, data.userId, data.progress);
}; 