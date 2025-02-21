import { BelongsToManyAddAssociationMixinOptions, BelongsToManyRemoveAssociationMixinOptions, DataTypes, FindOptions, Model } from 'sequelize'
import { sequelize } from '../../config/database'

interface UserAttributes {
  id: string;
  email: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
 
  public getFollowers!: (options?: FindOptions) => Promise<User[]>;
  public getFollowing!: (options?: FindOptions) => Promise<User[]>;
  public addFollower!: (follower: User, options?: BelongsToManyAddAssociationMixinOptions) => Promise<void>;
  public addFollowing!: (following: User, options?: BelongsToManyAddAssociationMixinOptions) => Promise<void>;
  public removeFollower!: (follower: User, options?: BelongsToManyRemoveAssociationMixinOptions) => Promise<void>;
  public removeFollowing!: (following: User, options?: BelongsToManyRemoveAssociationMixinOptions) => Promise<void>;
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
