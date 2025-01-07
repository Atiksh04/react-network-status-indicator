import { useEffect, useState } from 'react';

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

interface NetworkInformation extends EventTarget {
  readonly effectiveType: string;
  readonly type: string;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}


/** A custom React hook to monitor and return the current network status */
export function useNetworkStatus(): { isOnline: boolean; connectionType: string } {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>(
    navigator.connection?.effectiveType || 'unknown'
  );

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    const updateConnectionType = () => {
      setConnectionType(navigator.connection?.effectiveType || 'unknown');
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateConnectionType);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);

      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateConnectionType);
      }
    };
  }, []);

  return { isOnline, connectionType };
}
