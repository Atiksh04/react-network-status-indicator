import { renderHook } from '@testing-library/react';
import { useNetworkStatus } from '../NetworkStatusHook';
import { act } from 'react';

describe('useNetworkStatus', () => {

  beforeEach(() => {

    Object.defineProperty(global.navigator, 'onLine', { value: true, writable: true });
    Object.defineProperty(global.navigator, 'connection', {
      value: {
        effectiveType: '4g',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
    });
  });

  it('should return the initial online status and connection type', () => {
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.connectionType).toBe('4g');
  });

  it('should update the online status when the network changes', () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      Object.defineProperty(global.navigator, 'onLine', { value: false, writable: true });
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(false);

    act(() => {
      Object.defineProperty(global.navigator, 'onLine', { value: true, writable: true });
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOnline).toBe(true);
  });
});