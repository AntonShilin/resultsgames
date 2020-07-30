import * as React from "react";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";

const DrawingCalendar = (Component: typeof React.Component) => {
  interface ICalendarProps {
    similar_years: string[];
  }

  class Kalendar extends React.Component<ICalendarProps, {}> {
    counterID: () => number;
    counterDay: () => number;

    constructor(props: ICalendarProps) {
      super(props);
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
        currentMonthAsNumber: month + 1 < 10 ? "0" + (month + 1) : month + 1,
        todayDate: d.getDate() /* today date */,
      };
    };

    drawingDataInTable = (tabBody: { current: HTMLTableRowElement }) => {
      Array.from(tabBody.current!.children).map((week, s:number) =>
        Array.from(week.children).map((day:any, i:number) => {
          day.id = this.counterID().toString();

          if (+day.id >= this.getTime().firstWeekDayOfMonth) {
            const currentDay = this.counterDay() + 1;
            const lastDateOfMonth = this.getTime().lastDateOfMonth;
            day.children[0].innerText =
              currentDay <= lastDateOfMonth ? currentDay.toString() : "";

            this.dateReconciliation(day);
          }

          if (+day.children[0].innerText === this.getTime().todayDate) {
            day.style.backgroundColor = "#033660";
            day.children[0].style.color = "white";
          }
        })
      );
    };



    dateReconciliation = (day: {
      children: { innerText: string }[];
      style: { backgroundColor: string };
    }) => {
      this.props.similar_years.map((value, i) => {
        if (
          this.getTime().currentYear.toString() +
            "-" +
            this.getTime().currentMonthAsNumber.toString() +
            "-" +
            day.children[0].innerText ===
          value
        ) {
          day.style.backgroundColor = "#e7e8ea";
        }
      });
    };



    render() {
      return (
        <Component
          drawingDataInTable={this.drawingDataInTable}
          currentMonth={this.getTime().currentMonth}
          currentYear={this.getTime().currentYear}
          {...this.props}
        />
      );
    }
  }

  const mapStateToProps = (state: IApplicationState) => {
    return {
      similar_years: state.allResults.similar_years,
    };
  };

  return connect(mapStateToProps, null)(Kalendar);
};

export default DrawingCalendar;
