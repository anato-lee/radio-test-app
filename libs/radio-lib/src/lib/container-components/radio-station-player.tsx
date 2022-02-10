import { AudioPlayer } from '../presentational-components/audio-player';
import { useStationList } from '../hooks/use-station-list';
import { SelectedStationContext } from '../hooks/use-station-url-context';
import { useState } from 'react';
import { IStation } from '../interfaces';
import { StationsList } from './stations-list';
import { ActiveStation } from './active-station';


export function RadioStationPlayer() {
  const { stationList, dispatch } = useStationList();
  const [station, setStation] = useState<IStation>({} as IStation);

  return (
    <SelectedStationContext.Provider value={ { station, setStation } }>
      <nav>
        <StationsList/>
      </nav>
      <main>
        <ActiveStation/>
      </main>
    </SelectedStationContext.Provider>
  );
}

export default RadioStationPlayer;
