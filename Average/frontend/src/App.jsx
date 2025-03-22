import React, { useState } from "react";
import { fetchNumbers } from "./api";

export default function App() {
  const [numberType, setNumberType] = useState("e");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getNumbers = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchNumbers(numberType);
      setData(result);
    } catch {
      setError("Failed to fetch numbers. Ensure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Average Calculator
        </h1>

        {/* Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Select Number Type:
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={numberType}
            onChange={(e) => setNumberType(e.target.value)}
          >
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </div>

        {/* Fetch Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
          onClick={getNumbers}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Numbers"}
        </button>

        {/* Error */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* Response Display */}
        {data && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-medium">Response:</h2>
            <pre className="text-sm bg-gray-200 p-3 rounded-lg overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
            <p className="mt-2 font-semibold">Average: {data.avg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
