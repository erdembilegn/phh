import { JsonArray } from "@prisma/client/runtime/library";

export interface RestCreateAward{
    awardId: string;
    awardName: string;
    awardPicture : string;
    assessment : Assessment[];
}

export interface RestGetAward {
    awardId: string;
}

export interface Assessment {
    assessmentName : string;
    assessmantMin : number;
    assessmentMax : number;
}