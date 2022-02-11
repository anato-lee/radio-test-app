// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { RadioStationPlayer } from '@libs/radio';

export function App() {
  return (<>
    <h1 className='text-4xl text-center m-4'>Welcome to Radio-App</h1>
    <RadioStationPlayer/>
  </>);
}

export default App;
