import { SelectedStationContext } from '../hooks/use-station-url-context';
import { useState } from 'react';
import { IStation } from '../interfaces';
import { StationsList } from './stations-list';
import { ActiveStation } from './active-station';


export function RadioStationPlayer() {
  const [station, setStation] = useState<IStation>({} as IStation);

  return (<SelectedStationContext.Provider value={ { station, setStation } }>
      <div className='flex flex-row'>
        <nav className='basis-1/3 border-r-2 border-x-gray-300'>
          <StationsList/>
        </nav>
        <main className='basis-2/3 ml-4'>
          <ActiveStation/>
        </main>
      </div>
    </SelectedStationContext.Provider>);
}

export default RadioStationPlayer;
