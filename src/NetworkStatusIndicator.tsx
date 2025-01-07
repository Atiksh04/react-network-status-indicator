import React from "react";
import { useEffect, useState } from 'react';
import './styles.css';
import { useNetworkStatus } from "./NetworkStatusHook";


interface NetworkStatusIndicatorProps {
  onlineText?: string;
  offlineText?: string;
  onlineTextShowDuration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  style?: React.CSSProperties;
}

/** A React component to display online/offline status with customization options */
export function NetworkStatusIndicator({
    onlineText = 'You are back online!',
    offlineText = 'You are offline.',
    onlineTextShowDuration = 3000,
    position = 'top-right',
    className = '',
    style = {},
  }: NetworkStatusIndicatorProps) {
    const { isOnline } = useNetworkStatus();
    const [showOnlineText, setShowOnlineText] = useState<boolean>(false);
  
    useEffect(() => {
      if (isOnline) {
        setShowOnlineText(true);
        const timer = setTimeout(() => setShowOnlineText(false), onlineTextShowDuration);
        return () => clearTimeout(timer);
      }
    }, [isOnline, onlineTextShowDuration]);
  
    const positionClasses: Record<string, string> = {
      'top-left': 'network-status-indicator--top-left',
      'top-right': 'network-status-indicator--top-right',
      'bottom-left': 'network-status-indicator--bottom-left',
      'bottom-right': 'network-status-indicator--bottom-right',
    };
  
    return (
      <div
        className={`network-status-indicator ${positionClasses[position]} ${className} ${
          isOnline ? 'network-status-indicator--online' : 'network-status-indicator--offline'
        }`}
        style={{ display: isOnline && !showOnlineText ? 'none' : 'block', ...style }}
      >
        {isOnline ? onlineText : offlineText}
      </div>
    );
  }