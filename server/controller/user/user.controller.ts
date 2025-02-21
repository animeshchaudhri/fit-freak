import {
    type NextFunction,
    type Request,
    type RequestHandler,
    type Response,
  } from "express";
import { createUserWorkout, getallUsers, getFriendsLeaderboard, getLeaderboard, getUserDetails, getUserInfo, getUserWorkouts, loginUser, registerUser, userDetailsCreate } from "../../service/user/user.service";
import { followUser, getFollowers, getFollowing, getUsers, unfollowUser } from "../../model/user/user.model";



export const registerUserController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = await registerUser({
        email: req.body.email,
        password: req.body.password,
        
      });
  
      return res.status(201).json({
        message: "User registered successfully",
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  };

  export const loginUserController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokens = await loginUser({
        email: req.body.email,
        password: req.body.password
      });
  
      return res.status(200).json({
        message: "User logged in successfully",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

export const alluserInfoController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getallUsers();
    return res.status(200).json({
      message: "User details fetched successfully",
      data: user,
    });
  }catch (error) {
    next(error);
  }

}  
export const userInfoController: RequestHandler = async (
req: Request,
res: Response,
next: NextFunction
) => {
  try {
    const user = await getUsers();
    return res.status(200).json({
      message: "User details fetched successfully",
      data: user,
    });
  }catch (error) {
    next(error);
  }

}



export const userDetailsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await userDetailsCreate({
      id: req.user.userId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      height: req.body.height,
      weight: req.body.weight,
      gender: req.body.gender,
      age: req.body.age,
      activity_level: req.body.activity_level,
      fitness_goals: req.body.fitness_goals,
    })
    return res.status(201).json({
      message: "User details created successfully",
      data: userData,
    });
    
  } catch (error) {
    next(error);
  }
};

export const userWorkoutController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const useData= await createUserWorkout({
      user_id: req.user.userId,
      calories_burned: req.body.calories_burned,
      number_workouts: req.body.number_workouts,
    });
    return res.status(201).json({
      message: "User workout details created successfully",
      data: useData,
    });

  } catch (error) {
    next(error);
  } 
};

export const userWorkoutGetController: RequestHandler = async (
req: Request,
res: Response,
next: NextFunction
) => {
  try {
    const userWorkout = await getUserWorkouts(req.user.userId);
    return res.status(200).json({
      message: "User workout details fetched successfully",
      data: userWorkout,
    });
  } catch (error) {
    next(error);
  }
}


export const leaderboardController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaderboard = await getLeaderboard();
    return res.status(200).json({
      message: "Leaderboard fetched successfully",
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserDetailsController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const userDetails = await getUserDetails(req.user.userId);
    return res.status(200).json({
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    next(error);
  } 
};


export const friendLeaderboardController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaderboard = await getFriendsLeaderboard(req.user.userId);
    return res.status(200).json({
      message: "Leaderboard fetched successfully",
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
};
export const followUserController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    await followUser(req.user.userId, userId);
    
    return res.status(200).json({
      message: "Successfully followed user"
    });
  } catch (error) {
    next(error);
  }
};

export const unfollowUserController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    await unfollowUser(req.user.userId, userId);
    
    return res.status(200).json({
      message: "Successfully unfollowed user"
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowersController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const followers = await getFollowers(req.user.userId);
    
    return res.status(200).json({
      message: "Followers retrieved successfully",
      data: followers
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowingController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const following = await getFollowing(req.user.userId);
    
    return res.status(200).json({
      message: "Following list retrieved successfully",
      data: following
    });
  } catch (error) {
    next(error);
  }
};