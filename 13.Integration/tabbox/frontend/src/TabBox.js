import React from 'react';
import Tabs from './Tabs';
import TabView from './TabView';
import tabs from './assets/json/data';

function TabBox(props) {

    return (
        <div className={"tab-box"}>
            <Tabs tabs={tabs}/>
            <TabView />
        </div>
    );
}

export default TabBox;