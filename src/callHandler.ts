import { DataProviderServerProxy, DataProviderTypes, Params } from "./types";

export const callHandler = async (
    handler: DataProviderServerProxy,
    type: DataProviderTypes,
    resource: string,
    params: Params<typeof type>
) => {
    switch (type) {
        case "getList":
            return handler.getList(
                resource,
                params as Params<DataProviderTypes.getList>
            );
        case "getOne":
            return handler.getOne(
                resource,
                params as Params<DataProviderTypes.getOne>
            );
        case "getMany":
            return handler.getMany(
                resource,
                params as Params<DataProviderTypes.getMany>
            );
        case "getManyReference":
            return handler.getManyReference(
                resource,
                params as Params<DataProviderTypes.getManyReference>
            );
        case "update":
            return handler.update(
                resource,
                params as Params<DataProviderTypes.update>
            );
        case "updateMany":
            return handler.updateMany(
                resource,
                params as Params<DataProviderTypes.updateMany>
            );
        case "create":
            return handler.create(
                resource,
                params as Params<DataProviderTypes.create>
            );
        case "delete":
            return handler.delete(
                resource,
                params as Params<DataProviderTypes.delete>
            );
        case "deleteMany":
            return handler.deleteMany(
                resource,
                params as Params<DataProviderTypes.deleteMany>
            );
    }
    throw new Error(`Invalid action type: ${type}`);
};
