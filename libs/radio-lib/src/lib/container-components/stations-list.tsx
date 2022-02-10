import { useContext } from 'react';
import { useStationList } from '../hooks/use-station-list';
import { SelectedStationContext } from '../hooks/use-station-url-context';
import { IStation } from '../interfaces';
import { StationInfo } from '../presentational-components/station-info';


export function StationsList() {
  const { stationList, dispatch } = useStationList();
  const { setStation } = useContext(SelectedStationContext);
  const selectCurrentStation = (station: IStation) => {
    setStation(station);
  }

  return (
    <ul className='min-w-full'>
     { stationList.stations.map(data => (
        <li className='border-b-2 border-x-gray-700'>
          <div className='m-2 border-box grid grid-cols-8'>
            <div className='col-span-6'>
              <StationInfo data={ data } />
            </div>
            <div className='col-span-2 flex flex-col justify-center'>
              <button
                className='p-2 border-box rounded-full bg-sky-600 text-sm font-bold text-white self-center'
                onClick={ () => { selectCurrentStation(data); } }>Play &#9658;</button>
              </div>
          </div>
        </li>
       )) }
    </ul>
  );
}

export default StationsList;
