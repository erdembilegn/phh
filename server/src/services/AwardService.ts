import { clearConfigCache } from 'prettier';
import { ResponseCreateAward, ResponseGetAward } from '../interfaces/award/response.interface';
import { Assessment, RestCreateAward, RestGetAward } from '../interfaces/award/rest.interface';
import { PrismaClient } from "@prisma/client";
import logger from 'morgan';

const prisma = new PrismaClient().award
export class AwardService {
    public async CreateAward(req: RestCreateAward) : Promise<ResponseCreateAward> {
        try {
            const assessment : Assessment[] = []
            req.assessment.forEach((item)=> {
                assessment = {
                    
                }
            })
            console.log(assessment)
            const award = await prisma.create({
                data: {
                    awardName : req.awardName,
                    awardPicure : req.awardPicture,
                    assessment : req.assessment.map((item)=>{
                        item.assessmentName,
                        item.assessmantMin,
                        item.assessmentMax
                    })
                }
            })

            if(!award) return {error: {
                message: 'Award not created'
            }}

        return {data: {awardId: '123'}}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }

    public async GetAward(req: RestGetAward) : Promise<ResponseGetAward> {
        try {
            
            const award = await prisma.findUnique({
                where: {
                    awardId : req.awardId
                }
            })
            if(!award) return {error: {
                message: 'User not found'
            }}
        
            return {data: {
                awardId: award.awardId,
                awardName: award.awardName,
                awardPicture: award.awardPicure,
            }}
        } catch (error) {
            return {error: {
                message: (error as Error).message
            }}
        }
    }
}