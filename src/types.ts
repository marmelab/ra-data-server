import {
    Record,
    GetListParams,
    GetListResult,
    GetOneParams,
    GetOneResult,
    GetManyParams,
    GetManyResult,
    GetManyReferenceParams,
    GetManyReferenceResult,
    UpdateParams,
    UpdateResult,
    UpdateManyParams,
    UpdateManyResult,
    CreateParams,
    CreateResult,
    DeleteParams,
    DeleteResult,
    DeleteManyParams,
    DeleteManyResult,
    DataProviderProxy as RaDataProviderProxy,
} from "ra-core";

export type DataProviderProxy = RaDataProviderProxy;

export enum DataProviderTypes {
    "getList" = "getList",
    "getOne" = "getOne",
    "getMany" = "getMany",
    "getManyReference" = "getManyReference",
    "update" = "update",
    "updateMany" = "updateMany",
    "create" = "create",
    "delete" = "delete",
    "deleteMany" = "deleteMany",
}

export const dataProviderTypes: DataProviderTypes[] = [
    "getList" as DataProviderTypes.getList,
    "getOne" as DataProviderTypes.getOne,
    "getMany" as DataProviderTypes.getMany,
    "getManyReference" as DataProviderTypes.getManyReference,
    "update" as DataProviderTypes.update,
    "updateMany" as DataProviderTypes.updateMany,
    "create" as DataProviderTypes.create,
    "delete" as DataProviderTypes.delete,
    "deleteMany" as DataProviderTypes.deleteMany,
];

export type Response = {};

type StatusCode = 200 | 400 | 401 | 403 | 404 | 500;

export type DataProviderServerProxy = {
    getList: <RecordType extends Record = Record>(
        resource: string,
        params: GetListParams
    ) => Promise<{
        body: GetListResult<RecordType>;
        status: StatusCode;
    }>;

    getOne: <RecordType extends Record = Record>(
        resource: string,
        params: GetOneParams
    ) => Promise<{ body: GetOneResult<RecordType>; status: StatusCode }>;

    getMany: <RecordType extends Record = Record>(
        resource: string,
        params: GetManyParams
    ) => Promise<{ body: GetManyResult<RecordType>; status: StatusCode }>;

    getManyReference: <RecordType extends Record = Record>(
        resource: string,
        params: GetManyReferenceParams
    ) => Promise<{
        body: GetManyReferenceResult<RecordType>;
        status: StatusCode;
    }>;

    update: <RecordType extends Record = Record>(
        resource: string,
        params: UpdateParams
    ) => Promise<{ body: UpdateResult<RecordType>; status: StatusCode }>;

    updateMany: (
        resource: string,
        params: UpdateManyParams
    ) => Promise<{ body: UpdateManyResult; status: StatusCode }>;

    create: <RecordType extends Record = Record>(
        resource: string,
        params: CreateParams
    ) => Promise<{ body: CreateResult<RecordType>; status: StatusCode }>;

    delete: <RecordType extends Record = Record>(
        resource: string,
        params: DeleteParams
    ) => Promise<{ body: DeleteResult<RecordType>; status: StatusCode }>;

    deleteMany: (
        resource: string,
        params: DeleteManyParams
    ) => Promise<{ body: DeleteManyResult; status: StatusCode }>;
};

export type Params<type> = type extends "getList"
    ? GetListParams
    : type extends DataProviderTypes.getList
    ? GetOneParams
    : type extends DataProviderTypes.getOne
    ? GetOneParams
    : type extends DataProviderTypes.getMany
    ? GetManyParams
    : type extends DataProviderTypes.getManyReference
    ? GetManyReferenceParams
    : type extends DataProviderTypes.update
    ? UpdateParams
    : type extends DataProviderTypes.updateMany
    ? UpdateManyParams
    : type extends DataProviderTypes.create
    ? CreateParams
    : type extends DataProviderTypes.delete
    ? DeleteParams
    : type extends DataProviderTypes.deleteMany
    ? DeleteManyParams
    : never;

export type Result<type> = type extends "getList"
    ? GetListResult<any>
    : type extends DataProviderTypes.getList
    ? GetOneResult<any>
    : type extends DataProviderTypes.getMany
    ? GetManyResult<any>
    : type extends DataProviderTypes.getManyReference
    ? GetManyReferenceResult<any>
    : type extends DataProviderTypes.update
    ? UpdateResult<any>
    : type extends DataProviderTypes.updateMany
    ? UpdateManyResult
    : type extends DataProviderTypes.create
    ? CreateResult<any>
    : type extends DataProviderTypes.delete
    ? DeleteResult<any>
    : type extends DataProviderTypes.deleteMany
    ? DeleteManyResult
    : never;
