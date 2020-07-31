import * as React from "react";
import { IData } from "../../Types/Types";
import { MatchesByDate } from "../../Reducer/calendarReducer";

const SortLeagueByName = (Component: typeof React.Component) => {
  class League extends React.Component<{}, {}> {
    sortingLeagueByName = (allfootball: IData[], name: string) => {
      /* только матчи англии */
      const engmatches: IData[] = [];
      /*все дни матчей */
      let matchdates: string[] = [];
      /* все игры за конкретный день */
      const matchday: MatchesByDate[] = [];

      /* присваиваем кадому матчу уникальный id, и в engmatche[] отбираем матчи по англии */
      allfootball?.map((league: IData, i: number) => {
          league.competition.id = i;
          
          const regexp = new RegExp(name, 'i')
          const findLeague = regexp.test(league.competition.name);

          if (findLeague) {
              engmatches.push(league);
            }
        });
        
      /* в массив  matchdates[] сохраняем дни в которые игрались матчи*/
      engmatches.map((game: IData, i: number) => {
        const day: string = game.date.match(/\d+\-\d+\-\d+/)![0];
        matchdates.push(day);
      });

      /* выбираем уникальные даты из matchdates[] */
      const unique = (arr: string[]) => {
        const result: string[] = [];

        for (const str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }
        return result;
      };

      matchdates = [...unique(matchdates)];

      /* соединяем массивы matchdates и  engmatches для удобства отображения*/
      matchdates.map((dateday: string, i: number) => {
        matchday.push([dateday]);

        engmatches.map((match: IData, k: number) =>
          match.date.match(dateday) !== null ? matchday[i].push(match) : null
        );
      });

      return matchday;
    };

    render() {
      return <Component matchday={this.sortingLeagueByName} {...this.props} />;
    }
  }

  return League;
};

export default SortLeagueByName;
