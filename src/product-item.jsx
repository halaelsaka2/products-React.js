import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  state = {};

  
  render() {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")
    // console.log(user.id);
    // console.log(token);
    const { item, onclick, deleteHandler } = this.props;
    return (
      
      <React.Fragment>
      {/* <span>{item.id}hala{user.id}</span> */}
        <div className="item-medium-1">
          <div className="item-medium-1__alert">Sale</div>
          <div
            className="item-medium-1__image image"
            style={{
              backgroundImage: `url(/${item.image})`,
            }}
          >
            <Link
              className="item-medium-1__action"
              onClick={() => onclick(item)}
            >
              Add to Cart
            </Link>
          </div>
          <Link>
            <h4>{item.name}</h4>
            <div className="flex-row">
              <div>
                <del>{item.price}</del>
                <span className="lable">${item.price - item.discount}</span>
              </div>
            </div>
          </Link>
          <div className="crud-actions">
            <Link to={`/productDetails/${item.id}`}>
              <i className="far fa-eye"></i>
            </Link>
            {token!== null && item.userId===user.id&&(
              <React.Fragment>
            <Link to={`/edit/${item.id}`}>
              <i className="fas fa-edit"></i>
            </Link>
            <Link>
              <i
                className="fas fa-trash-alt"
                onClick={() => deleteHandler(item)}
              ></i>
            </Link>
            </React.Fragment>
            ) }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Item;
