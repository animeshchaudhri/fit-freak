import { AppError } from "../../lib/appError";
import { createUser, getPasswordById, getUserByEmail, getUserbyId,checkUserDetailsExist, updateOrSaveRefreshToken, userDetailsCreateInDB, userWorkoutDetailsCreateInDB, getallworkoutData, getLeaderBoardData, getLeaderBoadofFriends, getUsers } from "../../model/user/user.model";
import { allleaderboardData, alluserData, allUserWorkoutData, authTokens, UserData, userDetailedData, userLoginData, userWorkoutData } from "../../types/user.types";
import commonErrorsDictionary from "../../utils/error/commonErrors";
import { hashPassword } from "../../utils/password";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";
import logger from "../../config/logger";


export const registerUser = async (user: {
    email: string;
    password: string;

  }): Promise<UserData | null> => {
    const userExists = await getUserByEmail(user.email);
    if (userExists)
      throw new AppError(
        "User already exists",
        409,
        "User with this email already exists",
        false
      );
  
    const userData = await createUser({
      id: uuid(),
      email: user.email,
      password: await hashPassword(user.password)
    });
  
    if (!userData) {
      throw new AppError(
        commonErrorsDictionary.internalServerError.name,
        commonErrorsDictionary.internalServerError.httpCode,
        "Someting went wrong",
        false
      );
    }
  
    return userData;
  };
 
 
  export const loginUser = async (user: {
    email: string;
    password: string;
  
  }): Promise<authTokens> => {
    const existingUser = await getUserByEmail(user.email);
    if (!existingUser)
      throw new AppError(
        "Invalid credentials",
        401,
        "Invalid credentials",
        false
      );
  
    const correctPassword =
      (await getPasswordById(existingUser.id))?.password ?? "";
  
    if (!(await bcrypt.compare(user.password, correctPassword)))
      throw new AppError(
        "Invalid credentials",
        401,
        "Invalid credentials",
        false
      );
  

  
   
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret)
      throw new AppError(
        "Internal server error",
        500,
        "Access token secret not found",
        false
      );
  
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret)
      throw new AppError(
        "Internal server error",
        500,
        "Refresh token secret not found",
        false
      );
  
   
    const accessToken = jwt.sign(
      {
        userId: existingUser.id,
       
      },
      accessTokenSecret,
      {
        expiresIn: "15m",
      }
    );
  
    const refreshToken = jwt.sign(
      {
        userId: existingUser.id,
      },
      refreshTokenSecret,
      {
        expiresIn: "7d",
      }
    );
  
    if (
      !(await updateOrSaveRefreshToken(
        { userId: existingUser.id, refreshToken },
    
      ))
    )
      throw new AppError(
        "Internal server error",
        500,
        "Error saving refresh token",
        false
      );
  
    return {
      accessToken,
      refreshToken,
    };
  };

export const getallUsers = async (): Promise<alluserData | null> => {
  const user = await getUsers();
  if (!user) {
    throw new AppError("User not found", 404, "User not found", false);
  }

 
  return user;
}
export const getUserInfo = async (userId: string): Promise<userLoginData | null> => {
  const user = await getUserbyId(userId);
  if (!user) {
    throw new AppError("User not found", 404, "User not found", false);
  }
  return user;
}

  export const userDetailsCreate = async (user: {
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
  }): Promise<userDetailedData| null> => {
    const userExists = await getUserbyId(user.id);
    if (!userExists)
      throw new AppError(
        "User not found",
        404,
        "User not found",
        false
      );
    
    const userDetails = await userDetailsCreateInDB(user);
    return userDetails; 
  };
export const getUserWorkouts= async (userId: string): Promise<userWorkoutData | null> => {

  const user = await getUserbyId(userId);
  if (!user) {
    throw new AppError("User not found", 404, "User not found", false);
  }
  const userWorkouts = await getallworkoutData(userId);
  return  userWorkouts;

}


 export const createUserWorkout = async (user: {
    user_id: string;
    calories_burned: number;
    number_workouts: number;
  }): Promise<userWorkoutData | null> => {
    const userExists = await getUserbyId(user.user_id);
    if (!userExists)
      throw new AppError(
        "User not found",
        404,
        "User not found",
        false
      );

    const userDetails = await userWorkoutDetailsCreateInDB(user);
  

    return userDetails;
  };
  export const getUserDetails = async (userId: string): Promise<userDetailedData | null> => {
    try {
      const userDetails = await checkUserDetailsExist(userId);
      logger.info(`User details: ${userDetails}`);
      if (!userDetails || userDetails === null) {
        throw new AppError("user details not found", 404, "User details not found", false);
      }
      return userDetails;
    } catch (error) {
      // Re-throw if it's already an AppError
      if (error instanceof AppError) {
        throw error;
      }
      // Otherwise, wrap it as a 500 error
      throw new AppError("error getting user details", 500, "Something went wrong", true);
    }
  };

  export const getLeaderboard = async (): Promise<allleaderboardData| null> => {
    try {
    const leaderboard = await getLeaderBoardData();
    return leaderboard;
    } catch (error) {
      throw new AppError("error getting leaderboard", 500, "Something went wrong", true);
    }
  }
  export const getFriendsLeaderboard = async (userId: string): Promise<allleaderboardData| null> => {
    try {
    const leaderboard = await getLeaderBoadofFriends(userId);
    return leaderboard;
    } catch (error) {
      throw new AppError("error getting leaderboard", 500, "Something went wrong", true);
    }
  }
