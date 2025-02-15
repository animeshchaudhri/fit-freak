import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

export interface RoleAttributes {
  id: string
  name: string
  canTrackActivity: boolean
  canCreateChallenge: boolean
  canJoinChallenge: boolean
  canViewLeaderboard: boolean
}

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  canTrackActivity: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  canCreateChallenge: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  canJoinChallenge: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  canViewLeaderboard: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

export default Role;
