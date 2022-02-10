import { render } from '@testing-library/react';

import StationsList from './stations-list';

describe('StationsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StationsList />);
    expect(baseElement).toBeTruthy();
  });
});
