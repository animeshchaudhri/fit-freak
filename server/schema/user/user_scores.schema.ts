import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

interface UserScoresAttributes {
  id: string
  user_id: string
  total_points: number
  weekly_points: number
  monthly_points: number
  streak_count: number
  last_activity_date: Date
}

class UserScores extends Model<UserScoresAttributes> implements UserScoresAttributes {
  public id!: string
  public user_id!: string
  public total_points!: number
  public weekly_points!: number
  public monthly_points!: number
  public streak_count!: number
  public last_activity_date!: Date
}

UserScores.init(
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
    total_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    weekly_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    monthly_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    streak_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    last_activity_date: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'user_scores'
  }
)

export default UserScores 