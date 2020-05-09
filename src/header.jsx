import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    isopened: false,
  };
  handelClick = () => {
    let isopened = this.state.isopened;
    isopened = !isopened;
    this.setState({ isopened });
  };

  render() {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    const { itemcart } = this.props;
    return (
      <div className="header">
        {/* <!-- upper header --> */}
        <div className="header__upper">
          {/* <!-- container --> */}
          <div className="container">
            {/* <!-- contact info --> */}
            <ul className="list list--hr list--hr-separator">
              <li className="list__item">
                <span className="info">
                  {/* <!-- icon --> */}
                  <i className="info__icon far fa-dot-circle"></i>
                  {/* <!-- info --> */}
                  <span className="info__data">
                    1234 Street Name, City Name
                  </span>
                </span>
              </li>
              <li className="list__item">
                <Link className="info">
                  {/* <!-- icon --> */}
                  <i className="info__icon fab fa-whatsapp"></i>
                  {/* <!-- info --> */}
                  <span className="info__data">123-456-7890</span>
                </Link>
              </li>
              <li className="list__item">
                <Link className="info">
                  {/* <!-- icon --> */}
                  <i className="info__icon far fa-envelope"></i>
                  {/* <!-- info --> */}
                  <span className="info__data">mail@domain.com</span>
                </Link>
              </li>
            </ul>
            {/* <!-- side menu --> */}
            <ul className="list list--hr">
            <li className="list__item">
                <Link className="link" to="/login">
                  {/* <!-- icon --> */}
                  <i className="link__icon fas fa-angle-right"></i>
                  {/* <!-- info --> */}
                  Login
                </Link>
              </li>
              <li className="list__item">
                <Link className="link">
                  {/* <!-- icon --> */}
                  <i className="link__icon fas fa-angle-right"></i>
                  {/* <!-- info --> */}
                  About Us
                </Link>
              </li>
              
              <li className="list__item">
                <Link className="link">
                  {/* <!-- icon --> */}
                  <i className="link__icon fas fa-angle-right"></i>
                  {/* <!-- info --> */}
                  Contact Us
                </Link>
              </li>
              {/* <!-- languges --> */}
              <li className="list__item">
                {/* <!-- drop down --> */}
                {/* <!-- to oppen dropdown dropdown--opened --> */}
                <div className="dropdown ">
                  {/* <!-- header --> */}
                  <div className="dropdown__header">
                    <Link className="link">
                      <img className="flag flag-us" src="" alt="" />
                      English
                    </Link>
                    <i className="fas fa-angle-down"></i>
                  </div>

                  {/* <!-- items --> */}
                  <div className="dropdown__body">
                    <ul className="dropdown__items list">
                      <li className="dropdown__item list__item">
                        <Link className="link">
                          <img className="flag flag-us" src="" alt="" />
                          English
                        </Link>
                      </li>
                      <li className="dropdown__item list__item">
                        <Link className="link">
                          <img className="flag flag-es" src="" alt="" />
                          Español
                        </Link>
                      </li>
                      <li className="dropdown__item list__item">
                        <Link className="link">
                          <img className="flag flag-fr" src="" alt="" />
                          Française
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- middle header --> */}
        <div className="header__middle container">
          {/* <!-- logo --> */}
          <Link className="header__logo-box">
            <img className="header__logo" src="/img/logo.png" alt="" />
          </Link>
          {/* <!-- user options --> */}
          <div className="header__user-options">
            {/* <!-- login control --> */}
            {!token?(

            <Link to="/login" className="link">
              Login
            </Link>
            ):(
            <span> Welcome</span>
            )}
            <div className="dropdown">
              <div className="dropdown__header">
                <div
                  className="image image--small image--circle"
                  style={{
                    backgroundImage: 'url("/img/myPhoto.jpeg")',
                  }}
                ></div>
              </div>
              <div className="dropdown__body"></div>
            </div>
            {/* <!-- shopping card dropdown --> */}
            {/* <!-- dropdown--opened to open --> */}
            <div
              className={
                this.state.isopened === false
                  ? "dropdown dropdown--left"
                  : "dropdown dropdown--left  dropdown--opened"
              }
              onClick={this.handelClick}
            >
              {/* *****************************************************************
               *************************** */}
              {/* <!-- header --> */}
              <div className="dropdown__header">
                <div
                  className="image image--small"
                  style={{
                    backgroundImage: 'url("/img/icons/icon-cart-big.svg")',
                  }}
                >
                  <div className="notification notification--danger">
                    {itemcart.length}
                  </div>
                </div>
              </div>
              {/* <!-- body --> */}
              <div className="dropdown__body">
                {/* <!-- items --> */}
                <ul className="dropdown__items list list--vr-separator">
                  {itemcart.map((item) => (
                    <li key={item.id} className="dropdown__item list__item">
                      {/* <!-- item small 2 --> */}
                      <div className="item-small-1">
                        {/* <!-- item data --> */}
                        <div className="item-small-1__data">
                          {/* <!-- title --> */}
                          <Link className="item-small-1__title">
                            {item.name}
                          </Link>
                          {/* <!-- price --> */}
                          <span className="item-small-1__description">
                            {item.price}
                          </span>
                        </div>
                        {/* <!-- item image --> */}
                        <div className="item-small-1__image-box">
                          <Link
                            className="item-small-1__image image"
                            style={{
                              backgroundImage:
                                `url(${item.image})`,
                            }}
                          ></Link>
                          <Link className="item-small-1__action">
                            <i className="fas fa-times"></i>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <!-- totals --> */}
                <div className="separator"></div>
                <div className="block">
                  <span className="lable">Total:</span>
                  <span className="lable">1000</span>
                </div>
                {/* <!-- actions --> */}
                <div className="block list list--hr">
                  <Link className="list-item btn btn--gray">View Cart</Link>
                  <Link className="list-item btn btn--primary">Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- lower header --> */}
        <div className="header__lower container">
          {/* <!-- navigation --> */}
          <nav className="nav">
            <ul className="nav__items list list--hr">
              {/* <!-- items --> */}
              <li className="nav__item">
                <Link className="nav__link">Home</Link>
              </li>
              <li className="nav__item dropdown ">
                {/* <!-- title --> */}
                <Link className="nav__link dropdown__header">Products</Link>
                {/* <!-- items --> */}
                <div className="dropdown__body">
                  <ul className=" list">
                    <li className="list__item">
                      <Link className="nav__inner-link" to="/product-listing">
                        Product Listing
                      </Link>
                    </li>
                    {user&&(
                    <li className="list__item">
                      <Link className="nav__inner-link" to="/add-product">
                        Add Product
                      </Link>
                    </li>

                    )}
                  </ul>
                </div>
              </li>
              <li className="nav__item">
                <Link className="nav__link">Contact Us</Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link">About Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
