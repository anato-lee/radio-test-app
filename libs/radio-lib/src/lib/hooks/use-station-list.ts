import { useState, useEffect, useReducer, ReducerAction, Dispatch, Reducer } from 'react';
import { IStation } from '../interfaces';
import { RADIO_STATIONS_URL, SORT_OPTION } from '../constants';
import axios from 'axios';


export enum STATION_LIST_ACTIONS {
  sortBy = 'sortBy',
  filterBy = 'filterBy',
  reset = 'reset',
}

export enum STATION_SORTABLE_PROPS {
  name = 'name',
  popularity = 'popularity',
  reliability = 'reliability',
}

export enum STATION_FILTERABLE_PROPS {
  tags ='tags',
}

interface IFilterableProps {
  [STATION_FILTERABLE_PROPS.tags]?: string[];
}

type ISortableProps = {
  [key in STATION_SORTABLE_PROPS]?: SORT_OPTION;
}

interface IStationListState {
  stationList: IStation[];
  sortBy?: ISortableProps;
  filterBy?: IFilterableProps;
}

export interface IStationListAction {
  type: STATION_LIST_ACTIONS;
  payload?: any;
}

type TStationsReducer = (state: IStationListState, action: IStationListAction) => IStationListState;

export interface IUseStationList {
  stationList: IStationListState;
  dispatch: Dispatch<ReducerAction<TStationsReducer>>;
}

 const reducerFactory = (init: () => IStationListState): Reducer<IStationListState, IStationListAction> => {
   return (state: IStationListState, action: IStationListAction) => {
    switch (action.type) {
      case STATION_LIST_ACTIONS.reset:
        return init();
      case STATION_LIST_ACTIONS.filterBy:
        return init();
      case STATION_LIST_ACTIONS.sortBy:
        return init();
      default:
        return init();
    }
  }
 }

 const getStationsFactory = (stationsSetter: (stations: IStation[]) => void) => {
   return async () => {
     let data: IStation[] = [];

     try {
       ({ data: { data } } = await axios.get<{ data: IStation[] }>(RADIO_STATIONS_URL));
     } catch (e) {
       console.error(e);
     }

     stationsSetter(data);
   };
 }

export const useStationList = (): IUseStationList => {
  const [defaultStations, setDefaultStations] = useState<IStation[]>([]);
  const init = () => ({ stationList: defaultStations });
  const reducer = reducerFactory(init);
  const [stationList, dispatch] = useReducer<TStationsReducer, IStationListState>(reducer, { stationList: [] }, init);
  const setStations = (stations: IStation[]) => {
    setDefaultStations(stations);
    dispatch({ type: STATION_LIST_ACTIONS.reset })
  }
  const getStations = getStationsFactory(setDefaultStations);

  useEffect(() => {
    getStations();
  }, []);

  return { stationList, dispatch }
}

export default useStationList;
