import * as React from "react";
import { 
    List, SimpleShowLayout, Datagrid, EditButton, DateTimeInput, DeleteWithConfirmButton, 
    TextField, NumberField, SearchInput,SelectInput, Filter, TextInput, DateField, RichTextField,
    SingleFieldList, ArrayField, ChipField,
 } from 'react-admin';

 import { cloneElement } from 'react'

const PostFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput label="Is Active" source="isActive" alwaysOn choices={[
            { id: '1', name: 'Active' },
            { id: '0', name: 'Inactive' },
        ]} />
        <DateTimeInput source="createdAt" alwaysOn />
    </Filter>
);
    
const PostPanel = () => (
    <SimpleShowLayout>
        <TextField source="apr.cashAdvance.fee" />
        <TextField source="apr.cashAdvance.gracePeriod" />
        <TextField source="apr.cashAdvance.rate" />
    </SimpleShowLayout>
);

const AccountsList = (props: any) => (
    <List {...props} filters={<PostFilter />} >
        <Datagrid expand={<PostPanel />}>
            <NumberField source="id" sortable={false} />
            <TextField source="cardName" sortable={false} />
            {/* <ArrayField source="creditCardTypes" perPage={5}>
                <SingleFieldList linkType={false}>
                    <ChipField source="text" size="small" />
                </SingleFieldList>
            </ArrayField> */}
            <TextField source="isActive" sortable={false} />
            <DateField source="createdAt" options={{ year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }} sortable={false} />
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export default AccountsList;