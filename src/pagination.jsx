import React, { Component } from "react";
import _ from "lodash";
class Pagination extends Component {
  state = {};

  render() {
    const { currentPage, numOfPages, onChange } = this.props;
    // const pageNum = count / pagesize;

    const arr = _.range(1, numOfPages + 1);

    return (
      <React.Fragment>
        <div className="paging">
          {/* <!-- left arrow --> */}
          <div className="paging__arrow">
            <i className="fas fa-angle-left"></i>
          </div>
          {/* <!-- page number --> */}
          {arr.map(page => (
            <div
              key={page}
              className={
                page === currentPage
                  ? "paging__number active"
                  : "paging__number"
              }
              onClick={() => onChange(page)}
            >
              {page}
            </div>
          ))}
          {/* <!-- right arrow --> */}
          <div className="paging__arrow">
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;
