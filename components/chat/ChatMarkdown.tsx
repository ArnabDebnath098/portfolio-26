"use client";

import { type ReactNode } from "react";

/**
 * Lightweight markdown parser for chat messages.
 * Handles: **bold**, *italic*, `code`, - lists, [links](url), line breaks.
 * No external dependencies — regex-based.
 */

type Token =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; text: string; href: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  // Match **bold**, *italic*, `code`, [text](url)
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: line.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "bold", value: match[1] });
    else if (match[2]) tokens.push({ type: "italic", value: match[2] });
    else if (match[3]) tokens.push({ type: "code", value: match[3] });
    else if (match[4] && match[5])
      tokens.push({ type: "link", text: match[4], href: match[5] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({ type: "text", value: line.slice(lastIndex) });
  }

  return tokens;
}

function renderTokens(tokens: Token[], keyPrefix: string): ReactNode[] {
  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    switch (token.type) {
      case "bold":
        return (
          <strong key={key} data-id={`chat-md-bold-${i}`} className="font-semibold">
            {token.value}
          </strong>
        );
      case "italic":
        return (
          <em key={key} data-id={`chat-md-italic-${i}`}>
            {token.value}
          </em>
        );
      case "code":
        return (
          <code
            key={key}
            data-id={`chat-md-code-${i}`}
            className="px-1.5 py-0.5 rounded-md bg-black/10 text-[0.85em] font-mono"
          >
            {token.value}
          </code>
        );
      case "link":
        return (
          <a
            key={key}
            data-id={`chat-md-link-${i}`}
            href={token.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {token.text}
          </a>
        );
      default:
        return <span key={key}>{token.value}</span>;
    }
  });
}

export function ChatMarkdown({
  content,
  streaming = false,
}: {
  content: string;
  streaming?: boolean;
}) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (idx: number) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul
        key={`list-${idx}`}
        data-id={`chat-md-list-${idx}`}
        className="flex flex-col gap-1 pl-4"
      >
        {listBuffer.map((item, li) => (
          <li
            key={li}
            data-id={`chat-md-li-${idx}-${li}`}
            className="list-disc list-outside text-sm leading-relaxed"
          >
            {renderTokens(tokenizeLine(item), `li-${idx}-${li}`)}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // List item
    if (/^[-*]\s/.test(trimmed)) {
      listBuffer.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    flushList(idx);

    // Empty line = paragraph break
    if (!trimmed) {
      if (idx > 0 && idx < lines.length - 1) {
        elements.push(<div key={`br-${idx}`} data-id={`chat-md-break-${idx}`} className="h-2" />);
      }
      return;
    }

    // Regular text line
    const tokens = tokenizeLine(trimmed);
    elements.push(
      <p key={`p-${idx}`} data-id={`chat-md-p-${idx}`} className="text-sm leading-relaxed">
        {renderTokens(tokens, `p-${idx}`)}
      </p>
    );
  });

  flushList(lines.length);

  // Word-by-word streaming reveal: wrap each text node in spans with staggered delays
  if (streaming) {
    return (
      <div data-id="chat-md-streaming" className="flex flex-col gap-1.5">
        {elements}
      </div>
    );
  }

  return (
    <div data-id="chat-md-content" className="flex flex-col gap-1.5">
      {elements}
    </div>
  );
}
