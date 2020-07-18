import * as React from "react";
import { connect } from "react-redux";
import { IData } from "../../../Types/Types";
import { RouteComponentProps } from "react-router-dom";
import {
  analysisTotal,
  getData,
  clickLeftArrowSlider,
  clickRightArrowSlider,
} from "../../../Actions/Actions";
import "./MatchFullResults.scss";
import { FaChartLine } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { IoIosFootball } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import Preloader from "../../Preloader/Preloader";
import { IApplicationState } from "../../../Store/Store";
import ReturnPrevPage from "../../ReturnPrevPage/ReturnPrevPage";

export interface IMatchFullResultProps extends RouteComponentProps {
  allResults: IData[] | null;
  getData: typeof getData;
  isLoading: boolean;
  matchID: number | null;
  number_of_video: number | 0;
  clickLeftArrowSlider: typeof clickLeftArrowSlider;
  clickRightArrowSlider: typeof clickRightArrowSlider;
}

export interface State {}

class MatchFullResults extends React.Component<IMatchFullResultProps, State> {
  private slider: React.RefObject<HTMLDivElement>;
  constructor(props: IMatchFullResultProps) {
    super(props);
    this.slider = React.createRef();
  }

  public componentDidMount() {
    if (this.props.matchID === null) {
      this.props.history.goBack();
    }
  }

  public render() {
    const { matchID, number_of_video } = this.props;
    let amounOfmoments: number=0;
    if (this.props.allResults !== null) {
      amounOfmoments = this.props.allResults[matchID!].videos.length-1;
    }

    return (
      <React.Fragment>
        {this.props.isLoading ? (
          <Preloader />
        ) : (
          <div className="page">
              {this.props.allResults !== null && (
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
                        <p className="mb-0">
                          {this.props.allResults[matchID!].side1.name}
                        </p>
                      </div>
                      <div className="col-4 text-center">
                        <p className="mb-0">
                          {this.props.allResults[matchID!].videos
                            && analysisTotal(
                              this.props.allResults[matchID!].videos
                            )
                          }
                        </p>
                      </div>
                      <div className="col-4 text-center">
                        <p className="mb-0">
                          {this.props.allResults[matchID!].side2.name}
                        </p>
                      </div>
                      <div className="col-12">
                        <p className="text-center mb-0">
                          {this.props.allResults[matchID!].date.match(
                            /\d+\-\d+\-\d+/
                          )}
                        </p>
                        <p className="text-center mb-0">
                          {this.props.allResults[matchID!].competition.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container-xl mb-5">
                    <div className="row">
                      <div className="col-lg-7 col-md-12 col-sm-12 video_bg order-2">
                        <p className="text-left">
                          <FiYoutube style={{ fontSize: "1.7rem" }} /> Videos
                      </p>
                        <div className="video_clips" ref={this.slider}>
                          <div
                            className="video"
                            dangerouslySetInnerHTML={{
                              __html: this.props.allResults[matchID!].videos[
                                number_of_video
                              ].embed,
                            }}
                          />
                          <div className="thumbnail_videos">
                            {this.props.allResults[matchID!].videos.map(
                              (match, i) => (
                                <div key={i} className="thumbnail_videos_items">
                                  <img
                                    className={number_of_video === i ? 'currentImg' : undefined}
                                    src={
                                      this.props.allResults![matchID!].thumbnail
                                    }
                                    alt="img"
                                  />
                                </div>
                              )
                            )}
                          </div>
                          <span
                            className="slider-arrow-left"
                            onClick={(e) =>
                              this.props.clickLeftArrowSlider(
                                number_of_video,
                                amounOfmoments
                              )
                            }
                          >
                            <FaAngleLeft style={{ fontSize: "1.5rem" }} />
                          </span>
                          <span
                            className="slider-arrow-right"
                            onClick={(e) =>
                              this.props.clickRightArrowSlider(
                                number_of_video,
                                amounOfmoments
                              )
                            }
                          >
                            <FaAngleRight style={{ fontSize: "1.5rem" }} />
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-12 col-sm-12 order-1 mb-3">
                        <div className="match-events">
                          <p className="text-center mt-2">
                            <FaChartLine style={{ fontSize: "1.7rem" }} /> Match
                          Events
                        </p>
                          {this.props.allResults[matchID!].videos.map(
                            (player, i) =>
                              player.title.search(
                                /Highlights|Alternative|Extended|Official|Title|Celebrations/
                              ) === 0 ? (
                                  ""
                                ) : (
                                  <p className="text-left" key={i}>
                                    <span className="mr-3 minutes-events">
                                      {player.title.match(/\s\d+/)}
                                    </span>
                                    <span className="player-name">
                                      <IoIosFootball
                                        style={{
                                          fontSize: "1.3rem",
                                          color: "#070707",
                                        }}
                                      />{" "}
                                      {player.title.match(/\s\w+/)}
                                    </span>
                                  </p>
                                )
                          )}
                        </div>
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
    number_of_video: state.allResults.number_of_video,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: () => dispatch(getData()),
    clickLeftArrowSlider: (num: number, moments: number) =>
      dispatch(clickLeftArrowSlider(num, moments)),
    clickRightArrowSlider: (num: number, moments: number) =>
      dispatch(clickRightArrowSlider(num, moments)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchFullResults);
