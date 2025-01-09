import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { useNetworkStatus } from '../NetworkStatusHook';
import { NetworkStatusNotifier } from '../NetworkStatusNotifier';
import '@testing-library/jest-dom'

jest.mock('../NetworkStatusHook', () => ({
  useNetworkStatus: jest.fn(),
}));

describe('NetworkStatusNotifier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props when online', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });

    render(<NetworkStatusNotifier />);

    const notifier = screen.getByText('You are back online!');
    expect(notifier).toBeInTheDocument();
    expect(notifier).toHaveClass('network-status-notifier--online');
    expect(notifier).toHaveClass('network-status-notifier--top-right');
  });

  it('renders with default props when offline', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: false });

    render(<NetworkStatusNotifier />);

    const notifier = screen.getByText('You are offline.');
    expect(notifier).toBeInTheDocument();
    expect(notifier).toHaveClass('network-status-notifier--offline');
    expect(notifier).toHaveClass('network-status-notifier--top-right');
  });

  it('applies custom styles', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });

    const customStyles = {
      height: '50px',
      width: '200px',
      backgroundColor: 'blue',
    };

    render(<NetworkStatusNotifier style={customStyles} />);

    const notifier = screen.getByText('You are back online!');
    expect(notifier).toHaveStyle(customStyles);
  });

  it('renders with a custom position and additional class name', () => {
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });

    render(
      <NetworkStatusNotifier
        position="bottom-left"
        className="custom-class"
      />
    );

    const notifier = screen.getByText('You are back online!');
    expect(notifier).toHaveClass('network-status-notifier--bottom-left');
    expect(notifier).toHaveClass('custom-class');
  });

  it('hides online text after the specified duration', () => {
    jest.useFakeTimers();
    (useNetworkStatus as jest.Mock).mockReturnValue({ isOnline: true });

    render(<NetworkStatusNotifier onlineTextShowDuration={2000} />);

    const notifier = screen.getByText('You are back online!');
    expect(notifier).toBeVisible();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(notifier).not.toBeVisible();
    jest.useRealTimers();
  });

  it('handles dynamic online and offline transitions', () => {
    const mockNetworkStatus = { isOnline: false };
    (useNetworkStatus as jest.Mock).mockReturnValue(mockNetworkStatus);

    const { rerender } = render(<NetworkStatusNotifier />);

    let notifier = screen.getByText('You are offline.');
    expect(notifier).toBeInTheDocument();
    expect(notifier).toHaveClass('network-status-notifier--offline');

    act(() => {
      mockNetworkStatus.isOnline = true;
      rerender(<NetworkStatusNotifier />);
    });

    notifier = screen.getByText('You are back online!');
    expect(notifier).toBeInTheDocument();
    expect(notifier).toHaveClass('network-status-notifier--online');
  });
});
