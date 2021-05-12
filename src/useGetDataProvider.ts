import { DataProviderProxy, fetchUtils } from "ra-core";

import {
    DataProviderTypes,
    Params,
    Result,
    ServerHandlerToFrontHandler,
    DataProviderServerProxy,
} from "./types";

function getDataProviderCall<T extends DataProviderTypes | string>(
    type: T,
    host: string
) {
    return function (resource: string, params: Params<T>): Promise<Result<T>> {
        return fetchUtils
            .fetchJson(host, {
                method: "POST",
                body: JSON.stringify({ type, resource, params }),
            })
            .then(({ json }: { json: Result<T> }) => {
                return json;
            });
    };
}

export const useGetDataProvider = <T extends DataProviderServerProxy>(
    host: string
): ServerHandlerToFrontHandler<T> => {
    const handler = {
        get: function (object: any, key: string) {
            if (key in object) {
                return object[key];
            }

            return getDataProviderCall(key, host);
        },
    };

    const dataProvider: DataProviderProxy = {
        getList: getDataProviderCall<DataProviderTypes.getList>(
            DataProviderTypes.getList,
            host
        ),
        getOne: getDataProviderCall(DataProviderTypes.getOne, host),
        getMany: getDataProviderCall(DataProviderTypes.getMany, host),
        getManyReference: getDataProviderCall(
            DataProviderTypes.getManyReference,
            host
        ),
        update: getDataProviderCall(DataProviderTypes.update, host),
        updateMany: getDataProviderCall(DataProviderTypes.updateMany, host),
        create: getDataProviderCall(DataProviderTypes.create, host),
        delete: getDataProviderCall(DataProviderTypes.delete, host),
        deleteMany: getDataProviderCall(DataProviderTypes.deleteMany, host),
    };

    return new Proxy(dataProvider, handler);
};
