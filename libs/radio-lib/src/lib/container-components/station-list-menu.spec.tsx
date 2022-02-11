import { render } from '@testing-library/react';

import StationListMenu from './station-list-menu';

describe('StationListMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StationListMenu />);
    expect(baseElement).toBeTruthy();
  });
});
