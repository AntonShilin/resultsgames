import {
  GetDataResultsTypes,
  toggleRezultPanelTypes,
  viewMoreMatchInfoTypes,
  sliderArrowsTypes,
  isLoadingTypes,
  GetMatchIdTypes,
  IGetMatchIdAction,
  ILoadingAction,
  IClickSliderRightAction,
  IClickSliderLeftAction,
  IViewMoreMatchInfoAction,
  IResultPanelAction,
  SortingAllMatchesByDateTypes,
  ISortingAllMatchesByDateAction,
  IData,
  IToggleCalendarAction,
  ToggleCalendarTypes,
  ISelectMatchDayAction,
  SelectMatchDayTypes,
} from "../Types/Types";
import { Dispatch } from "redux";
import { MatchesByDate } from "../Reducer/calendarReducer";

const getSimilarYears = (arr: any) => {
  const similarYears: any[] = [];
  const regexp: any[] = [];
  arr.map((elem: { date: string }, i: number) => {
    regexp.push(elem.date.match(/\d+\-\d+\-\d+/g));

    if (!similarYears.includes(regexp[i][0])) {
      similarYears.push(regexp[i][0]);
    }
  });
  return similarYears;
};


/* get all matches data */
export const getData = () => {
  return (dispatch: Dispatch) => {
    dispatch(loading());
    fetch("https://www.scorebat.com/video-api/v1/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GetDataResultsTypes.GETDATARESULTS,
          results: data,
          years: getSimilarYears(data),
        })
      );
  };
};

/* обработка результата матча */
export const analysisTotal = (elem: { title: any }[]) => {
  const arr = elem.map((match: { title: any }) => match.title);
  const score = arr.toString().match(/\d-\d/);
  if (score === null) {
    return "0-0";
  } else {
    return score[0];
  }
};

export const toggleResultPanel = (
  elem: HTMLDivElement,
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>
): IResultPanelAction => {
  
  e.currentTarget.classList.toggle("arrow-reverse");
  
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < elem.children.length; i++) {
    elem.children[i].children[0].classList.toggle("match-score-hide");
  }

  return {
    type: toggleRezultPanelTypes.RESULTPANEL,
  };
};



export const viewMoreMatchInfo = (
  e: any,
  url: any
): IViewMoreMatchInfoAction => {
  const id = e.currentTarget.dataset.matchid;
  const path = url.history.location.pathname;
  url.history.push(`${path}/${id}`);
  return {
    type: viewMoreMatchInfoTypes.VIEWMOREMATCHINFO,
  };
};

/*slider arrow left */
export const clickLeftArrowSlider = (
  num: number,
  moments: number
): IClickSliderLeftAction => {
  if (num <= 0) {
    num = moments;
  } else {
    --num;
  }

  return {
    type: sliderArrowsTypes.CLICKARROWLEFT,
    num,
  };
};

/*slider arrow right */
export const clickRightArrowSlider = (
  num: number,
  moments: number
): IClickSliderRightAction => {
  if (moments === num) {
    num = 0;
  } else {
    ++num;
  }

  return {
    type: sliderArrowsTypes.CLICKARROWRIGHT,
    num,
  };
};


/* preload page */
const loading = (): ILoadingAction => {
  return {
    type: isLoadingTypes.LOADING,
  };
};

/* get match ID*/
export const getMatchID = (id: number): IGetMatchIdAction => {
  return {
    type: GetMatchIdTypes.GETMATCHID,
    id,
  };
};


/* sorting all matches by date */
export const sortingByDate = (
  similarYears: string[],
  allfootball: IData[]|null
): ISortingAllMatchesByDateAction => {
  const sortingMatchesByDate: MatchesByDate[] = [];

  similarYears.map((year: string, i: number) => {
    sortingMatchesByDate!.push([year]);

    allfootball!.map((match: IData, k: number) =>
      match.date.match(year) !== null
        ? sortingMatchesByDate![i].push(match)
        : null
    );
  });

  return {
    type: SortingAllMatchesByDateTypes.SORTINGALLMATCHESBYDATE,
    sortingByDate: sortingMatchesByDate,
  };
};

/* show / hide calendar */
export const toggleCalendar = (value: boolean): IToggleCalendarAction => {
  return {
    type: ToggleCalendarTypes.TOGGLECALENDAR,
    value: !value,
  };
};

/* select match day in calendar */
export const selectMatchDayInCalendar = (
  day: number
): ISelectMatchDayAction => {
  return {
    type: SelectMatchDayTypes.SELECTMATCHDAY,
    value: day,
  };
};
