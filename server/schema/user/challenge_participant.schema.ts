// import { DataTypes, Model } from 'sequelize'
// import { sequelize } from '../../config/database'
// import User from '../user/user.schema'
// import Challenge from './user_challengle.schema'


// interface ChallengeParticipantAttributes {
//   id: string
//   challenge_id: string
//   user_id: string
//   status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
//   current_calories: number
//   current_workouts: number
//   last_updated: Date
// }

// class ChallengeParticipant extends Model<ChallengeParticipantAttributes> {
//   public id!: string
//   public challenge_id!: string
//   public user_id!: string
//   public status!: 'PENDING' | 'ACCEPTED' | 'REJECTED'
//   public current_calories!: number
//   public current_workouts!: number
//   public last_updated!: Date
// }

// ChallengeParticipant.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4
//     },
//     challenge_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: Challenge,
//         key: 'id'
//       }
//     },
//     user_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User,
//         key: 'id'
//       }
//     },
//     status: {
//       type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
//       defaultValue: 'PENDING'
//     },
//     current_calories: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0
//     },
//     current_workouts: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0
//     },
//     last_updated: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW
//     }
//   },
//   {
//     sequelize,
//     modelName: 'challenge_participant',
//     timestamps: true
//   }
// )

// // Set up associations
// Challenge.belongsToMany(User, {
//   through: ChallengeParticipant,
//   as: 'participants'
// })

// User.belongsToMany(Challenge, {
//   through: ChallengeParticipant,
//   as: 'challenges'
// })

// Challenge.belongsTo(User, {
//   foreignKey: 'creator_id',
//   as: 'creator'
// })

// export default ChallengeParticipant