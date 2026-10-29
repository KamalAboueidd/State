import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code = "", language = "javascript", title = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  // Highlighting tokenizer
  const formatTokens = (rawCode) => {
    const lines = rawCode.split("\n");
    return lines.map((line, idx) => {
      // Highlight comments
      if (line.trim().startsWith("//")) {
        return (
          <div key={idx} className="code-line">
            <span className="line-num">{idx + 1}</span>
            <span className="tok-comment">{line}</span>
          </div>
        );
      }

      // Keyword and token replacement
      const tokens = line.split(/(\b(?:import|export|from|default|const|let|var|function|return|async|await|if|else|try|catch|true|false|null|undefined|new|typeof|throw)\b|"[^"]*"|'[^']*'|`[^`]*`|\/\/.*$)/g);

      return (
        <div key={idx} className="code-line">
          <span className="line-num">{idx + 1}</span>
          <span className="line-content">
            {tokens.map((tok, i) => {
              if (!tok) return null;
              if (tok.startsWith("//")) {
                return <span key={i} className="tok-comment">{tok}</span>;
              }
              if (/^(import|export|from|default|const|let|var|function|return|async|await|if|else|try|catch|new|typeof|throw)$/.test(tok)) {
                return <span key={i} className="tok-keyword">{tok}</span>;
              }
              if (/^(true|false|null|undefined)$/.test(tok)) {
                return <span key={i} className="tok-boolean">{tok}</span>;
              }
              if ((tok.startsWith('"') && tok.endsWith('"')) || (tok.startsWith("'") && tok.endsWith("'")) || (tok.startsWith('`') && tok.endsWith('`'))) {
                return <span key={i} className="tok-string">{tok}</span>;
              }
              return <span key={i}>{tok}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <div className="code-block-meta">
          {title && <span className="code-block-title">{title}</span>}
          <span className="code-block-lang">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="code-copy-btn"
          aria-label="Copy code to clipboard"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="copy-icon success" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} className="copy-icon" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block-pre">
        <code>{formatTokens(code)}</code>
      </pre>
    </div>
  );
}
