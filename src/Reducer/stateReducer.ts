import {
    IMainState,
    MainActions,
    GetDataResultsTypes,
    ToggleFooterTypes,
    viewMoreMatchInfoTypes,
    sliderArrowsTypes,
    returnPrevPageTypes,
    isLoadingTypes,
    GetMatchIdTypes,
  } from "../Types/Types";
  
  const initialState: IMainState = {
    data: null,
    similar_years: [],
    isLoading: false,
    matchID: null,
    number_of_video: 0,
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
        
        
        
      default:
        return state;
    }
  };
  