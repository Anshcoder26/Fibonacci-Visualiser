import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const canvasRef = useRef(null);

  const [count, setCount] = useState(8);
  const [fibData, setFibData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFibonacci = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/fibonacci/${count}`
      );

      const values = response.data.map((item) => item.value);

      setFibData(values);
    } catch (error) {
      console.error("Backend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const drawSpiral = (fib) => {
    const canvas = canvasRef.current;

    if (!canvas || fib.length === 0) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gradient.addColorStop(0, "#020617");
    gradient.addColorStop(1, "#0f172a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const maxFib = fib[fib.length - 1];

    const scale =
      Math.min(canvas.width, canvas.height) /
      (Math.max(maxFib, 1) * 4);

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00ffff";

    ctx.font = `bold ${Math.max(
      12,
      scale * 1.5
    )}px Arial`;

    let x = canvas.width / 2;
    let y = canvas.height / 2;

    let prevSize = Math.max(fib[0], 1) * scale;

    ctx.strokeStyle = "#00ffff";
    ctx.fillStyle = "rgba(0,255,255,0.08)";

    ctx.fillRect(x, y, prevSize, prevSize);
    ctx.strokeRect(x, y, prevSize, prevSize);

    for (let i = 1; i < fib.length; i++) {
      const size = Math.max(fib[i], 1) * scale;

      const direction = (i - 1) % 4;

      switch (direction) {
        case 0:
          x += prevSize;
          y -= size - prevSize;
          break;

        case 1:
          x -= size - prevSize;
          y -= size;
          break;

        case 2:
          x -= size;
          break;

        case 3:
          y += prevSize;
          break;
      }

      const hue = i * 35;

      ctx.strokeStyle = `hsl(${hue},100%,70%)`;
      ctx.fillStyle = `hsla(${hue},100%,60%,0.08)`;

      ctx.fillRect(x, y, size, size);
      ctx.strokeRect(x, y, size, size);

      ctx.fillStyle = "#ffffff";

      if (size > 20) {
        ctx.fillText(
          fib[i],
          x + size * 0.3,
          y + size * 0.55
        );
      }

      ctx.beginPath();

      ctx.strokeStyle = `hsl(${hue},100%,65%)`;
      ctx.lineWidth = Math.max(3, scale * 0.1);

      switch (direction) {
        case 0:
          ctx.arc(
            x,
            y + size,
            size,
            1.5 * Math.PI,
            0
          );
          break;

        case 1:
          ctx.arc(
            x + size,
            y + size,
            size,
            Math.PI,
            1.5 * Math.PI
          );
          break;

        case 2:
          ctx.arc(
            x + size,
            y,
            size,
            0.5 * Math.PI,
            Math.PI
          );
          break;

        case 3:
          ctx.arc(
            x,
            y,
            size,
            0,
            0.5 * Math.PI
          );
          break;
      }

      ctx.stroke();

      prevSize = size;
    }
  };

  useEffect(() => {
    fetchFibonacci();
  }, [count]);

  useEffect(() => {
    if (fibData.length > 0) {
      drawSpiral(fibData);
    }
  }, [fibData]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-10">

      <h1 className="text-6xl font-black mb-4 text-cyan-300">
        Fibonacci Spiral
      </h1>

      <p className="text-slate-400 mb-8 text-xl">
        Powered by Spring Boot + React
      </p>

      <div className="flex gap-4 mb-8">

        <input
          type="number"
          min="2"
          max="20"
          value={count}
          onChange={(e) =>
            setCount(Number(e.target.value))
          }
          className="
            px-5 py-3
            rounded-xl
            bg-slate-900
            border border-cyan-500
            text-cyan-300
          "
        />

        <button
          onClick={fetchFibonacci}
          className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            px-6
            py-3
            rounded-xl
            font-bold
          "
        >
          Generate
        </button>

      </div>

      {loading && (
        <p className="mb-4 text-cyan-300">
          Loading from backend...
        </p>
      )}

      <div
        className="
          bg-slate-900
          rounded-3xl
          p-4
          border border-cyan-500/20
          shadow-2xl
          overflow-auto
          max-w-full
          max-h-[85vh]
        "
      >
        <canvas
          ref={canvasRef}
          width={2200}
          height={1600}
          className="rounded-xl"
        />
      </div>

      <div
        className="
          mt-12
          max-w-5xl
          w-full
          bg-slate-900/80
          border border-cyan-500/20
          rounded-3xl
          p-8
        "
      >
        <h2 className="text-4xl font-bold text-cyan-300 mb-6">
          Fibonacci Formula
        </h2>

        <div className="bg-black/30 p-6 rounded-2xl mb-6">
          <p className="text-center text-3xl font-mono">
            F(n) = F(n − 1) + F(n − 2)
          </p>
        </div>

        <p className="text-slate-300 text-lg">
          Every number is generated by adding the
          previous two numbers in the sequence.
        </p>
      </div>

    </div>
  );
}

export default App;