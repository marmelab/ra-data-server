import express from "express";

import {
    DataProviderServerProxy,
    DataProviderTypes,
    Params,
    dataProviderTypes,
} from "./types";

export const expressDataProvider = (handler: DataProviderServerProxy) => {
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
