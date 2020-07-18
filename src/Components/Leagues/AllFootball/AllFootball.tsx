import * as React from "react";
import { connect } from "react-redux";
import { IData } from "../../../Types/Types";
import {
  getData,
  analysisTotal,
  toggleResultPanel,
  viewMoreMatchInfo,
  getMatchID,
} from "../../../Actions/Actions";
import "./AllFootball.scss";
import Preloader from "../../Preloader/Preloader";
import { IApplicationState } from "../../../Store/Store";
import { MdKeyboardArrowUp } from "react-icons/md";
import ConvertDate from "../../../HOC/ConvertDate/ConvertDate";
import ResultDatePanel from "../../ResultFilterPanel/ResultFilterPanel";

export interface IAllFootballProps {
  allfootball: IData[] | null;
  isLoading: boolean;
  getData: typeof getData;
  toggleResultPanel: typeof toggleResultPanel;
  getMatchID: typeof getMatchID;
  viewMoreMatchInfo: typeof viewMoreMatchInfo;
  convertDateOfMatch: (time: string) => string;
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

  convertDateOfMatch = (time: string) => {
    const d = new Date(time);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayOfMonth = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${dayOfMonth} ${month} ${year}`;
};


  public render() {
    return (
      <React.Fragment>
        {this.props.allfootball === null ? (
          <Preloader />
        ) : (
          <div className="container-xl pt-5">
            <ResultDatePanel />
            {this.props.allfootball!.map((elem: IData, k: number) => (
              <div key={k} className="row mb-3">
                <div className="col-12 text-center">
                  <div className="row league_info align-items-center mb-2">
                    <div className="col-10 day">
                      <span>
                        {this.convertDateOfMatch(elem.date)}
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
                    <div className="col-12">
                      <div
                        data-matchid={k}
                        onClick={(e) => {
                          this.props.viewMoreMatchInfo(e, this.props);
                          this.props.getMatchID(elem.id!);
                        }}
                        className="match-score-show row align-items-center"
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


export default connect(mapStateToProps, mapDispatchToProps)(AllFootball);
