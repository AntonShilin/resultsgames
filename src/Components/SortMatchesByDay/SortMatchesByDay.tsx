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
import ResultDatePanel from "../ResultFilterPanel/ResultFilterPanel";
import ConvertDate from "../../HOC/ConvertDate/ConvertDate";

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
  convertDateOfMatch: (time: string) => string;
}

export interface State {}

class SortMatchesByDay extends React.Component<ISortMatchesByDayProps, State> {
  MatchResult: React.RefObject<HTMLDivElement>;
  constructor(props: ISortMatchesByDayProps) {
    super(props);
    this.MatchResult = React.createRef();
  }

  public componentDidMount() {
    if (this.props.allfootball === null) {
      this.props.getData();
    }
  }


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
            <ResultDatePanel />
            {this.props.sortingMatchesByDate.map(
              (elem: MatchesByDate, x: number) =>
                elem[0] === fullDate && (
                  <div key={x} className="row mb-3">
                    <div className="col-12 text-center">
                      <div className="row league_info align-items-center mb-2">
                        <div className="col-10 day">
                          <span>{this.props.convertDateOfMatch(elem[0]!)}</span>
                        </div>
                        <div className="col-2">
                          <span
                            className="arrow"
                            onClick={(e) =>
                              this.props.toggleResultPanel(this.MatchResult.current!, e)
                            }
                          >
                            <MdKeyboardArrowUp style={{ fontSize: "1.5rem" }} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row panel-body" ref={this.MatchResult}>
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

const withConvertDateMethod = ConvertDate(SortMatchesByDay);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withConvertDateMethod);
