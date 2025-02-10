import React from 'react';
import TabItem from './TabItem';

function Tabs({tabs}) {
    console.log(tabs);
    return (
            <ul>
                {tabs.map((tab, index) => <TabItem key={index} name={tab.name} active={tab.active}/>)}
            </ul>
    );
}

export default Tabs;