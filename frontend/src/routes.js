import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/incidents/new' component={NewIncident}/>
                <Route path='*' component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );  
}