import React from 'react';
import Header from './Header';
import styled from 'styled-components'

import './assets/scss/App.scss'; //global 처리 해서 변수로 안 받아도됨

const DivApp = styled.div`
  text-align: center;
  color: #111;
`;

export default function() {
    return (
        <DivApp>
            <Header />
        </DivApp>
    );
}