import ChatMessage from '../models/ChatMessage';
import EventBus from '../utils/eventBus';

export interface OutgoingMessage {
  type: 'message' | 'get old';
  content: string;
}

class MessagingApi extends EventBus {
  private _socket: WebSocket;

  apiMessageToMessageModel(apiMessage: Record<string, unknown>): ChatMessage {
    return {
      userId: Number(apiMessage.user_id),
      chatId: Number(apiMessage.chat_id),
      text: apiMessage.content ? String(apiMessage.content) : '',
      time: new Date(String(apiMessage.time)),
    };
  }

  public initNewConnection(userId: number, chatId: number, token: string) {
    if (this._socket) {
      this._socket.close();
    }
    this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    this._socket.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log(`Connection created for user: ${userId} chat: ${chatId} token: ${token}`);
    });

    this._socket.addEventListener('close', (e) => {
      // eslint-disable-next-line no-console
      console.log(`Connection closed: ${e.wasClean ? 'clean' : 'dirty'}, with code: ${e.code} (${e.reason})`);
    });

    this._socket.addEventListener('message', (e) => {
      // eslint-disable-next-line no-console
      console.log(`Message received: ${e.data}`);
      this.emit('message', e.data);
    });

    this._socket.addEventListener('error', (e) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${e}`);
    });
  }

  public sendMessage(message: OutgoingMessage) {
    if (!this._socket) {
      throw new Error('Init connection first');
    }
    this._socket.send(JSON.stringify(message));
  }
}

export default new MessagingApi();
