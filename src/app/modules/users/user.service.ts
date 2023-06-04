import { IUser } from './user.interface'
import { User } from './user.model'
import config from '../../../config/index'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user)

  //generate a auto incremental id
  const id = await generateUserId()
  user.id = id

  //default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  if (!createUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default {
  createUser,
}
