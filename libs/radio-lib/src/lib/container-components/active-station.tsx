import { useContext } from 'react';
import { SelectedStationContext } from '../hooks/use-station-url-context';
import { AudioPlayer } from '../presentational-components/audio-player';
import { StationInfo } from '../presentational-components/station-info';

export function ActiveStation() {
  const { station } = useContext(SelectedStationContext);

  return !station?.name ?
   (<h1>Please select station</h1>) :
   (<article className='grid grid-cols-8'>
      <div className='col-span-2'>
        <AudioPlayer src={ station.streamUrl }/>
      </div>
      <h1 className='col-span-6 text-3xl font-semibold'>{ `Now playing ${station.name.toUpperCase()}` }</h1>
      <div className='col-span-8'>
        <StationInfo data={ station } ></StationInfo>
      </div>
    </article>);
}
