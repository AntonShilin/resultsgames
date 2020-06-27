import {
  GetDataResultsTypes,
  ToggleFooterTypes,
  ToggleSmallMenuScreenTypes,
  toggleRezultPanelTypes,
  viewMoreMatchInfoTypes,
  sliderArrowsTypes,
  returnPrevPageTypes,
  isLoadingTypes,
  GetMatchIdTypes,
  IData,
  IGetMatchIdAction,
  ILoadingAction,
  IReturnPrevPageAction,
  IClickSliderRightAction,
  IClickSliderLeftAction,
  IViewMoreMatchInfoAction,
  IToggleSmallMenuActionAction,
  IToggleFooterAction,
  IResultPanelAction,
} from "../Types/Types";
import { Dispatch, ActionCreator, Action } from "redux";


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

const addID = (data: any[]) => {
  data.map((elem, i) => {
    elem.id = i;
  });
  return data;
};

export const getData = (url: RequestInfo) => {
  return (dispatch: Dispatch) => {
    dispatch(loading());
    fetch(url)
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
          results: addID(data),
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

export const toggleResultPanel: ActionCreator<IResultPanelAction> = (
  elem: any,
  e: any
) => {
  e.currentTarget.classList.toggle("arrow-reverse");

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < elem.children.length; i++) {
    elem.children[i].children[0].classList.toggle("match-score-hide");
  }

  return {
    type: toggleRezultPanelTypes.RESULTPANEL,
  };
};

export const toggleFooter: ActionCreator<IToggleFooterAction> = (
  elem: any,
  e: React.MouseEvent
) => {
  elem.current.classList.toggle("show");
  e.currentTarget.classList.toggle("move_on");
  return {
    type: ToggleFooterTypes.TOGGLEFOOTER,
  };
};

export const toggleMenuSmallScreen: ActionCreator<IToggleSmallMenuActionAction> = (
  elem: any,
  e: React.MouseEvent
) => {
  elem.current.classList.toggle("show_menu");
  e.currentTarget.classList.toggle("arrow_up");
  return {
    type: ToggleSmallMenuScreenTypes.TOGGLESMALLMENUSCREEN,
  };
};

export const viewMoreMatchInfo: ActionCreator<IViewMoreMatchInfoAction> = (
  e: any,
  url: any
) => {
  const id = e.currentTarget.dataset.matchid;
  const path = url.history.location.pathname;
  url.history.push(`${path}/${id}`);
  return {
    type: viewMoreMatchInfoTypes.VIEWMOREMATCHINFO,
  };
};

const matchData = (time: string) => {
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

/*slider arrow left */

export const clickLeftArrowSlider: ActionCreator<IClickSliderLeftAction> = (
  num: number,
  moments: number
) => {
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
export const clickRightArrowSlider: ActionCreator<IClickSliderRightAction> = (
  num: number,
  moments: number
) => {
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

/* go back prev page */
export const returnPrevPage: ActionCreator<IReturnPrevPageAction> = (
  url: any
) => {
  url.goBack();
  return {
    type: returnPrevPageTypes.PREVPAGE,
  };
};

/* preload page */
const loading: ActionCreator<ILoadingAction> = () => {
  return {
    type: isLoadingTypes.LOADING,
  };
};

/* get match ID*/
export const getMatchID: ActionCreator<IGetMatchIdAction> = (id: number) => {
  return {
    type: GetMatchIdTypes.GETMATCHID,
    id,
  };
};


