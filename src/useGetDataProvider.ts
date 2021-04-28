import { fetchUtils } from "react-admin";

const getDataProviderCall = (type, host) => (resource, params) => {
    return fetchUtils
        .fetchJson(host, {
            method: "POST",
            body: JSON.stringify({ type, resource, params }),
        })
        .then(({ json }) => {
            return json;
        });
};

export const useGetDataProvider = (host) => {
    const dataProvider = {
        getList: getDataProviderCall("getList", host),
        getOne: getDataProviderCall("getOne", host),
        getMany: getDataProviderCall("getMany", host),
        getManyReference: getDataProviderCall("getManyReference", host),
        update: getDataProviderCall("update", host),
        updateMany: getDataProviderCall("updateMany", host),
        create: getDataProviderCall("create", host),
        delete: getDataProviderCall("delete", host),
        deleteMany: getDataProviderCall("deleteMany", host),
    };

    return dataProvider;
};
