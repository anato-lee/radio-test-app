import { createContext } from 'react';
import { ISelectedStationContext, IStation } from '../interfaces';

export const SelectedStationContext =  createContext<ISelectedStationContext>({
  station: {} as IStation,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStation: () => {},
});
