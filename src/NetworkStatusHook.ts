import { useEffect, useState, useRef } from "react";

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

/** A custom React hook to monitor and return the current network status and whether the network has changed */
export function useNetworkStatus(): {
  isOnline: boolean | null;
  connectionType: string;
  hasNetworkChanged: boolean;
} {
  const [stateVariable, setStateVariable] = useState<{
    isOnline: boolean | null;
    connectionType: string;
    hasNetworkChanged: boolean;
  }>({
    isOnline: null, // Initial state is null
    connectionType: "unknown",
    hasNetworkChanged: false,
  });

  const previousStatus = useRef<boolean | null>(null);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const newStatus = navigator.onLine;

      // Update only if the online status actually changes
      if (previousStatus.current !== newStatus) {
        previousStatus.current = newStatus;
        setStateVariable((prev) => ({
          ...prev,
          isOnline: newStatus,
          hasNetworkChanged: prev.isOnline !== null,
        }));
      }
    };

    const updateConnectionType = () => {
      const newConnectionType = navigator.connection?.effectiveType || "unknown";

      // Update only if the connection type changes
      setStateVariable((prev) =>
        newConnectionType !== prev.connectionType
          ? { ...prev, connectionType: newConnectionType }
          : prev
      );
    };

    // Initialize state on mount
    previousStatus.current = navigator.onLine;
    setStateVariable((prev) => ({
      ...prev,
      isOnline: navigator.onLine,
      connectionType: navigator.connection?.effectiveType || "unknown",
    }));

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    if (navigator.connection) {
      navigator.connection.addEventListener("change", updateConnectionType);
    }

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);

      if (navigator.connection) {
        navigator.connection.removeEventListener("change", updateConnectionType);
      }
    };
  }, []);

  return stateVariable;
}
