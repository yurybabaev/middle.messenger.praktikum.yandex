import EventBus from './eventBus';

export enum GlobalEvents {
  CURRENT_CHAT_CHANGED = 'CURRENT_CHAT_CHANGED',
}

export const globalEventBus = new EventBus();
