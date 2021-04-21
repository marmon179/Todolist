import React from 'react';

// @ts-ignore
import {Meta, Story} from '@storybook/react/types-6-0';
// @ts-ignore
import {action} from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProvederDecorator';

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story= () => <AppWithRedux />;

export const AppWithReduxExample = Template.bind({});



