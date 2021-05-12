import React from 'react';

// @ts-ignore
import {Meta, Story} from '@storybook/react/types-6-0';
// @ts-ignore
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProvederDecorator';
import App from './App';

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story= () => <App />;

export const AppExample = Template.bind({});



