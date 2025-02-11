import React from 'react';
import TabItem from './TabItem';

function Tabs({tabs}) {
    console.log(tabs);
    return (
        <ul>
            {
                tabs.map(tab => <TabItem
                                    key={tab.no}
                                    name={tab.name}
                                    isActive={tab.active}/>)
            }
        </ul>
    );
}

export default Tabs;