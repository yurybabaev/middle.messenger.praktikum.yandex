type Callback = (...args: unknown[]) => void;

class EventBus {
  private listeners: Map<string, Callback[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, callback: Callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this.listeners.has(event)) {
      throw new Error(`No event to unsubscribe: ${event}`);
    }
    const handlers = this.listeners.get(event)!;
    if (!handlers.includes(callback)) {
      throw new Error('Unknown handler');
    }
    this.listeners.set(event, handlers.filter((handler) => handler !== callback));
  }

  emit(event: string, ...args: unknown[]) {
    this.listeners.get(event)?.forEach((handler) => {
      handler(...args);
    });
  }
}

export default EventBus;
