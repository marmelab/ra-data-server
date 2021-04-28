import { fetchUtils } from "react-admin";
import { DataProviderProxy, Record } from "ra-core";

import { DataProviderTypes, Params, Result } from "./types";

function getDataProviderCall<T extends DataProviderTypes>(
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

export const useGetDataProvider = (host: string) => {
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

    return dataProvider;
};
