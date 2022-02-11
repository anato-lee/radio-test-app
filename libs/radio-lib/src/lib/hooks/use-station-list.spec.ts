import axios, { AxiosStatic } from 'axios';
import { act, renderHook } from '@testing-library/react-hooks';
import { useStationList } from './use-station-list';
import { IStation, IStationListState, IUseStationList } from '../interfaces';

const STATIONS_MOCK: IStation[] = [
  {
    id: '111',
    description: 'Station 1 description',
    name: 'Station 1',
    imgUrl: 'image_1.jpg',
    streamUrl: 'station_1_url',
    reliability: 1,
    popularity: 1,
    tags: ['tag_1']
  },
  {
    id: '111',
    description: 'Station 1 description',
    name: 'Station 1',
    imgUrl: 'image_1.jpg',
    streamUrl: 'station_1_url',
    reliability: 1,
    popularity: 1,
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
    description: 'Station 3 description',
    name: 'Station 3',
    imgUrl: 'image_3.jpg',
    streamUrl: 'station_3_url',
    reliability: 1,
    popularity: 3,
    tags: ['tag_1', 'tag_2']
  },
];

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useStationList', () => {
  it('should render successfully', () => {
    mockedAxios.get.mockResolvedValueOnce({ data: STATIONS_MOCK });

    const { result } = renderHook(() => useStationList());

    expect(result.current.stationList).toBeDefined();
    expect(result.current.dispatch).toBeDefined();
  });
});
