import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "./HeaderSmallScreen.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ISmallScreen{
  officialName: string, leagueShortName: string
}

export interface Props extends RouteComponentProps {}

export interface IHeaderSmallScreenState {
  isMenuShow: boolean;
  selectOfficialName: string;
  leagues: ISmallScreen[];
  selectleagueShortName: string;
}

class HeaderSmallScreen extends React.Component<
  Props,
  IHeaderSmallScreenState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMenuShow: false,
      selectOfficialName: "All Football",
      selectleagueShortName: "allfootball",
      leagues: [
        { officialName: "All Football", leagueShortName: "allfootball" },
        {
          officialName: "Premier League",
          leagueShortName: "england",
        },
        { officialName: "Spanish LaLiga", leagueShortName: "spain" },
        { officialName: "Italy Serie A", leagueShortName: "italy" },
        { officialName: "German Bundesliga", leagueShortName: "germany" },
        { officialName: "French Ligue 1", leagueShortName: "france" },
      ],
    };
  }

  toggleSmallScreenMenu = () => {
    this.setState({
      isMenuShow: !this.state.isMenuShow,
    });
  };

  selectLeagueName = (officialName: string, leagueShortName: string) => {
    this.setState({
      selectOfficialName: officialName,
      selectleagueShortName: leagueShortName,
    });
  };

  render() {
    const { selectOfficialName, selectleagueShortName } = this.state;

    return (
      <div className="container-xl d-lg-none d-md-none d-sm-block d-xs-block">
        <div className="row  main_menu_small_screen align-items-center">
          <div className="col-2 d-flex justify-content-end">
            <figure className="mb-0">
              <img
                src={require(`../../../media/img/${selectleagueShortName}.png`)}
                alt="img"
                className="img-fluid"
              />
            </figure>
          </div>
          <div className="col-8 d-flex justify-content-start">
            <NavLink to={`/${selectleagueShortName}`}>
              <p className="text-center mb-0 small">{selectOfficialName}</p>
            </NavLink>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button
              className="small_screen_arrow"
              onClick={this.toggleSmallScreenMenu}
            >
              {this.state.isMenuShow ? (
                <MdKeyboardArrowDown className="arrow_down" />
              ) : (
                <MdKeyboardArrowDown className="arrow_up" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`row align-items-center list_small_screen_menu ${
            this.state.isMenuShow && " show_menu"
          }`}
        >
          {this.state.leagues.map((value: ISmallScreen, i: number) => (
            <div
              key={i}
              className="col-lg-2 col-md-2 p-2"
              onClick={() => {
                this.selectLeagueName(
                  value.officialName,
                  value.leagueShortName
                );
                this.toggleSmallScreenMenu();
              }}
            >
              <NavLink to={value.leagueShortName}>
                <p className="text-center mb-0 small">{value.officialName}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const withURLDataHeaderSmallScreen = withRouter(HeaderSmallScreen);

export default withURLDataHeaderSmallScreen;
