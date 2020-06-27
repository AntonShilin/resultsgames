import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HeaderSmallScreen.scss";
import allfootball from "../../../media/img/allfootball.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toggleMenuSmallScreen } from "../../../Actions/Actions";

export interface Props extends RouteComponentProps {
  toggleMenuSmallScreen: typeof toggleMenuSmallScreen;
}

export interface State {}

class HeaderSmallScreen extends React.Component<Props, State> {
  smallMenuScreen: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.smallMenuScreen = React.createRef();
  }
  render() {
    const currentPage = this.props.location.pathname.match(/\w+/);
    return (
      <React.Fragment>
        <div className="container-xl d-lg-none d-md-none d-sm-block d-xs-block">
          <div className="row  main_menu_small_screen align-items-center">
            <div className="col-2 d-flex justify-content-end">
              <figure className="mb-0">
                <img
                  src={currentPage!==null ? require(`../../../media/img/${currentPage[0]}.png`): allfootball}
                  alt="img"
                  className="img-fluid"
                />
              </figure>
            </div>
            <div className="col-8 d-flex justify-content-start">
              <NavLink to={`/${currentPage}`}>
                <p className="text-center mb-0 small">{currentPage!==null ? currentPage[0].toUpperCase() : ''}</p>
              </NavLink>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <button
                className="small_screen_arrow"
                onClick={e =>
                  this.props.toggleMenuSmallScreen(this.smallMenuScreen, e)
                }
              >
                <MdKeyboardArrowDown />
              </button>
            </div>
          </div>
          <div
            className="row align-items-center list_small_screen_menu"
            ref={this.smallMenuScreen}
          >
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/allfootball">
                <p className="text-center mb-0 small">All Football</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/england">
                <p className="text-center mb-0 small">Premier League</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/spain">
                <p className="text-center mb-0 small">Spanish LaLiga</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/italy">
                <p className="text-center mb-0 small">Italy Serie A</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/germany">
                <p className="text-center mb-0 small">German Bundesliga</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/france">
                <p className="text-center mb-0 small">French Ligue 1</p>
              </NavLink>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleMenuSmallScreen: (elem: any, e: any) =>
      dispatch(toggleMenuSmallScreen(elem, e))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(HeaderSmallScreen));
