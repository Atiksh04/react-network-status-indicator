import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNetworkStatus } from "./NetworkStatusHook";

interface NetworkStatusNotifierProps {
  onlineText?: string;
  offlineText?: string;
  onlineTextShowDuration?: number; // Duration for online message visibility
  offlineTextShowDuration?: number; // Duration for offline message visibility
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  style?: React.CSSProperties;
}

/** A React component to display online/offline status with customization options */
export function NetworkStatusNotifier({
  onlineText = "You are back online!",
  offlineText = "You are offline.",
  onlineTextShowDuration = 3000,
  offlineTextShowDuration = 3000,
  position = "top-right",
  className = "",
  style = {},
}: NetworkStatusNotifierProps) {
  const { isOnline, hasNetworkChanged } = useNetworkStatus();
  const [showText, setShowText] = useState<boolean>(false);

  useEffect(() => {
    if (hasNetworkChanged) {
      setShowText(true);

      const duration = isOnline ? onlineTextShowDuration : offlineTextShowDuration;
      const timer = setTimeout(() => {
        setShowText(false); // Hide the text after the specified duration
      }, duration);

      return () => clearTimeout(timer); // Cleanup timeout on unmount or re-trigger
    }
  }, [hasNetworkChanged, isOnline, onlineTextShowDuration, offlineTextShowDuration]);

  const positionClasses: Record<string, string> = {
    "top-left": "network-status-notifier--top-left",
    "top-right": "network-status-notifier--top-right",
    "bottom-left": "network-status-notifier--bottom-left",
    "bottom-right": "network-status-notifier--bottom-right",
  };

  if (!showText) {
    return null; // Only render when `showText` is true
  }

  return (
    <div
      className={`network-status-notifier ${positionClasses[position]} ${className} ${
        isOnline ? "network-status-notifier--online" : "network-status-notifier--offline"
      }`}
      style={style}
    >
      {isOnline ? onlineText : offlineText}
    </div>
  );
}
