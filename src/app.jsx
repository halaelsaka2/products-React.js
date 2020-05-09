import React, { Component } from "react";
import { Route } from "react-router-dom";

import Header from "./header";
import Login from "./login";
import ProductListing from "./product-listing";
import AddProduct from "./add-product";
import ProductDetails from "./productDetails";
import Register from "./Register";

class App extends Component {
  state = {
    itemCart: [],
    name:""
  };

  
  nameHandler=(loggedName)=>{
    const name = loggedName;
    this.setState({name})
  }
  addHandler = (item) => {
    console.log(item);

    const itemCart = [...this.state.itemCart];
      itemCart.push(item);
    console.log(itemCart);
    this.setState({ itemCart });
  };
  render() {
    return (
      <React.Fragment>
        <Header itemcart={this.state.itemCart} name={this.state.name}/>
        <Route path="/login" render={(props) => (
          <Login nameHandler={this.nameHandler} {...props} />
          )}   />
        <Route
          path="/product-listing"
          render={(props) => (
            <ProductListing onhandelAdd={this.addHandler} {...props} />
            )}
        />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/edit/:id" component={AddProduct} />
        <Route
          path="/productdetails/:id"
          render={(props) => (
            <ProductDetails addHandler={this.addHandler} {...props} />
            )}
        />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={ProductListing} />
      </React.Fragment>
    );
  }
}

export default App;
