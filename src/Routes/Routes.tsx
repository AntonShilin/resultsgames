import * as React from "react";
import {
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import AllFootbal from "../Components/Leagues/AllFootball/AllFootball";
import MatchFullResults from "../Components/Leagues/MatchFullResults/MatchFullResults";
import England from "../Components/Leagues/England/England";
import Spain from "../Components/Leagues/Spain/Spain";
import Italy from "../Components/Leagues/Italy/Italy";
import Germany from "../Components/Leagues/Germany/Germany";
import France from "../Components/Leagues/France/France";
import SortMatchesByDate from "../Components/SortMatchesByDate/SortMatchesByDate";
import SortMatchesByDay from "../Components/SortMatchesByDay/SortMatchesByDay";
import Calendar from "../Components/Calendar/Calendar";

export interface Props {}

export interface State {}

class Routes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/allfootball" component={AllFootbal} />
        <Route exact={true} path="/allfootball/sortbydate" component={SortMatchesByDate} />
        <Route exact={true} path="/allfootball/sortbyday" component={SortMatchesByDay} />
        <Route exact={true} path="/england" component={England} />
        <Route exact={true} path="/calendar" component={Calendar} />
        <Route exact={true} path="/spain" component={Spain} />
        <Route exact={true} path="/italy" component={Italy} />
        <Route exact={true} path="/germany" component={Germany} />
        <Route exact={true} path="/france" component={France} />
        <Route path="/:name" component={MatchFullResults} />
        <Redirect exact={true} from="/" to="/allfootball" />
      </Switch>
    );
  }
}

export default Routes;
