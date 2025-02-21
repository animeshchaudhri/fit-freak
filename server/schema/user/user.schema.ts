import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/database'

interface UserAttributes {
  id: string;
  email: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  
  // Declare association methods
  public getFollowers!: () => Promise<User[]>;
  public getFollowing!: () => Promise<User[]>;
  public addFollower!: (follower: User) => Promise<void>;
  public addFollowing!: (following: User) => Promise<void>;
  public removeFollower!: (follower: User) => Promise<void>;
  public removeFollowing!: (following: User) => Promise<void>;
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
);

// Set up self-referential many-to-many relationship
User.belongsToMany(User, {
  as: 'followers',
  through: 'UserFollowers',
  foreignKey: 'followingId',
  otherKey: 'followerId'
});

User.belongsToMany(User, {
  as: 'following',
  through: 'UserFollowers',
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

export default User
