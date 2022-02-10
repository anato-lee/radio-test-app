import { IStation } from './station.interface';

export interface ISelectedStationContext {
  station: IStation;
  setStation: (station: IStation) => void
}
