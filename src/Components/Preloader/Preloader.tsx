import * as React from "react";
import "./Preloader.scss";
import { IoMdFootball } from "react-icons/io";

export interface Props {}

export interface State {}

class Preloader extends React.Component<Props, State> {
  render() {
    return (
      <div className="container-xl preloader">
        <div className="row  preloader_area align-items-center">
          <div className="col-12 preloader_lawn">
            <div className="preloader_ball">
              <IoMdFootball/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preloader;
