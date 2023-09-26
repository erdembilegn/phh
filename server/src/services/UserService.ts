import { ResponseCreateUser, ResponseGetUser } from "../interfaces/user/response.interface";
import { RestCreateUser, RestGetUser } from "../interfaces/user/rest.interface";
import { PrismaClient } from "@prisma/client";
import { encryptPassword, verifyPassword } from "../utils";
import logger from 'morgan';

export class UserService {

    private userRepository = new PrismaClient().user

    public async CreateUser(req: RestCreateUser) : Promise<ResponseCreateUser> {
        try {
            const password = encryptPassword(req.password)
            const user = await this.userRepository.create({
                data: {
                    email: req.email,
                    firstName: req.firstName,
                    lastName: req.lastName,
                    password
                }
            })

            if(!user) return {error: {
                message: 'User not created'
            }}

        return {data: {id: user.id}}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }

    public async GetUser(req: RestGetUser) : Promise<ResponseGetUser> {
        try {
            const password = encryptPassword(req.password)
            const user = await this.userRepository.findUnique({
                where: {
                    email: req.email,
                    password
                }
            })
            if(!user) return {error: {
                message: 'User not found'
            }}
            const verified = password === user.password
            return verified ? {data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }} : {error: {
                message: 'Password is incorrect'
            }}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }
}