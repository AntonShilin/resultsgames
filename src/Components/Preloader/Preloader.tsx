import * as React from "react";
import "./Preloader.scss";

export interface Props {}

export interface State {}

class Preloader extends React.Component<Props, State> {
  render() {
    return (
      <div className="container-xl preloader">
        <div className="row  preloader_area ">
          <div className="col-12 preloader_lawn">
            <div className="preloader_ball">
              <img src={require("../../media/img/ball.png")} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preloader;
