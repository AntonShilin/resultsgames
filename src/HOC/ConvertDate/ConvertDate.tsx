import * as React from 'react';

export const withConvertDate = (Component:any) => {
    interface Props {
        
    }
     
  interface State {
        
    }
     
    class ConvertDate extends React.Component<Props, State> {
        constructor(props:Props) {
            super(props);
            this.matchData = this.matchData.bind(this);
        }

        public matchData = (time: string) => {
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
            return (<Component {...this.props}/> );
        }
    }
     
    return ConvertDate;
}