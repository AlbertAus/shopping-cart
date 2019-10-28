import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Hello extends Component {
    callAPI() {
        fetch('https://login.sypht.com/oauth/token', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // method: 'POST',
            // mode:'cors',
            body:
            {
                client_id: "SO6VcVu71YmCUAvXFKj0p2N9j79hfNh2",
                client_secret: "FFtOxCQwcdlCFXWEfpgIoltHJG-D3kmoDwLQQxSN5NF50MV0Ju2Ze0xGlgpLXZK3",
                audience: "https://api.sypht.com",
                grant_type: "client_credentials"
            },
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Origin': "http://localhost:3000",
            //     'Access-Control-Allow-Methods':"GET, POST, PUT, DELETE, OPTIONS",
            //     'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            //     "Access-Control-Allow-Credentials": "true",

            // },
            json: true
        })
            .then(response => response.json())
            .then(data => this.setState({ rowData: data }));
    }
    render() {

        return (
            <div>
                Hello world!!!
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li onClick={this.callAPI.bind(this)}>Call the API</li>
                </ul>
            </div>
        )
    }
}