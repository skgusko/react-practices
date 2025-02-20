import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Routes, Route, BrowserRouter} from 'react-router';
import Main from './component/Main';
import Guestbook from './component/Guestbook';
import Gallery from './component/Gallery';
import Error404 from './component/Error404';

export default function App() {
    return (
        /*/
        <HashRouter>
            <Routes>
                <Route path={'/'} element={<Main />} />
                <Route path={'/guestbook'} element={<Guestbook />} />
                <Route path={'/gallery'} element={<Gallery />} />
                <Route path={'*'} element={<Error404 />} />
            </Routes>
        </HashRouter>
        /*/

        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Main />} />
                <Route path={'/guestbook'} element={<Guestbook />} />
                <Route path={'/gallery'} element={<Gallery />} />
                <Route path={'*'} element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
    
}