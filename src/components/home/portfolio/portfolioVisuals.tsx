"use client";

import React from "react";
import { ProductVisualProps, VisualType } from "./types";

// =========================================================================
// SHARED PROCEDURAL SVG FRAME & BACKGROUND
// =========================================================================
interface VisualFrameProps {
  children: React.ReactNode;
  rotation?: number;
  label?: string;
  sublabel?: string;
}

const ProceduralFrame: React.FC<VisualFrameProps> = ({
  children,
  rotation = 0,
  label = "SYSTEM CORE",
  sublabel = "STREAM READY",
}) => {
  return (
    <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[460px] mx-auto flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,23,68,0.12),transparent_70%)] pointer-events-none" />

      {/* SVG Canvas for technical overlay & framing */}
      <svg
        viewBox="0 0 520 520"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="rubyGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="rubyStrongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="rubyLinear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1744" />
            <stop offset="100%" stopColor="#8B0015" />
          </linearGradient>
          <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A1A24" />
            <stop offset="100%" stopColor="#0B0B10" />
          </linearGradient>
          <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1F1F2C" />
            <stop offset="70%" stopColor="#0D0D14" />
            <stop offset="100%" stopColor="#060608" />
          </radialGradient>
        </defs>

        {/* Outer Tech Measurement Ring */}
        <circle
          cx="260"
          cy="260"
          r="235"
          fill="none"
          stroke="rgba(198, 202, 208, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
          style={{
            transformOrigin: "260px 260px",
            transform: `rotate(${Number((rotation * 0.3).toFixed(2))}deg)`,
          }}
        />

        {/* Middle Track Ring */}
        <circle
          cx="260"
          cy="260"
          r="195"
          fill="none"
          stroke="rgba(198, 202, 208, 0.22)"
          strokeWidth="1.2"
          strokeDasharray="12 12"
          style={{
            transformOrigin: "260px 260px",
            transform: `rotate(-${Number((rotation * 0.4).toFixed(2))}deg)`,
          }}
        />

        {/* Inner Calibration Ring */}
        <circle
          cx="260"
          cy="260"
          r="150"
          fill="none"
          stroke="rgba(255, 23, 68, 0.28)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Reticle Target Crosshairs */}
        <line x1="30" y1="260" x2="490" y2="260" stroke="rgba(198, 202, 208, 0.07)" strokeWidth="1" />
        <line x1="260" y1="30" x2="260" y2="490" stroke="rgba(198, 202, 208, 0.07)" strokeWidth="1" />

        {/* Cardinal Coordinate Markers */}
        <text x="260" y="20" textAnchor="middle" fill="#71717A" fontSize="8" fontFamily="monospace" letterSpacing="2">
          NORTH // LAT 001
        </text>
        <text x="500" y="263" textAnchor="end" fill="#71717A" fontSize="8" fontFamily="monospace" letterSpacing="1">
          E // 090
        </text>
        <text x="260" y="508" textAnchor="middle" fill="#71717A" fontSize="8" fontFamily="monospace" letterSpacing="2">
          SOUTH // MERIDIAN
        </text>
        <text x="20" y="263" textAnchor="start" fill="#71717A" fontSize="8" fontFamily="monospace" letterSpacing="1">
          W // 270
        </text>

        {/* Technical Corner Brackets */}
        <path d="M 40 60 L 40 40 L 60 40" fill="none" stroke="rgba(255, 23, 68, 0.4)" strokeWidth="1.5" />
        <path d="M 480 60 L 480 40 L 460 40" fill="none" stroke="rgba(255, 23, 68, 0.4)" strokeWidth="1.5" />
        <path d="M 40 460 L 40 480 L 60 480" fill="none" stroke="rgba(255, 23, 68, 0.4)" strokeWidth="1.5" />
        <path d="M 480 460 L 480 480 L 460 480" fill="none" stroke="rgba(255, 23, 68, 0.4)" strokeWidth="1.5" />

        {/* Injected Procedural Children */}
        {children}
      </svg>

      {/* Floating HUD Badges */}
      <div className="absolute top-3 left-4 flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0D0D14]/90 border border-white/10 text-[10px] font-mono text-[#A6A9B0] backdrop-blur-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1744] animate-pulse" />
        <span className="tracking-wider">{label}</span>
      </div>

      <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-[#0D0D14]/90 border border-white/10 text-[9px] font-mono text-[#71717A] backdrop-blur-sm pointer-events-none">
        {sublabel}
      </div>
    </div>
  );
};

// =========================================================================
// 01 — AI ASSISTANTS & COPILOTS PROCEDURAL VISUAL
// =========================================================================
export const AIAssistantsVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 360 * 2) % 360).toFixed(2));
  const coreScale = Number((1 + Math.sin(localProgress * Math.PI) * 0.15).toFixed(3));
  const pulseRadius1 = Number((45 + ((localProgress * 40) % 35)).toFixed(2));
  const pulseRadius2 = Number((70 + (((localProgress + 0.4) * 45) % 40)).toFixed(2));

  const satelliteCount = 6;
  const satellites = Array.from({ length: satelliteCount }, (_, i) => {
    const angle = (i * (360 / satelliteCount) + rotation * 0.5) * (Math.PI / 180);
    const radius = 135;
    return {
      x: Number((260 + radius * Math.cos(angle)).toFixed(2)),
      y: Number((260 + radius * Math.sin(angle)).toFixed(2)),
      name: ["VECTOR RAG", "TOOL ROUTER", "LLM CORE", "GUARDRAIL", "VOICE SYNTH", "EMBEDDING"][i],
      active: i === Math.floor(localProgress * satelliteCount) % satelliteCount,
    };
  });

  return (
    <ProceduralFrame
      rotation={rotation}
      label="AI NEURAL KERNEL"
      sublabel={`INFERENCE: ${(40 + (1 - localProgress) * 15).toFixed(1)}ms // 128 T/s`}
    >
      {/* Central Pulsing Energy Waves */}
      <circle
        cx="260"
        cy="260"
        r={pulseRadius1}
        fill="none"
        stroke="#FF1744"
        strokeWidth="1.2"
        opacity={Math.max(0.1, 1 - (pulseRadius1 - 45) / 35)}
      />
      <circle
        cx="260"
        cy="260"
        r={pulseRadius2}
        fill="none"
        stroke="#FF1744"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity={Math.max(0.1, 1 - (pulseRadius2 - 70) / 40)}
      />

      {/* Dynamic Data Beam Vectors */}
      {satellites.map((sat, idx) => (
        <g key={idx}>
          <line
            x1="260"
            y1="260"
            x2={sat.x}
            y2={sat.y}
            stroke={sat.active ? "#FF1744" : "rgba(198, 202, 208, 0.2)"}
            strokeWidth={sat.active ? 2 : 1}
            strokeDasharray={sat.active ? "none" : "3 3"}
            filter={sat.active ? "url(#rubyGlow)" : undefined}
          />
          {/* Animated data packet traveling on active beam */}
          {sat.active && (
            <circle
              cx={260 + (sat.x - 260) * ((localProgress * 3) % 1)}
              cy={260 + (sat.y - 260) * ((localProgress * 3) % 1)}
              r="3.5"
              fill="#FFFFFF"
              filter="url(#rubyStrongGlow)"
            />
          )}
          {/* Satellite Node Box */}
          <circle
            cx={sat.x}
            cy={sat.y}
            r={sat.active ? 14 : 9}
            fill={sat.active ? "#FF1744" : "#13131D"}
            stroke={sat.active ? "#FFFFFF" : "rgba(198, 202, 208, 0.4)"}
            strokeWidth={sat.active ? 2 : 1}
            filter={sat.active ? "url(#rubyGlow)" : undefined}
          />
          <text
            x={sat.x}
            y={sat.y > 260 ? sat.y + 18 : sat.y - 12}
            textAnchor="middle"
            fill={sat.active ? "#FFFFFF" : "#71717A"}
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {sat.name}
          </text>
        </g>
      ))}

      {/* Central Intelligence Core Orb */}
      <g style={{ transformOrigin: "260px 260px", transform: `scale(${coreScale})` }}>
        <circle
          cx="260"
          cy="260"
          r="42"
          fill="url(#hubGradient)"
          stroke="#FF1744"
          strokeWidth="2.5"
          filter="url(#rubyGlow)"
        />
        {/* Core Glyph / Hex Pattern */}
        <polygon
          points="260,234 282,247 282,273 260,286 238,273 238,247"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          opacity="0.85"
        />
        <circle cx="260" cy="260" r="8" fill="#FF1744" filter="url(#rubyGlow)" />
        <text
          x="260"
          y="263"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="6"
          fontFamily="monospace"
          fontWeight="bold"
        >
          AI
        </text>
      </g>
    </ProceduralFrame>
  );
};

// =========================================================================
// 02 — CUSTOM ERP SYSTEMS PROCEDURAL VISUAL
// =========================================================================
export const CustomERPVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 180) % 360).toFixed(2));
  // Modules slide smoothly into tight synchronization as scroll progresses
  const spread = Number(((1 - localProgress) * 20).toFixed(2));

  const modules = [
    { title: "FINANCE & LEDGER", code: "MOD-01", x: 130 - spread, y: 130 - spread, active: true },
    { title: "INVENTORY & SCM", code: "MOD-02", x: 390 + spread, y: 130 - spread, active: localProgress > 0.3 },
    { title: "HR & WORKFORCE", code: "MOD-03", x: 130 - spread, y: 390 + spread, active: localProgress > 0.6 },
    { title: "OPERATIONS & LOGS", code: "MOD-04", x: 390 + spread, y: 390 + spread, active: true },
  ];

  return (
    <ProceduralFrame
      rotation={rotation}
      label="ENTERPRISE BUS // ERP"
      sublabel="ACID PROTOCOL // ATOMIC LEDGER SYNC"
    >
      {/* Central Event Bus Diamond */}
      <polygon
        points="260,205 315,260 260,315 205,260"
        fill="url(#hubGradient)"
        stroke="#FF1744"
        strokeWidth="2"
        filter="url(#rubyGlow)"
      />
      <text x="260" y="258" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
        EVENT BUS
      </text>
      <text x="260" y="270" textAnchor="middle" fill="#FF1744" fontSize="7" fontFamily="monospace">
        0.02ms SYNC
      </text>

      {/* Bus Data Conduits */}
      {modules.map((m, idx) => (
        <g key={idx}>
          <line
            x1="260"
            y1="260"
            x2={m.x}
            y2={m.y}
            stroke={m.active ? "#FF1744" : "rgba(198, 202, 208, 0.25)"}
            strokeWidth={m.active ? "2" : "1"}
            strokeDasharray={m.active ? "none" : "4 4"}
          />
          {/* Module Panel Rectangles */}
          <g transform={`translate(${m.x - 70}, ${m.y - 45})`}>
            <rect
              width="140"
              height="90"
              rx="10"
              fill="#0D0D14"
              stroke={m.active ? "#FF1744" : "rgba(198, 202, 208, 0.25)"}
              strokeWidth={m.active ? 1.5 : 1}
              filter={m.active ? "url(#rubyGlow)" : undefined}
            />
            {/* Header bar */}
            <rect width="140" height="24" rx="10" fill="#14141E" />
            <rect y="18" width="140" height="6" fill="#14141E" />
            <circle cx="14" cy="12" r="3" fill={m.active ? "#FF1744" : "#71717A"} />
            <text x="26" y="15" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
              {m.code}
            </text>
            <text x="130" y="15" textAnchor="end" fill="#71717A" fontSize="7" fontFamily="monospace">
              ONLINE
            </text>

            <text x="14" y="42" fill="#E4E4E7" fontSize="8" fontFamily="monospace" fontWeight="bold">
              {m.title}
            </text>

            {/* Micro metrics bar */}
            <rect x="14" y="52" width="112" height="5" rx="2.5" fill="#1C1C28" />
            <rect
              x="14"
              y="52"
              width={m.active ? 85 + (idx * 9) : 30}
              height="5"
              rx="2.5"
              fill={m.active ? "url(#rubyLinear)" : "#52525B"}
            />
            <text x="14" y="74" fill="#A6A9B0" fontSize="7" fontFamily="monospace">
              THROUGHPUT: {92 + idx}%
            </text>
          </g>
        </g>
      ))}
    </ProceduralFrame>
  );
};

// =========================================================================
// 03 — CRM & LEAD PLATFORMS PROCEDURAL VISUAL
// =========================================================================
export const CRMPlatformsVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 240) % 360).toFixed(2));

  // Pipeline stages
  const stages = [
    { label: "INGEST", count: "1,420", fill: 1 },
    { label: "QUALIFIED", count: "890", fill: Number(Math.min(1, localProgress * 1.5).toFixed(3)) },
    { label: "WHATSAPP", count: "640", fill: Number(Math.min(1, Math.max(0, (localProgress - 0.25) * 1.6)).toFixed(3)) },
    { label: "CLOSED WON", count: "$184K", fill: Number(Math.min(1, Math.max(0, (localProgress - 0.5) * 2)).toFixed(3)) },
  ];

  return (
    <ProceduralFrame
      rotation={rotation}
      label="CRM PIPELINE // TELEMETRY"
      sublabel={`LEAD VELOCITY: < 45s // CONVERSION: +62%`}
    >
      {/* Central Ingestion Hub */}
      <circle
        cx="260"
        cy="150"
        r="36"
        fill="url(#hubGradient)"
        stroke="#FF1744"
        strokeWidth="2"
        filter="url(#rubyGlow)"
      />
      <text x="260" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
        CRM CORE
      </text>
      <text x="260" y="160" textAnchor="middle" fill="#FF1744" fontSize="7" fontFamily="monospace">
        AI SCORING
      </text>

      {/* Multi-Channel Ingress Rays (WhatsApp, Web, API) */}
      {[
        { x: 140, y: 70, label: "WHATSAPP API" },
        { x: 260, y: 50, label: "WEBHOOK" },
        { x: 380, y: 70, label: "PORTAL INTAKE" },
      ].map((ch, idx) => (
        <g key={idx}>
          <line
            x1={ch.x}
            y1={ch.y + 15}
            x2="260"
            y2="150"
            stroke="#FF1744"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <rect
            x={ch.x - 45}
            y={ch.y - 12}
            width="90"
            height="22"
            rx="6"
            fill="#12121A"
            stroke="rgba(198, 202, 208, 0.25)"
            strokeWidth="1"
          />
          <text x={ch.x} y={ch.y + 2} textAnchor="middle" fill="#C6CAD0" fontSize="7" fontFamily="monospace" fontWeight="bold">
            {ch.label}
          </text>
        </g>
      ))}

      {/* Downward Funnel Stream Pipeline */}
      <line x1="260" y1="186" x2="260" y2="240" stroke="#FF1744" strokeWidth="2.5" filter="url(#rubyGlow)" />

      {/* 4 Funnel Stages Cards */}
      <g transform="translate(60, 240)">
        {stages.map((stage, idx) => {
          const sy = idx * 60;
          const isActive = stage.fill > 0.5;
          return (
            <g key={idx} transform={`translate(0, ${sy})`}>
              <rect
                width="400"
                height="48"
                rx="8"
                fill="#0E0E16"
                stroke={isActive ? "#FF1744" : "rgba(198, 202, 208, 0.2)"}
                strokeWidth={isActive ? 1.5 : 1}
                filter={isActive ? "url(#rubyGlow)" : undefined}
              />
              {/* Stage Index Badge */}
              <rect x="10" y="10" width="28" height="28" rx="6" fill="#181824" />
              <text x="24" y="27" textAnchor="middle" fill={isActive ? "#FF1744" : "#71717A"} fontSize="9" fontFamily="monospace" fontWeight="bold">
                0{idx + 1}
              </text>

              {/* Stage Title */}
              <text x="50" y="22" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                {stage.label}
              </text>
              <text x="50" y="36" fill="#71717A" fontSize="7" fontFamily="monospace">
                AUTOMATED STAGE DISPATCH
              </text>

              {/* Fill Progress Bar */}
              <rect x="200" y="20" width="110" height="8" rx="4" fill="#161622" />
              <rect
                x="200"
                y="20"
                width={110 * stage.fill}
                height="8"
                rx="4"
                fill={isActive ? "url(#rubyLinear)" : "#52525B"}
              />

              {/* Telemetry Count */}
              <text x="385" y="29" textAnchor="end" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {stage.count}
              </text>
            </g>
          );
        })}
      </g>
    </ProceduralFrame>
  );
};

// =========================================================================
// 04 — CUSTOMER & VENDOR PORTALS PROCEDURAL VISUAL
// =========================================================================
export const PortalsVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 150) % 360).toFixed(2));
  // Browser frame docking motion
  const tabOffset = Number(((1 - localProgress) * 14).toFixed(2));

  return (
    <ProceduralFrame
      rotation={rotation}
      label="SECURE CLIENT & VENDOR PORTAL"
      sublabel="AES-256 VAULT // ZERO-TRUST ACL"
    >
      {/* Central Browser Workspace Window */}
      <g transform="translate(65, 95)">
        {/* Main Window Frame */}
        <rect
          width="390"
          height="330"
          rx="14"
          fill="#0B0B12"
          stroke="#FF1744"
          strokeWidth="1.8"
          filter="url(#rubyGlow)"
        />

        {/* Window Chrome Header */}
        <rect width="390" height="34" rx="14" fill="#141420" />
        <rect y="24" width="390" height="10" fill="#141420" />
        {/* Window control dots */}
        <circle cx="18" cy="17" r="4" fill="#FF1744" />
        <circle cx="32" cy="17" r="4" fill="#F59E0B" />
        <circle cx="46" cy="17" r="4" fill="#10B981" />

        {/* Address Bar */}
        <rect x="65" y="8" width="240" height="18" rx="5" fill="#0A0A0F" stroke="rgba(198, 202, 208, 0.2)" strokeWidth="0.8" />
        <text x="185" y="20" textAnchor="middle" fill="#A6A9B0" fontSize="7" fontFamily="monospace">
          https://portal.enterprise.internal/vault
        </text>

        {/* Status lock badge */}
        <rect x="315" y="8" width="65" height="18" rx="5" fill="#1F1318" stroke="#FF1744" strokeWidth="0.8" />
        <text x="347" y="20" textAnchor="middle" fill="#FF1744" fontSize="7" fontFamily="monospace" fontWeight="bold">
          AES-256
        </text>

        {/* Left Sub-Panel: Client Workspace */}
        <g transform={`translate(${16 - tabOffset}, 48)`}>
          <rect width="170" height="265" rx="8" fill="#12121C" stroke="rgba(198, 202, 208, 0.18)" strokeWidth="1" />
          <text x="14" y="24" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            CLIENT WORKSPACE
          </text>
          <text x="14" y="38" fill="#FF1744" fontSize="7" fontFamily="monospace">
            ACME ENTERPRISES
          </text>

          {/* Milestone Cards */}
          {[
            { title: "INVOICE #4902", status: "PAID", color: "#10B981" },
            { title: "SPRINT DELIVERABLE", status: "VERIFIED", color: "#FF1744" },
            { title: "NDA ENCRYPTED DOC", status: "SIGNED", color: "#10B981" },
          ].map((item, idx) => (
            <g key={idx} transform={`translate(10, ${50 + idx * 64})`}>
              <rect width="150" height="52" rx="6" fill="#181826" stroke="rgba(198, 202, 208, 0.12)" strokeWidth="0.8" />
              <text x="10" y="20" fill="#E4E4E7" fontSize="8" fontFamily="monospace" fontWeight="bold">
                {item.title}
              </text>
              <rect x="10" y="28" width="55" height="14" rx="4" fill={`${item.color}22`} />
              <text x="37" y="38" textAnchor="middle" fill={item.color} fontSize="6" fontFamily="monospace" fontWeight="bold">
                {item.status}
              </text>
            </g>
          ))}
        </g>

        {/* Right Sub-Panel: Vendor Hub */}
        <g transform={`translate(${204 + tabOffset}, 48)`}>
          <rect width="170" height="265" rx="8" fill="#12121C" stroke="rgba(198, 202, 208, 0.18)" strokeWidth="1" />
          <text x="14" y="24" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            VENDOR DISPATCH
          </text>
          <text x="14" y="38" fill="#A6A9B0" fontSize="7" fontFamily="monospace">
            SUPPLY CHAIN GATEWAY
          </text>

          {/* Vendor metrics */}
          <g transform="translate(10, 50)">
            <rect width="150" height="80" rx="6" fill="#181826" stroke="rgba(198, 202, 208, 0.12)" strokeWidth="0.8" />
            <text x="12" y="22" fill="#71717A" fontSize="7" fontFamily="monospace">
              PO RECONCILIATION
            </text>
            <text x="12" y="44" fill="#FFFFFF" fontSize="14" fontFamily="monospace" fontWeight="bold">
              99.8%
            </text>
            <rect x="12" y="56" width="126" height="5" rx="2.5" fill="#242436" />
            <rect x="12" y="56" width="115" height="5" rx="2.5" fill="url(#rubyLinear)" />
          </g>

          <g transform="translate(10, 142)">
            <rect width="150" height="110" rx="6" fill="#181826" stroke="rgba(198, 202, 208, 0.12)" strokeWidth="0.8" />
            <text x="12" y="22" fill="#71717A" fontSize="7" fontFamily="monospace">
              AUDIT TRAIL LOGS
            </text>
            <text x="12" y="42" fill="#10B981" fontSize="7" fontFamily="monospace">
              + 12:44:02 TLS SESSION OK
            </text>
            <text x="12" y="58" fill="#C6CAD0" fontSize="7" fontFamily="monospace">
              + 12:44:09 HASH VERIFIED
            </text>
            <text x="12" y="74" fill="#FF1744" fontSize="7" fontFamily="monospace">
              + 12:44:18 SIGN-OFF SYNC
            </text>
          </g>
        </g>
      </g>
    </ProceduralFrame>
  );
};

// =========================================================================
// 05 — DIGITAL COMMERCE (E-COMMERCE) PROCEDURAL VISUAL
// =========================================================================
export const ECommerceVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 190) % 360).toFixed(2));
  const cartVelocity = (280 - localProgress * 40).toFixed(0);

  return (
    <ProceduralFrame
      rotation={rotation}
      label="HEADLESS STOREFRONT ENGINE"
      sublabel={`EDGE VELOCITY: ${cartVelocity}ms // 0 CONFLICT LOCK`}
    >
      {/* Central Storefront Layout */}
      <g transform="translate(70, 80)">
        {/* Top Cart & Navigation Bar */}
        <rect
          width="380"
          height="46"
          rx="10"
          fill="#12121B"
          stroke="rgba(198, 202, 208, 0.22)"
          strokeWidth="1"
        />
        <text x="20" y="28" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
          STOREFRONT // EDGE CHECKOUT
        </text>

        {/* Live Cart Counter Pill */}
        <g transform="translate(260, 9)">
          <rect width="105" height="28" rx="14" fill="#201116" stroke="#FF1744" strokeWidth="1" />
          <circle cx="20" cy="14" r="5" fill="#FF1744" filter="url(#rubyGlow)" />
          <text x="32" y="18" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
            CART: $1,420
          </text>
        </g>

        {/* 3 Interactive Product Catalog Cards */}
        {[
          { name: "SKU-992 ENTERPRISE", price: "$490", stock: "LOCKED", color: "#FF1744" },
          { name: "SKU-481 EDGE COMPUTE", price: "$320", stock: "IN STOCK", color: "#10B981" },
          { name: "SKU-102 NEURAL ACCEL", price: "$610", stock: "SYNCED", color: "#FF1744" },
        ].map((prod, idx) => (
          <g key={idx} transform={`translate(0, ${58 + idx * 82})`}>
            <rect
              width="380"
              height="72"
              rx="10"
              fill="#0D0D15"
              stroke={idx === 0 ? "#FF1744" : "rgba(198, 202, 208, 0.16)"}
              strokeWidth={idx === 0 ? 1.5 : 1}
              filter={idx === 0 ? "url(#rubyGlow)" : undefined}
            />

            {/* Product wireframe thumbnail */}
            <rect x="14" y="13" width="46" height="46" rx="8" fill="#181826" stroke="rgba(198, 202, 208, 0.2)" strokeWidth="0.8" />
            <polygon points="37,24 50,44 24,44" fill="none" stroke="#FF1744" strokeWidth="1.2" />

            {/* Info */}
            <text x="74" y="32" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
              {prod.name}
            </text>
            <text x="74" y="48" fill="#71717A" fontSize="7" fontFamily="monospace">
              ATOMIC INVENTORY RESERVATION ACTIVE
            </text>

            {/* Price */}
            <text x="270" y="42" fill="#FFFFFF" fontSize="12" fontFamily="monospace" fontWeight="bold">
              {prod.price}
            </text>

            {/* Checkout status button */}
            <rect x="305" y="24" width="62" height="24" rx="6" fill={`${prod.color}22`} stroke={prod.color} strokeWidth="1" />
            <text x="336" y="39" textAnchor="middle" fill={prod.color} fontSize="7" fontFamily="monospace" fontWeight="bold">
              {prod.stock}
            </text>
          </g>
        ))}

        {/* Instant Checkout Pipeline Stream */}
        <g transform="translate(0, 312)">
          <rect width="380" height="42" rx="8" fill="#14141F" stroke="#FF1744" strokeWidth="1" />
          <text x="18" y="25" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
            STRIPE // APPLE PAY // ZERO LATENCY EDGE SYNC
          </text>
          <text x="362" y="25" textAnchor="end" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">
            CONFIRMED
          </text>
        </g>
      </g>
    </ProceduralFrame>
  );
};

// =========================================================================
// 06 — NATIVE MOBILE ENGINEERING PROCEDURAL VISUAL
// =========================================================================
export const NativeMobileVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 160) % 360).toFixed(2));
  // Subtle device tilt
  const tiltLeft = Number((-4 + localProgress * 4).toFixed(2));
  const tiltRight = Number((4 - localProgress * 4).toFixed(2));

  return (
    <ProceduralFrame
      rotation={rotation}
      label="CROSS-PLATFORM MOBILE ENGINE"
      sublabel="FLUTTER / REACT NATIVE // OFFLINE SQLITE"
    >
      {/* LEFT DEVICE: iOS Style Frame */}
      <g
        transform={`translate(110, 85) rotate(${tiltLeft} 80 170)`}
        style={{ transformOrigin: "80px 170px" }}
      >
        {/* Device Chassis Outer */}
        <rect
          width="160"
          height="330"
          rx="26"
          fill="#0B0B12"
          stroke="#FF1744"
          strokeWidth="2"
          filter="url(#rubyGlow)"
        />
        {/* Inner Screen */}
        <rect x="8" y="8" width="144" height="314" rx="20" fill="#11111A" />

        {/* Dynamic Island Notch */}
        <rect x="52" y="14" width="56" height="12" rx="6" fill="#000000" />
        <circle cx="96" cy="20" r="2.5" fill="#10B981" />

        {/* Mobile Header */}
        <text x="20" y="46" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
          FIELD OPS APP
        </text>
        <text x="20" y="58" fill="#FF1744" fontSize="6" fontFamily="monospace">
          SQLITE TWO-WAY SYNC
        </text>

        {/* Mobile Content Cards */}
        <rect x="18" y="70" width="124" height="65" rx="8" fill="#181824" stroke="rgba(198, 202, 208, 0.15)" strokeWidth="0.8" />
        <text x="26" y="88" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
          LIVE ROUTE DISPATCH
        </text>
        <circle cx="32" cy="110" r="10" fill="#201116" stroke="#FF1744" strokeWidth="1" />
        <circle cx="32" cy="110" r="4" fill="#FF1744" />
        <line x1="48" y1="110" x2="128" y2="110" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Task Checklist */}
        <rect x="18" y="145" width="124" height="110" rx="8" fill="#181824" stroke="rgba(198, 202, 208, 0.15)" strokeWidth="0.8" />
        <text x="26" y="163" fill="#A6A9B0" fontSize="7" fontFamily="monospace">
          SITE INSPECTION
        </text>
        {["Geofence Verified", "Biometric Signoff", "Telemetry Dump"].map((task, idx) => (
          <g key={idx} transform={`translate(26, ${178 + idx * 22})`}>
            <circle cx="4" cy="4" r="4" fill="#10B981" />
            <text x="14" y="7" fill="#E4E4E7" fontSize="6.5" fontFamily="monospace">
              {task}
            </text>
          </g>
        ))}

        {/* Bottom Home Indicator */}
        <rect x="46" y="310" width="68" height="3" rx="1.5" fill="#71717A" />
      </g>

      {/* RIGHT DEVICE: Android Style Frame */}
      <g
        transform={`translate(250, 105) rotate(${tiltRight} 80 170)`}
        style={{ transformOrigin: "80px 170px" }}
      >
        <rect
          width="160"
          height="330"
          rx="22"
          fill="#0B0B12"
          stroke="rgba(198, 202, 208, 0.35)"
          strokeWidth="1.8"
        />
        <rect x="8" y="8" width="144" height="314" rx="16" fill="#0E0E17" />

        {/* Camera Punchhole */}
        <circle cx="80" cy="20" r="3.5" fill="#000000" stroke="#242436" strokeWidth="1" />

        {/* Consumer View */}
        <text x="20" y="46" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
          CONSUMER PORTAL
        </text>
        <text x="20" y="58" fill="#10B981" fontSize="6" fontFamily="monospace">
          CRASH-FREE: 99.98%
        </text>

        {/* Metric Chart */}
        <rect x="18" y="70" width="124" height="100" rx="8" fill="#161622" stroke="rgba(198, 202, 208, 0.15)" strokeWidth="0.8" />
        <text x="26" y="88" fill="#71717A" fontSize="7" fontFamily="monospace">
          OFFLINE QUEUE
        </text>
        <text x="26" y="112" fill="#FFFFFF" fontSize="16" fontFamily="monospace" fontWeight="bold">
          0 PENDING
        </text>
        <text x="26" y="130" fill="#FF1744" fontSize="7" fontFamily="monospace">
          ALL BLOCKS COMMITTED
        </text>

        {/* Push Notification Toast */}
        <g transform="translate(18, 182)">
          <rect width="124" height="60" rx="8" fill="#201116" stroke="#FF1744" strokeWidth="1" />
          <text x="10" y="20" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
            HIGH-PRIORITY PUSH
          </text>
          <text x="10" y="34" fill="#A6A9B0" fontSize="6" fontFamily="monospace">
            Payload received in 18ms
          </text>
          <text x="10" y="48" fill="#10B981" fontSize="6" fontFamily="monospace">
            FCM / APNS Pipeline OK
          </text>
        </g>
      </g>
    </ProceduralFrame>
  );
};

// =========================================================================
// 07 — WORKFLOW AUTOMATION ENGINES PROCEDURAL VISUAL
// =========================================================================
export const WorkflowAutomationVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 210) % 360).toFixed(2));

  // 5 Connected Nodes
  const nodes = [
    { name: "WEBHOOK TRIGGER", sub: "EVENT INGEST", x: 90, y: 150 },
    { name: "SCHEMA VALIDATION", sub: "JSON SCHEMA", x: 260, y: 110 },
    { name: "AI PARSER / OCR", sub: "NEURAL EXTRACTION", x: 430, y: 150 },
    { name: "EVENT BUS / QUEUE", sub: "RABBITMQ WORKER", x: 350, y: 340 },
    { name: "DATABASE WRITE", sub: "IMMUTABLE AUDIT", x: 170, y: 340 },
  ];

  return (
    <ProceduralFrame
      rotation={rotation}
      label="EVENT-DRIVEN WORKFLOW DAG"
      sublabel="ZERO-LOSS GUARANTEE // AUTONOMOUS RETRIES"
    >
      {/* Directed Bezier Connectors */}
      <path
        d="M 90 150 C 180 80, 200 110, 260 110"
        fill="none"
        stroke="#FF1744"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        filter="url(#rubyGlow)"
      />
      <path
        d="M 260 110 C 320 110, 350 80, 430 150"
        fill="none"
        stroke="#FF1744"
        strokeWidth="2"
      />
      <path
        d="M 430 150 C 450 240, 400 280, 350 340"
        fill="none"
        stroke={localProgress > 0.4 ? "#FF1744" : "rgba(198, 202, 208, 0.3)"}
        strokeWidth="2"
      />
      <path
        d="M 350 340 C 300 370, 240 370, 170 340"
        fill="none"
        stroke={localProgress > 0.7 ? "#FF1744" : "rgba(198, 202, 208, 0.3)"}
        strokeWidth="2"
      />
      <path
        d="M 170 340 C 120 280, 70 230, 90 150"
        fill="none"
        stroke="rgba(198, 202, 208, 0.2)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Central Heartbeat Hub */}
      <circle
        cx="260"
        cy="235"
        r="44"
        fill="url(#hubGradient)"
        stroke="#FF1744"
        strokeWidth="2"
        filter="url(#rubyGlow)"
      />
      <text x="260" y="232" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
        WORKER ORCHESTRATOR
      </text>
      <text x="260" y="246" textAnchor="middle" fill="#FF1744" fontSize="7" fontFamily="monospace">
        0.00% LOSS RATE
      </text>

      {/* Workflow Nodes */}
      {nodes.map((node, idx) => {
        const isActive = idx <= Math.floor(localProgress * nodes.length);
        return (
          <g key={idx} transform={`translate(${node.x}, ${node.y})`}>
            {/* Outer status ring */}
            <circle
              r={isActive ? 28 : 22}
              fill="#0D0D15"
              stroke={isActive ? "#FF1744" : "rgba(198, 202, 208, 0.3)"}
              strokeWidth={isActive ? 2 : 1}
              filter={isActive ? "url(#rubyGlow)" : undefined}
            />
            {/* Step sequence badge */}
            <circle cx="0" cy="-28" r="8" fill="#1C1C28" stroke={isActive ? "#FF1744" : "none"} strokeWidth="1" />
            <text x="0" y="-25" textAnchor="middle" fill={isActive ? "#FF1744" : "#71717A"} fontSize="7" fontFamily="monospace" fontWeight="bold">
              0{idx + 1}
            </text>

            <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
              {node.name}
            </text>
            <text x="0" y="14" textAnchor="middle" fill={isActive ? "#FF1744" : "#71717A"} fontSize="5.5" fontFamily="monospace">
              {node.sub}
            </text>
          </g>
        );
      })}
    </ProceduralFrame>
  );
};

// =========================================================================
// 08 — CENTRALIZED DATA PLATFORMS PROCEDURAL VISUAL
// =========================================================================
export const CentralizedDataVisual: React.FC<ProductVisualProps> = ({
  progress,
  localProgress,
  reducedMotion,
}) => {
  const rotation = reducedMotion ? 0 : Number(((progress * 180) % 360).toFixed(2));

  // Animated bar heights
  const bars = [45, 80, 60, 95, 70, 110, 85, 125, 90, 140];

  return (
    <ProceduralFrame
      rotation={rotation}
      label="REAL-TIME OLAP LAKEHOUSE"
      sublabel="CLICKHOUSE / TELEMETRY // LATENCY < 1.8s"
    >
      {/* Central Data Warehouse Hexagon */}
      <polygon
        points="260,110 320,145 320,215 260,250 200,215 200,145"
        fill="url(#hubGradient)"
        stroke="#FF1744"
        strokeWidth="2.2"
        filter="url(#rubyGlow)"
      />
      <text x="260" y="176" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
        DATA WAREHOUSE
      </text>
      <text x="260" y="190" textAnchor="middle" fill="#FF1744" fontSize="7" fontFamily="monospace">
        COLUMNAR OLAP ENGINE
      </text>

      {/* Data Ingress Streams from Sources */}
      {[
        { x: 90, y: 120, label: "IOT TELEMETRY" },
        { x: 430, y: 120, label: "APP DATABASES" },
        { x: 90, y: 240, label: "3RD PARTY APIS" },
        { x: 430, y: 240, label: "LOG STREAMS" },
      ].map((src, idx) => (
        <g key={idx}>
          <line
            x1={src.x}
            y1={src.y}
            x2="260"
            y2="180"
            stroke="#FF1744"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <rect
            x={src.x - 45}
            y={src.y - 14}
            width="90"
            height="26"
            rx="6"
            fill="#12121A"
            stroke="rgba(198, 202, 208, 0.25)"
            strokeWidth="1"
          />
          <text x={src.x} y={src.y + 2} textAnchor="middle" fill="#C6CAD0" fontSize="7" fontFamily="monospace" fontWeight="bold">
            {src.label}
          </text>
        </g>
      ))}

      {/* Analytics Dashboard Grid Panel below */}
      <g transform="translate(60, 275)">
        <rect
          width="400"
          height="160"
          rx="12"
          fill="#0B0B14"
          stroke="rgba(198, 202, 208, 0.22)"
          strokeWidth="1.2"
        />

        <text x="18" y="24" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
          STREAMING INGESTION THROUGHPUT (MS)
        </text>
        <text x="382" y="24" textAnchor="end" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">
          LIVE: 2.4M EVENTS/S
        </text>

        {/* Background Grid Lines */}
        <line x1="18" y1="50" x2="382" y2="50" stroke="rgba(198, 202, 208, 0.08)" strokeWidth="1" />
        <line x1="18" y1="85" x2="382" y2="85" stroke="rgba(198, 202, 208, 0.08)" strokeWidth="1" />
        <line x1="18" y1="120" x2="382" y2="120" stroke="rgba(198, 202, 208, 0.08)" strokeWidth="1" />

        {/* Telemetry Bar Chart */}
        {bars.map((height, idx) => {
          const bx = 30 + idx * 35;
          const scaledH = Number((height * (0.6 + localProgress * 0.4)).toFixed(2));
          const by = Number((135 - scaledH * 0.55).toFixed(2));
          const barHeight = Number((scaledH * 0.55).toFixed(2));
          return (
            <g key={idx}>
              <rect
                x={bx}
                y={by}
                width="16"
                height={barHeight}
                rx="3"
                fill={idx % 2 === 0 ? "url(#rubyLinear)" : "#222234"}
              />
            </g>
          );
        })}

        {/* Continuous Bezier Trendline */}
        <path
          d="M 38 100 Q 100 65, 180 85 T 310 55 T 375 42"
          fill="none"
          stroke="#FF1744"
          strokeWidth="2"
          filter="url(#rubyGlow)"
        />
        <circle cx="375" cy="42" r="4" fill="#FFFFFF" filter="url(#rubyStrongGlow)" />
      </g>
    </ProceduralFrame>
  );
};

// =========================================================================
// VISUAL REGISTRY DISPATCHER
// =========================================================================
interface VisualDispatcherProps extends ProductVisualProps {
  visualType: VisualType;
}

export const PortfolioVisualDispatcher: React.FC<VisualDispatcherProps> = (props) => {
  switch (props.visualType) {
    case "ai":
      return <AIAssistantsVisual {...props} />;
    case "erp":
      return <CustomERPVisual {...props} />;
    case "crm":
      return <CRMPlatformsVisual {...props} />;
    case "portal":
      return <PortalsVisual {...props} />;
    case "commerce":
      return <ECommerceVisual {...props} />;
    case "mobile":
      return <NativeMobileVisual {...props} />;
    case "automation":
      return <WorkflowAutomationVisual {...props} />;
    case "analytics":
      return <CentralizedDataVisual {...props} />;
    default:
      return <AIAssistantsVisual {...props} />;
  }
};
