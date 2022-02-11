import { render } from '@testing-library/react';

import { ActiveStation } from './active-station';

describe('ActiveStation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActiveStation />);
    expect(baseElement).toBeTruthy();
  });
});
