# KarlJoke

A free and open-source API to fetch dad jokes, actively maintained with Next.js 14, TypeScript, and Tailwind CSS.

### Grab a random joke
[https://karljoke.vercel.app/api/jokes/random](https://karljoke.vercel.app/api/jokes/random)

Inspired by [official_joke_api](https://github.com/15Dkatz/official_joke_api)

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

Contributions are always welcome! This project is actively maintained and we'd love your help.

### How to Add New Jokes

1. **Edit the jokes file**: Open `source/jokes.json` in your editor
2. **Find the last joke ID**: Look at the last joke in the array to get the highest ID
3. **Add your joke**: Add a new joke object with the following structure:

```json
{
  "id": <last_id + 1>,
  "type": "general",
  "setup": "What did the fish say when it hit the wall?",
  "punchline": "Dam."
}
```

**Available joke types:**
- `general` - General dad jokes and puns
- `knock-knock` - Classic knock-knock jokes
- `programming` - Developer and programming humor

4. **Submit a pull request**: Push your changes and open a PR on GitHub

### Guidelines

- Ensure your joke follows the JSON structure exactly
- Use an ID that's one higher than the last joke in the file
- Choose an appropriate type from the available categories
- Keep jokes family-friendly and appropriate
- Check for duplicates before submitting

### Pull Request Process

1. Fork the repository
2. Create a new branch for your feature
3. Add your jokes to `source/jokes.json`
4. Commit your changes with a descriptive message
5. Push to your fork
6. Open a pull request with a clear description

We review all PRs and merge them promptly. Thank you for contributing!

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Authors

- [Eklavya Singh](https://www.github.com/eklavyadev)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
