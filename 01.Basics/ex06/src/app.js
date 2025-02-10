import React from 'react'; //react API 써야 하므로

function App() {
    // const App = React.createElement('div', null, "Hello World~!", 10, parseInt('20'));
    // return App;
    return (
        <div>
            {'Hello World~!'}
            {10}
            {parseInt('20')}
            <p>
                {'test'}
                <span>
                    {'test2'}
                </span>
            </p>
        </div>
    );
}

export {App};