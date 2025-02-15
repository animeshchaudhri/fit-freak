
import Password from "./user/password.schema";
import RefreshToken from "./user/refreshToken.schema";
import Role from "./user/role.schema";
import User from "./user/user.schema";

import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";
import { AppError } from "../lib/appError";
import logger from "../config/logger";

const models = [
  "./user/user.schema",
  "./user/refreshToken.schema",
  "./user/password.schema",
  "./user/role.schema",
  "./assessment/assessment.schema",
  "./assessment/question.schema",
  "./assessment/options.schema",
  "./assessment/section.schema",
  "./assessment/tag.schema",
  "./group/group.schema",
  "./group/notification.schema",
  "./junction/questionTag.schema",
  "./junction/notificationGroup.schema",
  "./junction/userGroup.schema",
  "./junction/assessmentGroup.schema",
  "./assessment/sectionStatus.schema",
  "./assessment/assessmentResponse.schema",
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

  Role.hasMany(User, {
    foreignKey: "role_id"
  });

  
}

//Writing raw SQL to define foreign key constraints for section because squelize does not support composite foreign keys;
export const defineCustomRelations = async () => {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.query(
      // 'ALTER TABLE questions ADD CONSTRAINT fk_sections FOREIGN KEY(assessment_id, section) REFERENCES sections(assessment_id, section) ON DELETE CASCADE;',
      "DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_sections') THEN EXECUTE 'ALTER TABLE questions ADD CONSTRAINT fk_sections FOREIGN KEY (assessment_id, section) REFERENCES sections (assessment_id, section) ON DELETE CASCADE'; END IF; END $$;",
      {
        type: QueryTypes.RAW,
        transaction: transaction
      }
    );
    await transaction.commit();
  } catch (error: any) {
    await transaction.rollback();
    throw new AppError(
      'Error defining foreign key to question.section',
      500,
      error,
      true
    )
  }
}

export default instantiateModels;
