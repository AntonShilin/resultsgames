import * as React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IApplicationState } from "../../Store/Store";
import { returnPrevPage } from "../../Actions/Actions";
import "./ReturnPrevPage.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

export interface IReturnPrevPageProps extends RouteComponentProps{
    returnPrevPage: typeof returnPrevPage;
}

export interface State {}

class ReturnPrevPage extends React.Component<IReturnPrevPageProps, State> {
  render() {
    return (
      <div className="row mb-5 mt-3">
        <div className="col-12">
          <span
            className="prev_page"
            onClick={() => this.props.returnPrevPage(this.props.history)}
          >
            <IoIosArrowBack
              style={{
                fontSize: "1.5rem",
                color: "#788089",
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
    return {
      allfootball: state.allResults.data,
      isLoading: state.allResults.isLoading,
      similar_years: state.allResults.similar_years,
      sortingMatchesByDate: state.filter.sortingMatchesByDate,
      selectDay: state.filter.selectDay,
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      returnPrevPage: (url:any) => dispatch(returnPrevPage(url)),
    };
  };

const withURLReturnPrevPage = withRouter(ReturnPrevPage);

export default connect(mapStateToProps,mapDispatchToProps)(withURLReturnPrevPage);
