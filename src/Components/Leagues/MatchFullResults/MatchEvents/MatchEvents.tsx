import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../../Store/Store";
import { IoIosFootball } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { IData } from "../../../../Types/Types";
import "./MatchEvents.scss";

export interface IMatchEventsProps {
  allResults: IData[] | null;
  matchID: number | null;
}

export interface State {}

class MatchEvents extends React.Component<IMatchEventsProps, State> {
  render() {
    const { allResults, matchID } = this.props;

    return (
      <div className="match-events">
        <p className="text-center mt-2">
          <FaChartLine /> Match Events
        </p>
        {allResults![matchID!].videos.map(
          (player, i) =>
            player.title.search(
              /Highlights|Alternative|Extended|Official|Title|Celebrations/
            ) !== 0 && (
              <p className="text-left" key={i}>
                <span className="mr-3 minutes-events">
                  {player.title.match(/\s\d+/)}
                </span>
                <span className="player-name">
                  <IoIosFootball /> {player.title.match(/\s\w+/)}
                </span>
              </p>
            )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    allResults: state.allResults.data,
    matchID: state.allResults.matchID,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchEvents);
