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
  data: CreateChallengeRequest & { creator_id: string }
): Promise<ChallengeData> => {
  const transaction = await sequelize.transaction();
  
  try {
    const challenge = await Challenge.create({
      id: uuidv4(),
      creator_id: data.creator_id,
      title: data.title,
      description: data.description,
      goal_type: data.goal_type,
      goal_value: data.goal_value,
      start_date: new Date(data.start_date!),
      end_date: new Date(data.end_date!),
      duration: data.duration,
      status: 'active',
      reward_points: data.reward_points || 0,
      type: ""
    }, { transaction });

    await transaction.commit();
    
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      goal_type: challenge.goal_type,
      goal_value: challenge.goal_value,
      start_date: challenge.start_date,
      end_date: challenge.end_date,
      duration: challenge.duration,
      reward_points: challenge.reward_points,
      participants: 0,
      creator_id: challenge.creator_id,
      status: challenge.status
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

    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      goal_type: challenge.goal_type,
      goal_value: challenge.goal_value,
      start_date: challenge.start_date,
      end_date: challenge.end_date,
      duration: challenge.duration,
      reward_points: challenge.reward_points,
      participants: challenge.ChallengeParticipants?.length || 0,
      creator_id: challenge.creator_id,
      status: challenge.status
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
      where: {
        creator_id: userId
      },
      include: [{
        model: ChallengeParticipant,
        attributes: ['user_id']
      }]
    });

    return challenges.map(challenge => ({
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      goal_type: challenge.goal_type,
      goal_value: challenge.goal_value,
      start_date: challenge.start_date,
      end_date: challenge.end_date,
      duration: challenge.duration,
      reward_points: challenge.reward_points,
      participants: challenge.ChallengeParticipants?.length || 0,
      creator_id: challenge.creator_id,
      status: challenge.status
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