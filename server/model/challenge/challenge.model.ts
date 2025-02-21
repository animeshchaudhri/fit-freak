import { Transaction } from "sequelize";
import { sequelize } from "../../config/database";
import Challenge from "../../schema/user/challenge.schema";
import ChallengeParticipant from "../../schema/user/challenge_participant.schema";
import { AppError } from "../../lib/appError";
import { ChallengeData, CreateChallengeRequest } from "../../types/challenge.types";
import logger from "../../config/logger";
import { v4 as uuidv4 } from 'uuid';
import { ActivityType } from "../../types/fitness.types";

export const createChallengeInDB = async (
  data: CreateChallengeRequest & { creatorId: string }
): Promise<ChallengeData> => {
  const transaction = await sequelize.transaction();
  
  try {
    const challenge = await Challenge.create({
      id: uuidv4(),
      creator_id: data.creatorId,
      title: data.title,
      description: data.description,
      type: data.type as string,
      goal_type: 'default', 
      goal_value: data.goal,
      start_date: data.startDate,
      end_date: data.endDate,
      status: 'active',
      reward_points: data.points
    }, { transaction });

    await transaction.commit();
    
    
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      type: challenge.type as ActivityType,
      goal: challenge.goal_value,
      startDate: challenge.start_date,
      endDate: challenge.end_date,
      points: challenge.reward_points,
      participants: 0, // You might want to count this from participants table
      creatorId: challenge.creator_id,
      isActive: challenge.status === 'active'
    };
  } catch (error) {
    await transaction.rollback();
    logger.error('Error in createChallengeInDB:', error);
    throw new AppError(
      "Database Error",
      500,
      "Error creating challenge in database",
      true
    );
  }
};

export const getChallengeByIdFromDB = async (
  challengeId: string
): Promise<ChallengeData | null> => {
  try {
    const challenge = await Challenge.findByPk(challengeId, {
      include: [{
        model: ChallengeParticipant,
        attributes: ['user_id', 'status', 'progress']
      }]
    });
    
    if (!challenge) return null;

    // Transform to match ChallengeData interface
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      type: challenge.type as ActivityType,
      goal: challenge.goal_value,
      startDate: challenge.start_date,
      endDate: challenge.end_date,
      points: challenge.reward_points,
      participants: 0, // Count from participants
      creatorId: challenge.creator_id,
      isActive: challenge.status === 'active'
    };
  } catch (error) {
    logger.error('Error in getChallengeByIdFromDB:', error);
    throw new AppError(
      "Database Error",
      500,
      "Error fetching challenge from database",
      true
    );
  }
};

export const getUserChallengesFromDB = async (userId: string): Promise<ChallengeData[]> => {
  try {
    const challenges = await Challenge.findAll({
      include: [{
        model: ChallengeParticipant,
        where: { user_id: userId }
      }]
    });
    
    // Transform to match ChallengeData interface
    return challenges.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      type: challenge.type as ActivityType,
      goal: challenge.goal_value,
      startDate: challenge.start_date,
      endDate: challenge.end_date,
      points: challenge.reward_points,
      participants: 0, // Count from participants
      creatorId: challenge.creator_id,
      isActive: challenge.status === 'active'
    }));
  } catch (error) {
    logger.error('Error in getUserChallengesFromDB:', error);
    throw new AppError(
      "Database Error",
      500,
      "Error fetching user challenges",
      true
    );
  }
};

export const inviteToChallengeInDB = async (
  challengeId: string,
  userId: string
): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    await ChallengeParticipant.create({
      id: uuidv4(),
      challenge_id: challengeId,
      user_id: userId,
      status: 'pending',
      progress: 0,
      joined_at: new Date()
    }, { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    logger.error('Error in inviteToChallengeInDB:', error);
    throw new AppError(
      "Database Error",
      500,
      "Error inviting user to challenge",
      true
    );
  }
};

export const updateChallengeProgressInDB = async (
  challengeId: string,
  userId: string,
  progress: number
): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    await ChallengeParticipant.update(
      { progress },
      { 
        where: { 
          challenge_id: challengeId,
          user_id: userId
        },
        transaction
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    logger.error('Error in updateChallengeProgressInDB:', error);
    throw new AppError(
      "Database Error",
      500,
      "Error updating challenge progress",
      true
    );
  }
}; 