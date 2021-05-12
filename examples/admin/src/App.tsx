import React from "react";
import { Admin, Resource } from "react-admin";
import { PostList, PostEdit, PostCreate, PostShow } from "./posts";
import { useGetDataProvider } from "../../../src/useGetDataProvider";
import { Handler } from "../../server/src/handlers";
import Layout from "./Layout";

export const App = () => {
    const dataProvider = useGetDataProvider<Handler>(
        "http://localhost:3001/admin"
    );

    return (
        <Admin
            dataProvider={dataProvider}
            title="Example Admin"
            layout={Layout}
        >
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Admin>
    );
};
