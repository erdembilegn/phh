import { ResponseCreateUser, ResponseGetUser } from "../interfaces/user/response.interface";
import { RestCreateUser, RestGetUser } from "../interfaces/user/rest.interface";
import { PrismaClient } from "@prisma/client";
import { encryptPassword, verifyPassword } from "../utils";
import logger from 'morgan';
import { group } from "console";

const prisma = new PrismaClient().user
export class UserService {


    public async CreateUser(req: RestCreateUser) : Promise<ResponseCreateUser> {
        try {
            const password = encryptPassword(req.password)
            const user = await prisma.create({
                data: {
                    email: req.email,
                    firstName: req.firstName,
                    lastName: req.lastName,
                    password,
                    role: req.role,
                    groupId : req.groupId
                }
            })

            if(!user) return {error: {
                message: 'User not created'
            }}

        return {data: {id: user.userId}}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }

    public async GetUser(req: RestGetUser) : Promise<ResponseGetUser> {
        try {
            const password = encryptPassword(req.password)
            const user = await prisma.findUnique({
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
                id: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role : user.role,
                groupId : user.groupId
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