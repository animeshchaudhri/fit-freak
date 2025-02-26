import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'
import UserDetails from './user_details.schema'

interface UserWorkoutsAttributes {
  id: string
  user_id: string
  calories_burned: number
  number_workouts: number
 
}

class UserWorkouts extends Model<UserWorkoutsAttributes> implements UserWorkoutsAttributes {
  public id!: string
  public user_id!: string
  public calories_burned!: number
  public number_workouts!: number
  public readonly UserDetail?: UserDetails;

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
    calories_burned: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_workouts: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
   
  },
  {
    sequelize,
    modelName: 'user_workouts'
  }
)


UserWorkouts.belongsTo(UserDetails, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  as: 'UserDetails'
});
export default UserWorkouts 