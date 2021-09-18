
![Logo](karljoke.png)
# KarlJoke

A free and open-source restful API to fetch dadjokes

Inspired from https://github.com/15Dkatz/official_joke_api

Since the authors are not accepting PRs' and also the server is unavailable, we have a new system in place as an alternative 🚀


## Public Endpoints

#### Get a random joke

```http
  POST /jokes/random
```
#### Get ten random jokes

```http
  POST /jokes/ten
```
#### Get number of random jokes

```http
  POST /jokes/{number}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `number`      | `int` | **Required**. Number of jokes to fetch |

#### Get random joke by type
```http
  POST /jokes/{type}/random
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. Category of joke |

#### Get ten random joke by type
```http
  POST /jokes/{type}/{number}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. Category of joke |
| `number`      | `int` | **Required**. Number of jokes to fetch |

#### Get joke by type and id
```http
  POST /jokes/{type}/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required**. Category of joke |
| `id`      | `int` | **Required**. ID of joke |




  
## Authors

- [Eklavya Chandra](https://www.github.com/eklavyadev)

  
## Contributing

Contributions are always welcome!

### Implement jokes.json with this structure
```
},
{
  "id": last joke id + 1,
  "type": "Your category here",
  "setup": "Your joke here",
  "punchline": "Your punchline here"
}
```

Please adhere to this project's `code of conduct`.

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/eklavyadev/karljoke.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
