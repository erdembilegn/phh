/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AssessmentController } from './controllers/Assessment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AwardController } from './controllers/Award.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GamificationController } from './controllers/Gamification.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GradeController } from './controllers/Grade.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GroupController } from './controllers/Group.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './controllers/User.controller';
import { expressAuthentication } from './utils/Authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "GenericError": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreateAssessment": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestCreateAssessment": {
        "dataType": "refObject",
        "properties": {
            "assessmentName": {"dataType":"string","required":true},
            "createdUser": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetAssessment": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamifications":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamificationEndDate":{"dataType":"datetime","required":true},"gamificationStartDate":{"dataType":"datetime","required":true},"gamificationId":{"dataType":"string","required":true}}},"required":true},"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"assessmentName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUpdateAssessment": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"gamifications":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamificationEndDate":{"dataType":"datetime","required":true},"gamificationStartDate":{"dataType":"datetime","required":true},"gamificationId":{"dataType":"string","required":true}}},"required":true},"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"assessmentName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestUpdateAssessment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "assessmentName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestDeleteAssessment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreateAward": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestCreateAward": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "image": {"dataType":"string","required":true},
            "createdUser": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetAward": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamifications":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamificationEndDate":{"dataType":"datetime","required":true},"gamificationStartDate":{"dataType":"datetime","required":true},"gamificationId":{"dataType":"string","required":true}}},"required":true},"image":{"dataType":"string","required":true},"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetAwardById": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUpdateAward": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"image":{"dataType":"string","required":true},"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestUpdateAward": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "image": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestDeleteAward": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreateGamification": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestCreateGamification": {
        "dataType": "refObject",
        "properties": {
            "gamificationName": {"dataType":"string","required":true},
            "gamificationStartDate": {"dataType":"datetime","required":true},
            "gamificationEndDate": {"dataType":"datetime","required":true},
            "groupId": {"dataType":"string","required":true},
            "awards": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"awardMaxPercentage":{"dataType":"double","required":true},"awardMinPercentage":{"dataType":"double","required":true},"awardId":{"dataType":"string","required":true}}},"required":true},
            "assessments": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"assessmentPercentage":{"dataType":"double","required":true},"assessmentId":{"dataType":"string","required":true}}},"required":true},
            "createdUser": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetGamification": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"assessments":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"assessmentPercentage":{"dataType":"double","required":true},"assessmentId":{"dataType":"string","required":true}}},"required":true},"awards":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"awardMaxPercentage":{"dataType":"double","required":true},"awardMinPercentage":{"dataType":"double","required":true},"awardId":{"dataType":"string","required":true}}},"required":true},"groupId":{"dataType":"string","required":true},"gamificationEndDate":{"dataType":"datetime","required":true},"gamificationStartDate":{"dataType":"datetime","required":true},"gamificationName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreateGrade": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestCreateGrade": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "assessmentId": {"dataType":"string","required":true},
            "gamificationId": {"dataType":"string","required":true},
            "gradeNumber": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetGrade": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gradeNumber":{"dataType":"double","required":true},"gamificationId":{"dataType":"string","required":true},"assessmentId":{"dataType":"string","required":true},"userId":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreateGroup": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestCreateGroup": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "createdUser": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetGroup": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"gamifications":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamificationId":{"dataType":"string","required":true}}},"required":true},"users":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},"required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetAllGroup": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"gamifications":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamificationId":{"dataType":"string","required":true}}},"required":true},"users":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},"required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUpdateGroup": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"datetime","required":true},"createdAt":{"dataType":"datetime","required":true},"createdUser":{"dataType":"string","required":true},"gamifications":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"gamificationId":{"dataType":"string","required":true}}},"required":true},"users":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},"required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestUpdateGroup": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestDeleteGroup": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreateUser": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Role": {
        "dataType": "refEnum",
        "enums": ["Student","Teacher","Admin"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestCreateUser": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "groupId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "role": {"ref":"Role","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetUser": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"groupId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestGetUser": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetUserById": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"groupId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetUserByRoleGroup": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"groupId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestGetUserByRoleGroup": {
        "dataType": "refObject",
        "properties": {
            "role": {"dataType":"string","required":true},
            "groupId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseGetAllUser": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"groupId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUpdateUser": {
        "dataType": "refObject",
        "properties": {
            "error": {"ref":"GenericError"},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"groupId":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"email":{"dataType":"string","required":true},"lastName":{"dataType":"string","required":true},"firstName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestUpdateUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "password": {"dataType":"string"},
            "groupId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "role": {"ref":"Role"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestDeleteUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/templateApi/assessment/create',
            ...(fetchMiddlewares<RequestHandler>(AssessmentController)),
            ...(fetchMiddlewares<RequestHandler>(AssessmentController.prototype.createAssessment)),

            function AssessmentController_createAssessment(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestCreateAssessment"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AssessmentController();


              const promise = controller.createAssessment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/assessment/get',
            ...(fetchMiddlewares<RequestHandler>(AssessmentController)),
            ...(fetchMiddlewares<RequestHandler>(AssessmentController.prototype.getAssessment)),

            function AssessmentController_getAssessment(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AssessmentController();


              const promise = controller.getAssessment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/templateApi/assessment/update',
            ...(fetchMiddlewares<RequestHandler>(AssessmentController)),
            ...(fetchMiddlewares<RequestHandler>(AssessmentController.prototype.updateAssessment)),

            function AssessmentController_updateAssessment(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestUpdateAssessment"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AssessmentController();


              const promise = controller.updateAssessment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/templateApi/assessment/delete',
            ...(fetchMiddlewares<RequestHandler>(AssessmentController)),
            ...(fetchMiddlewares<RequestHandler>(AssessmentController.prototype.deleteAssessment)),

            function AssessmentController_deleteAssessment(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestDeleteAssessment"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AssessmentController();


              const promise = controller.deleteAssessment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/award/create',
            ...(fetchMiddlewares<RequestHandler>(AwardController)),
            ...(fetchMiddlewares<RequestHandler>(AwardController.prototype.createAward)),

            function AwardController_createAward(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestCreateAward"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AwardController();


              const promise = controller.createAward.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/award/get',
            ...(fetchMiddlewares<RequestHandler>(AwardController)),
            ...(fetchMiddlewares<RequestHandler>(AwardController.prototype.getAward)),

            function AwardController_getAward(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AwardController();


              const promise = controller.getAward.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/award/getAwardById/:awardId',
            ...(fetchMiddlewares<RequestHandler>(AwardController)),
            ...(fetchMiddlewares<RequestHandler>(AwardController.prototype.getAwardById)),

            function AwardController_getAwardById(request: any, response: any, next: any) {
            const args = {
                    awardId: {"in":"path","name":"awardId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AwardController();


              const promise = controller.getAwardById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/templateApi/award/update',
            ...(fetchMiddlewares<RequestHandler>(AwardController)),
            ...(fetchMiddlewares<RequestHandler>(AwardController.prototype.updateAward)),

            function AwardController_updateAward(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestUpdateAward"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AwardController();


              const promise = controller.updateAward.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/templateApi/award/delete',
            ...(fetchMiddlewares<RequestHandler>(AwardController)),
            ...(fetchMiddlewares<RequestHandler>(AwardController.prototype.deleteAward)),

            function AwardController_deleteAward(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestDeleteAward"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AwardController();


              const promise = controller.deleteAward.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/Gamification/create',
            ...(fetchMiddlewares<RequestHandler>(GamificationController)),
            ...(fetchMiddlewares<RequestHandler>(GamificationController.prototype.createGamification)),

            function GamificationController_createGamification(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestCreateGamification"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GamificationController();


              const promise = controller.createGamification.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/Gamification/get',
            ...(fetchMiddlewares<RequestHandler>(GamificationController)),
            ...(fetchMiddlewares<RequestHandler>(GamificationController.prototype.getGamification)),

            function GamificationController_getGamification(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GamificationController();


              const promise = controller.getGamification.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/grade/create',
            ...(fetchMiddlewares<RequestHandler>(GradeController)),
            ...(fetchMiddlewares<RequestHandler>(GradeController.prototype.createGrade)),

            function GradeController_createGrade(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"dataType":"array","array":{"dataType":"refObject","ref":"RestCreateGrade"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GradeController();


              const promise = controller.createGrade.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/grade/get',
            ...(fetchMiddlewares<RequestHandler>(GradeController)),
            ...(fetchMiddlewares<RequestHandler>(GradeController.prototype.getGrade)),

            function GradeController_getGrade(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GradeController();


              const promise = controller.getGrade.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/group/create',
            ...(fetchMiddlewares<RequestHandler>(GroupController)),
            ...(fetchMiddlewares<RequestHandler>(GroupController.prototype.createGroup)),

            function GroupController_createGroup(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestCreateGroup"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupController();


              const promise = controller.createGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/group/get/:groupId',
            ...(fetchMiddlewares<RequestHandler>(GroupController)),
            ...(fetchMiddlewares<RequestHandler>(GroupController.prototype.getGroup)),

            function GroupController_getGroup(request: any, response: any, next: any) {
            const args = {
                    groupId: {"in":"path","name":"groupId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupController();


              const promise = controller.getGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/group/getAllGroup',
            ...(fetchMiddlewares<RequestHandler>(GroupController)),
            ...(fetchMiddlewares<RequestHandler>(GroupController.prototype.getAllGroups)),

            function GroupController_getAllGroups(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupController();


              const promise = controller.getAllGroups.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/templateApi/group/update',
            ...(fetchMiddlewares<RequestHandler>(GroupController)),
            ...(fetchMiddlewares<RequestHandler>(GroupController.prototype.updateGroup)),

            function GroupController_updateGroup(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestUpdateGroup"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupController();


              const promise = controller.updateGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/templateApi/group/delete',
            ...(fetchMiddlewares<RequestHandler>(GroupController)),
            ...(fetchMiddlewares<RequestHandler>(GroupController.prototype.deleteGroup)),

            function GroupController_deleteGroup(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestDeleteGroup"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupController();


              const promise = controller.deleteGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/user/create',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            function UserController_createUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestCreateUser"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.createUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/user/getUser',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUser)),

            function UserController_getUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestGetUser"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/user/getUserById/:userId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserById)),

            function UserController_getUserById(request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUserById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/templateApi/user/getUserbyRoleGroupId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserByRoleGroup)),

            function UserController_getUserByRoleGroup(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestGetUserByRoleGroup"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUserByRoleGroup.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/templateApi/user/get',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getAllUser)),

            function UserController_getAllUser(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getAllUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/templateApi/user/update',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            function UserController_updateUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestUpdateUser"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.updateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/templateApi/user/delete',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            function UserController_deleteUser(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"body","name":"req","required":true,"ref":"RestDeleteUser"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.deleteUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
