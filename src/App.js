import React from 'react';
import Dashboard from './containers/Dashboard/Dashboard';


function App() {

    return (
        <Dashboard/>
    );
}

export default App;
export let baseUrl = process.env.REACT_APP_BACKEND_URL;