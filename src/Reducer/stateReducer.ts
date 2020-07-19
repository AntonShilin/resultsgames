import {
    IMainState,
    MainActions,
    GetDataResultsTypes,
    viewMoreMatchInfoTypes,
    sliderArrowsTypes,
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
  
        const withIDandDate = (data: any[]) => {
          data.map((elem, i) => {
            elem.id = i;
            const newDate = elem.date.match(/\d+\-\d+\-\d+/g)
            elem.date = newDate[0]
          });
          
          return data;
        };


        return {
          ...state,
          data: withIDandDate(action.results!),
          similar_years: action.years,
          isLoading: false,
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
  