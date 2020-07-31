import * as React from "react";
import "./Italy.scss";
import { connect } from "react-redux";
import { IData } from "../../../Types/Types";
import {
  getData,
  analysisTotal,
  toggleResultPanel,
  viewMoreMatchInfo,
  getMatchID,
} from "../../../Actions/Actions";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IApplicationState } from "../../../Store/Store";
import ConvertDate from "../../../HOC/ConvertDate/ConvertDate";
import SortLeagueByName from "../../../HOC/SortLeagueByName/SortLeagueByName";
import { MatchesByDate } from "../../../Reducer/calendarReducer";

export interface IItalyProps {
  allfootball: IData[] | null;
  similar_years: string[];
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
  getMatchID: typeof getMatchID;
  convertDateOfMatch: (time: string) => string;
  matchday: (allfootball: IData[], name: string) => MatchesByDate[];
}

export interface State {}

class Italy extends React.Component<IItalyProps, State> {
  arrMatchResult: HTMLDivElement[];
  constructor(props: IItalyProps) {
    super(props);
    this.arrMatchResult = [];
  }

  componentDidMount() {
    if (this.props.allfootball === null) {
      this.props.getData();
    }
  }

  /* собираем в массив все даты матчей чтобы по клику на стрелку возможно было скрыть/открыть */
  private setRef = (node: HTMLDivElement) => {
    this.arrMatchResult.push(node);
  };

  render() {
    return (
      <div className="container-xl pt-5">
        {this.props
          .matchday(this.props.allfootball!, "ITALY")
          .map((elem: MatchesByDate, k: number) => (
            <div key={k} className="row mb-3">
              <div className="col-12 text-center">
                <div className="row league_info align-items-center mb-2">
                  <div className="col-10 day">
                    <span>{this.props.convertDateOfMatch(elem[0]!)}</span>
                  </div>
                  <div className="col-2">
                    <span
                      className="arrow"
                      onClick={(e) =>
                        this.props.toggleResultPanel(this.arrMatchResult[k], e)
                      }
                    >
                      <MdKeyboardArrowUp style={{ fontSize: "1.5rem" }} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row panel-body" ref={this.setRef}>
                  {elem.map((match: any, i: number) =>
                    match.competition !== undefined && (
                      <div key={i} className="col-12">
                        <div
                          data-matchid={match.competition.id}
                          onClick={(e) => {
                            this.props.viewMoreMatchInfo(e, this.props);
                            this.props.getMatchID(match.id);
                          }}
                          className="match-score-show row align-items-center"
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
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    allfootball: state.allResults.data,
    similar_years: state.allResults.similar_years,
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
    viewMoreMatchInfo: (e: any, url: any) =>
      dispatch(viewMoreMatchInfo(e, url)),
  };
};

const withConvertDateMethod = ConvertDate(Italy);
const leagueItaly = SortLeagueByName(withConvertDateMethod);
export default connect(mapStateToProps, mapDispatchToProps)(leagueItaly);
