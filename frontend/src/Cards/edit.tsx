import { Edit, SimpleForm } from "react-admin";
import { useInput } from 'react-admin';
import { JsonSchemaForm } from "@react-admin/ra-json-schema-form";
import { RichTextInput, DefaultEditorOptions } from 'ra-input-rich-text';

import ImageResize  from 'tiptap-imagresize'

import { JsonField, JsonInput } from "react-admin-json-view";



const EditForm = (props) => (
    <Edit {...props}>
      <SimpleForm style={{ width: '100% !important' }}>
        <JsonInput
          source="root"
          style={{ width: '100% !important' }}
        //   validate={[required()]}
          jsonString={false} // Set to true if the value is a string, default: false
          reactJsonOptions={{
            // Props passed to react-json-view
            name: null,
            collapsed: false,
            enableClipboard: false,
            // theme: 'monokai',
            displayDataTypes: false,
            style: { width: '100% !important' }
            // displayDataTypes: false,
          }}
        />
        <RichTextInput
            source="test"
            // editorOptions={{
            //     ...DefaultEditorOptions,
            //     extensions: [
            //         ...DefaultEditorOptions.extensions,
            //         ImageResize.configure({ resizeIcon: <>ResizeMe</>})
            //     ],
            // }}
        />
      </SimpleForm>
    </Edit>
  );

export default EditForm;