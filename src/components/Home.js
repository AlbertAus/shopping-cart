import 'react-app-polyfill/ie11';
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addToCart, updateCart, deleteFromCart } from "../actions/actions";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AutoWidthCalculator } from "ag-grid-community";
import { Card, CardTitle, CardText, CardActions, Button } from 'react-md';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "ID", field: "id"
            }, {
                headerName: "User ID", field: "userId"
            }, {
                headerName: "Title", field: "title"
            }, {
                headerName: "Body", field: "body", resizable: true,
            }],
            // rowData: [{
            //     product: "Toyota", quantity: "Celica", unitCost: 35000
            // }, {
            //     product: "Ford", quantity: "Mondeo", unitCost: 32000
            // }, {
            //     product: "Porsche", quantity: "Boxter", unitCost: 72000
            // }]
            // rowData: this.props.shoppingCart.cart
            rowData: [],
            username: '',
            age: null,
        }
    }

    componentDidMount() {
        console.log("After componentDidMount:", this.props);
        this.props.addToCart("Apple", "1kg", "$2.5");
        this.props.addToCart("Pear", "1kg", "$0.5");
        fetch('https://login.sypht.com/oauth/token', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "*"
            },
            body:
            {
                "client_id": "SO6VcVu71YmCUAvXFKj0p2N9j79hfNh2",
                "client_secret": "FFtOxCQwcdlCFXWEfpgIoltHJG-D3kmoDwLQQxSN5NF50MV0Ju2Ze0xGlgpLXZK3",
                "audience": "https://api.sypht.com",
                "grant_type": "client_credentials"
            },
            json: true
        })
            .then(response => response.json())
            .then(data => this.setState({ rowData: data }));

        fetch("../data/data.json", {
            headers: {
                "Accept": 'application/json'
            },
            json: true
        })
            .then(response => response.json())
            .then(data => {console.log('Data is: ', data)});
    }

    // click1() {
    //     console.log("After clicking the 'Click Me' text: ", this.selectValue());
    //     this.props.deleteFromCart(this.selectValue());
    // }

    showShoppingCart() {
        return (
            <div>
                Another way to call javaScript function outside: {JSON.stringify(this.props.shoppingCart.cart, ['product', 'quantity', 'unitCost'])}
            </div>

        );

    }

    selectValue() {
        const selectedValue = document.getElementById("products");
        console.log("Selected Value is: ", selectedValue);
        if (selectedValue.value === null) {
            console.log("selectedValue is null!")
            return;
        } else {
            console.log("Not null selected Value is: ", selectedValue.value);
            // return selectedValue.value;
            this.props.deleteFromCart(selectedValue.value);
            document.getElementById("note").innerHTML = "The item you have deleted is: <font color='red'>" + selectedValue.value + "</font>";
            console.log("rowData after clicked the 'Delete selected Item' is: ", this.state.rowData);
        }

        fetch('https://login.sypht.com/oauth/token', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            },
            body:
            {
                "client_id": "SO6VcVu71YmCUAvXFKj0p2N9j79hfNh2",
                "client_secret": "FFtOxCQwcdlCFXWEfpgIoltHJG-D3kmoDwLQQxSN5NF50MV0Ju2Ze0xGlgpLXZK3",
                "audience": "https://api.sypht.com",
                "grant_type": "client_credentials"
            },
            json: true
        })
            .then(response => response.json())
            .then(data => this.setState({ rowData: data }));
    }

    addToCart() {
        const product = document.getElementById("product").value;
        const quantity = document.getElementById("quantity").value;
        const unitCost = document.getElementById("unitCost").value;
        console.log("product is:" + product + "\nquantity is: " + quantity + "\nunitCost is: " + unitCost + "\n");
        this.props.addToCart(product, quantity, unitCost);
        console.log("this.props.shoppingCart is: " + JSON.stringify(this.props.shoppingCart) + "\n");
    }

    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        console.log("name is: ", nam + ", Value is: " + val);
        this.setState({ [nam]: val });
    }

    shouldComponentUpdate() {
        if (this.state.username === "abc") {
            return false
        } else {
            return true
        }
    }
    downloadImg(){
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');
        img.onload = function (e) {
            canvas.width = img.width;
            canvas.height = img.height;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height);

            if(canvas.msToBlob){
                var blob = canvas.msToBlob();
                window.navigator.msSaveBlob(blob, 'image.png');
            }else{
                var link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download = 'image.png';
                document.body.appendChild(link);
                link.click();
            }
            
        }
        img.src = 'image.png';
    }

    
    setFilterDownload(){
       
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');
        img.onload = function (e) {
           canvas.width = img.width;
           canvas.height = img.height;
           var context = canvas.getContext('2d');
           context.drawImage(img, 0, 0, img.width, img.height);
           if(canvas.msToBlob){
              var blob = canvas.msToBlob();
              window.navigator.msSaveBlob(blob, 'image.png');
           }else{
              var link = document.createElement('a');
              link.href = canvas.toDataURL();
              link.download ='image.png';
              document.body.appendChild(link);
              link.click();
           }
        }
        img.src = 'image.png';
     
     }

    render() {
        const { products, shoppingCart } = this.props;

        console.log("This.props is:" + JSON.stringify(this.props) + "\n\nproducts is: " + JSON.stringify(products) + "\n\nshoppingCart is: " + JSON.stringify(shoppingCart) + "\n\n");
        const tifOptions = Object.keys(this.props.shoppingCart.cart).map(key =>
            <option key={key} value={this.props.shoppingCart.cart[key].product}>{this.props.shoppingCart.cart[key].product}, Price: {this.props.shoppingCart.cart[key].unitCost}</option>
        )

        const cardActions = [];
        for (let i = 0; i < 5; i++) {
            cardActions.push(
                <CardActions>
                    <Button flat label="Action 1" />
                    <Button flat label="Action 2" />
                </CardActions>
            )
        }

        const numberList = []
        for (let i = 0; i < 10; i++) {
            numberList.push(<li>I is {i}</li>)
        }


        return (
            <div>
                Home <br />
                <ul>
                    {numberList}
                </ul>

                <form>
                    <h1>Helllo {this.state.username} is {this.state.age} years old.</h1>
                    <p>Enter your name:</p>
                    <input
                        type='text'
                        name='username'
                        onChange={this.onChangeHandler}
                    />

                    <input
                        type='text'
                        name='age'
                        onChange={this.onChangeHandler}
                    />
                </form>

                {this.showShoppingCart()}
                shoppingCart JSON: {JSON.stringify(this.props.shoppingCart.cart, ['product', 'quantity', 'unitCost'])} <br />

                <label htmlFor="products">Choose Products: </label>
                <select id="products" name="products">{tifOptions}</select>
                <br />

                Product Name: <input type="text" id="product" name="product" /><br />
                Quantity: <input type="text" id="quantity" name="quantity" /><br />
                Unit Cost: <input type="text" id="unitCost" name="unitCost" /><br />
                <ul>
                    <li><Link to='/hello/1'>hello</Link></li>
                </ul>
                <button onClick={this.selectValue.bind(this)}>Delete selected Item</button>
                <button onClick={this.addToCart.bind(this)}>Add To Cart</button>
                <button onClick={this.downloadImg.bind(this)}>download Img</button>
                <button type="button" className={`btn dialog-btn-download guroo-btn`}  onClick={this.setFilterDownload}>Download</button>

                <div id="note"></div>

                <div
                    className="ag-theme-balham"
                    style={{
                        height: '500px',
                        width: 'calc(100% - 20px)',
                        margin: '10px'
                    }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>

                <div className="md-grid">
                    <Card className="md-block-centered">
                        <CardTitle title="Hello World!" />
                        <CardText>
                            Lorem ipsum... pretend more ...
                            </CardText>
                        {cardActions}
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        shoppingCart: state.shoppingCart,
    }
}


//Same as the following
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ addToCart, updateCart, deleteFromCart }, dispatch);
// }
//Same as the following

//Same as above, shortening usuage
const mapDispatchToProps = {
    addToCart,
    updateCart,
    deleteFromCart
}
//Same as above, shortening usuage


export default connect(mapStateToProps, mapDispatchToProps)(Home);