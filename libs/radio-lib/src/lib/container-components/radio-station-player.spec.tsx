import { render } from '@testing-library/react';

import RadioStationPlayer from './radio-station-player';

describe('RadioStationPlayer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RadioStationPlayer />);
    expect(baseElement).toBeTruthy();
  });
});
