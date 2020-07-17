import * as React from "react";
import "./England.scss";
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
import { MatchesByDate } from "../../../Reducer/calendarReducer";
import ConvertDate from "../../../HOC/ConvertDate/ConvertDate";

export interface IEnglandProps {
  allfootball: IData[] | null;
  similar_years: string[];
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
  getMatchID: typeof getMatchID;
  convertDateOfMatch: (time: string) => string;
}

export interface State {}

class England extends React.Component<IEnglandProps, State> {
  arrMatchResult: HTMLDivElement[];
  constructor(props: IEnglandProps) {
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

    /* только матчи англии */
    const engmatches: IData[] = [];
    /*все дни матчей */
    let matchdates: string[] = [];
    /* все игры за конкретный день */
    const matchday: MatchesByDate[] = [];

    /* присваиваем кадому матчу уникальный id, и в engmatche[] отбираем матчи по англии */
    this.props.allfootball?.map((league: IData, i: number) => {
      league.competition.id = i;
      if (league.competition.name.search(/ENGLAND/) === 0) {
        engmatches.push(league);
      }
    });

    /* в массив  matchdates[] сохраняем дни в которые игрались матчи*/
    engmatches.map((game: IData, i: number) => {
      const day: string = game.date.match(/\d+\-\d+\-\d+/)![0];
      matchdates.push(day);
    });

    /* выбираем уникальные даты из matchdates[] */
    const unique = (arr: string[]) => {
      const result: string[] = [];

      for (const str of arr) {
        if (!result.includes(str)) {
          result.push(str);
        }
      }
      return result;
    };

    matchdates = [...unique(matchdates)];

    /* соединяем массивы matchdates и  engmatches для удобства отображения*/
    matchdates.map((dateday: string, i: number) => {
      matchday.push([dateday]);

      engmatches.map((match: IData, k: number) =>
        match.date.match(dateday) !== null ? matchday[i].push(match) : null
      );
    });

    return (
      <div className="container-xl pt-5">
        {matchday.map((elem: MatchesByDate, k: number) => (
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
                  match.competition !== undefined ? (
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
                          <p className="mb-0">{analysisTotal(match.videos)}</p>
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
    viewMoreMatchInfo: (e: React.MouseEvent, url: any) =>
      dispatch(viewMoreMatchInfo(e, url)),
  };
};

const withConvertDateMethod = ConvertDate(England);
export default connect(mapStateToProps, mapDispatchToProps)(withConvertDateMethod);
