import Password from "./user/password.schema";
import RefreshToken from "./user/refreshToken.schema";

import User from "./user/user.schema";
import UserDetails from "./user/user_details.schema";
import UserScores from "./user/user_scores.schema";
import UserWorkouts from "./user/user_workouts.schema";

import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";
import { AppError } from "../lib/appError";
import logger from "../config/logger";
import Challenge from "./user/challenge.schema";
import ChallengeParticipant from "./user/challenge_participant.schema";

const models = [
  "./user/user.schema",
  "./user/refreshToken.schema",
  "./user/password.schema",
  "./user/user_details.schema",
  "./user/user_scores.schema",
  "./user/user_workouts.schema",
  "./user/challenge.schema",
  "./user/challenge_participant.schema",
];

const instantiateModels = async (): Promise<void> => {
  for (const model of models) {
    await import(model);
  }

  
   // Define relationships
   User.hasOne(RefreshToken, {
    onDelete: "CASCADE",
    foreignKey: 'user_id',
  });

  User.hasOne(Password, {
    onDelete: "CASCADE",
    foreignKey: 'user_id',
  });

  User.hasOne(UserDetails, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  UserDetails.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.hasOne(UserScores, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  UserScores.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.hasMany(UserWorkouts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  UserWorkouts.belongsTo(User, {
    foreignKey: 'user_id'
  });
 
Challenge.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator'
});

Challenge.hasMany(ChallengeParticipant, {
  sourceKey: 'id',
  foreignKey: 'challenge_id',
  as: 'participants'
});


ChallengeParticipant.belongsTo(Challenge, {
  foreignKey: 'challenge_id',
  as: 'challenge'
});

ChallengeParticipant.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});
UserWorkouts.belongsTo(UserDetails, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  as: 'UserDetail'
});
User.hasMany(ChallengeParticipant, {
  foreignKey: 'user_id',
  as: 'participatedChallenges'
});

};
 




export const initializeDatabase = async () => {
 
  await sequelize.sync()
}

export default instantiateModels;
