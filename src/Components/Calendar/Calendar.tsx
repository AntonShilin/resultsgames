import * as React from "react";
import "./Calendar.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectMatchDayInCalendar,
  toggleCalendar,
} from "../../Actions/Actions";
import { MatchesByDate } from "../../Reducer/calendarReducer";
import { table } from "console";

export interface ICalendarProps {
  selectMatchDayInCalendar: typeof selectMatchDayInCalendar;
  sortingMatchesByDate: MatchesByDate[] | null;
  toggleCalendar: typeof toggleCalendar;
  isCalendarShow: boolean;
}

export interface IState {
}

class Calendar extends React.Component<ICalendarProps, IState> {
  tabBody: React.RefObject<any>;
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
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return {
      firstWeekDayOfMonth: fullData.getDay(), /* day of week */
      lastDateOfMonth: new Date(year, month + 1, 0).getDate(), /* last day of month */
      currentMonth: allMonths[month],
      currentYear: year,
      todayDate: d.getDate() /* today date */
    };
  };

  createCalendar = () => {
    const tablebody = this.tabBody.current;

    for (let z = 0; z <= 5; z++) {
      const row = document.createElement("tr");
      tablebody.appendChild(row);

      for (let s = 0; s <= 6; s++) {
        const col = document.createElement("td");
        tablebody.children[z].appendChild(col);
        col.id = this.counterID().toString();
      }
    }


    Array.from(tablebody.children).map((week: any, s) =>
      Array.from(week.children).map((day: any, i) => {
        
        if (+day.id >= this.getTime().firstWeekDayOfMonth) {
          const currentDay = this.counterDay()+1;
          const lastDateOfMonth = this.getTime().lastDateOfMonth;
          day.innerText = currentDay<=lastDateOfMonth ? currentDay.toString() : '';
        } 
      
      })
    );  
  };

  componentDidMount() {
    this.createCalendar();
  }

  render() {
    const {currentMonth, currentYear} = this.getTime();

    return (
      <div className="calendar_item">
        <table>
          <caption>{currentMonth}{` `}{currentYear}</caption>
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
            {}
          </tbody>
        </table>
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
    toggleCalendar: (value: boolean) => dispatch(toggleCalendar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
