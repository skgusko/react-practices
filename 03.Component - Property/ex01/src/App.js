import React from 'react';
import './assets/css/styles.css';
import GroceryList from './GroceryList';

function App(props) {
    return (
        <div id={'App'}>
            <h1 >{'Grocery List'}</h1>
            <p> GroceryList 컴포넌트 작성하기</p>
            <GroceryList/>
        </div>
    );
}

export default App;