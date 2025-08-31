---
layout: product
title: WEBSOCKET INTEGRATION
product: DevMentor
source: frontend/WEBSOCKET_INTEGRATION.md
---

{% raw %}
# WebSocket Integration Documentation

## Overview
This document describes the WebSocket implementation for real-time updates in the DevMentor platform, including architecture, usage, testing, and deployment considerations.

**Last Updated**: 2025-08-25 14:30 UTC  
**Status**: ✅ IMPLEMENTED AND TESTED

## Table of Contents
- [Architecture](#architecture)
- [Implementation](#implementation)
- [Components](#components)
- [Testing](#testing)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Architecture

### Technology Stack
- **Client**: Socket.io-client v4.8.1
- **Server**: Socket.io (port 8002)
- **Protocol**: WebSocket with HTTP polling fallback
- **Rooms**: Project and Sprint-based isolation

### Data Flow
```
User Action → WebSocket Event → Server Broadcast → All Connected Clients Update
```

### Event Types
| Event | Direction | Description |
|-------|-----------|-------------|
| `task:created` | Server→Client | New task created |
| `task:updated` | Server→Client | Task properties updated |
| `task:deleted` | Server→Client | Task removed |
| `task:status_changed` | Server→Client | Task status changed |
| `epic:created` | Server→Client | New epic created |
| `epic:updated` | Server→Client | Epic properties updated |
| `project:updated` | Server→Client | Project properties changed |
| `connection:status` | Internal | Connection state change |

## Implementation

### Service Layer (`websocket.service.ts`)
```typescript
// Singleton WebSocket service
import websocketService from '@/services/websocket.service';

// Connect to WebSocket server
websocketService.connect();

// Subscribe to events
const unsubscribe = websocketService.on('task:updated', (data) => {
  console.log('Task updated:', data);
});

// Join a project room for scoped updates
websocketService.joinProject('project-123');

// Send events to server
websocketService.send('task:update', { id: 'task-1', status: 'completed' });

// Cleanup
unsubscribe();
websocketService.disconnect();
```

### React Hooks

#### Basic WebSocket Hook
```typescript
import { useWebSocket } from '@/hooks/useWebSocket';

function MyComponent() {
  const { isConnected, subscribe } = useWebSocket('project-123');
  
  useEffect(() => {
    const unsub = subscribe('task:created', (task) => {
      // Handle new task
    });
    return unsub;
  }, [subscribe]);
}
```

#### Task-Specific Hook
```typescript
import { useTaskWebSocket } from '@/hooks/useWebSocket';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  
  useTaskWebSocket((update) => {
    switch(update.type) {
      case 'created':
        setTasks(prev => [...prev, update.data]);
        break;
      case 'updated':
        setTasks(prev => prev.map(t => 
          t.id === update.data.id ? update.data : t
        ));
        break;
      case 'deleted':
        setTasks(prev => prev.filter(t => t.id !== update.data.id));
        break;
    }
  });
}
```

## Components

### ProjectTasksWidget
**Location**: `src/features/projects/ProjectTasksWidget.tsx`

Features:
- Real-time task updates
- Visual connection status indicator (Live/Polling)
- Automatic fallback to 30-second polling
- Mock data support

### TaskBoard
**Location**: `src/features/projects/TaskBoard.tsx`

Features:
- Drag-and-drop with real-time sync
- Three-column kanban board
- WebSocket updates for all task changes
- Visual feedback during operations

### TaskFormModal
**Location**: `src/components/modals/TaskFormModal.tsx`

Features:
- Create/Edit tasks
- Real-time form submission
- Error handling
- Loading states

## Testing

### Unit Tests
**Location**: `tests/unit/services/websocket.service.test.ts`

Coverage:
- Connection management
- Event subscription/unsubscription
- Room management
- Error handling
- Mock socket behavior

Run tests:
```bash
npm run test:unit:services
```

### E2E Tests
**Location**: `tests/playwright/e2e/realtime-updates.spec.ts`

Test scenarios:
- WebSocket connection status display
- Drag-and-drop task management
- Real-time updates across multiple clients
- Fallback to polling
- Error recovery

Run E2E tests:
```bash
npm run test:e2e
# Or specific test file
npx playwright test realtime-updates.spec.ts
```

### Testing Real-time Features Locally
1. Open two browser windows
2. Navigate both to http://localhost:3001/projects
3. Make changes in one window
4. Observe updates in the other window

## Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:8002
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_MOCK_MODE=false
```

### WebSocket Configuration
```typescript
const config = {
  url: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket', 'polling']
};
```

## Deployment

### Development
```bash
# Start WebSocket server (if running separately)
cd services/websocket-gateway
npm run dev

# Start frontend with WebSocket enabled
cd frontend/devmentor-ui
NEXT_PUBLIC_ENABLE_REALTIME=true npm run dev
```

### Production Considerations

#### Scaling
- Use Redis adapter for Socket.io to support multiple server instances
- Implement sticky sessions for load balancing
- Consider horizontal scaling with Kubernetes

#### Security
- Implement JWT authentication for WebSocket connections
- Use WSS (WebSocket Secure) in production
- Rate limit WebSocket events
- Validate all incoming events

#### Monitoring
- Track connection count
- Monitor event throughput
- Log disconnection reasons
- Alert on high reconnection rates

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: websocket-gateway
  namespace: devmentor-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: websocket-gateway
  template:
    metadata:
      labels:
        app: websocket-gateway
    spec:
      containers:
      - name: websocket-gateway
        image: devmentor/websocket-gateway:latest
        ports:
        - containerPort: 8002
        env:
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-credentials
              key: url
```

## Troubleshooting

### Common Issues

#### Connection Not Establishing
```typescript
// Check WebSocket status
console.log('Connected:', websocketService.getConnectionStatus());

// Verify URL
console.log('WebSocket URL:', process.env.NEXT_PUBLIC_WEBSOCKET_URL);

// Check browser console for errors
// Look for CORS issues or connection refused
```

#### Events Not Received
```typescript
// Verify subscription
const unsub = websocketService.on('task:updated', (data) => {
  console.log('Received:', data);
});

// Check room membership
websocketService.joinProject('project-id');

// Verify server is broadcasting
// Check server logs for event emission
```

#### Polling Instead of WebSocket
- Check `NEXT_PUBLIC_ENABLE_REALTIME` is set to `true`
- Verify WebSocket server is running
- Check for proxy/firewall blocking WebSocket upgrade
- Look for "Polling" indicator in UI

### Debug Mode
Enable verbose logging:
```typescript
// In websocket.service.ts constructor
if (process.env.NODE_ENV === 'development') {
  this.socket.on('*', (event, ...args) => {
    console.log(`WebSocket Event: ${event}`, args);
  });
}
```

### Performance Optimization

#### Debouncing Updates
```typescript
import { debounce } from 'lodash';

const debouncedUpdate = debounce((updates) => {
  setTasks(updates);
}, 100);

useTaskWebSocket((update) => {
  // Batch updates
  debouncedUpdate(update);
});
```

#### Selective Subscriptions
```typescript
// Only subscribe to relevant events
useEffect(() => {
  if (projectId) {
    websocketService.joinProject(projectId);
    return () => websocketService.leaveProject(projectId);
  }
}, [projectId]);
```

## API Reference

### WebSocketService Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `connect()` | - | void | Establish WebSocket connection |
| `disconnect()` | - | void | Close WebSocket connection |
| `on(event, callback)` | string, Function | Function | Subscribe to event, returns unsubscribe |
| `send(event, data)` | string, any | void | Send event to server |
| `joinProject(id)` | string | void | Join project room |
| `leaveProject(id)` | string | void | Leave project room |
| `getConnectionStatus()` | - | boolean | Get connection state |

### React Hooks

| Hook | Parameters | Returns | Description |
|------|-----------|---------|-------------|
| `useWebSocket` | projectId? | {isConnected, subscribe} | Base WebSocket hook |
| `useTaskWebSocket` | onUpdate? | {lastUpdate} | Task-specific events |
| `useEpicWebSocket` | onUpdate? | {lastUpdate} | Epic-specific events |
| `useProjectWebSocket` | onUpdate? | {lastUpdate} | Project-specific events |

## Best Practices

1. **Always clean up subscriptions**
   ```typescript
   useEffect(() => {
     const unsub = subscribe('event', handler);
     return unsub; // Clean up on unmount
   }, []);
   ```

2. **Handle connection failures gracefully**
   ```typescript
   const { isConnected } = useWebSocket();
   if (!isConnected) {
     return <PollingIndicator />;
   }
   ```

3. **Optimize re-renders**
   ```typescript
   const handleUpdate = useCallback((data) => {
     // Process update
   }, [dependencies]);
   ```

4. **Use room-based isolation**
   ```typescript
   // Join specific project room
   websocketService.joinProject(projectId);
   // Only receive events for this project
   ```

5. **Implement optimistic updates**
   ```typescript
   // Update UI immediately
   setTasks(optimisticUpdate);
   // Send to server
   websocketService.send('task:update', data);
   // Revert on error
   ```

## Migration Guide

### From Polling to WebSocket
1. Set `NEXT_PUBLIC_ENABLE_REALTIME=true`
2. Deploy WebSocket server
3. Update components to use WebSocket hooks
4. Remove polling intervals
5. Add connection status indicators

### From Mock to Real Data
1. Set `NEXT_PUBLIC_MOCK_MODE=false`
2. Ensure backend services are running
3. Configure service URLs in `.env.local`
4. Test with real API endpoints
5. Keep mock data as fallback

## Support

For issues or questions:
- Check [SYSTEM_STATUS.md](../status/SYSTEM_STATUS.md) for current status
- Review [EPIC_MANAGEMENT.md](../status/EPIC_MANAGEMENT.md) for planned improvements
- Contact the Frontend Team for component issues
- Contact the Platform Team for WebSocket server issues

---

*This documentation is part of the DevMentor Frontend Integration effort completed on 2025-08-25.*
{% endraw %}
