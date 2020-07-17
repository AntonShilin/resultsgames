import * as React from "react";
import { connect } from "react-redux";
import { IData } from "../../Types/Types";
import {
  getData,
  analysisTotal,
  toggleResultPanel,
  viewMoreMatchInfo,
  getMatchID,
  sortingByDate,
} from "../../Actions/Actions";
// import "./SortMatchesByDate.scss";
import { IApplicationState } from "../../Store/Store";
import { MdKeyboardArrowUp } from "react-icons/md";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ReturnPrevPage from "../ReturnPrevPage/ReturnPrevPage";
import { MatchesByDate } from "../../Reducer/calendarReducer";
import ResultFilterPanel from "../ResultFilterPanel/ResultFilterPanel";
import ConvertDate from "../../HOC/ConvertDate/ConvertDate";

export interface ISortMatchesByDateProps extends RouteComponentProps {
  allfootball: IData[] | null;
  similar_years: string[];
  isLoading: boolean;
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  getMatchID: typeof getMatchID;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
  sortingByDate: typeof sortingByDate;
  sortingMatchesByDate: MatchesByDate[] | null;
  convertDateOfMatch: (time: string) => string;
}

export interface State {}

class SortMatchesByDate extends React.Component<
  ISortMatchesByDateProps,
  State
> {
  private arrMatchResult: HTMLDivElement[];
  constructor(props: ISortMatchesByDateProps) {
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
    return (
      <div className="container-xl pt-3">
        <ReturnPrevPage />
        {this.props.sortingMatchesByDate !== null && (
          <React.Fragment>
            <ResultFilterPanel />
            {this.props.sortingMatchesByDate.map(
              (elem: MatchesByDate, k: number) => (
                <div key={k} className="row mb-3">
                  <div className="col-12 text-center">
                    <div className="row league_info align-items-center mb-2">
                      <div className="col-10 day">
                        <span>
                          {this.props.convertDateOfMatch(elem[0]!)}
                        </span>
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
                      {elem!.map(
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
                                className="match-score-show row align-items-center"
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
    sortingMatchesByDate: state.filter.sortingMatchesByDate,
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

const withURLSortMatchesByDate = withRouter(SortMatchesByDate);

const withConvertDateMethod = ConvertDate(withURLSortMatchesByDate);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withConvertDateMethod);
