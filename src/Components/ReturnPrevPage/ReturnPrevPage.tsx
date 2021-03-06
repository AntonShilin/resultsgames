import * as React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IApplicationState } from "../../Store/Store";
import "./ReturnPrevPage.scss";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

export interface IReturnPrevPageProps extends RouteComponentProps {}

export interface State {}

class ReturnPrevPage extends React.Component<IReturnPrevPageProps, State> {
  returnPrev = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="row mb-5 mt-3">
        <div className="col-12">
          <IoIosArrowBack onClick={this.returnPrev}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const withURLReturnPrevPage = withRouter(ReturnPrevPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withURLReturnPrevPage);
