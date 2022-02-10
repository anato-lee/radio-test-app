import { act, renderHook } from '@testing-library/react-hooks';
import useStationList from './use-station-list';

describe('useStationList', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useStationList());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
