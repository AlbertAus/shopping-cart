import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../components/Home";
import Hello from "../components/Hello";

export default class GetRoute extends Component{
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/hello/:id' component={Hello}></Route>
                </Switch>
            </div>
        )
    }
}