//@ts-nocheck
import { useState, useEffect } from "react";

export default function TypingIndicator({ isLoading }) {
  const [stage, setStage] = useState("");

  useEffect(() => {
    if (isLoading) {
      setStage("TYPING");
      setTimeout(() => {
        setStage("DONE");
      }, 1000);
    }
  }, [isLoading]);

  if (!stage) return null;
  if (stage === "TYPING")
    return (
      <div className={`typingIndicatorContainer ${stage === "DONE" ? "hidden" : ""}`}>
        <div className="typingIndicatorBubble">
          <div className="typingIndicatorBubbleDot"></div>
          <div className="typingIndicatorBubbleDot"></div>
          <div className="typingIndicatorBubbleDot"></div>
        </div>
      </div>
    );
  return null;
}