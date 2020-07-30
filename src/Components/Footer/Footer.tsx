import * as React from "react";
import "../Footer/Footer.scss";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export interface IFooterProps {}

export interface IFooterState {
  isOpenFooter: boolean;
}

class Footer extends React.Component<IFooterProps, IFooterState> {
  constructor(props: IFooterProps) {
    super(props);
    this.state = { isOpenFooter: true };
  }

  toggleFooter = () => {
    this.setState({
      isOpenFooter: !this.state.isOpenFooter,
    });
  };

  render() {
    return (
      <footer className="container-fluid footer_bg  mt-5">
        <div className="container-xl pt-3 pb-2">
          <div
            className={
              this.state.isOpenFooter
                ? "row footer_pages show"
                : "row footer_pages"
            }
          >
            <div className="col-12">
              <div className="row align-self-center">
                <div className="col-11">
                  <h6 className="text-center">
                    MultiChoice Website
                  </h6>
                </div>
                <div className="col-1">
                  {this.state.isOpenFooter ? (
                    <MdKeyboardArrowUp onClick={this.toggleFooter} />
                  ) : (
                    <MdKeyboardArrowDown onClick={this.toggleFooter} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="text-center">Terms & Conditions</p>
            </div>
            <div className="col-12">
              <p className="text-center">Privacy & Cookie Notice</p>
            </div>
            <div className="col-12">
              <p className="text-center">Responsible Disclosure Policy</p>
            </div>
            <div className="col-12">
              <p className="text-center">Copyright</p>
            </div>
            <div className="col-12">
              <p className="text-center">Careers</p>
            </div>
          </div>
          <div className="row copyright">
            <div className="col-12">
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
        </div>
      </footer>
    );
  }
}

export default Footer;
