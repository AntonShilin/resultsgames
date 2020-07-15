import {
    IMainState,
    MainActions,
    GetDataResultsTypes,
    ToggleFooterTypes,
    toggleRezultPanelTypes,
    viewMoreMatchInfoTypes,
    sliderArrowsTypes,
    returnPrevPageTypes,
    isLoadingTypes,
    GetMatchIdTypes,
    SortingAllMatchesByDateTypes,
  } from "../Types/Types";
  
  const initialState: IMainState = {
    data: null,
    similar_years: [],
    isLoading: false,
    matchID: null,
    number_of_video: 0,
    sortingMatchesByDate: null
  };
  
  export const stateReducer = (
    state:IMainState = initialState,
    action:MainActions
  ): IMainState => {
    switch (action.type) {
      case GetDataResultsTypes.GETDATARESULTS: {
  
        return {
          ...state,
          data: action.results,
          similar_years: action.years,
          isLoading: false,
        };
      }
        
      case toggleRezultPanelTypes.RESULTPANEL: {
        return {
          ...state,
        };
      }
        
      case ToggleFooterTypes.TOGGLEFOOTER: {
        return {
          ...state,
        };
      }
        
  
      case viewMoreMatchInfoTypes.VIEWMOREMATCHINFO: {
        return {
          ...state,
        };
      }
  
      case sliderArrowsTypes.CLICKARROWLEFT: {
        return {
          ...state,
          number_of_video: action.num
        };
      }
  
      case sliderArrowsTypes.CLICKARROWRIGHT: {
        return {
          ...state,
          number_of_video: action.num
        };
      }
  
      case returnPrevPageTypes.PREVPAGE: {
        return {
          ...state,
        };
      }
  
      case isLoadingTypes.LOADING: {
        return {
          ...state,
          isLoading: true,
        };
      }
  
      case GetMatchIdTypes.GETMATCHID: {
        return {
          ...state,
          matchID: Number(action.id),
        };
      }
        
      case SortingAllMatchesByDateTypes.SORTINGALLMATCHESBYDATE: {
        return {
          ...state,
          sortingMatchesByDate: action.sortingByDate
        };
      }
        
        
      default:
        return state;
    }
  };
  