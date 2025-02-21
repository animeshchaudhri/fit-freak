import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'
import User from './user.schema'

interface ChallengeAttributes {
  id: string
  creator_id: string
  title: string
  description: string
  type: string
  goal_type: string
  goal_value: number
  start_date: Date
  end_date: Date
  status: 'active' | 'completed' | 'cancelled'
  reward_points: number
}

class Challenge extends Model<ChallengeAttributes> implements ChallengeAttributes {
  public id!: string
  public creator_id!: string
  public title!: string
  public description!: string
  public type!: string
  public goal_type!: string
  public goal_value!: number
  public start_date!: Date
  public end_date!: Date
  public status!: 'active' | 'completed' | 'cancelled'
  public reward_points!: number
}

Challenge.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goal_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goal_value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active'
    },
    reward_points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'challenge'
  }
)

export default Challenge 