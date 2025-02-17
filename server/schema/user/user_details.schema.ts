import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'
import User from './user.schema'

interface UserDetailsAttributes {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone: string
  height?: number
  weight?: number
  age?: number
  gender?: string
  activity_level?: string
  fitness_goals?: string[]
  onboarding_completed: boolean
}

class UserDetails extends Model<UserDetailsAttributes> implements UserDetailsAttributes {
  public id!: string
  public user_id!: string
  public first_name!: string
  public last_name!: string
  public phone!: string
  public height?: number
  public weight?: number
  public age?: number
  public gender?: string
  public activity_level?: string
  public fitness_goals?: string[]
  public onboarding_completed!: boolean
}

UserDetails.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true, 
      references: {
        model: User,
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    activity_level: DataTypes.STRING,
    fitness_goals: DataTypes.ARRAY(DataTypes.STRING),
    onboarding_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'user_details',
    tableName: 'user_details'
  }
)

// Add the association
UserDetails.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

export default UserDetails 