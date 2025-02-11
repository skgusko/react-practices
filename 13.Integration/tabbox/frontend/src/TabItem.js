import React from 'react';
import { active } from './assets/scss/TabBox.scss';

function TabItem({name, isActive}) {
    return (
        <li className={isActive ? active : ''}>
            {name}
        </li>
    );
}

export default TabItem;