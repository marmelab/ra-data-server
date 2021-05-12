import React, { useState, useEffect } from "react";
import {
    Show,
    ShowButton,
    SimpleShowLayout,
    RichTextField,
    DateField,
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    EditButton,
    SimpleForm,
    TextInput,
    Filter,
    useDataProvider,
} from "react-admin";

const PostFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const PostList = (props: any) => (
    <List {...props} filters={<PostFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }: any) => {
    return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = (props: any) => {
    const dataprovider = useDataProvider();
    const [queryCount, setQueryCount] = useState(0);

    useEffect(() => {
        dataprovider
            .countRequestSinceServerStart()
            .then((r: any) => setQueryCount(r.data));
    }, []);

    return (
        <Edit title={<PostTitle />} {...props}>
            <SimpleForm>
                <p>query Count: {queryCount}</p>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput multiline source="body" />
            </SimpleForm>
        </Edit>
    );
};

export const PostCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

export const PostShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
);
