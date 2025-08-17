"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(""); // reset old results
    }
  };

  const handleAnalyze = async () => {
    // 1. Check if the function is even being called.
    console.log(
      "Analyze button clicked! The handleAnalyze function has started."
    );

    // 2. Check the value of the 'file' state right before the check.
    console.log("The current value of the 'file' state is:", file);

    if (!file) {
      console.error(
        "❌ No file is selected, so the function is stopping here."
      );
      setResult("Please select a file first."); // Give user feedback
      return; // This stops the function before the fetch call
    }

    // If the code reaches here, it means a file is selected.
    console.log("✅ A file is selected. Proceeding to fetch...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://ai-backend-vizc.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.message);
    } catch (error) {
      console.error("Fetch failed:", error);
      setResult("⚠️ Error while analyzing.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Card className="w-[420px] shadow-2xl rounded-2xl border border-gray-700 bg-gray-900/70 backdrop-blur-md">
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            🌱 AgriRakshak AI
          </h1>
          <p className="text-gray-400 text-center text-sm">
            Upload crop images for instant AI-powered analysis.
          </p>

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-full file:border-0 
                       file:text-sm file:font-semibold
                       file:bg-emerald-600 file:text-white
                       hover:file:bg-emerald-500 cursor-pointer"
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-60 object-cover rounded-lg border border-gray-700 shadow-md"
            />
          )}

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-green-600/40 transition-transform"
          >
            🚀 Run Analysis
          </Button>

          {/* Result */}
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
