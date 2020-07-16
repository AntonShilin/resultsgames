import * as React from 'react';

const ConvertDate = (Component: typeof React.Component) => {
    interface Props {
        
    }
     
  interface State {
        
    }
     
    class Convert extends React.Component<Props, State> {

      convertDateOfMatch = (time: string) => {
            const d = new Date(time);
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
            const dayOfMonth = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();
            return `${dayOfMonth} ${month} ${year}`;
      };
      
      render() {
        return (<Component convertDateOfMatch={this.convertDateOfMatch} {...this.props}/> );
        }
    }
     
    return Convert;
}

export default ConvertDate;