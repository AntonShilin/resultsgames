import * as React from "react";
import { connect } from "react-redux";
import { IData } from "../../../Types/Types";
import { RouteComponentProps } from "react-router-dom";
import {
  analysisTotal,
  getData,
} from "../../../Actions/Actions";
import "./MatchFullResults.scss";
import Preloader from "../../Preloader/Preloader";
import { IApplicationState } from "../../../Store/Store";
import ReturnPrevPage from "../../ReturnPrevPage/ReturnPrevPage";
import MediaPlayer from "./MediaPlayer/MediaPlayer";
import MatchEvents from "./MatchEvents/MatchEvents";

export interface IMatchFullResultProps extends RouteComponentProps {
  allResults: IData[] | null;
  getData: typeof getData;
  isLoading: boolean;
  matchID: number | null;
}

export interface State {}

class MatchFullResults extends React.Component<IMatchFullResultProps, State> {

  public componentDidMount() {
    if (this.props.matchID === null) {
      this.props.history.goBack();
    }
  }

  public render() {
    const { matchID, isLoading, allResults } = this.props;

    return (
      <React.Fragment>
        {isLoading ? (
          <Preloader />
        ) : (
          <div className="page">
            {allResults !== null && (
              <React.Fragment>
                <div className="container-xl">
                  <ReturnPrevPage />
                </div>
                <div className="container-xl mt-5 mb-5 desk_result">
                  <div className="row">
                    <div className="col-12  mt-3">
                      <p className="text-center">Result</p>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-4 text-center">
                      <p className="mb-0">{allResults[matchID!].side1.name}</p>
                    </div>
                    <div className="col-4 text-center">
                      <p className="mb-0">
                        {allResults[matchID!].videos &&
                          analysisTotal(allResults[matchID!].videos)}
                      </p>
                    </div>
                    <div className="col-4 text-center">
                      <p className="mb-0">{allResults[matchID!].side2.name}</p>
                    </div>
                    <div className="col-12">
                      <p className="text-center mb-0">
                        {allResults[matchID!].date.match(/\d+\-\d+\-\d+/)}
                      </p>
                      <p className="text-center mb-0">
                        {allResults[matchID!].competition.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="container-xl mb-5">
                  <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 order-2">
                      <MediaPlayer/>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 order-1 mb-3">
                      <MatchEvents/>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    allResults: state.allResults.data,
    isLoading: state.allResults.isLoading,
    matchID: state.allResults.matchID,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: () => dispatch(getData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchFullResults);
