"use client";

import { useState, useCallback } from "react";
import { Bot, Send, User, Github, Linkedin } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "দুঃখিত, একটি ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।" 
        }
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }, [input, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-400 mb-2 font-bengali">
            বাংলা AI সহকারী
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-bengali">
            আপনার প্রশ্ন বাংলায় জিজ্ঞাসা করুন
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 mb-4 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8 font-bengali">
              স্বাগতম! আপনার প্রশ্ন জিজ্ঞাসা করুন।
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 mb-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg font-bengali ${
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent font-bengali"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <h2 className="text-xl font-semibold mb-2">Developer Information</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-purple-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-purple-600 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
          <p className="mt-2">
            Created with ❤️ using Next.js, Tailwind CSS, and AI Technologies
          </p>
        </div>
      </div>
    </div>
  );
}