import axios from 'axios';
import { act, renderHook, RenderResult, WaitForNextUpdate } from '@testing-library/react-hooks';
import { useStationList } from './use-station-list';
import { IFilterAction, IResetStateAction, ISortAction, IStation, IUseStationList, STATION_LIST_ACTIONS, STATION_SORTABLE_PROPS } from '../interfaces';
import { SORT_ORDER } from '../constants';

const STATIONS_MOCK: IStation[] = [
  {
    id: '111',
    description: 'Station 1 description',
    name: 'Station 1',
    imgUrl: 'image_1.jpg',
    streamUrl: 'station_1_url',
    reliability: 2,
    popularity: 5,
    tags: ['tag_1']
  },
  {
    id: '222',
    description: 'Station 2 description',
    name: 'Station 2',
    imgUrl: 'image_2.jpg',
    streamUrl: 'station_2_url',
    reliability: 2,
    popularity: 1,
    tags: ['tag_2']
  },
  {
    id: '333',
    description: 'Station 0 description',
    name: 'Station 0',
    imgUrl: 'image_0.jpg',
    streamUrl: 'station_3_url',
    reliability: 1,
    popularity: 5,
    tags: ['tag_1', 'tag_2']
  },
];

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useStationList', () => {

  let result: RenderResult<IUseStationList>;
  let waitForNextUpdate: WaitForNextUpdate;

  beforeEach(async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: STATIONS_MOCK } });
    ({ result, waitForNextUpdate } = renderHook(() => useStationList()));
    await waitForNextUpdate();
  });

  it('should render successfully', () => {
    expect(result.current.stationList).toBeDefined();
    expect(result.current.dispatch).toBeDefined();
  });

  describe('initial state', () => {
    it('should render successfully', () => {
      expect(result.current.stationList).toBeDefined();
      expect(result.current.dispatch).toBeDefined();
    });

    it('should contain default stations', () => {
      expect(result.current.stationList.defaultStations).toEqual(STATIONS_MOCK);
    });

    it('should contain displyedStations same as defaultStations', () => {
      const { defaultStations, displayedStations } = result.current.stationList;
      expect(displayedStations?.length).toBe(3);
      expect(defaultStations).toEqual(displayedStations);
    });

    it('should set default filterBy as undefined', () => {
      const { filterBy } = result.current.stationList;
      expect(filterBy).toBeUndefined();
    });

    it('should set default sortBy as undefined', () => {
      const { sortBy } = result.current.stationList;
      expect(sortBy).toBeUndefined();
    });
  });

  describe('sorting', () => {
    it('should sort by name descending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 2');
      expect(displayedStations[1].name).toBe('Station 1');
      expect(displayedStations[2].name).toBe('Station 0');
    });

    it('should sort by name ascending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.ascending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 0');
      expect(displayedStations[1].name).toBe('Station 1');
      expect(displayedStations[2].name).toBe('Station 2');
    });


    it('should sort by reliability ascending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.reliability]: SORT_ORDER.ascending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 0');
      expect(displayedStations[1].name).toBe('Station 1');
      expect(displayedStations[2].name).toBe('Station 2');
    });

    it('should sort by reliability descending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.reliability]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 2');
      expect(displayedStations[2].name).toBe('Station 0');
    });

    it('should sort by popularity ascending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.ascending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 2');
      expect(displayedStations[1].name).toBe('Station 1');
      expect(displayedStations[2].name).toBe('Station 0');
    });

    it('should sort by popularity descending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
      expect(displayedStations[2].name).toBe('Station 2');
    });

    it('should sort by popularity descending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
      expect(displayedStations[2].name).toBe('Station 2');
    });

    it('should sort by popularity descending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
      expect(displayedStations[2].name).toBe('Station 2');
    });

    it('should sort by name and then by relaibility ', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: {
          [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.ascending,
          [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending,
        },
      };
      result.current.stationList.displayedStations[0].name = 'Station 1';
      result.current.stationList.displayedStations[0].reliability = 10;

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].id).toBe('222');
      expect(displayedStations[1].id).toBe('111');
      expect(displayedStations[2].id).toBe('333');
    });

    it('should sort by popularity descending', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
      expect(displayedStations[2].name).toBe('Station 2');
    });

    it('should sort by name and then by popularity ', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: {
          [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.ascending,
          [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending,
        },
      };
      result.current.stationList.displayedStations[0].name = 'Station 1';
      result.current.stationList.displayedStations[0].popularity = 10;

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].id).toBe('222');
      expect(displayedStations[1].id).toBe('111');
      expect(displayedStations[2].id).toBe('333');
    });

    it('should sort by popularity and then by reliability ', () => {
      const { dispatch } = result.current;
      const action: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: {
          [STATION_SORTABLE_PROPS.reliability]: SORT_ORDER.ascending,
          [STATION_SORTABLE_PROPS.popularity]: SORT_ORDER.descending,
        },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
      expect(displayedStations[2].name).toBe('Station 2');
    });
  });

  describe('filtering', () => {
    it('should filter by tag_1', () => {
      const { dispatch } = result.current;
      const action: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1'] },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(2);
      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
    });

    it('should filter by tag_2', () => {
      const { dispatch } = result.current;
      const action: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_2'] },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(2);
      expect(displayedStations[0].name).toBe('Station 2');
      expect(displayedStations[1].name).toBe('Station 0');
    });

    it('should filter by both tag_1 and tag_2', () => {
      const { dispatch } = result.current;
      const action: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1', 'tag_2'] },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(1);
      expect(displayedStations[0].name).toBe('Station 0');
    });

    it('should filter by non-existing tag', () => {
      const { dispatch } = result.current;
      const action: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['non_exisiting'] },
      };

      act(() => {
        dispatch(action);
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(0);
    });

    it('should remove prviously set filters', () => {
      const { dispatch } = result.current;
      const action: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1', 'tag_2'] },
      };

      act(() => {
        dispatch(action);
      });

      act(() => {
        dispatch({ ...action, payload: { tags: [] } });
      });
      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(3);
    });
  });

  describe('combined filtering and sorting', () => {
    it('should sort by previous filtered results only', () => {
      const { dispatch } = result.current;
      const filterAction: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1'] },
      };

      const sortingAction: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.ascending },
      };

      act(() => {
        dispatch(filterAction);
      });

      act(() => {
        dispatch(sortingAction);
      });

      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(2);
      expect(displayedStations[0].name).toBe('Station 0');
      expect(displayedStations[1].name).toBe('Station 1');
    });

    it('should keep sorting when adding filter', () => {
      const { dispatch } = result.current;
      const filterAction: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1'] },
      };

      const sortingAction: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(sortingAction);
      });

      act(() => {
        dispatch(filterAction);
      });

      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(2);
      expect(displayedStations[0].name).toBe('Station 1');
      expect(displayedStations[1].name).toBe('Station 0');
    });

    it('should keep sorting when removing filter', () => {
      const { dispatch } = result.current;
      const filterAction: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1'] },
      };

      const filterRemoveAction: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: [] },
      };

      const sortingAction: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending },
      };

      act(() => {
        dispatch(filterAction);
      });

      act(() => {
        dispatch(sortingAction);
      });

      act(() => {
        dispatch(filterRemoveAction);
      });

      const { stationList: { displayedStations } } = result.current;

      expect(displayedStations.length).toBe(3);
      expect(displayedStations[0].name).toBe('Station 2');
      expect(displayedStations[1].name).toBe('Station 1');
      expect(displayedStations[2].name).toBe('Station 0');
    });
  });

  describe('reset', () => {
    it('should remove applied sorting', () => {
      const { dispatch } = result.current;

      const sortingAction: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending },
      };
      const resetAction: IResetStateAction = { type: STATION_LIST_ACTIONS.reset };

      act(() => {
        dispatch(sortingAction);
      });

      act(() => {
        dispatch(resetAction);
      });

      const { stationList: { displayedStations, defaultStations } } = result.current;

      expect(displayedStations).toEqual(defaultStations);
    });

    it('should remove applied filtering', () => {
      const { dispatch } = result.current;
      const filterAction: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1'] },
      };

      const resetAction: IResetStateAction = { type: STATION_LIST_ACTIONS.reset };

      act(() => {
        dispatch(filterAction);
      });

      act(() => {
        dispatch(resetAction);
      });

      const { stationList: { displayedStations, defaultStations } } = result.current;

      expect(displayedStations).toEqual(defaultStations);
    })

    it('should remove both applied sorting and filtering', () => {
      const { dispatch } = result.current;
      const filterAction: IFilterAction = {
        type: STATION_LIST_ACTIONS.filterBy,
        payload: { tags: ['tag_1'] },
      };
      const sortingAction: ISortAction = {
        type: STATION_LIST_ACTIONS.sortBy,
        payload: { [STATION_SORTABLE_PROPS.name]: SORT_ORDER.descending },
      };

      const resetAction: IResetStateAction = { type: STATION_LIST_ACTIONS.reset };

      act(() => {
        dispatch(filterAction);
      });

      act(() => {
        dispatch(sortingAction);
      });

      act(() => {
        dispatch(resetAction);
      });

      const { stationList: { displayedStations, defaultStations } } = result.current;

      expect(displayedStations).toEqual(defaultStations);
    });
  });
});
