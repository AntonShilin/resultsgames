import * as React from "react";

const DrawingCalendar = (Component: typeof React.Component) => {
  class Calendar extends React.Component<{}, {}> {
    counterID: () => number;
    counterDay: () => number;

    constructor(props: {}) {
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
        todayDate: d.getDate() /* today date */,
      };
    };

    drawingDataInTable = (tabBody: { current: any }) => {
      Array.from(tabBody.current!.children).map((week: any, s) =>
        Array.from(week.children).map((day: any, i) => {
          day.id = this.counterID().toString();

          if (+day.id >= this.getTime().firstWeekDayOfMonth) {
            const currentDay = this.counterDay() + 1;
            const lastDateOfMonth = this.getTime().lastDateOfMonth;
            day.children[0].innerText =
              currentDay <= lastDateOfMonth ? currentDay.toString() : "";
          }

          if (+day.children[0].innerText === this.getTime().todayDate) {
            day.style.backgroundColor = "#033660";
            day.children[0].style.color = "white";
          }
        })
      );
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

  return Calendar;
};

export default DrawingCalendar;
