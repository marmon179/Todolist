import React from 'react';

// @ts-ignore
import {Meta, Story} from '@storybook/react/types-6-0';
// @ts-ignore
import {action} from '@storybook/addon-actions';
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Value EditableSpan change'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args: EditableSpanPropsType) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('Value EditableSpan change')
};


