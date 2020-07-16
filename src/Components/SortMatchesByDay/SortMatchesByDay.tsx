import * as React from "react";
import { connect } from "react-redux";
import { IData } from "../../Types/Types";
import "./SortMatchesByDay.scss";
import {
  getData,
  analysisTotal,
  toggleResultPanel,
  viewMoreMatchInfo,
  getMatchID,
} from "../../Actions/Actions";
import { IApplicationState } from "../../Store/Store";
import { MdKeyboardArrowUp } from "react-icons/md";
import ReturnPrevPage from "../ReturnPrevPage/ReturnPrevPage";
import { MatchesByDate } from "../../Reducer/calendarReducer";

export interface ISortMatchesByDayProps {
  allfootball: IData[] | null;
  similar_years: string[];
  isLoading: boolean;
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  getMatchID: typeof getMatchID;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
  sortingMatchesByDate: MatchesByDate[] | null;
  selectDay: number | null;
}

export interface State {}

class SortMatchesByDay extends React.Component<ISortMatchesByDayProps, State> {
  private arrMatchResult: HTMLDivElement[];
  constructor(props: ISortMatchesByDayProps) {
    super(props);
    this.arrMatchResult = [];
  }

  public componentDidMount() {
    if (this.props.allfootball === null) {
      this.props.getData();
    }
  }

  public setRef = (node: HTMLDivElement) => {
    this.arrMatchResult.push(node);
  };

  public render() {
    const day =
      this.props.selectDay! < 10
        ? "0" + this.props.selectDay
        : this.props.selectDay;
    const month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const fullDate = `${year}-${month}-${day}`;

    return (
      <div className="container-xl pt-2">
        <ReturnPrevPage />
        {this.props.sortingMatchesByDate !== null && (
          <React.Fragment>
            {this.props.sortingMatchesByDate.map(
              (elem: MatchesByDate, k: number) =>
                elem[0] === fullDate && (
                  <div className="row align-items-center" key={k}>
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
                )
            )}
            {this.props.sortingMatchesByDate.map(
              (elem: MatchesByDate, x: number) =>
                elem[0] === fullDate && (
                  <div key={x} className="row mb-3">
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
                                this.arrMatchResult[x],
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
                        {elem.map(
                          (match: string | IData | undefined, i: number) =>
                            typeof match !== "string" &&
                            typeof match !== "undefined" && (
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
                                    <p className="mb-0">
                                      {match.competition.name}
                                    </p>
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
                            )
                        )}
                      </div>
                    </div>
                  </div>
                )
            )}
          </React.Fragment>
        )}
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
    getData: () => dispatch(getData()),
    getMatchID: (id: number) => dispatch(getMatchID(id)),
    toggleResultPanel: (
      elem: HTMLDivElement,
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => dispatch(toggleResultPanel(elem, e)),
    viewMoreMatchInfo: (e: React.MouseEvent, url: any) =>
      dispatch(viewMoreMatchInfo(e, url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortMatchesByDay);
