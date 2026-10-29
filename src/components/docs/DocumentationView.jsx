import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Code, CheckCircle, Image as ImageIcon } from "lucide-react";
import { getTopicBySlug, getRecommendedTopics } from "../../content/registry";
import CodeBlock from "../common/CodeBlock";
import LiveCodePlayground from "../common/LiveCodePlayground";
import DemoRenderer from "../demos/DemoRenderer";
import NotFoundView from "./NotFoundView";

export default function DocumentationView() {
  const params = useParams();
  // Construct the full slug path from wildcard or parameters
  const currentPath = params["*"] || params.slug || "zustand";
  const topic = getTopicBySlug(currentPath);

  const [activeTab, setActiveTab] = useState("preview"); // 'preview' | 'code'

  if (!topic) {
    return <NotFoundView attemptedSlug={currentPath} />;
  }

  const recommendedTopics = getRecommendedTopics(topic.slug, 4);

  return (
    <article className="doc-article">
      {/* 1. Breadcrumbs */}
      <nav className="doc-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/docs/zustand" className="crumb-link">Docs</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-item">{topic.category.replace("-", " ")}</span>
        <span className="crumb-sep">/</span>
        <span className="crumb-item active">{topic.group}</span>
      </nav>

      {/* 2. Header */}
      <header className="doc-header">
        <div className="doc-title-row">
          <h1 className="doc-title">{topic.title}</h1>
          <div className="doc-badge-group">
            <span className="doc-badge">{topic.badge}</span>
            <span className="doc-badge-sep">•</span>
            <span className="doc-read-time">{topic.readTime}</span>
          </div>
        </div>
        <p className="doc-lead">{topic.description}</p>
      </header>

      <hr className="doc-divider" />

      {/* 3. Core Architecture & Summary */}
      <section className="doc-section">
        <h2 className="section-title">Architectural Concept</h2>
        <p className="doc-paragraph">{topic.summary}</p>

        {topic.keyPoints && topic.keyPoints.length > 0 && (
          <div className="key-points-box">
            <h3 className="key-points-title">Key Principles</h3>
            <ul className="key-points-list">
              {topic.keyPoints.map((point, index) => (
                <li key={index} className="key-point-item">
                  <CheckCircle size={14} className="point-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 4. Educational Diagrams & Visual Explanations */}
      {topic.image && (
        <section className="doc-section">
          <h2 className="section-title">Visual Architecture & Flow</h2>
          <div className="diagram-container">
            <div className="diagram-frame">
              <img
                src={topic.image.src}
                alt={topic.image.alt}
                className="diagram-image"
                loading="lazy"
              />
            </div>
            {topic.image.caption && (
              <p className="diagram-caption">
                <ImageIcon size={13} className="caption-icon" />
                <span>{topic.image.caption}</span>
              </p>
            )}
          </div>

          {/* Secondary Diagram if available */}
          {topic.secondaryImage && (
            <div className="diagram-container" style={{ marginTop: "24px" }}>
              <div className="diagram-frame">
                <img
                  src={topic.secondaryImage.src}
                  alt={topic.secondaryImage.alt}
                  className="diagram-image"
                  loading="lazy"
                />
              </div>
              {topic.secondaryImage.caption && (
                <p className="diagram-caption">
                  <ImageIcon size={13} className="caption-icon" />
                  <span>{topic.secondaryImage.caption}</span>
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* 5. Live Interactive Demo (where supported) */}
      {topic.demoComponent && (
        <section className="doc-section">
          <div className="demo-section-header">
            <div>
              <h2 className="section-title">Interactive Demonstration</h2>
              <p className="section-subtitle">
                Inspect and execute this state pattern directly in the browser.
              </p>
            </div>
            <div className="demo-tabs">
              <button
                className={`demo-tab-btn ${activeTab === "preview" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                <Play size={13} />
                <span>Live Preview</span>
              </button>
              <button
                className={`demo-tab-btn ${activeTab === "code" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("code")}
              >
                <Code size={13} />
                <span>Code Example</span>
              </button>
            </div>
          </div>

          <div className="demo-canvas">
            {activeTab === "preview" ? (
              <DemoRenderer demoId={topic.demoComponent} />
            ) : (
              <div className="demo-code-view">
                {topic.codeSnippets && topic.codeSnippets[0] && (
                  <CodeBlock
                    title={topic.codeSnippets[0].title}
                    language={topic.codeSnippets[0].language}
                    code={topic.codeSnippets[0].code}
                  />
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. Live Interactive Code Playground (Editable & Executable) */}
      {topic.playgroundCode && (
        <section className="doc-section">
          <h2 className="section-title">Live Code Editor & Sandbox</h2>
          <p className="section-subtitle">
            Edit the code below directly and click "Run Code" to test and observe execution in real time.
          </p>
          <LiveCodePlayground
            initialCode={topic.playgroundCode}
            title={`${topic.title} — Interactive Sandbox`}
          />
        </section>
      )}

      {/* 7. Code Examples & Reference Implementation */}
      {topic.codeSnippets && topic.codeSnippets.length > 0 && (
        <section className="doc-section">
          <h2 className="section-title">Reference Implementation</h2>
          <div className="code-snippets-stack">
            {topic.codeSnippets.map((snippet, idx) => (
              <CodeBlock
                key={idx}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Topics */}
      <footer className="doc-footer">
        <div className="doc-recommendations">
          <div className="doc-recommendations-header">
            <span className="rec-section-title">Recommended Next</span>
          </div>
          <div className="rec-items-list">
            {recommendedTopics.map((item) => (
              <Link key={item.id} to={`/docs/${item.slug}`} className="rec-item-link">
                <span className="rec-item-title">{item.title}</span>
                <span className="rec-item-group">{item.group}</span>
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
}
