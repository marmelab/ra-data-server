import { useEffect, useState } from "react";
import { ComponentHTTPClient } from "@layr/component-http-client";

const getDataProvider = async (host) => {
    const client = new ComponentHTTPClient(host);
    const DataProvider = await client.getComponent();

    return new DataProvider();
};

export const useGetDataProvider = (host) => {
    const [dataProvider, setDataProvider] = useState();

    useEffect(() => {
        getDataProvider(host).then((dataProvider) =>
            setDataProvider(dataProvider)
        );
    }, [host, setDataProvider]);

    if (dataProvider) {
        console.log(dataProvider.getList("posts", {}));
        dataProvider.getList("posts", {}).then(console.log);
    }

    return dataProvider;
};
