import * as React from "react";
import "./Calendar.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import {
  selectMatchDayInCalendar,
  toggleCalendar,
} from "../../Actions/Actions";
import DrawingCalendar from "../../HOC/DrawingCalendar/DrawingCalendar";

export interface ICalendarProps extends RouteComponentProps {
  selectMatchDayInCalendar: typeof selectMatchDayInCalendar;
  toggleCalendar: typeof toggleCalendar;
  isCalendarShow: boolean;
  drawingDataInTable: (elem: React.RefObject<HTMLTableSectionElement>) => void;
  currentYear: number;
  currentMonth: string;
}

export interface IState {}

class Calendar extends React.Component<ICalendarProps, IState> {
  tabBody: React.RefObject<HTMLTableSectionElement>;

  constructor(props: ICalendarProps) {
    super(props);
    this.tabBody = React.createRef();
  }


  createCalendar = () => {
    const kalendar: string[][] = [];

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


  componentDidMount() {
    this.props.drawingDataInTable(this.tabBody);
  }

  render() {
    const { currentMonth, currentYear } = this.props;

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
const withDrawingMethodsCalendar = DrawingCalendar(withURLPropsCalendar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDrawingMethodsCalendar);
