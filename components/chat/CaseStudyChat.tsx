"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChatMarkdown } from "./ChatMarkdown";
import { WalkingHumans } from "@/components/fun/WalkingHumans";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

/* ═══════════════════════════════════════════════════════
   AI FACE — circle with blinking, wandering eyes
═══════════════════════════════════════════════════════ */

function AIFace({
  size = 24,
  thinking = false,
}: {
  size?: number;
  thinking?: boolean;
}) {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const wanderMs = thinking ? 2400 : 3500;
    const blinkMs = thinking ? 3500 : 5000;

    const wander = setInterval(() => {
      setEyePos(thinking
        ? { x: (Math.random() - 0.5) * 2, y: -1.5 + Math.random() * -1 }
        : { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 2 }
      );
    }, wanderMs);

    const blink = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, blinkMs);

    return () => { clearInterval(wander); clearInterval(blink); };
  }, [thinking]);

  const r = size / 2;
  const eyeW = size * 0.18;
  const eyeH = blinking ? size * 0.04 : size * 0.22;
  const eyeR = size * 0.06;
  const eyeGap = size * 0.12;
  const eyeY = r - eyeH / 2 + eyePos.y;

  return (
    <svg
      data-id="ai-face"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="flex-shrink-0"
    >
      <circle
        data-id="ai-face-head"
        cx={r}
        cy={r}
        r={r - 0.5}
        fill="var(--color-bg-inverse)"
      />
      <rect
        data-id="ai-face-eye-left"
        x={r - eyeGap - eyeW + eyePos.x}
        y={eyeY}
        width={eyeW}
        height={eyeH}
        rx={eyeR}
        fill="var(--color-bg-base)"
        className="ai-face-eye"
      />
      <rect
        data-id="ai-face-eye-right"
        x={r + eyeGap + eyePos.x}
        y={eyeY}
        width={eyeW}
        height={eyeH}
        rx={eyeR}
        fill="var(--color-bg-base)"
        className="ai-face-eye"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   TIME AGO HELPER
═══════════════════════════════════════════════════════ */

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 120) return "1m ago";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

/* ═══════════════════════════════════════════════════════
   SUGGESTIONS
═══════════════════════════════════════════════════════ */

const SUGGESTIONS = [
  "What's your design process like?",
  "Tell me about the offers case study",
  "Are you open to freelance work?",
  "What tools do you use daily?",
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */

export function CaseStudyChat() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Show pill after 10s
  useEffect(() => {
    const t = setTimeout(() => setShowPill(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Refresh timestamps every 60s (only when chat is open with messages)
  const [, setTick] = useState(0);
  const hasMessages = messages.length > 0;
  useEffect(() => {
    if (!hasMessages || !isOpen) return;
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, [hasMessages, isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    setIsThinking(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", timestamp: Date.now() },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          currentPage: pathname,
        }),
      });

      if (response.status === 429) {
        throw new Error("rate_limited");
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (firstChunk) {
          setIsThinking(false);
          firstChunk = false;
        }

        const text = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: last.content + text,
          };
          return updated;
        });
      }
    } catch (err) {
      setIsThinking(false);
      const isRateLimited = err instanceof Error && err.message === "rate_limited";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: isRateLimited
            ? "You're sending messages a bit fast — give it a moment and try again."
            : "Sorry, I couldn't connect right now. Please try again.",
          timestamp: Date.now(),
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setIsThinking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating trigger — fixed like Navbar ── */}
      {showPill && !isOpen && (
        <div data-id="chat-trigger-wrapper" className="fixed bottom-6 right-6 z-50">
          <div
            data-id="chat-trigger-humans-strip"
            className="hidden md:block absolute bottom-full left-0 right-0"
          >
            <WalkingHumans />
          </div>
          <button
            ref={pillRef}
            data-id="chat-trigger"
            onClick={() => setIsOpen(true)}
            className={cn(
              "p-3 sm:pl-2.5 sm:pr-5 sm:py-2.5 rounded-full w-fit",
              "flex items-center gap-2",
              "cursor-pointer select-none",
              "border border-[var(--color-border-default)]",
              "bg-[var(--color-bg-elevated)]",
              "shadow-lg hover:shadow-xl",
              "transition-shadow",
              "animate-chat-trigger-pulse"
            )}
            aria-label="Ask me anything"
          >
            <AIFace size={22} />
            <span
              data-id="chat-trigger-label"
              className="hidden sm:inline text-xs tracking-wide text-[var(--color-text-secondary)]"
            >
              Ask me anything
            </span>
          </button>
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              data-id="chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              data-id="chat-modal"
              initial={{ opacity: 0, y: 100, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.6 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8,
              }}
              className={cn(
                "fixed z-[9999]",
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[calc(100vw-32px)] sm:w-[min(50vw,560px)]",
                "h-[75vh] max-h-[75vh] sm:h-[70vh] sm:max-h-[70vh]",
                "border border-[var(--color-border-default)]",
                "rounded-2xl shadow-2xl",
                "flex flex-col overflow-hidden",
                "origin-bottom",
                "bg-[var(--color-bg-base)]"
              )}
            >
              {/* Header */}
              <div
                data-id="chat-header"
                className="relative z-10 flex-shrink-0 px-5 py-4 border-b border-[var(--color-border-default)]/50 flex items-center justify-between"
              >
                <div
                  data-id="chat-header-left"
                  className="flex items-center gap-3"
                >
                  <AIFace size={32} thinking={isThinking} />
                  <div data-id="chat-header-info">
                    <p
                      data-id="chat-header-title"
                      className="text-sm font-semibold text-[var(--color-text-primary)] font-display"
                    >
                      Hey, I&apos;m Arnab
                    </p>
                    <p
                      data-id="chat-header-subtitle"
                      className="text-[11px] text-[var(--color-text-muted)]"
                    >
                      {isThinking
                        ? "Thinking..."
                        : isStreaming
                          ? "Typing..."
                          : "Ask me about my work"}
                    </p>
                  </div>
                </div>
                <button
                  data-id="chat-close"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                    "hover:bg-[var(--color-bg-surface)]",
                    "transition-colors cursor-pointer"
                  )}
                  aria-label="Close chat"
                >
                  <svg
                    data-id="chat-close-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div
                data-id="chat-messages"
                data-lenis-prevent
                className="relative z-10 flex-1 overflow-y-auto scroll-smooth p-5 space-y-4 min-h-[200px] overscroll-contain"
              >
                {messages.length === 0 ? (
                  <div
                    data-id="chat-empty"
                    className="flex flex-col items-center justify-center gap-6 h-full"
                  >
                    <AIFace size={48} />
                    <div
                      data-id="chat-suggestions"
                      className="flex flex-wrap justify-center gap-2 w-full max-w-[360px]"
                    >
                      {SUGGESTIONS.map((s, i) => (
                        <button
                          key={s}
                          data-id={`chat-suggestion-${i}`}
                          onClick={() => sendMessage(s)}
                          className={cn(
                            "text-xs px-4 py-2 rounded-full text-center",
                            "border border-[var(--color-accent)]/40",
                            "text-[var(--color-text-primary)]",
                            "bg-[var(--color-bg-elevated)]",
                            "hover:bg-[var(--color-accent-subtle)] hover:border-[var(--color-accent)]",
                            "transition-colors cursor-pointer",
                            "leading-snug"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      data-id={`chat-message-${i}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        "flex flex-col gap-1",
                        msg.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        data-id={`chat-bubble-${msg.role}-${i}`}
                        className={cn(
                          "max-w-[85%] px-3.5 py-2.5",
                          msg.role === "user"
                            ? "bg-[var(--color-accent-subtle)] text-[var(--color-text-primary)] rounded-[12px] rounded-br-sm"
                            : "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-[12px] rounded-bl-sm"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          msg.content ? (
                            <ChatMarkdown
                              content={msg.content}
                              streaming={
                                isStreaming && i === messages.length - 1
                              }
                            />
                          ) : isThinking ? (
                            <div
                              data-id="chat-thinking"
                              className="flex items-center gap-2"
                            >
                              <AIFace size={16} thinking />
                              <span
                                data-id="chat-thinking-text"
                                className="text-xs text-[var(--color-text-muted)] animate-shimmer chat-thinking-shimmer"
                              >
                                Thinking...
                              </span>
                            </div>
                          ) : null
                        ) : (
                          <p
                            data-id={`chat-user-text-${i}`}
                            className="text-sm leading-relaxed"
                          >
                            {msg.content}
                          </p>
                        )}
                      </div>
                      <p
                        data-id={`chat-timestamp-${i}`}
                        className="text-[10px] text-[var(--color-text-disabled)] px-1"
                      >
                        {timeAgo(msg.timestamp)}
                      </p>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input — textarea with toolbar */}
              <form
                onSubmit={handleSubmit}
                data-id="chat-input"
                className={cn(
                  "relative z-10 flex-shrink-0 mx-3 mb-3 rounded-[16px]",
                  "bg-[var(--color-bg-elevated)]",
                  "border border-[var(--color-border-default)]",
                  "transition-colors",
                  "focus-within:border-[var(--color-border-strong)]"
                )}
              >
                {/* Textarea */}
                <textarea
                  ref={inputRef}
                  data-id="chat-input-field"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // Auto-resize
                    const el = e.target;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask about this project..."
                  disabled={isStreaming}
                  rows={1}
                  className={cn(
                    "w-full px-4 pt-3 pb-1 text-sm resize-none",
                    "bg-transparent text-[var(--color-text-primary)]",
                    "border-0 outline-none ring-0 shadow-none",
                    "placeholder:text-[var(--color-text-disabled)]",
                    "focus:outline-none focus:ring-0 focus:shadow-none",
                    "scrollbar-none [&::-webkit-scrollbar]:hidden"
                  )}
                />

                {/* Toolbar row */}
                <div
                  data-id="chat-input-toolbar"
                  className="flex items-center justify-between px-3 pb-2.5 pt-1"
                >
                  {/* Left — model label */}
                  <span
                    data-id="chat-input-model"
                    className="text-[10px] text-[var(--color-text-muted)] tracking-wide"
                  >
                    Groq · llama-3.1-8b
                  </span>

                  {/* Right — actions */}
                  <div data-id="chat-input-actions" className="flex items-center gap-1.5">
                    {isStreaming ? (
                      <button
                        data-id="chat-stop"
                        type="button"
                        onClick={() => setIsStreaming(false)}
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          "bg-[var(--color-accent)] text-white",
                          "hover:bg-[var(--color-accent-hover)]",
                          "transition-colors cursor-pointer"
                        )}
                        aria-label="Stop generating"
                      >
                        <svg
                          data-id="chat-stop-icon"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    ) : null}
                    <button
                      data-id="chat-submit"
                      type="submit"
                      disabled={!input.trim() || isStreaming}
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        "bg-[var(--color-accent)] text-white",
                        "disabled:opacity-30 disabled:cursor-not-allowed",
                        "hover:bg-[var(--color-accent-hover)] active:scale-95",
                        "transition-all cursor-pointer"
                      )}
                      aria-label="Send message"
                    >
                      <svg
                        data-id="chat-submit-icon"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
