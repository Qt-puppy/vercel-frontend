"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  const [result, setResult] = useState<string>("");

  async function handleAnalyze() {
    try {
      const res = await fetch("https://ai-backend.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "sample input" }), // can replace later
      });

      const data = await res.json();
      setResult(data.message);
    } catch (error) {
      console.error(error);
      setResult("⚠️ Error while analyzing.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Card className="w-[420px] shadow-2xl rounded-2xl border border-gray-700 bg-gray-900/70 backdrop-blur-md">
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            🌱 AgriRakshak AI
          </h1>
          <p className="text-gray-400 text-center text-sm">
            Upload crop images or data for instant AI-powered analysis.
          </p>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-green-600/40 transition-transform"
          >
            🚀 Run Analysis
          </Button>

          {result && (
            <div className="w-full mt-4 p-4 rounded-lg bg-gray-800 text-gray-200 text-center border border-gray-700">
              <p className="text-sm">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
