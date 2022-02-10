import { useContext } from 'react';
import { SelectedStationContext } from '../hooks/use-station-url-context';
import { AudioPlayer } from '../presentational-components/audio-player';
import { StationInfo } from '../presentational-components/station-info';

/* eslint-disable-next-line */
export interface ActiveStationProps {}

export function ActiveStation(props: ActiveStationProps) {
  const { station } = useContext(SelectedStationContext);

  return !station?.name ?
   (<h1>Please select station</h1>) :
   (<article>
      <h1>{ `Now playing ${station.name.toUpperCase()}` }</h1>
      <AudioPlayer src={ station.streamUrl }/>
      <div>
        <StationInfo data={ station } ></StationInfo>
      </div>
    </article>);
}

export default ActiveStation;
