import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

interface UserWorkoutsAttributes {
  id: string
  user_id: string
  workout_type: string
  duration: number
  calories_burned: number
  completed_at: Date
  points_earned: number
}

class UserWorkouts extends Model<UserWorkoutsAttributes> implements UserWorkoutsAttributes {
  public id!: string
  public user_id!: string
  public workout_type!: string
  public duration!: number
  public calories_burned!: number
  public completed_at!: Date
  public points_earned!: number
}

UserWorkouts.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    workout_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calories_burned: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    points_earned: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'user_workouts'
  }
)

export default UserWorkouts 