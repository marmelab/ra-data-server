import express from "express";
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
} from "ra-core";

enum DataProviderTypes {
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

const dataProviderTypes: DataProviderTypes[] = [
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

export type DataProviderHandler = {
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

type Params<type> = type extends "getList"
    ? GetListParams
    : type extends DataProviderTypes.getList
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

export const expressDataProvider = (handler: DataProviderHandler) => {
    const app = express();
    app.post("/", (req, res, next) => {
        const type: DataProviderTypes = req.body.type;
        const resource = req.body.resource;
        const params: Params<typeof type> = req.body.params;

        if (!dataProviderTypes.includes(type)) {
            return next();
        }

        switch (type) {
            case "getList":
                return handler
                    .getList(
                        resource,
                        params as Params<DataProviderTypes.getList>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "getOne":
                return handler
                    .getOne(
                        resource,
                        params as Params<DataProviderTypes.getOne>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "getMany":
                return handler
                    .getMany(
                        resource,
                        params as Params<DataProviderTypes.getMany>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "getManyReference":
                return handler
                    .getManyReference(
                        resource,
                        params as Params<DataProviderTypes.getManyReference>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "update":
                return handler
                    .update(
                        resource,
                        params as Params<DataProviderTypes.update>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "updateMany":
                return handler
                    .updateMany(
                        resource,
                        params as Params<DataProviderTypes.updateMany>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "create":
                return handler
                    .create(
                        resource,
                        params as Params<DataProviderTypes.create>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "delete":
                return handler
                    .delete(
                        resource,
                        params as Params<DataProviderTypes.delete>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
            case "deleteMany":
                return handler
                    .deleteMany(
                        resource,
                        params as Params<DataProviderTypes.deleteMany>
                    )
                    .then((response) => {
                        res.status(response.status);
                        res.json(response.body);
                    })
                    .catch(next);
        }
    });

    return app;
};
