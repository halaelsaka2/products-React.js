import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "./services/user";

class Login extends Component {
  state = {
    userAccount: {
      userName: "",
      password: "",
    },
    errors: {
      err: "",
    },
  };

  handelChange = (e) => {
    let userAccount = { ...this.state.userAccount };
    userAccount[e.target.name] = e.target.value;
    this.setState({ userAccount });
    // console.log(this.state.userAccount);
  };
  handelLogin = async (e) => {
    e.preventDefault();
    let errors = { ...this.state.errors };
    const res = await LoginUser(this.state.userAccount).catch((err) => {
      if (err.response) {
        errors.err = err.response.data.message;
      }
    });
    this.props.nameHandler(res.user.userName);
    this.setState({errors})
    if (res !== undefined) {
      this.props.history.push("/product-listing");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form className="login">
            <h4 className="login__header">I'M A RETURNING CUSTOMER</h4>
            <div className="form-group">
              <label htmlFor=""> Username </label>
              <input
                className="form-control"
                type="text"
                name="userName"
                value={this.state.userAccount.userName}
                onChange={(e) => this.handelChange(e)}
              />
            </div>
            <div className="form-group login__Password">
              {/* <a href="#" className="login__forget-password">
                (Forget Password?)
              </a> */}
              <label htmlFor="">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.userAccount.password}
                onChange={(e) => this.handelChange(e)}
              />
            </div>
            <div className="login__remember-me">
              {/* <div className="form-group__checkbox">
                <input type="checkbox" name="" id="" />
                <span>Remember Me</span>
              </div> */}
              <div className="add-product__actions">
                <Link to="/product-listing" className="btn btn--gray">
                  Cancel
                </Link>
                <Link
                  onClick={this.handelLogin}
                  to="/product-listing"
                  className="btn btn--primary"
                >
                  Login
                </Link>
              </div>
            </div>
            <Link to="/register" className="link login__register-now">
              Register Now
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
