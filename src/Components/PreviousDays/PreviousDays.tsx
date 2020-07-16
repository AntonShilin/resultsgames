import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { sortingByDate } from "../../Actions/Actions";
import React from "react";
import { MatchesByDate } from "../../Reducer/calendarReducer";
import "./PreviousDays.scss";
import { IData } from "../../Types/Types";
import { GoCalendar } from "react-icons/go";

export interface IPreviousDaysProps {
  sortingMatchesByDate: MatchesByDate[] | null;
  sortingByDate: typeof sortingByDate;
  allfootball: IData[] | null;
  similar_years: string[];
}

export interface State {}

class PreviousDays extends React.Component<IPreviousDaysProps, State> {

  componentDidMount() {
    this.props.sortingByDate(this.props.similar_years, this.props.allfootball)
  }

  render() {
    return (
      <NavLink
        to="/allfootball/sortbydate"
        className="previous_days"
      >
        <GoCalendar />
        <span className="badge badge-info">
          {this.props.sortingMatchesByDate !== null
            ? this.props.sortingMatchesByDate.length
            : "0"}{" "}days
        </span>
      </NavLink>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    sortingByDate: state.filter.sortingMatchesByDate,
    sortingMatchesByDate: state.filter.sortingMatchesByDate,
    allfootball: state.allResults.data,
    similar_years: state.allResults.similar_years,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sortingByDate: (similarYears: any, allfootball: any) =>
      dispatch(sortingByDate(similarYears, allfootball)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviousDays);
