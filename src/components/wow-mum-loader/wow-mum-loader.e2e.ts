import { newE2EPage } from '@stencil/core/testing';

test('render with defaults', async () => {
  const page = await newE2EPage({
    html: '<wow-mum-loader />',
  });

  const innerDiv = await page.find('wow-mum-loader >>> div');
  expect(innerDiv.textContent).toEqual('Loading...');
});

test('render with messageData', async () => {
  const page = await newE2EPage({
    html: `
      <wow-mum-loader message-data='[
        {"message": "Hello!"},
        {"delayInMS": 500, "logLevel": "error", "message": "Goodbye!"}
      ]' />
    `,
  });

  const innerDiv = await page.find('wow-mum-loader >>> div');
  expect(innerDiv.textContent).toEqual('Loading...');

  await page.waitForTimeout(250);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(1);
  expect(innerDiv.children[0].className).toEqual('info');
  expect(innerDiv.children[0].textContent).toEqual('INFO: Hello!');

  await page.waitForTimeout(500);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(2);
  expect(innerDiv.children[1].className).toEqual('error');
  expect(innerDiv.children[1].textContent).toEqual('ERROR: Goodbye!');
});

test('render with messageDataUrl', async () => {
  const page = await newE2EPage({
    html: '<wow-mum-loader message-data-url="http://localhost:3342/messages.json" />',
  });

  const innerDiv = await page.find('wow-mum-loader >>> div');
  expect(innerDiv.textContent).toEqual('Loading...');

  await page.waitForTimeout(250);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(1);
  expect(innerDiv.children[0].className).toEqual('info');
  expect(innerDiv.children[0].textContent).toEqual('INFO: 🚀 Starting big launch...');

  await page.waitForTimeout(250);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(2);
  expect(innerDiv.children[1].className).toEqual('info');
  expect(innerDiv.children[1].textContent).toEqual('INFO: 🔎 Sensing deployment environment...');

  await page.waitForTimeout(1000);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(3);
  expect(innerDiv.children[2].className).toEqual('warn');
  expect(innerDiv.children[2].textContent).toContain('WARN: ❗ Encountered bit-anomaly');
});

test('render with setMessages', async () => {
  const page = await newE2EPage({
    html: '<wow-mum-loader />',
  });

  const innerDiv = await page.find('wow-mum-loader >>> div');
  expect(innerDiv.textContent).toEqual('Loading...');

  await page.$eval('wow-mum-loader', loader => {
    loader.setMessages([
      { message: 'Salut !' },
      { delayInMS: 500, logLevel: 'error', message: 'Au revoir !' }
    ]);
  });

  await page.waitForTimeout(250);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(1);
  expect(innerDiv.children[0].className).toEqual('info');
  expect(innerDiv.children[0].textContent).toEqual('INFO: Salut !');

  await page.waitForTimeout(500);
  await page.waitForChanges();

  expect(innerDiv.children.length).toEqual(2);
  expect(innerDiv.children[1].className).toEqual('error');
  expect(innerDiv.children[1].textContent).toEqual('ERROR: Au revoir !');
});

