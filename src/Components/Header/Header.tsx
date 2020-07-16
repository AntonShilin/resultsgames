import * as React from "react";
import { NavLink } from "react-router-dom";
import "../Header/Header.scss";
import allfootball from "../../media/img/allfootball.png";
import england from "../../media/img/england.png";
import spain from "../../media/img/spain.png";
import italy from "../../media/img/italy.png";
import france from "../../media/img/france.png";
import germany from "../../media/img/germany.png";

export interface Props {}

export interface State {}

class Header extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <header className="container-fluid d-none d-lg-block d-md-block">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/allfootball">
                <figure className="text-center">
                  <img src={allfootball} alt="ball" className="img-fluid" />
                </figure>
                <p className="text-center mb-0 small">All Football</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/england" activeClassName="active">
                <figure className="text-center">
                  <img src={england} alt="premer_league" className="img-fluid" />
                </figure>
                <p className="text-center mb-0 small">Premier League</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/spain">
                <figure className="text-center">
                  <img src={spain} alt="spanish_league" className="img-fluid" />
                </figure>
                <p className="text-center mb-0 small">Spanish LaLiga</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/italy">
                <figure className="text-center">
                  <img src={italy} alt="italy_league" className="img-fluid" />
                </figure>
                <p className="text-center mb-0 small">Italy Serie A</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/germany">
                <figure className="text-center">
                  <img src={germany} alt="german_league" className="img-fluid" />
                </figure>
                <p className="text-center mb-0 small">German Bundesliga</p>
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 p-2">
              <NavLink to="/france">
                <figure className="text-center">
                  <img src={france} alt="french_league" className="img-fluid" />
                </figure>
                <p className="text-center mb-0 small">French Ligue 1</p>
              </NavLink>
            </div>
          </div>
        </header>
        <div className="container-fluid submenu">
          <div className="row">
            <div className="col-12"/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
