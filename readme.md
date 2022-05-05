![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# 🤷 wow-mum-component

Enhance your web site/app/whatever with the majestic powers of [wow-mum-look-no-hands](https://github.com/hmmmsausages/wow-mum-look-no-hands).

## Development

Clone this repository, then run:

    npm install
    npm start

To build the component for production, run:

    npm run build

To execute the tests, run:

    npm test

## Using this component on an HTML page

### Step 1: import the component

#### Option 1: use the CDN

Add one of the following script tags to your page:

    <!-- ES module -->
    <script type='module' src='https://unpkg.com/wow-mum-component/dist/wow-mum-component.esm.js'></script>

    <!-- CommonJS module -->
    <script type='module' src='https://unpkg.com/wow-mum-component/dist/wow-mum-component.js'></script>

#### Option 2: install the package

Install the package:

    npm install wow-mum-component

Then add one of the following script tags to your page:

    <!-- ES module -->
    <script type='module' src='node_modules/wow-mum-component/dist/wow-mum-component.esm.js'></script>

    <!-- CommonJS module -->
    <script type='module' src='node_modules/wow-mum-component/dist/wow-mum-component.js'></script>

### Step 2: create the component instance

#### Option 1: set the messages directly

    <wow-mum-component />

    <script>
      (async () => {
        await customElements.whenDefined('wow-mum-component');
        const component = document.querySelector('wow-mum-component');

        component.setMessages([
          {
            'logLevel': 'warn',
            'message': '💾 Defragment Windows 95 C:\ drive. This might take a while...'
          },
          {
            'delayInMS': 1000,
            'logLevel': 'error',
            'message': '🙈 Discovered year 2020. Aborting unnecessary Windows 95 operations...'
          },
          {
            'delayInMS': 2000,
            'message': '⚙️ Processing super-vortex decision algorithm...'
          }
        ]);
      })();
    </script>

#### Option 2: load the messages from a JSON string

    <wow-mum-component
      message-data='[
        {
          "logLevel": "warn",
          "message": "💾 Defragment Windows 95 C:\\ drive. This might take a while..."
        },
        {
          "delayInMS": 1000,
          "logLevel": "error",
          "message": "🙈 Discovered year 2020. Aborting unnecessary Windows 95 operations..."
        },
        {
          "delayInMS": 2000,
          "message": "⚙️ Processing super-vortex decision algorithm..."
        }
      ]' />

Make sure to use single quotes around the value and escape any backslashes inside.

#### Option 3: load the messages from a JSON file

    <wow-mum-component message-data-url="messages.json" />

Make sure the URL is accessible from the domain of the hosting page.

## Using this component in another script

### Step 1: import the component

#### Option 1: use the CDN

Add one of the following statements to your script:

    // ES module
    import { WowMumComponent } from 'https://unpkg.com/wow-mum-component/dist/wow-mum-component.esm.js';

    // CommonJS module
    const { WowMumComponent } = require('https://unpkg.com/wow-mum-component/dist/wow-mum-component.js');

#### Option 2: install the package

Install the package:

    npm install wow-mum-component

Then add one of the following statements to your script:

    // ES module
    import { WowMumComponent } from 'wow-mum-component';

    // CommonJS module
    const { WowMumComponent } = require('wow-mum-component');

### Step 2: create the component instance

#### Option 1: set the messages directly

    const component = WowMumComponent();

    component.setMessages([
      {
        'logLevel': 'warn',
        'message': '💾 Defragment Windows 95 C:\ drive. This might take a while...'
      },
      {
        'delayInMS': 1000,
        'logLevel': 'error',
        'message': '🙈 Discovered year 2020. Aborting unnecessary Windows 95 operations...'
      },
      {
        'delayInMS': 2000,
        'message': '⚙️ Processing super-vortex decision algorithm...'
      }
    ]);

#### Option 2: load the messages from a JSON string

    const component = WowMumComponent();

    component.loadMessagesFromString('[
      {
        "logLevel": "warn",
        "message": "💾 Defragment Windows 95 C:\\ drive. This might take a while..."
      },
      {
        "delayInMS": 1000,
        "logLevel": "error",
        "message": "🙈 Discovered year 2020. Aborting unnecessary Windows 95 operations..."
      },
      {
        "delayInMS": 2000,
        "message": "⚙️ Processing super-vortex decision algorithm..."
      }
    ]');

Make sure to escape any backslashes inside the value.

#### Option 3: load the messages from a JSON file

    const component = WowMumComponent();
    component.loadMessagesFromUrl('messages.json');

Make sure the URL is accessible from the domain of the hosting page.

