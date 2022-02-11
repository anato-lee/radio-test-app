import { useState, useEffect, useReducer, Reducer } from 'react';
import {
  IFilterableProps,
  ISortableProps,
  IStation,
  IStationListAction,
  IStationListState,
  STATION_LIST_ACTIONS,
  STATION_SORTABLE_PROPS,
  TStationsReducer,
  IUseStationList,
} from '../interfaces';
import { RADIO_STATIONS_URL, SORT_ORDER } from '../constants';
import axios from 'axios';
import { orderBy } from 'lodash';


const sortStations = (state: IStationListState, sortBy: ISortableProps): IStationListState => {
  const currentSortingProps: ISortableProps = { ...state.sortBy, ...sortBy };
  const sortPriority = [
    STATION_SORTABLE_PROPS.name,
    STATION_SORTABLE_PROPS.popularity,
    STATION_SORTABLE_PROPS.reliability,
  ];
  const sortProps: STATION_SORTABLE_PROPS[] = [];
  const sortOrder: SORT_ORDER[] = [];

  sortPriority.forEach(prop => {
    if (currentSortingProps[prop]) {
      sortProps.push(prop);
      sortOrder.push(currentSortingProps[prop]!);
    }
  });


  const sortedStations = orderBy(state.displayedStations, sortProps, sortOrder);

  return {
    ...state,
    displayedStations: sortedStations,
    sortBy: currentSortingProps,
  }
}

const filterStations = (state: IStationListState, filterBy: IFilterableProps): IStationListState => {
  const { tags } = filterBy;
  if (!tags) {
    return state;
  }
  const filtered = state.defaultStations.filter(s => tags.every(t => s.tags.includes(t)));
  return sortStations({ ...state, displayedStations: filtered, filterBy }, {});;
}

const reducerFactory = (init: () => IStationListState): Reducer<IStationListState, IStationListAction> => {
  return (state: IStationListState, action: IStationListAction) => {
    switch (action.type) {
      case STATION_LIST_ACTIONS.reset:
        return init();
      case STATION_LIST_ACTIONS.filterBy:
        return filterStations(state, action.payload);
      case STATION_LIST_ACTIONS.sortBy:
        return sortStations(state, action.payload)
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
  const init = () => ({ displayedStations: defaultStations, defaultStations });
  const reducer = reducerFactory(init);
  const [stationList, dispatch] =
    useReducer<TStationsReducer, IStationListState>(reducer, { displayedStations: [], defaultStations: [] }, init);
  const setStations = (stations: IStation[]) => {
    setDefaultStations(stations);
    dispatch({ type: STATION_LIST_ACTIONS.reset })
  }
  const getStations = getStationsFactory(setStations);

  useEffect(() => {
    getStations();
  }, []);

  return { stationList, dispatch }
}
