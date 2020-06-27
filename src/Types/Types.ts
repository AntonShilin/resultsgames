export enum GetDataResultsTypes {
    GETDATARESULTS = "GETDATARESULTS"
  }
  
  export enum toggleRezultPanelTypes {
    RESULTPANEL = "RESULTPANEL"
  }
  
  export enum ToggleFooterTypes {
    TOGGLEFOOTER = "TOGGLEFOOTER"
  }
  
  export enum ToggleSmallMenuScreenTypes {
    TOGGLESMALLMENUSCREEN = "TOGGLESMALLMENUSCREEN"
  }
  
  export enum viewMoreMatchInfoTypes {
    VIEWMOREMATCHINFO = "VIEWMOREMATCHINFO"
  }
  
  export enum sliderArrowsTypes {
    CLICKARROWLEFT = "CLICKARROWLEFT",
    CLICKARROWRIGHT = "CLICKARROWRIGHT"
  }
  
  export enum returnPrevPageTypes {
    PREVPAGE = "PREVPAGE"
  }
  
  export enum isLoadingTypes {
    LOADING = "LOADING"
  }
  
  export enum GetMatchIdTypes {
    GETMATCHID = "GETMATCHID"
  }
  
  
  
  /* interfaces */
  
  export interface IGetMatchIdAction {
    type: GetMatchIdTypes.GETMATCHID
    id:number
  }
  
  export interface ILoadingAction {
    type: isLoadingTypes.LOADING
  }
  
  export interface IReturnPrevPageAction {
    type: returnPrevPageTypes.PREVPAGE;
  }
  
  export interface IClickSliderLeftAction {
    type: sliderArrowsTypes.CLICKARROWLEFT;
    num: number; 
  }
  
  export interface IClickSliderRightAction {
    type: sliderArrowsTypes.CLICKARROWRIGHT;
    num: number; 
  }
  
  export interface IViewMoreMatchInfoAction {
    type: viewMoreMatchInfoTypes.VIEWMOREMATCHINFO;
  }
  
  export interface IToggleSmallMenuActionAction {
    type: ToggleSmallMenuScreenTypes.TOGGLESMALLMENUSCREEN;
  }
  
  export interface IToggleFooterAction {
    type: ToggleFooterTypes.TOGGLEFOOTER;
  }
  
  export interface IGetDataResultsAction {
    type: GetDataResultsTypes.GETDATARESULTS;
    results: null;
    years: []; 
  }
  
  export interface IResultPanelAction {
    type: toggleRezultPanelTypes.RESULTPANEL;
  }
  
export type MainActions =
    | IGetDataResultsAction
    | IResultPanelAction
    | IToggleFooterAction
    | IToggleSmallMenuActionAction
    | IViewMoreMatchInfoAction
    | IClickSliderLeftAction
    | IClickSliderRightAction
    | IReturnPrevPageAction
    |IGetMatchIdAction
    | ILoadingAction;
  
  export interface IData {
    id?: number;
    title: string;
    embed: string;
    url: string;
    thumbnail: string;
    date: string;
    side1: {
      name: string;
      url: string;
    };
    side2: {
      name: string;
      url: string;
    };
    competition: {
      name: string;
      id: number;
      url: string;
    };
    videos: [
      {
        title: string;
        embed: string;
      }
    ];
  }
  
  export interface IMainState {
     data: IData[] | null;
     similar_years: string[];
     isLoading: boolean;
     matchID: number | null;
    number_of_video: number | 0;
  }
  
  
  