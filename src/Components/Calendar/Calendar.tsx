import * as React from "react";
import "./Calendar.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import {
  selectMatchDayInCalendar,
  toggleCalendar,
} from "../../Actions/Actions";

export interface ICalendarProps extends RouteComponentProps {
  selectMatchDayInCalendar: typeof selectMatchDayInCalendar;
  toggleCalendar: typeof toggleCalendar;
  isCalendarShow: boolean;
}

export interface IState {}

class Calendar extends React.Component<ICalendarProps, IState> {
  tabBody: React.RefObject<HTMLTableSectionElement>;
  counterID: () => number;
  counterDay: () => number;

  constructor(props: ICalendarProps) {
    super(props);
    this.tabBody = React.createRef();
    this.counterID = this.startCounter();
    this.counterDay = this.startCounter();
  }

  startCounter = () => {
    let num = 0;
    return () => {
      return num++;
    };
  };

  getTime = () => {
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    const fullData = new Date(year, month, 1);
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      firstWeekDayOfMonth: fullData.getDay() /* day of week */,
      lastDateOfMonth: new Date(
        year,
        month + 1,
        0
      ).getDate() /* last day of month */,
      currentMonth: allMonths[month],
      currentYear: year,
      todayDate: d.getDate() /* today date */,
    };
  };

  createCalendar = () => {
    const kalendar: any[][] = [];

    for (let row = 0; row <= 5; row++) {
      kalendar.push([]);
      for (let col = 0; col <= 6; col++) {
        kalendar[row][col] = "";
      }
    }

    return (
      <>
        {kalendar.map((week, w) => (
          <tr key={w}>
            {week.map((day, d) => (
              <td
                key={d}
                onClick={(e) => {
                  this.props.selectMatchDayInCalendar(
                    +e.currentTarget.children[0].innerHTML
                  );
                  this.props.toggleCalendar(this.props.isCalendarShow);
                }}
              >
                <NavLink to="/allfootball/sortbyday">{}</NavLink>
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  drawingDataInTable = () => {
    Array.from(this.tabBody.current!.children).map((week: any, s) =>
      Array.from(week.children).map((day: any, i) => {
        day.id = this.counterID().toString();
        if (+day.id >= this.getTime().firstWeekDayOfMonth) {
          const currentDay = this.counterDay() + 1;
          const lastDateOfMonth = this.getTime().lastDateOfMonth;
          day.children[0].innerText =
            currentDay <= lastDateOfMonth ? currentDay.toString() : "";
        }

      })
    );
  };

  componentDidMount() {
    this.drawingDataInTable();
  }

  render() {
    const { currentMonth, currentYear } = this.getTime();

    return (
      <div className="calendar_item">
        <table>
          <caption>
            {currentMonth}
            {` `}
            {currentYear}
          </caption>
          <thead className="weekdays">
            <tr>
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          <tbody className="days" ref={this.tabBody}>
            {this.createCalendar()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    isCalendarShow: state.filter.isCalendarShow,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectMatchDayInCalendar: (day: number) =>
      dispatch(selectMatchDayInCalendar(day)),
    toggleCalendar: (value: boolean) => dispatch(toggleCalendar(value)),
  };
};

const withURLPropsCalendar = withRouter(Calendar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withURLPropsCalendar);
