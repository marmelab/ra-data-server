import express from "express";

const dataProviderTypes = [
    "getList",
    "getOne",
    "getMany",
    "getManyReference",
    "update",
    "updateMany",
    "create",
    "delete",
    "deleteMany",
];

export const expressDataProvider = (handler) => {
    const app = express();
    app.post("/", (req, res, next) => {
        const { type, resource, params } = req.body;
        if (!dataProviderTypes.includes(type)) {
            return next();
        }

        handler[type](resource, params)
            .then((response) => {
                res.status(response.status);
                res.json(response.body);
            })
            .catch(next);
    });

    return app;
};
