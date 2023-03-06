import { Request, Response } from 'express'
import { tLogin } from '../interfaces/login.interfaces'
import { createLoginService } from '../services/login/login.services'


export const createLoginController = async (req: Request, res: Response): Promise<Response> => {

    const loginData: tLogin = req.body

    const token = await createLoginService(loginData)

    return res.json({
        token: token
    })

}