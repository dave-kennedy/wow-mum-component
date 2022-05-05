import { Component, Method, Prop, State, h } from '@stencil/core';
import { Message, Theatre } from 'wow-mum-look-no-hands';

@Component({
  shadow: true,
  styleUrl: 'wow-mum-component.css',
  tag: 'wow-mum-component',
})
export class WowMumComponent {
  messages: Message[] = [];

  @Prop() messageData: string;

  @Prop() messageDataUrl: string;

  @Prop() visibleLimit: number;

  @State() visibleMessages: Message[];

  componentWillLoad() {
    if (this.messageData) {
      this.loadMessagesFromString(this.messageData);
    } else if (this.messageDataUrl) {
      this.loadMessagesFromUrl(this.messageDataUrl);
    }
  }

  @Method()
  async loadMessagesFromString(json: string): Promise<void> {
    try {
      const messages = JSON.parse(json);
      return await this.setMessages(messages);
    } catch (error) {
      console.error(`Unable to load messages from ${json}`);
      return;
    }
  }

  @Method()
  async loadMessagesFromUrl(url: string): Promise<void> {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Unable to load messages from ${url}`);
      return;
    }

    const messages = await response.json();
    return await this.setMessages(messages);
  }

  @Method()
  async setMessages(messages: Message[]): Promise<void> {
    this.messages = messages.map(it => new Message({ ...it }));
    return await this.showtime();
  }

  showMessage(message: Message) {
    if (this.visibleLimit == 1) {
      this.visibleMessages = [message];
      return;
    }

    const end = this.messages.indexOf(message) + 1;

    if (!this.visibleLimit) {
      this.visibleMessages = this.messages.slice(0, end);
      return;
    }

    const start = Math.max(0, end - this.visibleLimit);
    this.visibleMessages = this.messages.slice(start, end);
  }

  @Method()
  async showtime(): Promise<void> {
    console.debug('showtime:', this.messages);

    const theatre = new Theatre({
      logger: message => this.showMessage(message),
      messages: this.messages,
    });

    return await theatre.showtime();
  }

  render() {
    if (!this.visibleMessages) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.visibleMessages.map(message =>
          <div class={message.logLevel}>
            {message.logLevel.toUpperCase()}: {message.message}
          </div>
        )}
      </div>
    );
  }
}

