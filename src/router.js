import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import todoList from './component/todo_list'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={todoList} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;