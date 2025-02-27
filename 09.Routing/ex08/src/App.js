import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import './assets/scss/App.scss'
import Main from "./component/Main";
import Guestbook from "./component/Guestbook";
import About from "./component/About";
import Error404 from "./component/Error404";
import {Gallery} from "./component/gallery";
import { SiteLayout } from './layout';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<SiteLayout />}>
                    <Route path='' element={<Main />}/>
                    <Route path='gallery' element={<Gallery />}/>
                    <Route path='guestbook' element={<Guestbook />}/>
                    <Route path='about' element={<About />}/>
                    <Route path='*' element={<Error404 />}/>
                </Route>
            </Routes>
        </Router>
    );
}