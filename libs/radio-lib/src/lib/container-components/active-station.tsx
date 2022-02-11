import { useContext } from 'react';
import { SelectedStationContext } from '../hooks/use-station-url-context';
import { AudioPlayer } from '../presentational-components/audio-player';
import { StationInfo } from '../presentational-components/station-info';

export function ActiveStation() {
  const { station } = useContext(SelectedStationContext);

  return !station?.name ?
   (<h2>Please select station</h2>) :
   (<article className='grid grid-cols-8'>
      <div className='col-span-6 m-4'>
        <AudioPlayer src={ station.streamUrl }/>
      </div>
      <div className='col-span-8 m-4'>
        <StationInfo data={ station } ></StationInfo>
      </div>
    </article>);
}
