import { DataTypes, Model, Association, HasManyGetAssociationsMixin } from 'sequelize'
import { sequelize } from '../../config/database'
import User from './user.schema'
import ChallengeParticipant from './challenge_participant.schema'

interface ChallengeAttributes {
  id: string
  creator_id: string
  title: string
  description: string
  type: string
  goal_type: 'steps' | 'calories' | 'distance' | 'activeMinutes' | 'custom'
  goal_value: number
  start_date: Date
  end_date: Date
  duration: number
  status: 'active' | 'completed' | 'cancelled'
  reward_points: number
}

interface ChallengeInstance extends Model<ChallengeAttributes>, ChallengeAttributes {
  ChallengeParticipants?: ChallengeParticipant[];
  participants?: ChallengeParticipant[];
}

class Challenge extends Model<ChallengeAttributes, ChallengeAttributes> implements ChallengeAttributes {
  public id!: string
  public creator_id!: string
  public title!: string
  public description!: string
  public type!: string
  public goal_type!: 'steps' | 'calories' | 'distance' | 'activeMinutes' | 'custom'
  public goal_value!: number
  public start_date!: Date
  public end_date!: Date
  public duration!: number
  public status!: 'active' | 'completed' | 'cancelled'
  public reward_points!: number

  // Add associations
  public readonly ChallengeParticipants?: ChallengeParticipant[]
  public readonly participants?: ChallengeParticipant[]
  public getParticipants!: HasManyGetAssociationsMixin<ChallengeParticipant>

  public static associations: {
    ChallengeParticipants: Association<Challenge, ChallengeParticipant>
  }
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
      type: DataTypes.ENUM('steps', 'calories', 'distance', 'activeMinutes', 'custom'),
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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active'
    },
    reward_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'challenge'
  }
)

// Define associations
Challenge.hasMany(ChallengeParticipant, {
  sourceKey: 'id',
  foreignKey: 'challenge_id',
  as: 'participants'
});

Challenge.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator'
});

export default Challenge