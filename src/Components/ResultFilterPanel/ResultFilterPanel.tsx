import * as React from "react";
import { GoCalendar } from "react-icons/go";
import PreviousDays from "../PreviousDays/PreviousDays";
import { IApplicationState } from "../../Store/Store";
import { toggleCalendar } from "../../Actions/Actions";
import { connect } from "react-redux";
import Calendar  from "../Calendar/Calendar";

export interface IResultFilterPanelProps {
  toggleCalendar: typeof toggleCalendar;
  isCalendarShow: boolean;
  similar_years: string[];
}

export interface State {}

class ResultFilterPanel extends React.Component<IResultFilterPanelProps, State> {
  render() {
    const { isCalendarShow } = this.props;

    return (
      <div className="row align-items-center">
        <div className="col-4">
          <p className="footbal_result">
            Football <span>Results</span>
          </p>
        </div>
        <div className="col-4" />
        <div className="col-4 h-25">
          <div className="row">
            <div className="col-6">
              <span className="calendar_icon">
                <GoCalendar
                  onClick={() => {
                    this.props.toggleCalendar(this.props.isCalendarShow);
                  }}
                />
                {isCalendarShow && <Calendar />}
              </span>
            </div>
            <div className="col-6">
              <PreviousDays />
            </div>
          </div>
          <p className="local_time">All times are shown in your local time</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    isCalendarShow: state.filter.isCalendarShow,
    similar_years: state.allResults.similar_years
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleCalendar: (value: boolean) => dispatch(toggleCalendar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultFilterPanel);
