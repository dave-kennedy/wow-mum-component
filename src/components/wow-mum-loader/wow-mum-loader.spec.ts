import { newSpecPage } from '@stencil/core/testing';
import { Theatre } from 'wow-mum-look-no-hands';
import { WowMumLoader } from './wow-mum-loader';

beforeEach(() => {
  jest.resetAllMocks();
});

test('componentWillLoad calls loadMessagesFromString', () => {
  const component = new WowMumLoader();
  component.loadMessagesFromString = jest.fn();
  component.loadMessagesFromUrl = jest.fn();
  component.messageData = 'asdf';

  component.componentWillLoad();

  expect(component.loadMessagesFromString).toHaveBeenCalled();
  expect(component.loadMessagesFromUrl).not.toHaveBeenCalled();
});

test('componentWillLoad calls loadMessagesFromUrl', () => {
  const component = new WowMumLoader();
  component.loadMessagesFromString = jest.fn();
  component.loadMessagesFromUrl = jest.fn();
  component.messageDataUrl = 'asdf';

  component.componentWillLoad();

  expect(component.loadMessagesFromString).not.toHaveBeenCalled();
  expect(component.loadMessagesFromUrl).toHaveBeenCalled();
});

test('loadMessagesFromString returns nothing on error', async () => {
  const component = new WowMumLoader();
  component.setMessages = jest.fn().mockReturnValue('foo');

  const actual = await component.loadMessagesFromString('bar');

  expect(actual).toBeUndefined();
  expect(component.setMessages).not.toHaveBeenCalled();
});

test('loadMessagesFromString returns setMessages on success', async () => {
  const messages = [
    { message: 'Hello!' },
    { delayInMS: 500, logLevel: 'error', message: 'Goodbye!' }
  ];

  const component = new WowMumLoader();
  component.setMessages = jest.fn().mockReturnValue('foo');

  const actual = await component.loadMessagesFromString(JSON.stringify(messages));

  expect(actual).toEqual('foo');
  expect(component.setMessages).toHaveBeenCalledTimes(1);
  expect(component.setMessages).toHaveBeenCalledWith(messages);
});

test('loadMessagesFromUrl returns nothing on error', async () => {
  const component = new WowMumLoader();
  component.setMessages = jest.fn().mockReturnValue('foo');

  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ok: false}));

  const actual = await component.loadMessagesFromUrl('http://foo/bar');

  expect(actual).toBeUndefined();
  expect(component.setMessages).not.toHaveBeenCalled();
});

test('loadMessagesFromUrl returns setMessages on success', async () => {
  const messages = [
    { message: '¡Hola!' },
    { delayInMS: 500, logLevel: 'error', message: '¡Adiós!' }
  ];

  const component = new WowMumLoader();
  component.setMessages = jest.fn().mockReturnValue('foo');

  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(messages)
    }));

  const actual = await component.loadMessagesFromUrl('http://foo/bar');

  expect(actual).toEqual('foo');
  expect(component.setMessages).toHaveBeenCalledTimes(1);
  expect(component.setMessages).toHaveBeenCalledWith(messages);
});

test('setMessages returns showtime on success', async () => {
  const messages = [
    { message: 'Ciao!' },
    { delayInMS: 500, logLevel: 'error', message: 'Arrivederci!' }
  ];

  const component = new WowMumLoader();
  component.showtime = jest.fn().mockReturnValue('foo');

  const actual = await component.setMessages(messages);

  expect(actual).toEqual('foo');

  expect(component.messages).toEqual([
    { delayInMS: 250, logLevel: 'info', message: 'Ciao!' },
    { delayInMS: 500, logLevel: 'error', message: 'Arrivederci!' }
  ]);
});

test('showtime returns Theatre.showtime on success', async () => {
  const component = new WowMumLoader();

  jest
    .spyOn(Theatre.prototype, 'showtime')
    .mockImplementation(() => 'foo');

  const actual = await component.showtime();

  expect(actual).toEqual('foo');
});
