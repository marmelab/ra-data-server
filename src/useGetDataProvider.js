import { useEffect, useState } from "react";

export const useGetDataProvider = (host) => {
    const [dataProvider, setDataProvider] = useState();

    useEffect(() => {
        const client = new ComponentHTTPClient(host);

        client.getComponent().then(setDataProvider);
    }, [host, setDataProvider]);

    return dataProvider;
};
