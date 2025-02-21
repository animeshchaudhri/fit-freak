import { UUIDV4 } from "sequelize";
import { sequelize } from "../../config/database";
import logger from "../../config/logger";
import { AppError } from "../../lib/appError";
import Password from "../../schema/user/password.schema";
import RefreshToken from "../../schema/user/refreshToken.schema";
import User from "../../schema/user/user.schema";
import UserDetails from "../../schema/user/user_details.schema";
import { allUserWorkoutData, UserData, userDetailedData, userLoginData, userWorkoutData } from "../../types/user.types";
import { v4 as uuidv4 } from 'uuid';
import UserWorkouts from "../../schema/user/user_workouts.schema";


export const getUserByEmail = async (
    email: string
  ): Promise<UserData | null> => {
    try {
      const user = User.findOne({
        where: {
          email,
        },
        raw: true,
      });
  
      return await user;
    } catch (error) {
      throw new AppError(
        "error getting user by email",
        500,
        "Something went wrong",
        false
      );
    }
  };
  export const updateOrSaveRefreshToken = async (token: {
    userId: string;
    refreshToken: string;
  },
   
  ): Promise<boolean> => {
    logger.info(`Saving refresh token for ${token.userId}`);
    try {
      const refreshToken = await RefreshToken.upsert(
        {
          user_id: token.userId,
      
          refresh_token: token.refreshToken,
        },
      );
      return true;
    } catch (error: any) {
      throw new AppError("error saving refresh token", 500, error, true);
    }
  };

  export const getPasswordById = async (id: string): Promise<Password | null> => {
    try {
      const password = await Password.findOne({
        where: {
          user_id: id,
        },
        raw: true,
      });
  
      return password;
    } catch (error) {
      throw new AppError(
        "error getting password by id",
        500,
        "Something went wrong",
        false
      );
    }
  };

export const createUser = async (userData: {
    id: string;
    email: string;
    password: string;
   
  }): Promise<UserData | null> => {
    const transaction = await sequelize.transaction();
    logger.info(`Creating user with email: ${userData.email}`);
    try {
      const user = await User.create(
        {
          id: userData.id,
          email: userData.email,
      
        },
        { transaction, raw: true }
      );
  
      await Password.create(
        {
          user_id: userData.id,
          password: userData.password,
        },
        { transaction, raw: true }
      );
  
      await transaction.commit();
      return user;
    } catch (error) {
      // Rollback transaction if there's an error
      await transaction.rollback();
      throw new AppError(
        "error creating user",
        500,
        "Something went wrong",
        false
      );
    }
  };
  
export const getUserbyId = async (id: string): Promise<userLoginData | null> => {
  try {
    logger.info(`Getting user by id: ${id}`);
    const user = await User.findByPk(id);
    const onboarding = await UserDetails.findOne({
      where: {
        user_id: id,
      },
    });
    if (user) {
      return {
       email: user.email,
        onboarding_completed: onboarding?.onboarding_completed,
      };
    }
    return user;
  } catch (error) {
    throw new AppError("error getting user by id", 500, "Something went wrong", true);
  }
};

export const userDetailsCreateInDB = async (user: {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  height: number;
  weight: number;
  gender: string;
  age: number;
  activity_level: string;
  fitness_goals: string[];
}): Promise<userDetailedData | null> => {
  const transaction = await sequelize.transaction();
  try {
    logger.info(`Creating user details for ${user.id}`);

    const userDetails = await UserDetails.create({
      id: uuidv4(),
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      age: user.age,
      activity_level: user.activity_level,
      fitness_goals: user.fitness_goals,
      onboarding_completed: true
    }, { transaction });
    
    await transaction.commit();
    logger.info(`User details created for ${user.id}`);
    return userDetails;
  } catch (error: unknown) {
    await transaction.rollback();
    if (error instanceof Error) {
      const messages = (error as any).errors.map((err: any) => err.message);
      throw new AppError(
        "Validation Error",
        400,
        messages.join(", "),
        false
      );
    }
    throw new AppError("error creating user details", 500, "Something went wrong", true);
  }
};

export const getallworkoutData = async (userId: string): Promise<userWorkoutData| null> => {
  try {
    const userWorkouts = await UserWorkouts.findOne({
      where: { user_id: userId },
    });
    return userWorkouts;
  } catch (error) {
    logger.error(`Error getting all workout data for user ID ${userId}:`, error);
    throw new AppError(
      "Database Error",
      500,
      "Error getting all workout data",
      true
    );
  }
}
export const userWorkoutDetailsCreateInDB = async (user: {
  user_id: string;
  calories_burned: number;
  number_workouts: number;
}): Promise<userWorkoutData | null> => {



  const transaction = await sequelize.transaction();
  try {
    logger.info(`Creating user workout details for ${user.user_id}`);

    const userWorkoutDetails = await UserWorkouts.upsert({
      id: uuidv4(),
      user_id: user.user_id,
      calories_burned: user.calories_burned,
      number_workouts: user.number_workouts,
    }, { transaction });
    
    await transaction.commit();
    logger.info(`User workout details created for ${user.user_id}`);
    return userWorkoutDetails[0];
  } catch (error: unknown) {
    await transaction.rollback();
    if (error instanceof Error) {
      const messages = (error as any).errors.map((err: any) => err.message);
      throw new AppError(
        "Validation Error",
        400,
        messages.join(", "),
        false
      );
    }
    throw new AppError("error creating user workout details", 500, "Something went wrong", true);
  }
}



export const checkUserDetailsExist = async (userId: string): Promise<userDetailedData | null> => {
  try {
    const userDetails = await UserDetails.findOne({
      where: { user_id: userId },
   
    });
    return userDetails;
  } catch (error) {
    logger.error(`Error checking user details existence for user ID ${userId}:`, error);
    throw new AppError(
      "Database Error",
      500,
      "Error checking user details",
      true
    );
  }
};

