import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addProduct, getById ,updateProduct} from "./services/products";
import { GetAllCategories } from "./services/Categories";

class AddProduct extends Component {
  state = {
    product: {
      name: "",
      price: "",
      discount: "",
      description: "",
      paymentType: "",
      status: "",
      image: "",
      categoryId: "",
    },
    categoryName:"",
    categories: [],
  };
  async componentDidMount() {    
    const id = this.props.match.params.id;
    if (id) {
      const product1 = await getById(id);
      const categoryName = product1.categoryId.name;
      const categoryId = product1.categoryId.id
      const product ={...product1,categoryId} 
      this.setState({product ,categoryName});
      console.log(categoryName);
    }
    const categories = await GetAllCategories();
    this.setState({ categories });
  }

  changeHandler = (event) => {
    let { name, value } = event.target;
    const changedInput = { [name]: value };
    const product = { ...this.state.product, ...changedInput };
    this.setState({ product });

    this.setState({ product });
  };

  onsubmit = async (e) => {
    
    e.preventDefault();
    const id = this.props.match.params.id;
    const product = { ...this.state.product };
      console.log(product);
    if(id){
    await updateProduct(id,product);
    }else{
      await addProduct(product);
    }
    this.props.history.push("/product-listing");
  };
  paymenTypeHandler = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      const paymentType = { paymentType: name };
      const product = { ...this.state.product, ...paymentType };
      this.setState({ product });
    } else {
      const paymentType = { paymentType: "" };
      const product = { ...this.state.product, ...paymentType };

      this.setState({ product });
    }
  };

  categoryHandler = (event) => {
    const { value } = event.target;
    const categoryId = value;
    console.log(categoryId+"inHandeler")
    const product = { ...this.state.product, categoryId};
    this.setState({ product });
  };

  render() {
    const { categories, product ,categoryName} = this.state;
    const id = this.props.match.params.id
    return (
      <React.Fragment>
        <div className=" container">
          <form className="add-product" onSubmit={this.onsubmit}>
            <div className="add-product__images slider">
              <div className="add-product__image-actions">
                <div className="add-product__image-action">
                  <Link>
                    <i className="fas fa-plus-square"></i>
                  </Link>
                  <Link>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Link>
                    <i className="fas fa-trash-alt"></i>
                  </Link>
                </div>
              </div>
              <div className="slider__items">
                <div
                  className="slider__item active"
                  style={{
                    backgroundImage:`url(/${id?product.image:"img/products/product-grey-7.jpg"}`
                  }}
                ></div>
              </div>
              
            </div>
            <div className="add-product__data">
              <div className="form-controls">
                <section className="tabs">
                  <div className="tabs__headers">
                    <div className="tabs__header active">English</div>
                    <div className="tabs__header">Arabic</div>
                  </div>
                  <div className="tabs__bodies">
                    <div className="tabs__body active">
                      <div className="form-group invalid">
                        <label htmlFor="name">Name</label>
                        <input
                          className="form-control"
                          value={product.name}
                          type="text"
                          name="name"
                          id="name"
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="form-control"
                          value={product.description}
                          name="description"
                          id="description"
                          cols="30"
                          rows="4"
                          onChange={this.changeHandler}
                        ></textarea>
                      </div>
                    </div>
                    <div className="tabs__body ">
                      <div className="form-group invalid">
                        <label htmlFor="">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name=""
                          id=""
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea
                          className="form-control"
                          name=""
                          id=""
                          cols="30"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    className="form-control"
                    value={product.price}
                    type="text"
                    name="price"
                    id="price"
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="add-product__discount">
                  <div className="form-group">
                    <label htmlFor="">Satus</label>
                    <div className="form-group__radios">
                      <div className="form-group__radio">
                        <input type="radio" name="" id="" />
                        <span>On Sale</span>
                      </div>
                      <div className="form-group__radio">
                        <input type="radio" name="" id="" />
                        <span>Not On Sale</span>
                      </div>
                    </div>
                  </div>
                  {/* *************************************************************** */}
                  <div className="form-group">
                    <label htmlFor="discount">Discount</label>
                    <input
                      className="form-control"
                      type="text"
                      value={product.discount}
                      name="discount"
                      id="discount"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Payment Types</label>
                  <div className="form-group__checkboxs">
                    <div className="form-group__checkbox">
                      <input
                        type="checkbox"
                        name="Direct Bank Transfare"
                        checked={
                          this.state.product.paymentType ===
                          "Direct Bank Transfare"
                        }
                        onChange={this.paymenTypeHandler}
                      />
                      <span>Direct Bank Transfare</span>
                    </div>
                    <div className="form-group__checkbox">
                      <input
                        type="checkbox"
                        name="Cheque Payment"
                        checked={
                          this.state.product.paymentType === "Cheque Payment"
                        }
                        onChange={this.paymenTypeHandler}
                      />
                      <span>Cheque Payment</span>
                    </div>
                    <div className="form-group__checkbox">
                      <input
                        type="checkbox"
                        name="Paypal"
                        checked={this.state.product.paymentType === "Paypal"}
                        onChange={this.paymenTypeHandler}
                      />
                      <span>Paypal</span>
                    </div>
                    <div className="form-group__checkbox">
                      <input
                        type="checkbox"
                        name="Visa"
                        checked={this.state.product.paymentType === "Visa"}
                        onChange={this.paymenTypeHandler}
                      />
                      <span>Visa</span>
                    </div>
                    <div className="form-group__checkbox">
                      <input
                        type="checkbox"
                        name="Mastercard"
                        checked={
                          this.state.product.paymentType === "Mastercard"
                        }
                        onChange={this.paymenTypeHandler}
                      />
                      <span>Mastercard</span>
                    </div>
                    <div className="form-group__checkbox">
                      <input
                        type="checkbox"
                        name="On Dilivery"
                        checked={
                          this.state.product.paymentType === "On Dilivery"
                        }
                        onChange={this.paymenTypeHandler}
                      />
                      <span>On Dilivery</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Category</label>
                  <select
                    className="form-control"
                    name="categoryId"
                    onChange={this.categoryHandler}
                  >
                    {categories.map((cat) => 
                      categoryName ===cat.name?
                      (<option selected value={cat.id}>{cat.name}</option>
                    ):(
                      <option value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="add-product__actions">
                  <button className="btn btn--gray">Cancel</button>
                  
                  <button className="btn btn--primary">{id?"Edit":"Add"}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProduct;
