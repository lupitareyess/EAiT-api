# EAiT Backend API

This is the EAiT backend API repository. 
You can find the front end repository here: https://github.com/trickstyle89/EAiT-api

EAiT is a cutting-edge app powered by AI that enables users to create meals based on the ingredients they have at hand. Additionally, it provides users with inspiration for dishes using only a few ingredients of their choice. This innovative app has been developed with great passion and meticulous attention to the user interface and experience. It boasts a user-friendly preferences page and a comprehensive ingredients page, which work seamlessly to craft a unique AI-created recipe. 

Let us help you EAiT.

# Screenshots

![Landing and Preferences Page](https://github.com/mrludovicc/EAiT/blob/master/public/firstEAiT.gif)

![Ingredients Page](https://github.com/mrludovicc/EAiT/blob/master/public/secondEAiT.gif)

![Recipes](https://github.com/mrludovicc/EAiT/blob/master/public/EAiT%20Third%20Clip.gif)

## Features

- User Preferences page to help AI craft recipes base on time, skill, tools, etc
- Well organized and dynamic ingredients page to make select fun and easy
- Parallel recipe generation. 2 for 1 feature to aid user
- Many more small but impactful features to aid in preparation of meals.

## Setup

To use this application, you'll need to set up API keys for OpenAI and Google Custom Search, and install the necessary dependencies.

### OpenAI API Key

To get an OpenAI API key, follow these steps:

1. Go to the OpenAI API page.
2. Click the "Sign up" button to create an account.
3. Once you've created an account, log in and go to the API dashboard.
4. Click the "New API Key" button to generate a new API key.
5. Copy the API key and add it to a `.env` file in the root directory of the project, like this:

```
OPENAI_API_KEY=your_api_key_here
```

### Google Custom Search API Key

To get a Google Custom Search API key, follow these steps:

1. Go to the Google Custom Search API page.
2. Click the "Get started" button to create a project.
3. Once you've created a project, go to the Credentials page.
4. Click the "Create credentials" button and select "API key".
5. Copy the API key and add it to a `.env` file in the root directory of the project, like this:

```
GOOGLE_CUSTOM_SEARCH_KEY=your_api_key_here
```

### Google Custom Search Engine ID

To get a Google Custom Search Engine ID, follow these steps:

1. Go to the Google Custom Search page.
2. Click the "Add" button to create a new search engine.
3. Follow the prompts to configure the search engine.
4. Once you've created the search engine, go to the "Basics" tab and copy the "Search engine ID".
5. Save the search engine ID and add it to a `.env` file in the root directory of the project, like this:

```
GOOGLE_CUSTOM_SEARCH_ENGINE_ID=your_custom_search_engine_id_here
```

## Dependencies

To run this project, you'll need to install the following dependencies:

### Use npm install

- `axios`
- `dotenv`
- `express`
- `morgan`
- `react`
- `react-dom`
- `react-scripts`
- `socket.io`
- `body-parser`
- `pg`

## Running the project

To run the project, you'll need to run the following command:

```
npm start
```

Then, navigate to `http://localhost:3000` in your web browser to see EAiT in action.
