/* tslint:disable */
/* eslint-disable */
/**
 * spa-server-template
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface GenericError
 */
export interface GenericError {
    /**
     * 
     * @type {string}
     * @memberof GenericError
     */
    'message': string;
}
/**
 * 
 * @export
 * @interface ResponseCreateUser
 */
export interface ResponseCreateUser {
    /**
     * 
     * @type {GenericError}
     * @memberof ResponseCreateUser
     */
    'error'?: GenericError;
    /**
     * 
     * @type {ResponseCreateUserData}
     * @memberof ResponseCreateUser
     */
    'data'?: ResponseCreateUserData;
}
/**
 * 
 * @export
 * @interface ResponseCreateUserData
 */
export interface ResponseCreateUserData {
    /**
     * 
     * @type {string}
     * @memberof ResponseCreateUserData
     */
    'id': string;
}
/**
 * 
 * @export
 * @interface ResponseGetUser
 */
export interface ResponseGetUser {
    /**
     * 
     * @type {GenericError}
     * @memberof ResponseGetUser
     */
    'error'?: GenericError;
    /**
     * 
     * @type {ResponseGetUserData}
     * @memberof ResponseGetUser
     */
    'data'?: ResponseGetUserData;
}
/**
 * 
 * @export
 * @interface ResponseGetUserById
 */
export interface ResponseGetUserById {
    /**
     * 
     * @type {GenericError}
     * @memberof ResponseGetUserById
     */
    'error'?: GenericError;
    /**
     * 
     * @type {ResponseGetUserData}
     * @memberof ResponseGetUserById
     */
    'data'?: ResponseGetUserData;
}
/**
 * 
 * @export
 * @interface ResponseGetUserData
 */
export interface ResponseGetUserData {
    /**
     * 
     * @type {string}
     * @memberof ResponseGetUserData
     */
    'groupId': string;
    /**
     * 
     * @type {string}
     * @memberof ResponseGetUserData
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof ResponseGetUserData
     */
    'lastName': string;
    /**
     * 
     * @type {string}
     * @memberof ResponseGetUserData
     */
    'firstName': string;
    /**
     * 
     * @type {string}
     * @memberof ResponseGetUserData
     */
    'id': string;
}
/**
 * 
 * @export
 * @interface RestCreateUser
 */
export interface RestCreateUser {
    /**
     * 
     * @type {string}
     * @memberof RestCreateUser
     */
    'firstName': string;
    /**
     * 
     * @type {string}
     * @memberof RestCreateUser
     */
    'lastName': string;
    /**
     * 
     * @type {string}
     * @memberof RestCreateUser
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof RestCreateUser
     */
    'password': string;
    /**
     * 
     * @type {string}
     * @memberof RestCreateUser
     */
    'groupId': string;
}
/**
 * 
 * @export
 * @interface RestGetUser
 */
export interface RestGetUser {
    /**
     * 
     * @type {string}
     * @memberof RestGetUser
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof RestGetUser
     */
    'password': string;
}

/**
 * CreateUserApi - axios parameter creator
 * @export
 */
export const CreateUserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {RestCreateUser} restCreateUser 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (restCreateUser: RestCreateUser, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'restCreateUser' is not null or undefined
            assertParamExists('createUser', 'restCreateUser', restCreateUser)
            const localVarPath = `/user/create`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(restCreateUser, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CreateUserApi - functional programming interface
 * @export
 */
export const CreateUserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CreateUserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {RestCreateUser} restCreateUser 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(restCreateUser: RestCreateUser, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseCreateUser>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(restCreateUser, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CreateUserApi - factory interface
 * @export
 */
export const CreateUserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CreateUserApiFp(configuration)
    return {
        /**
         * 
         * @param {RestCreateUser} restCreateUser 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(restCreateUser: RestCreateUser, options?: any): AxiosPromise<ResponseCreateUser> {
            return localVarFp.createUser(restCreateUser, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CreateUserApi - object-oriented interface
 * @export
 * @class CreateUserApi
 * @extends {BaseAPI}
 */
export class CreateUserApi extends BaseAPI {
    /**
     * 
     * @param {RestCreateUser} restCreateUser 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CreateUserApi
     */
    public createUser(restCreateUser: RestCreateUser, options?: AxiosRequestConfig) {
        return CreateUserApiFp(this.configuration).createUser(restCreateUser, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * GetUserApi - axios parameter creator
 * @export
 */
export const GetUserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {RestGetUser} restGetUser 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (restGetUser: RestGetUser, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'restGetUser' is not null or undefined
            assertParamExists('getUser', 'restGetUser', restGetUser)
            const localVarPath = `/user/getUser`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(restGetUser, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GetUserApi - functional programming interface
 * @export
 */
export const GetUserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetUserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {RestGetUser} restGetUser 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(restGetUser: RestGetUser, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseGetUser>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(restGetUser, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * GetUserApi - factory interface
 * @export
 */
export const GetUserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetUserApiFp(configuration)
    return {
        /**
         * 
         * @param {RestGetUser} restGetUser 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(restGetUser: RestGetUser, options?: any): AxiosPromise<ResponseGetUser> {
            return localVarFp.getUser(restGetUser, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetUserApi - object-oriented interface
 * @export
 * @class GetUserApi
 * @extends {BaseAPI}
 */
export class GetUserApi extends BaseAPI {
    /**
     * 
     * @param {RestGetUser} restGetUser 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetUserApi
     */
    public getUser(restGetUser: RestGetUser, options?: AxiosRequestConfig) {
        return GetUserApiFp(this.configuration).getUser(restGetUser, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * GetUserByIdApi - axios parameter creator
 * @export
 */
export const GetUserByIdApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserById: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('getUserById', 'userId', userId)
            const localVarPath = `/user/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication jwt required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GetUserByIdApi - functional programming interface
 * @export
 */
export const GetUserByIdApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetUserByIdApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserById(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseGetUserById>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUserById(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * GetUserByIdApi - factory interface
 * @export
 */
export const GetUserByIdApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetUserByIdApiFp(configuration)
    return {
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserById(userId: string, options?: any): AxiosPromise<ResponseGetUserById> {
            return localVarFp.getUserById(userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetUserByIdApi - object-oriented interface
 * @export
 * @class GetUserByIdApi
 * @extends {BaseAPI}
 */
export class GetUserByIdApi extends BaseAPI {
    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetUserByIdApi
     */
    public getUserById(userId: string, options?: AxiosRequestConfig) {
        return GetUserByIdApiFp(this.configuration).getUserById(userId, options).then((request) => request(this.axios, this.basePath));
    }
}



