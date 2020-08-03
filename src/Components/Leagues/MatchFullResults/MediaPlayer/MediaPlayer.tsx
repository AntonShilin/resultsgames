import * as React from "react";
import { IData } from "../../../../Types/Types";
import {
  getData,
  clickLeftArrowSlider,
  clickRightArrowSlider,
} from "../../../../Actions/Actions";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IApplicationState } from "../../../../Store/Store";
import { connect } from "react-redux";
import "./MediaPlayer.scss";
import { FiYoutube } from "react-icons/fi";

export interface IMediaPlayerProps {
  allResults: IData[] | null;
  matchID: number | null;
  number_of_video: number | 0;
  clickLeftArrowSlider: typeof clickLeftArrowSlider;
  clickRightArrowSlider: typeof clickRightArrowSlider;
}

export interface State {}

class MediaPlayer extends React.Component<IMediaPlayerProps, State> {
  private slider: React.RefObject<HTMLDivElement>;
  constructor(props: IMediaPlayerProps) {
    super(props);
    this.slider = React.createRef();
  }

  render() {
    const { allResults, matchID, number_of_video } = this.props;

    let amounOfmoments: number = 0;
    if (this.props.allResults !== null) {
      amounOfmoments = this.props.allResults[matchID!].videos.length - 1;
    }

    return (
      <>
        <p className="text-left">
          <FiYoutube /> Videos
        </p>
        <div className="video_clips" ref={this.slider}>
          <div
            className="video"
            dangerouslySetInnerHTML={{
              __html: allResults![matchID!].videos[number_of_video].embed,
            }}
          />
          <div className="thumbnail_videos">
            {allResults![matchID!].videos.map((match, i) => (
              <div key={i} className="thumbnail_videos_items">
                <img
                  className={number_of_video === i ? "currentImg" : undefined}
                  src={allResults![matchID!].thumbnail}
                  alt="img"
                />
              </div>
            ))}
          </div>
          <span
            className="slider-arrow-left"
            onClick={(e) =>
              this.props.clickLeftArrowSlider(number_of_video, amounOfmoments)
            }
          >
            <FaAngleLeft />
          </span>
          <span
            className="slider-arrow-right"
            onClick={(e) =>
              this.props.clickRightArrowSlider(number_of_video, amounOfmoments)
            }
          >
            <FaAngleRight />
          </span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    allResults: state.allResults.data,
    matchID: state.allResults.matchID,
    number_of_video: state.allResults.number_of_video,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clickLeftArrowSlider: (num: number, moments: number) =>
      dispatch(clickLeftArrowSlider(num, moments)),
    clickRightArrowSlider: (num: number, moments: number) =>
      dispatch(clickRightArrowSlider(num, moments)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
