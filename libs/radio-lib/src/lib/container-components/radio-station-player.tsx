import { AudioPlayer } from '../presentational-components/audio-player';
import { useStationList } from '../hooks/use-station-list';

export function RadioStationPlayer() {
  const { stationList, dispatch } = useStationList();

  return (
    <>
    <div></div>
      <AudioPlayer src='https://us4.internet-radio.com/proxy/douglassinclair?mp=/stream'/>
    </>
  );
}

export default RadioStationPlayer;
