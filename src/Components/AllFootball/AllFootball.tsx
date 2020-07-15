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
  toggleCalendar,
} from "../../Actions/Actions";
import "./AllFootball.scss";
import { GoCalendar } from "react-icons/go";
import Preloader from "../Preloader/Preloader";
import { IApplicationState } from "../../Store/Store";
import { MdKeyboardArrowUp } from "react-icons/md";
import Calendar from "../Calendar/Calendar";

export type MatchesByDate = [string?, IData?];

export interface IAllFootballProps {
  allfootball: IData[] | null;
  similar_years: string[];
  isLoading: boolean;
  isCalendarShow: boolean;
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  getMatchID: typeof getMatchID;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
  sortingByDate: typeof sortingByDate;
  toggleCalendar: typeof toggleCalendar;
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
      this.props.getData();
    }
  }

  public setRef = (node: HTMLDivElement) => {
    this.arrMatchResult.push(node);
  };

  public render() {
    const { similar_years, allfootball ,isCalendarShow} = this.props;

    return (
      <React.Fragment>
        {!this.props.allfootball ? (
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
                <span>
                  <GoCalendar
                    onClick={() => {
                      this.props.toggleCalendar(this.props.isCalendarShow);
                      this.props.sortingByDate(
                        this.props.similar_years,
                        this.props.allfootball
                      );
                    }}
                    style={{ fontSize: "1.5rem" }}
                    />
                    {isCalendarShow && <Calendar/>}
                </span>
                <p className="local_time">
                  All times are shown in your local time
                </p>
              </div>
            </div>
            {this.props.allfootball!.map((elem: IData, k: number) => (
              <div key={k} className="row mb-3">
                <div className="col-12 text-center">
                  <div className="row league_info align-items-center mb-2">
                    <div className="col-10 day">
                      <span className="">{elem.date}</span>
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
                    <div className="col-12">
                      <div
                        data-matchid={k}
                        onClick={(e) => {
                          this.props.viewMoreMatchInfo(e, this.props);
                          this.props.getMatchID(elem.id!);
                        }}
                        className="row align-items-center match-score-show"
                      >
                        <div className="col-3 match-competition-name">
                          <p className="mb-0">{elem.competition.name}</p>
                        </div>
                        <div className="col-3 text-start">
                          <p className="mb-0">{elem.side1.name}</p>
                        </div>
                        <div className="col-3 text-start">
                          <p className="mb-0">{analysisTotal(elem.videos)}</p>
                        </div>
                        <div className="col-3 text-start">
                          <p className="mb-0">{elem.side2.name}</p>
                        </div>
                      </div>
                    </div>
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

const mapStateToProps = (state: IApplicationState) => {
  return {
    allfootball: state.allResults.data,
    isLoading: state.allResults.isLoading,
    similar_years: state.allResults.similar_years,
    isCalendarShow: state.filter.isCalendarShow,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: () => dispatch(getData()),
    toggleCalendar: (value:boolean) => dispatch(toggleCalendar(value)),
    getMatchID: (id: number) => dispatch(getMatchID(id)),
    toggleResultPanel: (value: any, e: React.MouseEvent) =>
      dispatch(toggleResultPanel(value, e)),
    viewMoreMatchInfo: (e: React.MouseEvent, url: any) =>
      dispatch(viewMoreMatchInfo(e, url)),
    sortingByDate: (similarYears: any, allfootball: any) =>
      dispatch(sortingByDate(similarYears, allfootball)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFootball);
