import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

interface UserAttributes {
  id: string
  email: string

}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string
  public email!: string
  
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    
  
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: true
  }
)

export default User
