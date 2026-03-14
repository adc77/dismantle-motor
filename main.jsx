import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Motor Overview",
    subtitle: "172mm Downhole PDM — Full Assembly",
    color: "#00d4ff",
    description: "The 172mm positive displacement mud motor consists of 5 main sections assembled end-to-end. Identify each section before beginning disassembly. Always flush with clean water first and bleed all residual pressure.",
    warnings: ["Bleed all pressure before touching connections", "Flush with clean water — 172mm motors retain significant mud volume", "Mark all connections with paint pen for orientation"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Full motor body */}
        <defs>
          <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="40%" stopColor="#718096" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
        </defs>

        {/* Section blocks */}
        {[
          { x: 10, w: 60, label: "TOP SUB", color: "#4a5568", sub: "①" },
          { x: 75, w: 160, label: "POWER SECTION", color: "#0e7490", sub: "②" },
          { x: 240, w: 80, label: "BENT HOUSING", color: "#6b46c1", sub: "③" },
          { x: 325, w: 80, label: "TRANSMISSION", color: "#c05621", sub: "④" },
          { x: 410, w: 200, label: "BEARING SECTION", color: "#276749", sub: "⑤" },
          { x: 615, w: 75, label: "BIT BOX", color: "#4a5568", sub: "⑥" },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y={40} width={s.w} height={70} rx={i === 0 ? 8 : i === 5 ? 8 : 2} fill={s.color} opacity={0.85} />
            <rect x={s.x + 2} y={42} width={s.w - 4} height={10} rx={1} fill="rgba(255,255,255,0.07)" />
            <text x={s.x + s.w / 2} y={72} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">{s.sub}</text>
            <text x={s.x + s.w / 2} y={83} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="6.5" fontFamily="monospace">{s.label}</text>
            {/* Connection lines between sections */}
            {i < 5 && <line x1={s.x + s.w} y1={75} x2={s.x + s.w + (i === 0 ? 3 : 3)} y2={75} stroke="#f6ad55" strokeWidth="2" />}
          </g>
        ))}

        {/* Center bore line */}
        <line x1="10" y1="75" x2="690" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />

        {/* Flow direction arrow */}
        <g>
          <text x="350" y="130" textAnchor="middle" fill="#f6ad55" fontSize="9" fontFamily="monospace">← MUD FLOW DIRECTION (pump to bit)</text>
          <line x1="200" y1="126" x2="130" y2="126" stroke="#f6ad55" strokeWidth="1" markerEnd="url(#arr)" />
        </g>

        {/* Dimension */}
        <line x1="10" y1="22" x2="690" y2="22" stroke="#00d4ff" strokeWidth="0.5" />
        <text x="350" y="18" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">172mm OD — TOTAL ASSEMBLY</text>
        <line x1="10" y1="18" x2="10" y2="28" stroke="#00d4ff" strokeWidth="1" />
        <line x1="690" y1="18" x2="690" y2="28" stroke="#00d4ff" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Step 1 — Flush & Drain",
    subtitle: "Pre-disassembly preparation",
    color: "#f6ad55",
    description: "Stand the motor vertically (top sub up). Pressure wash both ends to break up caked solids. Drain completely for 15 minutes. This prevents solids from jamming threaded connections during breakout.",
    warnings: ["Never skip flushing — caked mud on threads causes galling", "Check for H₂S or hazardous gases if retrieved from sour well", "Wear PPE — face shield and gloves mandatory"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Vertical motor outline */}
        <rect x="280" y="10" width="140" height="130" rx="4" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <rect x="300" y="15" width="100" height="120" rx="2" fill="#1a202c" />

        {/* Mud draining */}
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <circle cx={310 + i * 20} cy={155} r="3" fill="#92400e" opacity={0.7 - i * 0.1} />
            <line x1={310 + i * 20} y1={135 + i * 4} x2={310 + i * 20} y2={148} stroke="#92400e" strokeWidth="1.5" strokeDasharray="2,2" />
          </g>
        ))}

        {/* Water flush arrows from top */}
        {[0,1,2].map(i => (
          <g key={i}>
            <line x1={305 + i * 40} y1="0" x2={305 + i * 40} y2="12" stroke="#00d4ff" strokeWidth="2" />
            <polygon points={`${305 + i * 40 - 4},8 ${305 + i * 40 + 4},8 ${305 + i * 40},14`} fill="#00d4ff" />
          </g>
        ))}

        {/* Labels */}
        <text x="230" y="20" textAnchor="end" fill="#00d4ff" fontSize="9" fontFamily="monospace">WATER FLUSH</text>
        <line x1="235" y1="18" x2="278" y2="10" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="3,2" />

        <text x="230" y="150" textAnchor="end" fill="#92400e" fontSize="9" fontFamily="monospace">MUD DRAIN</text>
        <line x1="235" y1="150" x2="278" y2="150" stroke="#92400e" strokeWidth="0.5" strokeDasharray="3,2" />

        <text x="500" y="80" fill="#68d391" fontSize="9" fontFamily="monospace">STAND VERTICAL</text>
        <text x="500" y="92" fill="#68d391" fontSize="9" fontFamily="monospace">TOP SUB UP</text>
        <line x1="497" y1="75" x2="425" y2="60" stroke="#68d391" strokeWidth="0.5" strokeDasharray="3,2" />

        <text x="350" y="155" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">DRAIN 15 MIN MINIMUM</text>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Step 2 — Remove Top Sub / Dump Sub",
    subtitle: "Breaking the topmost connection",
    color: "#68d391",
    description: "Secure the motor body in breakout tongs or chain vise. Break the top sub connection. Note: some designs use LEFT-HAND threads — check your make before applying torque. The dump valve ports are a prime clog location — inspect carefully.",
    warnings: ["Verify thread direction before applying torque — LH thread backs off clockwise", "Never use a hammer on connection faces", "Inspect dump valve piston and ports for solids packing"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Main motor body */}
        <rect x="200" y="60" width="400" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />

        {/* Top sub being removed */}
        <rect x="100" y="55" width="100" height="70" rx="6" fill="#4a5568" stroke="#68d391" strokeWidth="2" />
        <text x="150" y="86" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">TOP</text>
        <text x="150" y="97" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">SUB</text>

        {/* Break point */}
        <line x1="200" y1="50" x2="200" y2="130" stroke="#68d391" strokeWidth="2" strokeDasharray="5,3" />
        <text x="200" y="45" textAnchor="middle" fill="#68d391" fontSize="8" fontFamily="monospace">BREAK HERE</text>

        {/* Arrow showing removal direction */}
        <line x1="160" y1="30" x2="100" y2="30" stroke="#f6ad55" strokeWidth="2" />
        <polygon points="96,27 96,33 88,30" fill="#f6ad55" />
        <text x="170" y="28" fill="#f6ad55" fontSize="9" fontFamily="monospace">PULL / UNSCREW</text>

        {/* Thread detail */}
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1="197" y1={60 + i * 12} x2="203" y2={66 + i * 12} stroke="#a0aec0" strokeWidth="1" />
        ))}

        {/* Dump valve detail */}
        <rect x="320" y="68" width="60" height="44" rx="1" fill="#1a202c" stroke="#e2e8f0" strokeWidth="0.5" />
        <circle cx="350" cy="82" r="8" fill="#2d3748" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="350" cy="82" r="3" fill="#92400e" />
        {[0,1,2,3].map(i => (
          <circle key={i} cx={325 + i * 10} cy={100} r="3" fill="#e2e8f0" opacity="0.4" />
        ))}
        <text x="350" y="122" textAnchor="middle" fill="#a0aec0" fontSize="7.5" fontFamily="monospace">DUMP VALVE — INSPECT PORTS</text>

        {/* Chain tongs */}
        <text x="500" y="75" fill="#a0aec0" fontSize="9" fontFamily="monospace">CHAIN TONGS</text>
        <text x="500" y="87" fill="#a0aec0" fontSize="9" fontFamily="monospace">OR VISE</text>
        <rect x="600" y="55" width="30" height="70" rx="2" fill="none" stroke="#a0aec0" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="615" y="98" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">GRIP</text>
        <line x1="497" y1="80" x2="435" y2="80" stroke="#a0aec0" strokeWidth="0.5" strokeDasharray="3,2" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Step 3 — Remove Power Section",
    subtitle: "Separating the rotor-stator assembly",
    color: "#00d4ff",
    description: "Break the threaded connection between the power section housing and the bent housing below it. Once free, slide the entire power section assembly off. The stator is the rubber-lined outer housing; the rotor is the helical steel shaft inside.",
    warnings: ["If motor stalled due to clog, rotor may be hydraulically locked — do not force", "Support the power section weight — 172mm units are heavy (80–120kg)", "Photograph rotor orientation before extraction"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Power section housing */}
        <rect x="80" y="45" width="250" height="80" rx="3" fill="#0e4c6e" stroke="#00d4ff" strokeWidth="2" />

        {/* Stator lining */}
        <rect x="88" y="53" width="234" height="64" rx="2" fill="#0c3354" />

        {/* Rotor helix inside */}
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <ellipse key={i} cx={100 + i * 24} cy={85} rx={10} ry={22} fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity={0.6} />
        ))}

        {/* Labels */}
        <text x="205" y="30" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" fontWeight="bold">POWER SECTION</text>
        <text x="130" y="150" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">STATOR (OUTER — RUBBER LINED)</text>
        <text x="330" y="150" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">ROTOR (INNER — HELICAL STEEL)</text>
        <line x1="205" y1="125" x2="205" y2="140" stroke="#a0aec0" strokeWidth="0.5" />

        {/* Break point at right */}
        <line x1="330" y1="35" x2="330" y2="135" stroke="#f6ad55" strokeWidth="2" strokeDasharray="5,3" />
        <text x="330" y="28" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">BREAK HERE</text>

        {/* Remaining body */}
        <rect x="330" y="55" width="300" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <text x="480" y="88" textAnchor="middle" fill="#a0aec0" fontSize="9" fontFamily="monospace">BENT HOUSING + BEARING SECTION</text>

        {/* Lift arrow */}
        <line x1="205" y1="45" x2="205" y2="10" stroke="#68d391" strokeWidth="2" />
        <polygon points="200,8 210,8 205,0" fill="#68d391" />
        <text x="225" y="25" fill="#68d391" fontSize="9" fontFamily="monospace">LIFT OFF</text>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Step 4 — Extract Rotor from Stator",
    subtitle: "The critical clog-clearing step",
    color: "#fc8181",
    description: "Secure the stator in a padded bench vise. Apply rotational torque to the rotor in the normal drilling direction (usually right-hand) while pulling axially. The rotor spirals out due to its helical geometry. If seized: inject penetrating oil, wait 20–30 min, retry.",
    warnings: ["NEVER use hammers or impact tools on the rotor", "Apply penetrating oil (diesel works) if hydraulically locked — wait 20–30 min", "Stall damage: inspect stator elastomer for chunking, tears, or delamination"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Stator in vise */}
        <rect x="20" y="50" width="200" height="70" rx="3" fill="#0c3354" stroke="#4a5568" strokeWidth="2" />
        {/* Vise jaws */}
        <rect x="10" y="48" width="15" height="74" rx="2" fill="#4a5568" />
        <rect x="215" y="48" width="15" height="74" rx="2" fill="#4a5568" />
        <text x="120" y="148" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">STATOR — SECURE IN PADDED VISE</text>

        {/* Rotor being pulled out */}
        <g>
          {/* Rotor body (partially extracted) */}
          <rect x="220" y="62" width="280" height="46" rx="4" fill="#2b6cb0" stroke="#00d4ff" strokeWidth="1.5" />
          {/* Helix pattern on rotor */}
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <line key={i} x1={228 + i * 28} y1={62} x2={242 + i * 28} y2={108} stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" />
          ))}
          <text x="360" y="82" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">ROTOR</text>
          <text x="360" y="95" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">(HELICAL STEEL SHAFT)</text>
        </g>

        {/* Extraction arrows */}
        <line x1="510" y1="85" x2="560" y2="85" stroke="#fc8181" strokeWidth="3" />
        <polygon points="563,81 563,89 572,85" fill="#fc8181" />
        <text x="590" y="78" fill="#fc8181" fontSize="9" fontFamily="monospace">PULL</text>
        <text x="590" y="90" fill="#fc8181" fontSize="9" fontFamily="monospace">AXIALLY</text>

        {/* Rotation arrow */}
        <path d="M 480 55 A 30 30 0 0 1 510 75" fill="none" stroke="#f6ad55" strokeWidth="2" markerEnd="url(#rot)" />
        <text x="490" y="45" fill="#f6ad55" fontSize="9" fontFamily="monospace">ROTATE</text>
        <text x="490" y="55" fill="#f6ad55" fontSize="8" fontFamily="monospace">RIGHT-HAND</text>

        {/* Penetrating oil label */}
        <text x="350" y="20" textAnchor="middle" fill="#68d391" fontSize="8.5" fontFamily="monospace">IF SEIZED: INJECT PENETRATING OIL → WAIT 20-30 MIN → RETRY</text>
        <line x1="230" y1="22" x2="220" y2="55" stroke="#68d391" strokeWidth="0.5" strokeDasharray="3,2" />

        {/* Stator elastomer inspection note */}
        <text x="120" y="35" textAnchor="middle" fill="#fc8181" fontSize="8" fontFamily="monospace">INSPECT RUBBER LINING FOR STALL DAMAGE</text>
        <line x1="120" y1="38" x2="120" y2="48" stroke="#fc8181" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Step 5 — Remove Bent Housing",
    subtitle: "Separating transmission access",
    color: "#b794f4",
    description: "Use a spanner wrench on the flat faces of the bent housing. Mark the bend angle setting with a paint pen BEFORE breaking the connection. This section sets your directional deviation — the angle must be re-confirmed on reassembly.",
    warnings: ["CRITICAL: Mark the bend angle before disassembly — you must return to exact same setting", "Bent housing threads are typically right-hand", "Inspect housing bore for erosion or cracking"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Bent housing */}
        <g>
          {/* Angled block */}
          <polygon points="200,50 400,50 400,120 200,120" fill="#44337a" stroke="#b794f4" strokeWidth="2" />
          {/* Bend angle indicator */}
          <line x1="300" y1="85" x2="350" y2="75" stroke="#f6ad55" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="300" y1="85" x2="350" y2="85" stroke="#a0aec0" strokeWidth="1" strokeDasharray="3,2" />
          <path d="M 340 85 A 10 10 0 0 1 346 78" fill="none" stroke="#f6ad55" strokeWidth="1.5" />
          <text x="355" y="80" fill="#f6ad55" fontSize="8" fontFamily="monospace">BEND ANGLE</text>
          <text x="355" y="90" fill="#f6ad55" fontSize="8" fontFamily="monospace">(0.5°–3°)</text>
          <text x="300" y="95" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">BENT HOUSING</text>
        </g>

        {/* Left break point */}
        <line x1="200" y1="38" x2="200" y2="135" stroke="#b794f4" strokeWidth="2" strokeDasharray="5,3" />
        <text x="200" y="32" textAnchor="middle" fill="#b794f4" fontSize="8" fontFamily="monospace">BREAK</text>

        {/* Right break point */}
        <line x1="400" y1="38" x2="400" y2="135" stroke="#b794f4" strokeWidth="2" strokeDasharray="5,3" />
        <text x="400" y="32" textAnchor="middle" fill="#b794f4" fontSize="8" fontFamily="monospace">BREAK</text>

        {/* Left body */}
        <rect x="50" y="55" width="150" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <text x="125" y="88" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">POWER SECTION</text>
        <text x="125" y="100" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">(ALREADY REMOVED)</text>

        {/* Right body */}
        <rect x="400" y="55" width="200" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <text x="500" y="88" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">TRANSMISSION +</text>
        <text x="500" y="100" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">BEARING SECTION</text>

        {/* Paint mark instruction */}
        <rect x="205" y="52" width="12" height="15" fill="#f6ad55" opacity="0.8" rx="1" />
        <text x="140" y="148" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">← PAINT MARK BEFORE BREAKING</text>
        <line x1="213" y1="67" x2="213" y2="145" stroke="#f6ad55" strokeWidth="0.5" strokeDasharray="3,2" />

        {/* Spanner wrench label */}
        <text x="300" y="148" textAnchor="middle" fill="#b794f4" fontSize="8" fontFamily="monospace">USE SPANNER WRENCH ON FLAT FACES</text>
      </svg>
    ),
  },
  {
    id: 7,
    title: "Step 6 — Disassemble Transmission / CV Joint",
    subtitle: "The flex shaft / constant velocity joint",
    color: "#f6ad55",
    description: "The transmission converts the rotor's eccentric wobble into concentric rotation at the bit. Remove the upper and lower drive shaft subs. Pull the CV joint or flex shaft assembly out axially. Inspect pin/socket faces for wear and cracks. Check rubber boots on sealed types.",
    warnings: ["CV joint failure is a common cause of motor stall — inspect all wear faces", "Check flex shaft for cracks using dye penetrant if available", "Do not mix upper and lower drive shaft subs — mark them before removal"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Transmission housing */}
        <rect x="150" y="50" width="400" height="70" rx="3" fill="#744210" stroke="#f6ad55" strokeWidth="2" />

        {/* CV joint in center */}
        <ellipse cx="350" cy="85" rx="35" ry="30" fill="#92400e" stroke="#f6ad55" strokeWidth="2" />
        <text x="350" y="82" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">CV JOINT</text>
        <text x="350" y="93" textAnchor="middle" fill="#fbd38d" fontSize="7" fontFamily="monospace">INSPECT WEAR</text>

        {/* Left drive shaft */}
        <rect x="155" y="78" width="110" height="14" rx="2" fill="#c05621" />
        <text x="210" y="72" textAnchor="middle" fill="#fbd38d" fontSize="8" fontFamily="monospace">UPPER DRIVE SUB</text>

        {/* Right drive shaft */}
        <rect x="435" y="78" width="110" height="14" rx="2" fill="#c05621" />
        <text x="490" y="72" textAnchor="middle" fill="#fbd38d" fontSize="8" fontFamily="monospace">LOWER DRIVE SUB</text>

        {/* Eccentric motion arrows (left - wobble) */}
        <g>
          <ellipse cx="210" cy="115" rx="18" ry="8" fill="none" stroke="#fc8181" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="210" y="140" textAnchor="middle" fill="#fc8181" fontSize="7" fontFamily="monospace">ECCENTRIC</text>
          <text x="210" y="150" textAnchor="middle" fill="#fc8181" fontSize="7" fontFamily="monospace">(FROM ROTOR)</text>
        </g>

        {/* Concentric motion (right - true rotation) */}
        <g>
          <circle cx="490" cy="115" r="12" fill="none" stroke="#68d391" strokeWidth="1.5" />
          <text x="490" y="140" textAnchor="middle" fill="#68d391" fontSize="7" fontFamily="monospace">CONCENTRIC</text>
          <text x="490" y="150" textAnchor="middle" fill="#68d391" fontSize="7" fontFamily="monospace">(TO BIT)</text>
        </g>

        {/* Arrow through CV */}
        <line x1="228" y1="115" x2="315" y2="105" stroke="#a0aec0" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="385" y1="105" x2="475" y2="115" stroke="#a0aec0" strokeWidth="1" strokeDasharray="3,2" />

        {/* Extraction arrow */}
        <line x1="350" y1="10" x2="350" y2="47" stroke="#f6ad55" strokeWidth="2" strokeDasharray="3,2" />
        <polygon points="345,12 355,12 350,4" fill="#f6ad55" />
        <text x="370" y="25" fill="#f6ad55" fontSize="9" fontFamily="monospace">LIFT OUT AXIALLY</text>
      </svg>
    ),
  },
  {
    id: 8,
    title: "Step 7 — Disassemble Bearing Section",
    subtitle: "Thrust bearings + radial bearings + flow restrictor",
    color: "#68d391",
    description: "Remove the bit box connection first (right-hand thread). Use a bearing mandrel puller or hydraulic press to push the driveshaft mandrel upward out of the bearing housing. Lay all bearing components in order on a clean mat — photograph before fully separating.",
    warnings: ["Never mix up thrust bearing cartridge order — they must go back in exact sequence", "The flow restrictor orifice is a prime clog location — check first", "Photograph the stack BEFORE pulling it apart"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Bearing housing */}
        <rect x="100" y="40" width="500" height="90" rx="3" fill="#1a365d" stroke="#68d391" strokeWidth="2" />

        {/* Components laid out in sequence */}
        {[
          { x: 110, w: 45, label: "UPPER\nRADIAL\nBRG", color: "#2b6cb0" },
          { x: 165, w: 60, label: "THRUST\nBRG #1", color: "#276749" },
          { x: 235, w: 60, label: "THRUST\nBRG #2", color: "#276749" },
          { x: 305, w: 60, label: "THRUST\nBRG #3", color: "#276749" },
          { x: 375, w: 50, label: "FLOW\nRESTRICT", color: "#744210" },
          { x: 435, w: 45, label: "LOWER\nRADIAL\nBRG", color: "#2b6cb0" },
          { x: 490, w: 100, label: "DRIVE\nSHAFT\nMANDREL", color: "#4a5568" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={50} width={c.w} height={70} rx={2} fill={c.color} opacity={0.9} />
            <rect x={c.x + 2} y={52} width={c.w - 4} height={8} rx={1} fill="rgba(255,255,255,0.1)" />
            {c.label.split("\n").map((line, j) => (
              <text key={j} x={c.x + c.w / 2} y={80 + j * 11} textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold">{line}</text>
            ))}
          </g>
        ))}

        {/* Sequence numbers */}
        {[1,2,3,4,5,6,7].map((n, i) => {
          const xs = [132, 195, 265, 335, 400, 457, 540];
          return <text key={n} x={xs[i]} y={145} textAnchor="middle" fill="#68d391" fontSize="9" fontFamily="monospace">➤ {n}</text>;
        })}

        {/* Flow restrictor highlight */}
        <rect x="375" y="48" width="50" height="74" rx="2" fill="none" stroke="#f6ad55" strokeWidth="2" />
        <text x="400" y="36" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">CHECK FOR CLOG ↓</text>

        {/* Mandrel pull direction */}
        <line x1="590" y1="85" x2="640" y2="85" stroke="#68d391" strokeWidth="2" />
        <polygon points="643,81 643,89 652,85" fill="#68d391" />
        <text x="658" y="82" fill="#68d391" fontSize="8" fontFamily="monospace">UP</text>
        <text x="655" y="92" fill="#68d391" fontSize="8" fontFamily="monospace">OUT</text>

        <text x="350" y="22" textAnchor="middle" fill="#68d391" fontSize="9" fontFamily="monospace">BEARING STACK — REMOVE IN THIS SEQUENCE →</text>
      </svg>
    ),
  },
  {
    id: 9,
    title: "Step 8 — Inspect & Clean All Components",
    subtitle: "Assessment before rebuild decision",
    color: "#00d4ff",
    description: "Clean all parts with diesel or parts-washing solvent. Lay components on a clean bench mat. Inspect each item systematically. Measure rotor OD and stator ID at multiple points to assess fit condition. Roll the driveshaft on a flat surface to check for straightness.",
    warnings: ["Rotor-stator fit tolerance is critical — measure, don't guess", "Stall damage to stator elastomer is often invisible until the motor runs again — be thorough", "Replace ALL O-rings and elastomeric seals regardless of visual condition"],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        {/* Clean bench */}
        <rect x="30" y="120" width="640" height="10" rx="2" fill="#4a5568" />

        {/* Components laid out on bench */}
        {[
          { x: 50, y: 80, w: 80, h: 35, label: "ROTOR", color: "#2b6cb0", check: "Measure OD\nCheck helix" },
          { x: 150, y: 70, w: 100, h: 45, label: "STATOR", color: "#0c3354", check: "Inspect rubber\nlining" },
          { x: 270, y: 80, w: 70, h: 35, label: "CV JOINT", color: "#744210", check: "Wear faces\nCheck cracks" },
          { x: 360, y: 75, w: 90, h: 40, label: "BEARING\nSTACK", color: "#276749", check: "Spalling?\nPitting?" },
          { x: 465, y: 82, w: 40, h: 30, label: "FLOW\nORIFICE", color: "#744210", check: "Clear\nclog?" },
          { x: 520, y: 78, w: 120, h: 38, label: "DRIVE SHAFT", color: "#4a5568", check: "Roll test for\nstraightness" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3} fill={c.color} stroke="#a0aec0" strokeWidth="1" />
            {c.label.split("\n").map((l, j) => (
              <text key={j} x={c.x + c.w / 2} y={c.y + 14 + j * 11} textAnchor="middle" fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold">{l}</text>
            ))}
            {/* Check label below */}
            {c.check.split("\n").map((l, j) => (
              <text key={j} x={c.x + c.w / 2} y={c.y + c.h + 12 + j * 9} textAnchor="middle" fill="#f6ad55" fontSize="6.5" fontFamily="monospace">{l}</text>
            ))}
          </g>
        ))}

        {/* Replace O-rings label */}
        <text x="350" y="18" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">CLEAN ALL COMPONENTS — INSPECT SYSTEMATICALLY</text>
        <text x="350" y="32" textAnchor="middle" fill="#fc8181" fontSize="8.5" fontFamily="monospace">⚠ REPLACE ALL O-RINGS AND SEALS REGARDLESS OF APPEARANCE</text>
      </svg>
    ),
  },
  {
    id: 10,
    title: "Common Clog Locations",
    subtitle: "Primary failure points on stalled 172mm motor",
    color: "#fc8181",
    description: "These four locations account for the majority of clog-induced stalls on 172mm PDM motors. Inspect each one with a flashlight before deciding on rebuild vs. send-to-shop.",
    warnings: ["Low gravity solids (LGS) >5% in mud is the #1 cause of bearing starvation", "If stator is chunked — motor must go to shop, cannot be field repaired", "Bit box packoff can mask a motor fault — always check both"],
    diagram: () => (
      <svg viewBox="0 0 700 180" className="w-full">
        {[
          {
            x: 60, y: 20, w: 130, h: 65,
            title: "① DUMP SUB PORTS",
            detail: "Solid particles backfill\nports when pumps are off.\nFlush and probe each port.",
            color: "#742a2a"
          },
          {
            x: 220, y: 20, w: 130, h: 65,
            title: "② ROTOR/STATOR",
            detail: "High LGS mud packs\nthe lobe cavities.\nCauses hydraulic lock.",
            color: "#1a365d"
          },
          {
            x: 380, y: 20, w: 130, h: 65,
            title: "③ BEARING BYPASS",
            detail: "Fine sand blocks\nlubrication orifice.\nBearings run dry → seize.",
            color: "#744210"
          },
          {
            x: 540, y: 20, w: 130, h: 65,
            title: "④ BIT BOX",
            detail: "Formation cuttings\npack around the bit\ncausing mechanical lock.",
            color: "#276749"
          },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={4} fill={c.color} stroke="#fc8181" strokeWidth="1.5" />
            <text x={c.x + c.w / 2} y={c.y + 15} textAnchor="middle" fill="#fc8181" fontSize="8" fontFamily="monospace" fontWeight="bold">{c.title}</text>
            {c.detail.split("\n").map((l, j) => (
              <text key={j} x={c.x + c.w / 2} y={c.y + 30 + j * 12} textAnchor="middle" fill="#fed7d7" fontSize="7.5" fontFamily="monospace">{l}</text>
            ))}
          </g>
        ))}

        {/* Motor outline below */}
        <rect x="50" y="110" width="140" height="40" rx="2" fill="#4a5568" opacity={0.4} />
        <rect x="195" y="110" width="180" height="40" rx="2" fill="#0c3354" opacity={0.5} />
        <rect x="380" y="110" width="180" height="40" rx="2" fill="#276749" opacity={0.4} />
        <rect x="565" y="110" width="80" height="40" rx="2" fill="#4a5568" opacity={0.4} />

        <text x="120" y="133" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">DUMP SUB</text>
        <text x="285" y="133" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">POWER SECTION</text>
        <text x="470" y="133" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">BEARING SECTION</text>
        <text x="605" y="133" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">BIT BOX</text>

        {/* Connector lines */}
        {[[125,100],[285,100],[445,100],[605,100]].map((p, i) => (
          <line key={i} x1={p[0]} y1={85} x2={p[0]} y2={108} stroke="#fc8181" strokeWidth="1" strokeDasharray="3,2" />
        ))}

        <text x="350" y="168" textAnchor="middle" fill="#fc8181" fontSize="9" fontFamily="monospace">INSPECT ALL FOUR LOCATIONS BEFORE REBUILD DECISION</text>
      </svg>
    ),
  },
];

export default function MudMotorDiagram() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div style={{
      background: "#0d1117",
      minHeight: "100vh",
      fontFamily: "monospace",
      color: "#e2e8f0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "#161b22",
        borderBottom: "1px solid #30363d",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <div style={{
          width: "10px", height: "10px",
          borderRadius: "50%",
          background: "#00d4ff",
          boxShadow: "0 0 10px #00d4ff",
        }} />
        <div>
          <div style={{ fontSize: "13px", color: "#00d4ff", letterSpacing: "3px", fontWeight: "bold" }}>
            PDM DISASSEMBLY GUIDE
          </div>
          <div style={{ fontSize: "10px", color: "#6e7681", letterSpacing: "2px" }}>
            172mm DOWNHOLE MUD MOTOR — CLOG RECOVERY PROCEDURE
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: "10px", color: "#6e7681" }}>
          STEP {active + 1} / {steps.length}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 57px)" }}>
        {/* Sidebar */}
        <div style={{
          width: "220px",
          minWidth: "220px",
          background: "#0d1117",
          borderRight: "1px solid #21262d",
          overflowY: "auto",
          padding: "8px 0",
        }}>
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: active === i ? "#161b22" : "transparent",
                border: "none",
                borderLeft: active === i ? `3px solid ${s.color}` : "3px solid transparent",
                padding: "10px 14px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{
                fontSize: "9px",
                color: active === i ? s.color : "#6e7681",
                letterSpacing: "2px",
                marginBottom: "2px",
              }}>
                {i === 0 ? "OVERVIEW" : `STEP ${i}`}
              </div>
              <div style={{
                fontSize: "11px",
                color: active === i ? "#e2e8f0" : "#8b949e",
                lineHeight: "1.3",
              }}>
                {s.title.replace(/Step \d+ — /, "")}
              </div>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* Step header */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              fontSize: "10px",
              color: step.color,
              letterSpacing: "3px",
              marginBottom: "4px",
            }}>
              {active === 0 ? "OVERVIEW" : `STEP ${active}`}
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#e2e8f0", marginBottom: "4px" }}>
              {step.title}
            </div>
            <div style={{ fontSize: "11px", color: "#6e7681", letterSpacing: "1px" }}>
              {step.subtitle}
            </div>
          </div>

          {/* Diagram box */}
          <div style={{
            background: "#0d1117",
            border: `1px solid ${step.color}33`,
            borderRadius: "6px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: `0 0 30px ${step.color}11`,
          }}>
            <step.diagram />
          </div>

          {/* Description */}
          <div style={{
            background: "#161b22",
            border: "1px solid #21262d",
            borderRadius: "6px",
            padding: "16px",
            marginBottom: "16px",
            fontSize: "12px",
            lineHeight: "1.7",
            color: "#c9d1d9",
          }}>
            {step.description}
          </div>

          {/* Warnings */}
          <div style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "6px",
            padding: "16px",
          }}>
            <div style={{
              fontSize: "9px",
              color: "#fc8181",
              letterSpacing: "2px",
              marginBottom: "12px",
              fontWeight: "bold",
            }}>
              ⚠ CRITICAL NOTES
            </div>
            {step.warnings.map((w, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "10px",
                marginBottom: "8px",
                fontSize: "11px",
                color: "#8b949e",
                lineHeight: "1.5",
              }}>
                <span style={{ color: "#fc8181", minWidth: "12px" }}>›</span>
                <span>{w}</span>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            gap: "12px",
          }}>
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              style={{
                padding: "10px 20px",
                background: active === 0 ? "#21262d" : "#161b22",
                border: `1px solid ${active === 0 ? "#30363d" : step.color}`,
                borderRadius: "4px",
                color: active === 0 ? "#6e7681" : step.color,
                cursor: active === 0 ? "not-allowed" : "pointer",
                fontSize: "11px",
                letterSpacing: "1px",
              }}
            >
              ← PREV
            </button>

            {/* Progress dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {steps.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === active ? step.color : "#21262d",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
              disabled={active === steps.length - 1}
              style={{
                padding: "10px 20px",
                background: active === steps.length - 1 ? "#21262d" : "#161b22",
                border: `1px solid ${active === steps.length - 1 ? "#30363d" : step.color}`,
                borderRadius: "4px",
                color: active === steps.length - 1 ? "#6e7681" : step.color,
                cursor: active === steps.length - 1 ? "not-allowed" : "pointer",
                fontSize: "11px",
                letterSpacing: "1px",
              }}
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}