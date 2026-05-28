import { useEffect, useRef, useState } from "react";

function App() {

  const canvasRef = useRef(null);

  const [count, setCount] = useState(8);

  // Generate Fibonacci Numbers
  const generateFib = (n) => {

    const fib = [1, 1];

    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }

    return fib;
  };

  // Draw Spiral
  const drawSpiral = () => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gradient.addColorStop(0, "#020617");
    gradient.addColorStop(1, "#0f172a");

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Generate Fibonacci
    const fib = generateFib(count);

    // Dynamic Scaling
    const maxFib = fib[fib.length - 1];

    const scale = Math.min(
      canvas.width,
      canvas.height
    ) / (maxFib * 4);

    // Glow + Font
    ctx.lineWidth = Math.max(2, scale * 0.08);

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00ffff";

    ctx.font = `bold ${Math.max(
      12,
      scale * 1.5
    )}px Arial`;

    // Starting Position
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // First Square
    let prevSize = fib[0] * scale;

    // Draw First Square
    ctx.strokeStyle = "#00ffff";

    ctx.fillStyle = "rgba(0,255,255,0.08)";

    ctx.fillRect(
      x,
      y,
      prevSize,
      prevSize
    );

    ctx.strokeRect(
      x,
      y,
      prevSize,
      prevSize
    );

    for (let i = 1; i < fib.length; i++) {

      const size = fib[i] * scale;

      const direction = (i - 1) % 4;

      // Move Position
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

      // Dynamic Colors
      const hue = i * 35;

      ctx.strokeStyle =
        `hsl(${hue}, 100%, 70%)`;

      ctx.fillStyle =
        `hsla(${hue}, 100%, 60%, 0.08)`;

      // Draw Square Fill
      ctx.fillRect(
        x,
        y,
        size,
        size
      );

      // Draw Square Border
      ctx.strokeRect(
        x,
        y,
        size,
        size
      );

      // Draw Number
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        fib[i],
        x + size * 0.3,
        y + size * 0.55
      );

      // Arc Styling
      ctx.beginPath();

      ctx.strokeStyle =
        `hsl(${hue}, 100%, 65%)`;

      ctx.lineWidth =
        Math.max(3, scale * 0.1);

      // Draw Arc
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
    drawSpiral();
  }, [count]);

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-10 overflow-hidden">

      {/* Header */}
      <h1 className="text-6xl font-black mb-4 tracking-wide text-cyan-300">

        Fibonacci Spiral

      </h1>

      <p className="text-slate-400 mb-8 text-xl">

        Interactive Golden Ratio Visualization

      </p>

      {/* Controls */}
      <div className="flex gap-4 mb-8 items-center">

        <input
          type="number"
          min="2"
          max="15"
          value={count}
          onChange={(e) =>
            setCount(Number(e.target.value))
          }
          className="
            px-5 py-3
            rounded-2xl
            bg-slate-900
            border border-cyan-400
            text-cyan-300
            text-lg
            outline-none
            shadow-lg
          "
        />

        <button
          onClick={drawSpiral}
          className="
            bg-cyan-500
            hover:bg-cyan-400
            px-6 py-3
            rounded-2xl
            text-black
            font-bold
            transition-all
            duration-300
            shadow-lg
          "
        >
          Generate
        </button>

      </div>

      {/* Canvas Container */}
      <div
        className="
          bg-slate-900
          border border-cyan-500/30
          rounded-3xl
          p-4
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
          className="rounded-2xl"
        />

      </div>

      {/* Formula Section */}
      <div
        className="
          mt-12
          w-full
          max-w-5xl
          bg-slate-900/80
          border border-cyan-500/30
          rounded-3xl
          p-8
          shadow-2xl
          backdrop-blur-xl
        "
      >

        <h2 className="text-4xl font-bold text-cyan-300 mb-6">
          Fibonacci Formula
        </h2>

        {/* Main Formula */}
        <div
          className="
            bg-black/40
            border border-cyan-400/20
            rounded-2xl
            p-6
            mb-6
          "
        >

          <p className="text-3xl text-white font-mono text-center">
            F(n) = F(n - 1) + F(n - 2)
          </p>

        </div>

        {/* Description */}
        <div className="space-y-4 text-slate-300 text-lg leading-relaxed">

          <p>
            The Fibonacci sequence is a mathematical pattern where
            every number is generated by adding the previous two numbers.
          </p>

          <p>
            Beginning with:
          </p>

          <div
            className="
              bg-black/30
              border border-slate-700
              rounded-xl
              p-4
              font-mono
              text-cyan-200
              text-xl
            "
          >
            1, 1, 2, 3, 5, 8, 13, 21, 34...
          </div>

          <p>
            As the sequence grows, the ratio between consecutive numbers
            approaches the Golden Ratio:
          </p>

          <div
            className="
              bg-black/30
              border border-yellow-500/20
              rounded-xl
              p-4
              text-center
            "
          >

            <p className="text-3xl text-yellow-300 font-mono">
              φ ≈ 1.6180339887
            </p>

          </div>

          <p>
            This pattern naturally appears in:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-cyan-100">

            <li>Spiral galaxies</li>
            <li>Flower petals</li>
            <li>Sea shells</li>
            <li>Hurricanes</li>
            <li>Pinecones</li>
            <li>DNA structures</li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default App;