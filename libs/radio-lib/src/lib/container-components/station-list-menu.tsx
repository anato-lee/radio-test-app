import { Dispatch, ReducerAction } from 'react';
import { map, flatMap, uniq, flow, partialRight } from 'lodash';
import Select, { MultiValue } from 'react-select';
import { IStation, TStationsReducer, STATION_LIST_ACTIONS, ISortableProps, STATION_SORTABLE_PROPS } from '../interfaces';
import { SORT_ORDER } from '../constants';

export interface StationListMenuProps {
  menuListDispatcher: Dispatch<ReducerAction<TStationsReducer>>;
  defaultStations: IStation[];
  sortingParams?: ISortableProps;
}

  const sortBtnCssClass = (targetOrder: SORT_ORDER, sortOrder?: SORT_ORDER,  ) => {
    const commonClass = 'mr-1';
    return sortOrder !== targetOrder ?
      `${commonClass} text-slate-300` :
      `${commonClass} text-slate-700`;
  }

export function StationListMenu({ menuListDispatcher, defaultStations, sortingParams = {} }: StationListMenuProps) {
  const tags: string[] = flow(partialRight(map, ({ tags }: IStation) => tags), flatMap, uniq)(defaultStations);
  const onTagsUpdate = (selected: MultiValue<{ label: string; value: string; }>) => {
    const tags = selected.map(s => s.value);
    menuListDispatcher({ type: STATION_LIST_ACTIONS.filterBy, payload: { tags } });
  }
  const tagOptions = tags.map(t => ({ label: t, value: t }));
  const onSortChange = (sortType: STATION_SORTABLE_PROPS, order: SORT_ORDER) => {
    if (sortingParams[sortType] === order) {
      return;
    }
    menuListDispatcher({ type: STATION_LIST_ACTIONS.sortBy, payload: { [sortType]: order } });
  }

  return (
    <ul className='text-xs grid grid-cols-8'>
      <li className='flex mb-2 col-span-6'>
          <ul className='flex justify-center items-center'>
            <span className='mr-2'>Sort by:</span>
            <li className='mr-2'>
              <span className='mr-1'>Name</span>
              <button
                onClick={ () => onSortChange(STATION_SORTABLE_PROPS.name, SORT_ORDER.ascending) }
                className={ sortBtnCssClass(SORT_ORDER.ascending, sortingParams.name) }>&#x25B2;</button>
              <button
                onClick={ () => onSortChange(STATION_SORTABLE_PROPS.name, SORT_ORDER.descending) }
                className={ sortBtnCssClass(SORT_ORDER.descending, sortingParams.name) }>&#x25BC;</button>
            </li>
            <li className='mr-2'>
              <span className='mr-1'>Popularity</span>
              <button
                onClick={ () => onSortChange(STATION_SORTABLE_PROPS.popularity, SORT_ORDER.ascending) }
                className={ sortBtnCssClass(SORT_ORDER.ascending, sortingParams.popularity) }>&#x25B2;</button>
              <button
                onClick={ () => onSortChange(STATION_SORTABLE_PROPS.popularity, SORT_ORDER.descending) }
                className={ sortBtnCssClass(SORT_ORDER.descending, sortingParams.popularity) }>&#x25BC;</button>
            </li>
            <li>
              <span className='mr-1'>Reliability:</span>
              <button
                onClick={ () => onSortChange(STATION_SORTABLE_PROPS.reliability, SORT_ORDER.ascending) }
                className={ sortBtnCssClass(SORT_ORDER.ascending, sortingParams.reliability) }>&#x25B2;</button>
              <button
                onClick={ () => onSortChange(STATION_SORTABLE_PROPS.reliability, SORT_ORDER.descending) }
                className={ sortBtnCssClass(SORT_ORDER.descending, sortingParams.reliability) }>&#x25BC;</button>
            </li>
          </ul>
        </li>
        <li className='col-span-2 text-right border-box px-2'>
          <button
            className='p-1 border-box rounded-full bg-slate-300 text-xs self-center'
            onClick={ () => { menuListDispatcher({ type: STATION_LIST_ACTIONS.reset }) } }>Reset</button>
        </li>
        <li className='col-span-8'>
          <span>Filter by tags:</span>
          <Select
            options={ tagOptions }
            onChange={ onTagsUpdate }
            isMulti={true}
            closeMenuOnSelect={true}/>
        </li>
    </ul>
  );
}

export default StationListMenu;
