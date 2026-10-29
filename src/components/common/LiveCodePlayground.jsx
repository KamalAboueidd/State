import React, { useState } from "react";
import { Play, RotateCcw, Copy, Check, AlertTriangle } from "lucide-react";

export default function LiveCodePlayground({ initialCode = "", title = "Interactive Code Playground", language = "javascript" }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput([]);
    setHasError(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    setHasError(false);
    const logs = [];

    // Capture console.log
    const customConsole = {
      log: (...args) => {
        logs.push({
          type: "log",
          text: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
        });
      },
      warn: (...args) => {
        logs.push({
          type: "warn",
          text: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
        });
      },
      error: (...args) => {
        logs.push({
          type: "error",
          text: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
        });
      },
    };

    try {
      // Create executable function sandbox (supporting both sync and async code)
      const sanitizedCode = code;
      let runner;
      if (/\bawait\b/.test(sanitizedCode)) {
        const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
        runner = new AsyncFunction("console", sanitizedCode);
      } else {
        runner = new Function("console", sanitizedCode);
      }

      const result = runner(customConsole);

      if (result instanceof Promise) {
        result
          .then((resolved) => {
            if (resolved !== undefined) {
              logs.push({
                type: "return",
                text: `↪ ${typeof resolved === "object" ? JSON.stringify(resolved, null, 2) : String(resolved)}`,
              });
            }
            if (logs.length === 0) {
              logs.push({ type: "log", text: "Async code executed successfully with no output." });
            }
            setOutput([...logs]);
          })
          .catch((err) => {
            setHasError(true);
            setOutput([...logs, { type: "error", text: `Async Error: ${err.message}` }]);
          });
      } else {
        if (result !== undefined) {
          logs.push({
            type: "return",
            text: `↪ ${typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)}`,
          });
        }
        if (logs.length === 0) {
          logs.push({ type: "log", text: "Code executed successfully with no output." });
        }
        setOutput([...logs]);
      }
    } catch (err) {
      setHasError(true);
      setOutput([{ type: "error", text: `Runtime Error: ${err.message}` }]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="playground-container">
      <div className="playground-header">
        <div className="playground-meta">
          <span className="playground-title">{title}</span>
          <span className="playground-lang">{language}</span>
        </div>

        <div className="playground-actions">
          <button
            onClick={handleRun}
            className="playground-btn run-btn"
            disabled={isRunning}
            title="Execute Code"
          >
            <Play size={12} fill="currentColor" />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleReset}
            className="playground-btn reset-btn"
            title="Reset to Original"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCopy}
            className="playground-btn copy-btn"
            title="Copy Code"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      <div className="playground-editor-wrap">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="playground-editor"
          spellCheck="false"
          rows={Math.min(22, Math.max(8, code.split("\n").length + 2))}
        />
      </div>

      {output.length > 0 && (
        <div className={`playground-console ${hasError ? "has-error" : ""}`}>
          <div className="console-header">
            <span className="console-label">
              {hasError && <AlertTriangle size={12} />}
              Output Console
            </span>
            <button className="console-clear" onClick={() => setOutput([])}>
              Clear
            </button>
          </div>
          <div className="console-output">
            {output.map((out, idx) => (
              <pre key={idx} className={`console-line ${out.type}`}>
                {out.text}
              </pre>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
