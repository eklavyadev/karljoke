"use client";

import Link from "next/link";
import { useState } from "react";
import { fetchJson } from "@/lib/fetcher";

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

type EndpointResult = Joke | Joke[] | { error: string };

export default function Docs() {
  const [results, setResults] = useState<Record<number, EndpointResult>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  async function testEndpoint(index: number, testPath: string) {
    setLoading((prev) => ({ ...prev, [index]: true }));
    try {
      const data = await fetchJson<EndpointResult>(testPath);
      setResults((prev) => ({ ...prev, [index]: data }));
    } catch {
      setResults((prev) => ({ ...prev, [index]: { error: "Failed to fetch" } }));
    } finally {
      setLoading((prev) => ({ ...prev, [index]: false }));
    }
  }
  const jokeTypes = [
    {
      name: "general",
      description: "General dad jokes and puns",
      count: "500+"
    },
    {
      name: "knock-knock",
      description: "Classic knock-knock jokes",
      count: "50+"
    },
    {
      name: "programming",
      description: "Developer and programming humor",
      count: "100+"
    }
  ];

  const endpoints = [
    {
      method: "GET",
      path: "/api/jokes/random",
      testPath: "/api/jokes/random",
      description: "Get a single random joke",
      example: "curl https://karljoke.vercel.app/api/jokes/random"
    },
    {
      method: "GET",
      path: "/api/jokes/ten",
      testPath: "/api/jokes/ten",
      description: "Get ten random jokes",
      example: "curl https://karljoke.vercel.app/api/jokes/ten"
    },
    {
      method: "GET",
      path: "/api/jokes/{number}",
      testPath: "/api/jokes/5",
      description: "Get a specific number of random jokes",
      example: "curl https://karljoke.vercel.app/api/jokes/5"
    },
    {
      method: "GET",
      path: "/api/jokes/{type}/random",
      testPath: "/api/jokes/programming/random",
      description: "Get a random joke of a specific type",
      example: "curl https://karljoke.vercel.app/api/jokes/programming/random"
    },
    {
      method: "GET",
      path: "/api/jokes/{type}/ten",
      testPath: "/api/jokes/general/ten",
      description: "Get ten jokes of a specific type",
      example: "curl https://karljoke.vercel.app/api/jokes/general/ten"
    },
    {
      method: "GET",
      path: "/api/jokes/{type}/{number}",
      testPath: "/api/jokes/knock-knock/3",
      description: "Get a specific number of jokes of a specific type",
      example: "curl https://karljoke.vercel.app/api/jokes/knock-knock/3"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl">
              Complete guide to using the KarlJoke API. All endpoints are free and require no authentication.
            </p>
          </div>

          <div className="bg-white shadow-xl p-8 border border-orange-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">📚</span>
              Available Joke Types
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {jokeTypes.map((type) => (
                <div key={type.name} className="bg-gray-50 p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">{type.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold">
                    {type.count} jokes
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-xl p-8 border border-orange-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">🔌</span>
              API Endpoints
            </h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold">
                      {endpoint.method}
                    </span>
                    <code className="text-lg text-gray-800 font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-gray-600 mb-3">{endpoint.description}</p>
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => testEndpoint(index, endpoint.testPath)}
                      disabled={loading[index]}
                      className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading[index] ? "Loading..." : "▶ Run"}
                    </button>
                  </div>
                  {results[index] && (
                    <div className="bg-gray-900 p-4 mb-3 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {JSON.stringify(results[index], null, 2)}
                      </pre>
                    </div>
                  )}
                  <div className="bg-gray-900 p-4 overflow-x-auto">
                    <code className="text-green-400 text-sm">{endpoint.example}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-xl p-8 border border-orange-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">📦</span>
              Response Format
            </h2>
            <p className="text-gray-600 mb-4">All endpoints return JSON with the following structure:</p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`{
  "id": 1,
  "type": "general",
  "setup": "What did the fish say when it hit the wall?",
  "punchline": "Dam."
}`}
              </pre>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-mono text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">id</span>
                <span className="text-gray-600 text-sm">Unique identifier for the joke</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">type</span>
                <span className="text-gray-600 text-sm">Category of the joke (general, knock-knock, programming)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">setup</span>
                <span className="text-gray-600 text-sm">The setup or question part of the joke</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">punchline</span>
                <span className="text-gray-600 text-sm">The punchline or answer to the joke</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl p-8 border border-orange-100 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              Quick Start Examples
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">JavaScript / TypeScript</h3>
                <div className="bg-gray-900 p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`// Fetch a random joke
const response = await fetch('https://karljoke.vercel.app/api/jokes/random');
const joke = await response.json();
console.log(joke.setup);
console.log(joke.punchline);

// Fetch 5 programming jokes
const response = await fetch('https://karljoke.vercel.app/api/jokes/programming/5');
const jokes = await response.json();
jokes.forEach(joke => console.log(joke.setup));`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Python</h3>
                <div className="bg-gray-900 p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`import requests

# Fetch a random joke
response = requests.get('https://karljoke.vercel.app/api/jokes/random')
joke = response.json()
print(joke['setup'])
print(joke['punchline'])

# Fetch 3 knock-knock jokes
response = requests.get('https://karljoke.vercel.app/api/jokes/knock-knock/3')
jokes = response.json()
for joke in jokes:
    print(joke['setup'])`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">cURL</h3>
                <div className="bg-gray-900 p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`# Get a random joke
curl https://karljoke.vercel.app/api/jokes/random

# Get 10 general jokes
curl https://karljoke.vercel.app/api/jokes/general/10

# Get a programming joke
curl https://karljoke.vercel.app/api/jokes/programming/random`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              Contributing
            </h2>
            <p className="mb-4 text-orange-50">
              Want to add more jokes? We welcome contributions! Simply edit the <code className="bg-white/20 px-2 py-1">source/jokes.json</code> file with the following structure:
            </p>
            <div className="bg-black/20 p-4 overflow-x-auto">
              <pre className="text-white text-sm">
{`{
  "id": last joke id + 1,
  "type": "general",
  "setup": "Your joke setup here",
  "punchline": "Your punchline here"
}`}
              </pre>
            </div>
            <p className="mt-4 text-orange-50">
              Then open a pull request on GitHub. We'd love to have your contribution!
            </p>
            <a
              href="https://github.com/eklavyadev/karljoke/pulls"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-orange-600 hover:bg-orange-50 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Open Pull Request
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
