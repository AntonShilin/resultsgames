import * as React from "react";
import "../Footer/Footer.scss";
import { connect } from "react-redux";
import { toggleFooter } from "../../Actions/Actions";
import { MdKeyboardArrowUp } from "react-icons/md";

export interface Props {
  toggleFooter: typeof toggleFooter;
}

export interface State {}

class Footer extends React.Component<Props, State> {
  footer: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.footer = React.createRef();
  }
  render() {
    return (
      <div className="container-fluid footer_bg">
        <footer className="container-xl pt-3 pb-2 mt-5" ref={this.footer}>
          <div className="row footer_pages">
            <div className="col-lg col-md-4 col-sm-12">
              <div className="row align-self-center">
                <div className="col-10">
                  <p className="text-center ml-sm-5 ml-md-0 ml-lg-0 pl-sm-5 pl-md-0 pl-lg-0">
                    MultiChoice Website
                  </p>
                </div>
                <div className="col-2">
                  <button
                    className="move_off"
                    onClick={e => this.props.toggleFooter(this.footer, e)}
                  >
                    <MdKeyboardArrowUp style={{ fontSize: "1.5rem" }} />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg col-md-4 col-sm-12">
              <p className="text-center">Terms & Conditions</p>
            </div>
            <div className="col-lg col-md-4 col-sm-12">
              <p className="text-center">Privacy & Cookie Notice</p>
            </div>
            <div className="col-lg col-md-4 col-sm-12">
              <p className="text-center">Responsible Disclosure Policy</p>
            </div>
            <div className="col-lg col-md-4 col-sm-12">
              <p className="text-center">Copyright</p>
            </div>
            <div className="col-lg col-md-4 col-sm-12">
              <p className="text-center">Careers</p>
            </div>
          </div>
        </footer>
        <footer className="container-xl">
          <div className="row copyright">
            <div className="col-12  align-self-end">
              <div>
                <img
                  src="https://supersport.azureedge.net/web-assets/brand2/multichoice-africa-logo@3x.png"
                  className="img-fluid"
                  alt="img_brand"
                />
              </div>
              <p className="text-center mb-0 pt-3 pb-3">
                © 2020 All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleFooter: (
      elem: React.RefObject<HTMLDivElement>,
      e: React.MouseEvent
    ) => dispatch(toggleFooter(elem, e))
  };
};

export default connect(null, mapDispatchToProps)(Footer);
