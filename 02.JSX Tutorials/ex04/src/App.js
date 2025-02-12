import React, {useRef, useState} from 'react';
import Header from './Header';

function App() {
   
    const refDiv = useRef(null); //{current: null}
    const [test, setTest] = useState('hello');
    return (
        <div 
            id="App"
            ref={refDiv}>
            {'Test'}
        </div>
    );
    
    // return React.createElement('div', {id: 'App'}, 'Test');
    // return React.createElement('div', {id: 'App'}, React.createElement(Header, null), React.createElement(Contents, null));
}

export {App};