// import { DataTypes, Model } from 'sequelize'
// import { sequelize } from '../../config/database'
// import User from '../user/user.schema'
// import UserWorkout from '../user/user_workouts.schema'

// interface ChallengeAttributes {
//   id: string
//   title: string
//   challenge_type:''
//   description: string
//   start_date: Date
//   end_date: Date
//   creator_id: string
//   target_calories: number
//   target_workouts: number
//   status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED'
// }

// class Challenge extends Model<ChallengeAttributes> implements ChallengeAttributes {
//   public id!: string
//   public title!: string
//   public description!: string
//   public creator_id!: string
//   public target_calories!: number
//   public target_workouts!: number
//   public status!: 'UPCOMING' | 'ACTIVE' | 'COMPLETED'
// }

// Challenge.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true
//     },
//     start_date: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     end_date: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     creator_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User,
//         key: 'id'
//       }
//     },
//     target_calories: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     target_workouts: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     status: {
//       type: DataTypes.ENUM('UPCOMING', 'ACTIVE', 'COMPLETED'),
//       defaultValue: 'UPCOMING'
//     }
//   },
//   {
//     sequelize,
//     modelName: 'challenge',
//     timestamps: true
//   }
// )

// export default Challenge