import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

import User from './user.schema'
import Challenge from './challenge.schema'

interface ChallengeParticipantAttributes {
  id: string
  challenge_id: string
  user_id: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  progress: number
  joined_at: Date
}

class ChallengeParticipant extends Model<ChallengeParticipantAttributes> implements ChallengeParticipantAttributes {
  public id!: string
  public challenge_id!: string
  public user_id!: string
  public status!: 'pending' | 'accepted' | 'rejected' | 'completed'
  public progress!: number
  public joined_at!: Date
}

ChallengeParticipant.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    challenge_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Challenge,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
      defaultValue: 'pending'
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'challenge_participant'
  }
)

export default ChallengeParticipant