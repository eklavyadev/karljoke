# KarlJoke

A free and open-source API to fetch dad jokes, now rebuilt with Next.js 14, TypeScript, and Tailwind CSS.

Inspired by https://github.com/15Dkatz/official_joke_api

## Features

- **Free & Open Source**: No API keys required, completely free to use
- **Multiple Endpoints**: Fetch single jokes, multiple jokes, or jokes by category
- **Type-Safe**: Built with TypeScript for better developer experience
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Fast**: Built on Next.js App Router for optimal performance

## Public Endpoints

All endpoints are prefixed with `/api`

#### Get a random joke

```http
GET /api/jokes/random
```

#### Get ten random jokes

```http
GET /api/jokes/ten
```

#### Get a specific number of random jokes

```http
GET /api/jokes/{number}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `number`  | `int`    | **Required**. Number of jokes to fetch |

#### Get a random joke by type

```http
GET /api/jokes/{type}/random
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Required**. Category of joke    |

#### Get ten random jokes by type

```http
GET /api/jokes/{type}/ten
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Required**. Category of joke    |

#### Get a specific number of random jokes by type

```http
GET /api/jokes/{type}/{number}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`    | `string` | **Required**. Category of joke    |
| `number`  | `int`    | **Required**. Number of jokes to fetch |

## Example Response

```json
{
  "id": 1,
  "type": "general",
  "setup": "What did the fish say when it hit the wall?",
  "punchline": "Dam."
}
```

## Run Locally

Clone the project

```bash
git clone https://github.com/eklavyadev/karljoke.git
```

Go to the project directory

```bash
cd karljoke
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

Build for production

```bash
npm run build
npm start
```

## Contributing

Contributions are always welcome!

### Adding new jokes

To add new jokes, edit `source/jokes.json` with the following structure:

```json
{
  "id": last joke id + 1,
  "type": "Your category here",
  "setup": "Your joke here",
  "punchline": "Your punchline here"
}
```

Please adhere to this project's code of conduct.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Authors

- [Eklavya Chandra](https://www.github.com/eklavyadev)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
