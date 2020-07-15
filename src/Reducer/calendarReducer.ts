import { MainActions, SortingAllMatchesByDateTypes, ToggleCalendarTypes, SelectMatchDayTypes, IData } from "../Types/Types";

export type MatchesByDate = [string?, IData?];

export interface IFilterState {
    sortingMatchesByDate: MatchesByDate[] | null;
    isCalendarShow: boolean;
    selectDay: number | null;
}

const initialState: IFilterState = {
    sortingMatchesByDate: null,
    isCalendarShow: false,
    selectDay: null,
};

export const filterReducer = (
  state: IFilterState = initialState,
  action: MainActions
): IFilterState => {
    switch (action.type) {
      
    case SortingAllMatchesByDateTypes.SORTINGALLMATCHESBYDATE: {
      return {
        ...state,
        sortingMatchesByDate: action.sortingByDate,
      };
        }
            
    case ToggleCalendarTypes.TOGGLECALENDAR: {
      return {
        ...state,
        isCalendarShow: action.value,
      };
        }
            
    case SelectMatchDayTypes.SELECTMATCHDAY: {
      return {
        ...state,
        selectDay: action.value,
      };
    }

    default:
      return state;
  }
};
