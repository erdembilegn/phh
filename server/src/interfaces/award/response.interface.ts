import { JsonArray } from "@prisma/client/runtime/library";
import { GenericError } from "../main.interface";
import { Assessment } from "./rest.interface";

export interface ResponseCreateAward {
    error?: GenericError
    data?: {
        awardId: string;
    }
}

export interface ResponseGetAward {
    error?: GenericError
    data?: {
        awardId: string;
        awardName: string;
        awardPicture : string;
    }
}