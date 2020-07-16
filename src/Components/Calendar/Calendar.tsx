import * as React from "react";
import "./Calendar.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectMatchDayInCalendar, toggleCalendar } from "../../Actions/Actions";
import { MatchesByDate } from "../../Reducer/calendarReducer";

export interface ICalendarProps {
  selectMatchDayInCalendar: typeof selectMatchDayInCalendar;
  sortingMatchesByDate: MatchesByDate[] | null;
  toggleCalendar: typeof toggleCalendar;
  isCalendarShow: boolean;
}

export interface State {}

class Calendar extends React.Component<ICalendarProps, State> {
  drawingDays = () => {
    const divs = [];
    let i = 0;
    const len = 31;
    while (++i <= len) divs.push(i);
    const day = new Date().getDate();

    return (
      <>
        {divs.map((k) => (
          <div key={k}>
            {k === day ? (
              <NavLink
                to="/allfootball/sortbyday"
                className="current_day"
                onClick={() => {
                  this.props.toggleCalendar(this.props.isCalendarShow);
                  this.props.selectMatchDayInCalendar(k)
                }
                }
              >
                {k}
              </NavLink>
            ) : (
              <NavLink
                to="/allfootball/sortbyday"
                  onClick={() => {
                    this.props.toggleCalendar(this.props.isCalendarShow);
                    this.props.selectMatchDayInCalendar(k)
                  }}
              >
                {k}
              </NavLink>
            )}
          </div>
        ))}
      </>
    );
  };

  render() {
    const d = new Date();
    const year = d.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
        <div className="calendar_item">
          <div className="month">
            <div>
              {months[d.getMonth()]}
              <span> {year}</span>
            </div>
          </div>

          <div className="weekdays">
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
            <div>Su</div>
          </div>

          <div className="days">{this.drawingDays()}</div>

        </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    sortingByDate: state.filter.sortingMatchesByDate,
    sortingMatchesByDate: state.filter.sortingMatchesByDate,
    isCalendarShow: state.filter.isCalendarShow,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectMatchDayInCalendar: (day: number) =>
      dispatch(selectMatchDayInCalendar(day)),
      toggleCalendar: (value:boolean) => dispatch(toggleCalendar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
