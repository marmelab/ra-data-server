import React from "react";
import { Admin, Resource } from "react-admin";
import { PostList, PostEdit, PostCreate, PostShow } from "./posts";
import { getDataProvider } from "../../../src/getDataProvider";
import { Handler } from "../../server/src/handlers";
import Layout from "./Layout";

const dataProvider = getDataProvider<Handler>("http://localhost:3001/admin");

export const App = () => {
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
