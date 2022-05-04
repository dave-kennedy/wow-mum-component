import { Component, Method, Prop, State, h } from '@stencil/core';
import { Message, Theatre } from 'wow-mum-look-no-hands';

@Component({
  shadow: true,
  styleUrl: 'wow-mum-loader.css',
  tag: 'wow-mum-loader',
})
export class WowMumLoader {
  @State() currentMessage: Message;

  @Prop() messageData: string;

  @Prop() messageDataUrl: string;

  messages: Message[] = [];

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

  @Method()
  async showtime(): Promise<void> {
    console.debug('showtime:', this.messages);

    const theatre = new Theatre({
      logger: message => this.currentMessage = message,
      messages: this.messages,
    });

    return await theatre.showtime();
  }

  render() {
    if (!this.currentMessage) {
      return <div>Loading...</div>;
    }

    return (
      <div class={this.currentMessage.logLevel}>
        {this.currentMessage.logLevel.toUpperCase()}: {this.currentMessage.message}
      </div>
    );
  }
}

