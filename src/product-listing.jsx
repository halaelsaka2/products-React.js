import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "./product-item";
import Pagination from "./pagination";
import { getAll, deleteProduct } from "./services/products";
import { GetAllCategories } from "./services/Categories";

class ProductListing extends Component {
  state = {
    data: [],
    currentPage: 1,
    searchProduct: "",
    mainproducts: [],
    categories: [],
    categoryId: "",
    sortBy: "",
    numOfPages: Number,
    count: 0,
  };
  async componentDidMount() {

    let {
      categoryId,
      searchProduct,
      data,
      numOfPages,
      currentPage,
      sortBy,
    } = this.state;
    let categories = await GetAllCategories();
    categories = [{ id: "0", name: "All Products" }, ...categories];
    // categoryId=categories[0].id;
    let response = await getAll(searchProduct, categoryId, sortBy, currentPage);
    data = response.products;
    numOfPages = response.numOfPages;
    currentPage = response.currentPage;
    this.setState({
      data,
      mainproducts: data,
      categories,
      numOfPages,
      currentPage,
    });
  }

  pageHandler = async (page) => {
    // console.log(page);
    let {
      categoryId,
      searchProduct,
      data,
      numOfPages,
      sortBy,
    } = this.state;
    let response;
    
    response = await getAll(searchProduct, categoryId, sortBy, page);
    // }
    data = response.products;
    numOfPages = response.numOfPages;
    this.setState({ currentPage: page });
    this.setState({ data, mainproducts: data, numOfPages });
  };
  handelSearch = async (e) => {
    let { categoryId, numOfPages, currentPage, sortBy } = this.state;
    let searchProduct = e.target.value;
    this.setState({ searchProduct });
    let result = [];
    let response;
    if (searchProduct !== null || searchProduct !== "") {
      response = await getAll(searchProduct, categoryId, sortBy, currentPage);
      result = response.products;
      numOfPages = response.numOfPages;
      currentPage = response.currentPage;
    }
    if (searchProduct === null || searchProduct === "") {
      response = await getAll(searchProduct, categoryId, sortBy, currentPage);
      result = response.products;
      numOfPages = response.numOfPages;
      currentPage = response.currentPage;
    }
    this.setState({ data: result, numOfPages: numOfPages });
  };
  deleteHandler = async (product) => {
    await deleteProduct(product.id);
    let {categoryId,searchProduct,sortBy,currentPage,numOfPages}=this.state;
    const response = await getAll(searchProduct, categoryId, sortBy, currentPage);
      const data = response.products;
      numOfPages = response.numOfPages;
      currentPage = response.currentPage;
    this.setState({ data,currentPage,numOfPages });
  };
  handelCategory = async (id) => {
    let { searchProduct, numOfPages,currentPage, sortBy } = this.state;
    let data;
    let response;
    let categoryId;
    if (id === "0") {
      response = await getAll(searchProduct, "", sortBy, 1);
      data = response.products;
      numOfPages = response.numOfPages;
      currentPage = response.currentPage;
      categoryId = "";
    } else {
      response = await getAll(searchProduct, id, sortBy, 1);
      data = response.products;
      numOfPages = response.numOfPages;
      currentPage = response.currentPage;
      categoryId = id;
    }

    this.setState({ categoryId });
    this.setState({
      data,
      numOfPages,
      currentPage,
      count: data.length,
    });
  };
  handelSort = async (event) => {
    let {
      searchProduct,
      data,
      numOfPages,
      categoryId,
      currentPage,
    } = this.state;
    const { value } = event.target;
    const sortBy = value;
    let response;
    response = await getAll(searchProduct, categoryId, sortBy, currentPage);
    data = response.products;
    numOfPages = response.numOfPages;
    currentPage = response.currentPage;
    this.setState({ data, sortBy, count: data.length, numOfPages: numOfPages });
  };
  render() {
    const { onhandelAdd } = this.props;
    const user = JSON.parse(localStorage.getItem("user"))
    let {
      currentPage,
      data,
      searchProduct,
      categories,
      numOfPages,
    } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          {/* <!-- filters --> */}
          <section className="filters">
            {/* <!-- search box --> */}
            <div className="search-box">
              <input
                className="search-box__input"
                placeholder="Search..."
                type="text"
                name="txt_search"
                
                onChange={this.handelSearch}
                value={searchProduct}
              />
              <button type="submit" className="search-box__btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            {/* <!-- filter list --> */}
            <div>
              {/* <!-- filter header --> */}
              <h5>Categories</h5>
              {/* <!-- filter list --> */}

              <ul className="list list--vr-separator">
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="link list__item"
                    onClick={() => this.handelCategory(cat.id)}
                  >
                    <i className="link__icon fas fa-angle-right"></i>
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
            {/* <!-- filter tags --> */}
            <div>
              {/* <!-- filter header --> */}
              <h5>Tags</h5>
              {/* <!-- filter tags --> */}
              <div className="tags">
                <span className="tag">Nike</span>
                <span className="tag">Travel</span>
                <span className="tag">Sport</span>
                <span className="tag">Tv</span>
                <span className="tag">Books</span>
              </div>
            </div>
            {/* <!-- related items --> */}
            <div>
              {/* <!-- title --> */}
              {/* <h5></h5> */}
              {/* <!-- small item --> */}
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
          {/* <!-- Items --> */}
          <section className="item-listing">
            {/* <!-- tools (sorting , change view , exporting) --> */}
            <div className="item-listing__tools">
              <select
                className="form-control"
                name="sortBy"
                onChange={this.handelSort}
              >
                <option value="1">Featured</option>
                <option value="price:asc">Price low to high</option>
                <option value="price:desc">Price high to low</option>
                <option value="name:">Name</option>
              </select>
              {user&&(

              <Link className="action-btn" to="/add-product">
                <i className="fas fa-plus"></i>
              </Link>
              )}
            </div>
            {/* <!-- items --> */}
            <div className="item-listing__items item-listing--3items">
              {/* <!-- medium item --> */}
              {/* ****************************************************************** */}
              {data.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  onclick={onhandelAdd}
                  deleteHandler={this.deleteHandler}
                />
              ))}
            </div>
            {/* **********************************************<!-- paging -->/ */}
            {numOfPages > 1 && (
              <Pagination
                currentPage={currentPage}
                // count={data.length}
                numOfPages={numOfPages}
                onChange={this.pageHandler}
              />
            )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListing;
