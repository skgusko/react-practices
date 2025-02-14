import React, {useState} from 'react';
import Tabs from './Tabs';
import TabView from './TabView';
import {Tab_Box} from './assets/scss/TabBox.scss';
import data from './assets/json/data';

function TabBox(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const selectTab = (no) => {
        setActiveIndex(data.findIndex((e) => e.no === no)); //data.js 한 줄 씩 가져옴
    }

    return (
        <div className={Tab_Box}>
            <Tabs 
                selectTab={selectTab}
                tabs={data.map((e, i) => { // map 이므로 새 배열
                    const {contents, ...rest} = e;
                    rest.active = (i === activeIndex);
                    return rest;
                })}/>
            <TabView 
                contents={data[activeIndex].contents}
            />
        </div>
    );
}

export default TabBox;