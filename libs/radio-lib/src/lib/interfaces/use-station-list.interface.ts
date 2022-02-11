import { Dispatch, ReducerAction } from 'react';
import { SORT_ORDER } from '../constants';
import { IStation } from './station.interface';


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
  tags = 'tags',
}

export interface IFilterableProps {
  [STATION_FILTERABLE_PROPS.tags]?: string[];
}

export type ISortableProps = {
  [key in STATION_SORTABLE_PROPS]?: SORT_ORDER;
}

export interface IStationListState {
  displayedStations: IStation[];
  sortBy?: ISortableProps;
  filterBy?: IFilterableProps;
  defaultStations: IStation[];
}

export interface IResetStateAction {
  type: STATION_LIST_ACTIONS.reset;
}

export interface IFilterAction {
  type: STATION_LIST_ACTIONS.filterBy;
  payload: IFilterableProps;
}

export interface ISortAction {
  type: STATION_LIST_ACTIONS.sortBy;
  payload: ISortableProps;
}

export type IStationListAction = IResetStateAction | ISortAction | IFilterAction;

export type TStationsReducer = (state: IStationListState, action: IStationListAction) => IStationListState;

export interface IUseStationList {
  stationList: IStationListState;
  dispatch: Dispatch<ReducerAction<TStationsReducer>>;
}
