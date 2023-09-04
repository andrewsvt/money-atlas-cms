import React from 'react';
import { Create, SimpleForm, TextInput, RadioButtonGroupInput, NumberInput } from 'react-admin';
import { JsonField, JsonInput } from "react-admin-json-view";
import { RichTextInput } from 'ra-input-rich-text';

const required = (value: any) => value ? undefined : 'Required';

export const CardCreate = (props: any) => (
    <Create {...props} redirect="list">
        <SimpleForm>
        <JsonInput
            
            source="root"
        //   source={{
        //     test: 123
        //   }}
          style={{ width: '100% !important' }}
        //   validate={[required()]}
          jsonString={false} // Set to true if the value is a string, default: false
          reactJsonOptions={{
            // Props passed to react-json-view
            name: null,
            collapsed: false,
            enableClipboard: false,
            theme: 'monokai',
            displayDataTypes: false,
            style: { width: '100% !important' },
            src: { test: 123 }
            // displayDataTypes: false,
          }}
        />
        </SimpleForm>
    </Create>
);

export default CardCreate;