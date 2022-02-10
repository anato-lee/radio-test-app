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
    <ul>
     { stationList.stations.map(data => (
        <li>
          <StationInfo data={ data } />
          <button onClick={ () => { selectCurrentStation(data); } }>Play</button>
        </li>
       )) }
    </ul>
  );
}

export default StationsList;
