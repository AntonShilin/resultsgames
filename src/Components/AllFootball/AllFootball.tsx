import * as React from "react";
import { connect } from "react-redux";
import { IData } from "../../Types/Types";
import {
  getData,
  analysisTotal,
  toggleResultPanel,
  viewMoreMatchInfo,
  getMatchID,
} from "../../Actions/Actions";
import "./AllFootball.scss";
import { MdKeyboardArrowUp } from "react-icons/md";
import Preloader from "../Preloader/Preloader";

export type MatchesByDate = [string?, IData?];

export interface IAllFootballProps {
  allfootball: IData[];
  similar_years: string[];
  isLoading: boolean;
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  getMatchID: typeof getMatchID;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
}

export interface State {}

class AllFootball extends React.Component<IAllFootballProps, State> {
  private arrMatchResult: HTMLDivElement[];
  constructor(props: IAllFootballProps) {
    super(props);
    this.arrMatchResult = [];
  }

  public componentDidMount() {
    if (this.props.allfootball === null) {
      this.props.getData("https://www.scorebat.com/video-api/v1/");
    }

  }

  public setRef = (node: HTMLDivElement) => {
    this.arrMatchResult.push(node);
  };

  public render() {
    const { similar_years, allfootball } = this.props;

    const sortingMatchesByDate: MatchesByDate[] = [];

    similar_years.map((year: string, i: number) => {
      sortingMatchesByDate!.push([year]);

      allfootball!.map((match: IData, k: number) =>
        match.date.match(year) !== null
          ? sortingMatchesByDate![i].push(match)
          : null
      );
    });

    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <Preloader />
        ) : (
          <div className="container-xl pt-5">
            <div className="row align-items-center">
              <div className="col-4">
                <p className="footbal_result">
                  Football <span>Results</span>
                </p>
              </div>
              <div className="col-4" />
              <div className="col-4 h-25">
                <p className="local_time">
                  All times are shown in your local time
                </p>
              </div>
            </div>
            {sortingMatchesByDate!.map((elem: any, k: number) => (
              <div key={k} className="row mb-3">
                <div className="col-12 text-center">
                  <div className="row league_info align-items-center mb-2">
                    <div className="col-10 day">
                      <span className="">{elem[0]}</span>
                    </div>
                    <div className="col-2">
                      <span
                        className="arrow"
                        onClick={(e) =>
                          this.props.toggleResultPanel(
                            this.arrMatchResult[k],
                            e
                          )
                        }
                      >
                        <MdKeyboardArrowUp style={{ fontSize: "1.5rem" }} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row panel-body" ref={this.setRef}>
                    {elem!.map((match: any, i: number) =>
                      match.competition !== undefined ? (
                        <div key={i} className="col-12">
                          <div
                            data-matchid={i}
                            onClick={(e) => {
                              this.props.viewMoreMatchInfo(e, this.props);
                              this.props.getMatchID(match.id!);
                            }}
                            className="row align-items-center match-score-show"
                          >
                            <div className="col-3 match-competition-name">
                              <p className="mb-0">{match.competition.name}</p>
                            </div>
                            <div className="col-3 text-start">
                              <p className="mb-0">{match.side1.name}</p>
                            </div>
                            <div className="col-3 text-start">
                              <p className="mb-0">
                                {analysisTotal(match.videos)}
                              </p>
                            </div>
                            <div className="col-3 text-start">
                              <p className="mb-0">{match.side2.name}</p>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    allfootball: state.allResults.data,
    isLoading: state.allResults.isLoading,
    similar_years: state.allResults.similar_years,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: (url: RequestInfo) => dispatch(getData(url)),
    getMatchID: (id: number) => dispatch(getMatchID(id)),
    toggleResultPanel: (value: any, e: React.MouseEvent) =>
      dispatch(toggleResultPanel(value, e)),
    viewMoreMatchInfo: (e: React.MouseEvent, url: any) =>
      dispatch(viewMoreMatchInfo(e, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFootball);
