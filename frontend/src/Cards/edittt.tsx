import * as React from "react";
import { Edit, SimpleForm,RichTextField,  TextInput,AutocompleteArrayInput, SimpleFormIterator, ArrayInput,  DateInput, RadioButtonGroupInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required, NumberInput } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';

import { RichTextInput } from 'ra-input-rich-text';

const PostEdit = (props: any) => {
    return (
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm>
                <TextInput disabled source="id" fullWidth />
                <TextInput disabled source="displayName" fullWidth />
                <TextInput disabled source="cardName" fullWidth />
                <TextInput disabled source="rawLogoImageUrl" fullWidth />
                <TextInput disabled source="termsAndConditionsLink" fullWidth />
                <TextInput disabled source="bonusMilesFull" fullWidth />
                <TextInput disabled source="rewardsDescriptionLong" fullWidth />
                <TextInput disabled source="regApr" fullWidth />
                <TextInput disabled source="regAprType" fullWidth />
                <TextInput disabled source="annualFees" fullWidth />
                <TextInput disabled source="creditScoreNeeded" fullWidth />
                <TextInput disabled source="cardProcessorTypeName" fullWidth />
                <TextInput disabled source="introAprRate" fullWidth  />
                <TextInput disabled source="introAprDuration" fullWidth/>
                <TextInput disabled source="serviceCardId" fullWidth />
                <TextInput source="slug" fullWidth />
                <TextInput source="ctaButtonText" fullWidth />
                <NumberInput source="editorRating" fullWidth />
                <RichTextInput source="ppcDescription" fullWidth/>
                <RichTextInput source="pros" fullWidth />
                <RichTextInput source="cons" fullWidth />
                <TextInput multiline source="badgeText" fullWidth />
                <TextInput source="link" fullWidth />
                <RichTextInput source="reviewSectionText" fullWidth/>
                <TextInput multiline source="creditCardType" fullWidth />
                <RadioButtonGroupInput source="isActive" choices={[
                    { id: 1, name: 'active' },
                    { id: 0, name: 'inactive' },
                ]} />
            </SimpleForm>
        </Edit>
    );
}

export default PostEdit;