"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [joke, setJoke] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStarCount() {
      try {
        const response = await fetch("https://api.github.com/repos/eklavyadev/karljoke");
        if (!response.ok) throw new Error("Unable to fetch stars");
        const data = await response.json();
        setStarCount(data.stargazers_count);
      } catch (error) {
        console.error("Failed to fetch star count");
      }
    }
    fetchStarCount();
  }, []);

  async function fetchRandomJoke() {
    setLoading(true);
    try {
      const response = await fetch("/api/jokes/random");
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Failed to fetch joke");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/beluga.png" alt="Beluga" className="w-16 h-16" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                KarlJoke
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Free, open-source dad jokes API for your next project. 
              <span className="block text-gray-500 text-lg mt-2">No API key required. Forever free.</span>
            </p>
            <a
              href="https://github.com/eklavyadev/karljoke"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Star on GitHub</span>
              {starCount !== null && (
                <span className="bg-white/20 px-3 py-1 text-sm font-medium">
                  ⭐ {starCount}
                </span>
              )}
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white shadow-xl p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Try the Demo</h2>
              </div>
              <p className="text-gray-600 mb-6">Click the button below to fetch a random joke from the API.</p>
              <button
                onClick={fetchRandomJoke}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg mb-4"
              >
                {loading ? "Loading..." : "🎲 Get Random Joke"}
              </button>
              <div className="bg-gray-50 p-4 border border-gray-200">
                <pre className="text-sm overflow-auto text-gray-700">
                  {joke ? JSON.stringify(joke, null, 2) : "{\n  \"Click the button above to get a joke!\"\n}"}
                </pre>
              </div>
            </div>

            <div className="bg-white shadow-xl p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Quick Endpoints</h2>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 p-3 bg-gray-50">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold">GET</span>
                  <code className="text-sm text-gray-700">/api/jokes/random</code>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold">GET</span>
                  <code className="text-sm text-gray-700">/api/jokes/ten</code>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold">GET</span>
                  <code className="text-sm text-gray-700">/api/jokes/:type/random</code>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-50">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold">GET</span>
                  <code className="text-sm text-gray-700">/api/jokes/:type/:number</code>
                </li>
              </ul>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                View Full Documentation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl p-8 text-white mb-12">
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

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 shadow-lg border border-orange-100 text-center">
              <div className="w-16 h-16 bg-purple-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">100% Free</h3>
              <p className="text-gray-600 text-sm">No API keys, no rate limits, completely free forever</p>
            </div>

            <div className="bg-white p-6 shadow-lg border border-orange-100 text-center">
              <div className="w-16 h-16 bg-pink-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Open Source</h3>
              <p className="text-gray-600 text-sm">Contributions welcome! Fork us on GitHub</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
