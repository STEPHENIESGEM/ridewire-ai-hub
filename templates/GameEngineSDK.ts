/**
 * GameEngineSDK - WebSocket Client for Unity-React Communication
 * 
 * Handles real-time bidirectional communication between React frontend
 * and Unity WebGL game engine with automatic reconnection.
 */

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

interface ReconnectionConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

class GameEngineSDK {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageQueue: WebSocketMessage[] = [];
  private isConnected = false;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  private config: ReconnectionConfig = {
    maxAttempts: 10,
    initialDelay: 3000,
    maxDelay: 30000,
    backoffMultiplier: 2,
  };

  private listeners: Map<string, ((data: any) => void)[]> = new Map();

  constructor(private wsUrl: string, config?: Partial<ReconnectionConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Connect to WebSocket server
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.wsUrl);

        this.ws.onopen = () => {
          console.log('[GameEngineSDK] Connected to server');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.flushMessageQueue();
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.ws.onerror = (error) => {
          console.error('[GameEngineSDK] WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[GameEngineSDK] Connection closed');
          this.isConnected = false;
          this.stopHeartbeat();
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * Send message to server
   */
  public send(type: string, data: any): void {
    const message: WebSocketMessage = {
      type,
      data,
      timestamp: Date.now(),
    };

    if (this.isConnected && this.ws) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message for when connection is restored
      this.messageQueue.push(message);
      console.warn('[GameEngineSDK] Message queued (not connected):', type);
    }
  }

  /**
   * Subscribe to messages of a specific type
   */
  public on(messageType: string, callback: (data: any) => void): void {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, []);
    }
    this.listeners.get(messageType)!.push(callback);
  }

  /**
   * Unsubscribe from messages
   */
  public off(messageType: string, callback: (data: any) => void): void {
    const callbacks = this.listeners.get(messageType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Handle incoming message
   */
  private handleMessage(rawData: string): void {
    try {
      const message: WebSocketMessage = JSON.parse(rawData);
      
      // Special handling for heartbeat
      if (message.type === 'heartbeat') {
        this.send('heartbeat_ack', {});
        return;
      }

      // Notify listeners
      const callbacks = this.listeners.get(message.type);
      if (callbacks) {
        callbacks.forEach(callback => callback(message.data));
      }
    } catch (error) {
      console.error('[GameEngineSDK] Failed to parse message:', error);
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxAttempts) {
      console.error('[GameEngineSDK] Max reconnect attempts reached');
      this.emit('max_reconnect_attempts');
      return;
    }

    const delay = Math.min(
      this.config.initialDelay * Math.pow(this.config.backoffMultiplier, this.reconnectAttempts),
      this.config.maxDelay
    );

    console.log(`[GameEngineSDK] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect().catch(() => {
        // Reconnection failed, will retry automatically
      });
    }, delay);
  }

  /**
   * Flush queued messages after reconnection
   */
  private flushMessageQueue(): void {
    if (this.messageQueue.length > 0) {
      console.log(`[GameEngineSDK] Flushing ${this.messageQueue.length} queued messages`);
      this.messageQueue.forEach(message => {
        this.send(message.type, message.data);
      });
      this.messageQueue = [];
    }
  }

  /**
   * Start heartbeat to keep connection alive
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.send('heartbeat', { timestamp: Date.now() });
    }, 30000); // 30 seconds
  }

  /**
   * Stop heartbeat
   */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  /**
   * Emit custom event to listeners
   */
  private emit(eventType: string, data?: any): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * Get connection status
   */
  public getStatus(): { connected: boolean; reconnectAttempts: number; queuedMessages: number } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      queuedMessages: this.messageQueue.length,
    };
  }
}

export default GameEngineSDK;
