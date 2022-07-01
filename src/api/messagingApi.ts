import ChatMessage from '../models/ChatMessage';
import EventBus from '../utils/eventBus';

export interface OutgoingMessage {
  type: 'message' | 'get old' | 'ping';
  content: string;
}

export interface IncomingMessage {
  type: 'user connected' | 'message' | 'pong';
  content: string;
  id?: string;
  user_id?: string;
  chat_id?: number;
  time: string;
}

class MessagingApi extends EventBus {
  private _socket: WebSocket;

  private _interval: NodeJS.Timer;

  apiMessageToMessageModel(apiMessage: IncomingMessage): ChatMessage {
    return {
      id: Number(apiMessage.id),
      userId: Number(apiMessage.user_id),
      chatId: Number(apiMessage.chat_id),
      text: apiMessage.content ? String(apiMessage.content) : '',
      time: new Date(String(apiMessage.time)),
    };
  }

  public initNewConnection(userId: number, chatId: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._socket) {
        if (this._interval) {
          clearInterval(this._interval);
        }
        this._socket.close();
      }
      this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

      this._socket.addEventListener('open', () => {
        // eslint-disable-next-line no-console
        console.log(`Connection created for user: ${userId} chat: ${chatId} token: ${token}`);
        this._interval = setInterval(() => this.ping(), 1000);
        resolve();
      });

      this._socket.addEventListener('close', (e) => {
        // eslint-disable-next-line no-console
        console.log(`Connection closed: ${e.wasClean ? 'clean' : 'dirty'}, with code: ${e.code} (${e.reason})`);
      });

      this._socket.addEventListener('message', (e) => {
        // eslint-disable-next-line no-console
        console.log(`Message received: ${e.data}`);
        const dataParsed = JSON.parse(e.data);
        if (Array.isArray(dataParsed)) {
          this.emit('messages', (dataParsed as IncomingMessage[]).map(this.apiMessageToMessageModel));
        } else {
          const message = dataParsed as IncomingMessage;
          switch (message.type) {
            case 'pong':
              break;
            case 'user connected':
              break; // todo
            case 'message':
              this.emit('messages', this.apiMessageToMessageModel(message));
              break;
            default:
          }
        }
      });

      this._socket.addEventListener('error', (e) => {
        // eslint-disable-next-line no-console
        console.log(`Error: ${e}`);
        this.emit('error', e);
        reject();
      });
    });
  }

  ping(): void {
    this.checkConnectionAndSendMessage({
      type: 'ping',
      content: '',
    });
  }

  private checkConnectionAndSendMessage(msg: OutgoingMessage) {
    if (!this._socket) {
      throw new Error('Init connection first');
    }
    this._socket.send(JSON.stringify(msg));
  }

  public sendMessage(message: string) {
    this.checkConnectionAndSendMessage({
      type: 'message',
      content: message,
    });
  }

  public requestOldMessages(startFrom: number) {
    this.checkConnectionAndSendMessage({
      type: 'get old',
      content: String(startFrom),
    });
  }
}

export default new MessagingApi();
