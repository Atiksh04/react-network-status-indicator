# React Network Status Indicator

A lightweight React library to monitor and display network status with customizable notifications. Includes a notifier component and a React hook for monitoring online/offline status and connection type.

![npm](https://img.shields.io/npm/v/react-network-status-indicator?color=blue&style=flat-square)
![MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![npm downloads](https://img.shields.io/npm/dt/react-network-status-indicator?style=flat-square)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Props for `NetworkStatusNotifier`](#props-for-networkstatusnotifier)
  - [Customizing the Component](#customizing-the-component)
  - [Using the `useNetworkStatus` Hook](#using-the-usenetworkstatus-hook)
- [Custom Styles](#custom-styles)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Detects **online/offline** status dynamically.
- Provides a **customizable notifier** for network status changes.
- Exposes a **React hook** to monitor network connectivity and connection type.
- Lightweight and fully written in **TypeScript**.
- Easy integration into any React application.
- Fully customizable:
  - Custom text for online/offline messages.
  - Configurable message durations.
  - Adjustable positioning of the notifier.

---

## Installation

Install the library using npm:

```bash
npm install react-network-status-indicator

Or using Yarn:

yarn add react-network-status-indicator

```

## Usage

### Basic Example

Here’s a simple example showing how to use the `NetworkStatusNotifier` component and the `useNetworkStatus` hook:


```javascript
import React from 'react';
import { NetworkStatusNotifier, useNetworkStatus } from 'react-network-status-indicator';

function App() {
  const { isOnline, connectionType } = useNetworkStatus();

  return (
    <div>
      <NetworkStatusNotifier />
      <p>Is Online: {isOnline ? 'Yes' : 'No'}</p>
      <p>Connection Type: {connectionType}</p>
    </div>
  );
}

export default App;
```

# NetworkStatusNotifier Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onlineText | string | "You are back online!" | Text displayed when the network is online. |
| offlineText | string | "You are offline." | Text displayed when the network is offline. |
| onlineTextShowDuration | number | 3000 | Duration (ms) to display the online message. |
| offlineTextShowDuration | number | 3000 | Duration (ms) to display the offline message. |
| position | "top-left" \| "top-right" \| "bottom-left" \| "bottom-right" | "top-right" | Position of the notifier. |
| className | string | "" | Additional CSS class for custom styles. |
| style | object | {} | Inline styles for the notifier container. |

## Customizing the Component

You can customize the NetworkStatusNotifier component by changing its messages, position, duration, and styles.

Example with Customization

```javascript
import React from 'react';
import { NetworkStatusNotifier } from 'react-network-status-indicator';

function App() {
  return (
    <div>
      <NetworkStatusNotifier
        onlineText="Yay! Network is back online 🎉"
        offlineText="Oops! You're offline 😟"
        onlineTextShowDuration={5000}
        offlineTextShowDuration={4000}
        position="bottom-left"
        style={{
          color: "white",
          backgroundColor: "blue",
          borderRadius: "8px",
        }}
        className="custom-network-notifier"
      />
    </div>
  );
}

export default App;
```


## Using the useNetworkStatus Hook
The useNetworkStatus hook provides the current network status and connection type.

Hook Signature

```javascript
function useNetworkStatus(): {
  isOnline: boolean | null;
  connectionType: string;
  hasNetworkChanged: boolean;
}
Example Usage
tsx
Copy code
import React from 'react';
import { useNetworkStatus } from 'react-network-status-indicator';

function NetworkInfo() {
  const { isOnline, connectionType } = useNetworkStatus();

  return (
    <div>
      <p>Is Online: {isOnline ? 'Yes' : 'No'}</p>
      <p>Connection Type: {connectionType}</p>
    </div>
  );
}

export default NetworkInfo;
```

## Custom Styles
Add custom styles via the style prop or CSS classes.


```javascript
Example with CSS
styles.css:

css
Copy code
.custom-network-notifier {
  font-size: 16px;
  padding: 10px;
  border: 2px solid white;
}
```

## Component Usage:

```javascript
<NetworkStatusNotifier className="custom-network-notifier" />
```

Contributing
Contributions are welcome! If you find a bug or want to suggest a feature, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.