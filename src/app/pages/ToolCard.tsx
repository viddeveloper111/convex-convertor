"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: any;
  category: string;
  onClick: () => void;
}

export function ToolCard({
  title,
  description,
  icon,
  category,
  onClick,
}: ToolCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d", // black card background
        border: "1px solid rgba(168, 85, 247, 0.5)", // purple border
        borderRadius: "12px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "200px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 15px rgba(168, 85, 247, 0.6)"; // purple glow
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #a855f7, #6366f1)", // purple gradient
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {React.createElement(icon, { style: { height: "20px", width: "20px" } })}
        </div>
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              margin: 0,
              color: "#fff",
            }}
          >
            {title}
          </h3>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              marginTop: "4px",
              padding: "2px 8px",
              borderRadius: "9999px",
              backgroundColor: "rgba(168, 85, 247, 0.2)", // soft purple
              color: "#a855f7", // purple text
              fontWeight: 500,
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#d1d5db", // muted text
          marginTop: "12px",
          marginBottom: "16px",
          flexGrow: 1,
        }}
      >
        {description}
      </p>

      {/* Button */}
      <button
        onClick={onClick}
        className=" focus:ring-2 focus:ring-purple-400
            transition"
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#111",
          color: "#fff",
          fontWeight: 500,
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, #a855f7, #6366f1)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.border = "1px solid #a855f7";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#111";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.border = "1px solid #333";
        }}
      >
        Try it <ArrowRight style={{ height: "16px", width: "16px" }} />
      </button>
    </div>
  );
}
