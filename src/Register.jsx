import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "./services/user";

class Register extends Component {
  state = {
    newUserAccount: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    backEndErrors:[]
  };
  handelChange = (e) => {
    let newUserAccount = { ...this.state.newUserAccount };
    newUserAccount[e.target.name] = e.target.value;
    this.setState({ newUserAccount });
  };
  handelRegister = async (e) => {
    e.preventDefault();
    console.log(this.state.newUserAccount);
    let backEndErrors=[...this.state.backEndErrors]
    const res = await RegisterUser(this.state.newUserAccount).catch((err) =>
      {
        if (err.response) {
          backEndErrors = err.response.data.details;
        }
      }
    );
    this.setState({backEndErrors})
    if (res) {
      this.props.history.push("/login");
      console.log(res);
    }
  };
  render() {
    // const {backEndErrors}=this.state
    return (
      <React.Fragment>
        <div className="container">
          <form className="login">
            <h4 className="login__header">Register An Account</h4>
            <div className="form-group">
              <label htmlFor="">UserName</label>
              <input
                className="form-control"
                type="text"
                name="userName"
                value={this.state.newUserAccount.userName}
                onChange={(e) => this.handelChange(e)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={this.state.newUserAccount.password}
                  onChange={(e) => this.handelChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Re-enter Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={this.state.newUserAccount.confirmPassword}
                  onChange={(e) => this.handelChange(e)}
                />
              </div>
            </div>

            <div className="login__remember-me">
              <div className="add-product__actions">
                <Link to="/product-listing" className="btn btn--gray">
                  Cancel
                </Link>
                <Link
                  to="#"
                  onClick={this.handelRegister}
                  className="btn btn--primary"
                >
                  Register
                </Link>
              </div>
            </div>
            <Link to="/login" className="link login__register-now">
              You are alredy a member?
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
