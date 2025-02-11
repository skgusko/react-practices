import React from 'react';
import Header from './Header';
import './assets/scss/App.scss'; //global 처리 해서 변수로 안 받아도됨

export default function() {
    return (
        <div id={'App'}>
            <Header />
        </div>
    );
}