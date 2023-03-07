import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { tUserReturn, tUserUpdate } from "../../interfaces/users.interfaces"
import { returnUserSchema } from "../../schemas/users.schemas"

export const updateUserService = async (newUserData: tUserUpdate, idUser: number): Promise<tUserReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData = await userRepository.findOneBy({
        id: idUser
    })

    const { admin, ...userDataWithoutIdAndAdmin } = newUserData;

    const user = userRepository.create({
        ...oldUserData,
        ...userDataWithoutIdAndAdmin
    })

    await userRepository.save(user)

    const updatedUser = returnUserSchema.parse(user)

    return updatedUser

}

