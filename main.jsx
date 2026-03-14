import { useRef, useState, useEffect } from "react";

import slide12 from "./images/1-2.png";
import slide3 from "./images/3.png";
import slide45 from "./images/4-5.png";
import slide6 from "./images/6.png";

const tutorialSlides = [
  { title: "Exploded View + Top Sub", subtitle: "Overall components and first break point", src: slide12 },
  { title: "Power Section Clog Zone", subtitle: "Inspect rotor/stator path and lock points", src: slide3 },
  { title: "Flex Joint + Bearings", subtitle: "Transmission wear faces and bearing stack", src: slide45 },
  { title: "Reassembly + Torque", subtitle: "Final sequence and torque checkpoints", src: slide6 },
];

// ─── 9 Steps Data ───
const steps = [
  // ──────────────────── OVERVIEW ────────────────────
  {
    id: 0,
    title: "Motor Overview",
    subtitle: "172mm Downhole PDM — Full Assembly Identification",
    color: "#00d4ff",
    timeEstimate: "15 min",
    difficulty: "Familiarization",
    tools: [],
    description: `The 172mm (6-3/4") positive displacement mud motor (PDM) converts hydraulic energy from drilling mud into mechanical rotation at the bit. It consists of 6 main sections assembled end-to-end, each with specific threaded connections and torque requirements.

Before touching anything, identify the motor make and model from the nameplate stamped on the bent housing or top sub. This determines thread directions, torque specs, and bend angle settings. Common manufacturers include NOV (formerly ReedHycalog), Halliburton (Sperry), Baker Hughes (Navi-Drill), and Schlumberger.

A 172mm motor is typically 7-9 meters long and weighs 300-450 kg fully assembled. The power section alone accounts for 40-60% of the total length. Always use overhead crane or forklift for handling — never rely on manual lifting.`,
    substeps: [
      { text: "Locate the motor nameplate — stamped on bent housing or top sub. Record make, model, serial number, lobe configuration (e.g., 5:6, 7:8), and bend angle setting.", note: "Photograph the nameplate — you'll need these specs for ordering replacement parts." },
      { text: "Identify all 6 sections from top to bottom: Top Sub, Power Section (Stator + Rotor), Bent Housing (Adjustable), Transmission (CV Joint), Bearing Section, Bit Box.", note: "Each section has specific thread direction and torque — consult OEM manual." },
      { text: "Measure and record the overall motor length, and note any visible external damage, dents, or bent sections.", note: "A bent stator housing means the motor must go to a shop — field repair is not possible." },
      { text: "Check if the motor is a sealed-bearing or mud-lubricated design — this affects disassembly procedure at Step 8.", note: "Sealed bearing motors have a grease reservoir and pressure compensator — handle differently." },
      { text: "Prepare your workspace: flat pipe rack or V-blocks, minimum 10m clear length, forklift or crane access, good lighting.", note: "Work on concrete or steel — never on dirt (contamination risk to bearings)." },
    ],
    warnings: [
      "Bleed ALL pressure before touching any connection — residual pressure can cause sudden rotation",
      "Flush with clean water first — 172mm motors retain 20-40 liters of drilling mud",
      "Mark all connections with paint pen for orientation BEFORE breaking any connection",
      "If retrieved from a sour well (H2S), follow gas testing protocol before handling",
      "Check for radioactive scale (NORM) if motor was used in certain formations — use a survey meter",
    ],
    specs: {
      "Motor OD": "172mm (6-3/4\")",
      "Typical Length": "7.0 - 9.5 meters",
      "Weight (assembled)": "300 - 450 kg",
      "Operating Flow": "1,100 - 2,200 LPM (290-580 GPM)",
      "Max RPM (no load)": "80 - 350 RPM (depends on lobe config)",
      "Max Torque": "8,000 - 22,000 N-m",
      "Differential Pressure": "4.0 - 8.5 MPa (580-1,230 psi)",
      "Max WOB": "80 - 180 kN (18,000 - 40,000 lbf)",
      "Common Lobe Configs": "5:6, 7:8, 9:10 (power:speed tradeoff)",
    },
    resources: [
      { label: "NOV PDM Technical Manual", url: "https://www.nov.com/products/positive-displacement-motors" },
      { label: "Halliburton Sperry Drill Motor Handbook", url: "https://www.halliburton.com/en/drill-bits-services/drilling-services/drilling-motors" },
      { label: "IADC Drilling Manual — Downhole Motors Chapter", url: "https://www.iadc.org/drilling-manual/" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <defs>
          <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="40%" stopColor="#718096" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>
        </defs>
        {[
          { x: 10, w: 60, label: "TOP SUB", color: "#4a5568", sub: "1" },
          { x: 75, w: 160, label: "POWER SECTION", color: "#0e7490", sub: "2" },
          { x: 240, w: 80, label: "BENT HOUSING", color: "#6b46c1", sub: "3" },
          { x: 325, w: 80, label: "TRANSMISSION", color: "#c05621", sub: "4" },
          { x: 410, w: 200, label: "BEARING SECTION", color: "#276749", sub: "5" },
          { x: 615, w: 75, label: "BIT BOX", color: "#4a5568", sub: "6" },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y={40} width={s.w} height={70} rx={i === 0 ? 8 : i === 5 ? 8 : 2} fill={s.color} opacity={0.85} />
            <rect x={s.x + 2} y={42} width={s.w - 4} height={10} rx={1} fill="rgba(255,255,255,0.07)" />
            <text x={s.x + s.w / 2} y={72} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">{s.sub}</text>
            <text x={s.x + s.w / 2} y={83} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="6.5" fontFamily="monospace">{s.label}</text>
            {i < 5 && <line x1={s.x + s.w} y1={75} x2={s.x + s.w + 3} y2={75} stroke="#f6ad55" strokeWidth="2" />}
          </g>
        ))}
        <line x1="10" y1="75" x2="690" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
        <text x="350" y="130" textAnchor="middle" fill="#f6ad55" fontSize="9" fontFamily="monospace">{"MUD FLOW DIRECTION (pump to bit) ->"}</text>
        <line x1="10" y1="22" x2="690" y2="22" stroke="#00d4ff" strokeWidth="0.5" />
        <text x="350" y="18" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">172mm OD — TOTAL ASSEMBLY (7-9.5 METERS)</text>
        <line x1="10" y1="18" x2="10" y2="28" stroke="#00d4ff" strokeWidth="1" />
        <line x1="690" y1="18" x2="690" y2="28" stroke="#00d4ff" strokeWidth="1" />
      </svg>
    ),
  },

  // ──────────────────── STEP 1 ────────────────────
  {
    id: 1,
    title: "Step 1 — Flush & Drain",
    subtitle: "Pre-disassembly decontamination and preparation",
    color: "#f6ad55",
    timeEstimate: "30-45 min",
    difficulty: "Easy",
    tools: [
      "High-pressure washer (2,000+ PSI)",
      "Pipe rack or V-blocks (rated for 500kg)",
      "Overhead crane or forklift with slings",
      "Drain pan / containment tray",
      "PPE: Face shield, chemical gloves, steel-toe boots, coveralls",
      "Paint pen / marking crayon (yellow or white)",
      "Tape measure",
      "Flashlight (for bore inspection)",
    ],
    description: `This step removes drilling mud, cuttings, and Lost Circulation Material (LCM) from the motor bore before you touch any threaded connections. Skipping this step is the #1 cause of thread galling and connection damage during disassembly.

Stand the motor vertically with the top sub up if possible (use a mousehole or vertical rack). This lets gravity drain the mud column. If vertical setup isn't available, lay the motor horizontally on V-blocks with a slight downward angle toward the bit box end, and flush from the top sub end.

For a clogged motor, the initial flush may produce very little flow — that's expected. The clog is blocking the bore. Flush from BOTH ends (top sub and bit box) to break up the plug from both sides. Use a high-pressure washer nozzle that fits inside the bore (approximately 65-70mm ID for a 172mm motor).

After flushing, let the motor drain for a minimum of 15 minutes. During this time, externally clean the entire motor body with the pressure washer, paying special attention to all threaded connection areas. Caked mud on threads is the primary cause of galling.`,
    substeps: [
      { text: "Rig up the motor vertically (top sub up) in a mousehole or vertical rack. If not possible, lay horizontally on V-blocks with 5-10 degree angle, bit box end lower.", note: "172mm motors are 7-9m long — ensure adequate overhead clearance for vertical setup." },
      { text: "Remove any bit or stabilizer still connected to the bit box. Use breakout tongs — do NOT hammer.", note: "The bit connection is typically 4-1/2\" or 6-5/8\" API Regular right-hand thread." },
      { text: "Insert high-pressure washer nozzle into the top sub bore. Flush at 2,000+ PSI for 5-10 minutes. Observe what comes out the bit box end.", note: "Brown/black sludge = normal drilling mud. White paste = barite settling. Colored chunks = LCM. Rubber chunks = stator damage (red flag)." },
      { text: "Reverse: flush from the bit box end upward for another 5 minutes. This attacks the clog from the other side.", note: "If zero flow passes through, the clog is severe — you'll need to clear it mechanically at Step 5." },
      { text: "Lay the motor horizontally. Pressure wash the entire exterior, concentrating on all threaded connection zones. Remove all caked mud.", note: "Use a wire brush on stubborn deposits around thread shoulders — but NEVER on thread faces." },
      { text: "Let the motor drain completely for 15-20 minutes. Use this time to paint-mark ALL connections with orientation marks (alignment lines across each joint).", note: "Paint marks are critical for reassembly — they show the exact rotational position of each connection." },
      { text: "While draining, inspect the exterior for: dents, cracks, bent housing, erosion marks, stripped threads visible from outside.", note: "Any external deformation of the stator housing means the motor MUST go to a shop." },
      { text: "Shine a flashlight into both ends. Note what you can see — is the bore clear, partially blocked, or completely packed?", note: "This preliminary bore inspection tells you how aggressive the disassembly will need to be." },
    ],
    warnings: [
      "NEVER skip flushing — caked mud on threads causes galling that destroys connections worth $5,000+",
      "Check for H2S (sour gas) if the motor was used in a sour well — use a 4-gas detector before approaching",
      "Wear full PPE: face shield, chemical-resistant gloves, steel-toe boots — high-pressure water ricochets",
      "Drilling mud may contain heavy metals (barium, lead) — contain and dispose of flush water properly",
      "If rubber chunks are found in the flush water, the stator is damaged — expect a shop repair, not field fix",
    ],
    specs: {
      "Motor Bore ID": "~65-70mm (varies by make)",
      "Mud Volume in Motor": "20-40 liters typical",
      "Flush Pressure": "2,000+ PSI recommended",
      "Flush Duration": "5-10 min per end, minimum",
      "Drain Time": "15-20 minutes minimum",
      "Water Volume Needed": "200-400 liters",
    },
    resources: [
      { label: "API RP 7G — Drill Stem Design (thread care)", url: "https://www.api.org/products-and-services/standards" },
      { label: "Well Control Institute — H2S Safety", url: "https://www.wellcontrolinstitute.com/" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="280" y="10" width="140" height="130" rx="4" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <rect x="300" y="15" width="100" height="120" rx="2" fill="#1a202c" />
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <circle cx={310 + i * 20} cy={155} r="3" fill="#92400e" opacity={0.7 - i * 0.1} />
            <line x1={310 + i * 20} y1={135 + i * 4} x2={310 + i * 20} y2={148} stroke="#92400e" strokeWidth="1.5" strokeDasharray="2,2" />
          </g>
        ))}
        {[0,1,2].map(i => (
          <g key={i}>
            <line x1={305 + i * 40} y1="0" x2={305 + i * 40} y2="12" stroke="#00d4ff" strokeWidth="2" />
            <polygon points={`${305 + i * 40 - 4},8 ${305 + i * 40 + 4},8 ${305 + i * 40},14`} fill="#00d4ff" />
          </g>
        ))}
        <text x="230" y="20" textAnchor="end" fill="#00d4ff" fontSize="9" fontFamily="monospace">WATER FLUSH 2000+ PSI</text>
        <line x1="235" y1="18" x2="278" y2="10" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="3,2" />
        <text x="230" y="150" textAnchor="end" fill="#92400e" fontSize="9" fontFamily="monospace">MUD DRAIN</text>
        <line x1="235" y1="150" x2="278" y2="150" stroke="#92400e" strokeWidth="0.5" strokeDasharray="3,2" />
        <text x="500" y="80" fill="#68d391" fontSize="9" fontFamily="monospace">STAND VERTICAL</text>
        <text x="500" y="92" fill="#68d391" fontSize="9" fontFamily="monospace">TOP SUB UP</text>
        <line x1="497" y1="75" x2="425" y2="60" stroke="#68d391" strokeWidth="0.5" strokeDasharray="3,2" />
        <text x="350" y="155" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">DRAIN 15-20 MIN MINIMUM</text>
        <text x="500" y="115" fill="#f6ad55" fontSize="8" fontFamily="monospace">PAINT MARK ALL</text>
        <text x="500" y="127" fill="#f6ad55" fontSize="8" fontFamily="monospace">CONNECTIONS</text>
      </svg>
    ),
  },

  // ──────────────────── STEP 2 ────────────────────
  {
    id: 2,
    title: "Step 2 — Remove Top Sub & Dump Valve",
    subtitle: "Breaking the topmost connection and dump valve inspection",
    color: "#68d391",
    timeEstimate: "20-30 min",
    difficulty: "Medium",
    tools: [
      "36\" pipe wrench (x2)",
      "Chain tongs (rated for 172mm OD)",
      "Breakout tongs (hydraulic preferred)",
      "Spanner wrench (for dump valve retainer)",
      "Brass drift / soft hammer",
      "Thread protectors",
      "Thread compound (API modified)",
      "Container for dump valve components",
    ],
    description: `The top sub is the uppermost connection that threads into the drill string. On most 172mm motors, the top sub uses a LEFT-HAND thread (so it doesn't back off during right-hand drilling rotation). This means you break it out by turning CLOCKWISE — the opposite of what you'd expect.

CRITICAL: Verify the thread direction from the OEM manual or by examining the thread helix before applying torque. Applying breakout force in the wrong direction can strip or crack the connection. Most NOV, Halliburton, and Baker Hughes motors use LH threads on the top sub. Some Chinese-manufactured motors use RH threads — always verify.

The dump valve (also called the dump sub or bypass valve) sits just below the top sub. Its purpose is to allow mud to drain from the drill string when the pumps are turned off, preventing wet trips. It consists of a spring-loaded poppet valve inside a ported housing. When the pumps are on, mud pressure overcomes the spring and closes the valve; when pumps are off, the spring opens it.

The dump valve ports are a common clog location because solids settle into the ports when the pumps cycle off. Inspect each port individually with a flashlight and probe.`,
    substeps: [
      { text: "Secure the motor body in chain tongs or a pipe vise, gripping on the power section housing (the longest section). Ensure it cannot rotate.", note: "Apply chain tongs at least 300mm from any threaded connection to avoid damaging thread runout areas." },
      { text: "VERIFY THREAD DIRECTION from the OEM manual. Most 172mm motors: Top Sub = Left-Hand thread. If LH, break out by turning the top sub CLOCKWISE.", note: "WRONG DIRECTION = DESTROYED CONNECTION. This is a $3,000-5,000 mistake. When in doubt, try gentle clockwise first — if it tightens, it's RH thread." },
      { text: "Apply the 36\" pipe wrench to the top sub body. Position the wrench for clockwise rotation (for LH thread breakout). Apply steady, increasing force — do NOT impact.", note: "If the connection won't break: apply penetrating oil at the thread shoulder, wait 15 min, retry. Never hammer the wrench handle." },
      { text: "Once broken loose, unscrew the top sub by hand (it should spin freely after the initial break). Catch the O-ring or seal ring at the shoulder.", note: "Inspect the seal ring — if damaged, it indicates the connection was over-torqued or the seal surface is damaged." },
      { text: "Install thread protectors on the exposed pin and box immediately. Lay the top sub aside on a clean surface.", note: "Exposed threads get damaged in seconds from contact with chain tongs, pipe racks, or dropped tools." },
      { text: "The dump valve housing is now exposed. Use a spanner wrench on the retaining ring or hex flats to unscrew the dump valve assembly.", note: "Some dump valves are pressed in, not threaded — check the OEM manual. Pressed-in types need a bearing puller." },
      { text: "Remove the dump valve assembly. Disassemble it: remove the spring, poppet valve, valve seat, and any O-rings. Lay all parts in order.", note: "Photograph the assembly before and after disassembly — the spring orientation matters on reassembly." },
      { text: "Inspect each dump valve port with a flashlight. Probe with a wooden dowel or brass rod to check for packing. Flush each port individually.", note: "Packed ports = motor was run with high-solids mud or LCM pumped through it. Clean ALL ports — even one blocked port affects dump performance." },
      { text: "Inspect the poppet valve seat for erosion (washout grooves). Check the spring for fatigue (measure free length vs. spec). Check O-rings for cuts or extrusion.", note: "A washed-out valve seat means the dump valve won't seal properly — the motor will lose differential pressure. Replace the valve." },
    ],
    warnings: [
      "VERIFY THREAD DIRECTION BEFORE BREAKOUT — most 172mm top subs are LEFT-HAND thread (clockwise to break)",
      "Never use a hammer or impact wrench on connection faces — this causes micro-cracks in the thread root",
      "Install thread protectors IMMEDIATELY after removing the top sub — exposed threads get damaged in seconds",
      "The dump valve spring is under compression — control the retaining ring during removal to prevent spring ejection",
      "If the dump valve poppet is stuck: soak in diesel for 30 min, then tap gently with a brass drift — never use steel",
    ],
    specs: {
      "Top Sub Thread": "4-1/2\" IF or NC50 (typically LEFT-HAND)",
      "Breakout Torque": "8,000 - 15,000 ft-lbs",
      "Dump Valve Spring": "15-25 lbf free length (check OEM spec)",
      "Dump Valve Ports": "Typically 3-6 ports, 8-12mm diameter",
      "Seal Ring": "Metal-to-metal or elastomeric (check OEM)",
    },
    resources: [
      { label: "API Spec 7-1 — Rotary Drill Stem Elements", url: "https://www.api.org/products-and-services/standards" },
      { label: "Thread Identification Guide (DP/DC connections)", url: "https://www.worldoiltools.com/thread-identification" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="200" y="60" width="400" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <rect x="100" y="55" width="100" height="70" rx="6" fill="#4a5568" stroke="#68d391" strokeWidth="2" />
        <text x="150" y="86" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">TOP</text>
        <text x="150" y="97" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">SUB</text>
        <line x1="200" y1="50" x2="200" y2="130" stroke="#68d391" strokeWidth="2" strokeDasharray="5,3" />
        <text x="200" y="45" textAnchor="middle" fill="#68d391" fontSize="8" fontFamily="monospace">BREAK HERE</text>
        <line x1="160" y1="30" x2="100" y2="30" stroke="#f6ad55" strokeWidth="2" />
        <polygon points="96,27 96,33 88,30" fill="#f6ad55" />
        <text x="170" y="28" fill="#f6ad55" fontSize="9" fontFamily="monospace">LH THREAD: CLOCKWISE</text>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1="197" y1={60 + i * 12} x2="203" y2={66 + i * 12} stroke="#a0aec0" strokeWidth="1" />
        ))}
        <rect x="320" y="68" width="60" height="44" rx="1" fill="#1a202c" stroke="#e2e8f0" strokeWidth="0.5" />
        <circle cx="350" cy="82" r="8" fill="#2d3748" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="350" cy="82" r="3" fill="#92400e" />
        {[0,1,2,3].map(i => (
          <circle key={i} cx={325 + i * 10} cy={100} r="3" fill="#e2e8f0" opacity="0.4" />
        ))}
        <text x="350" y="122" textAnchor="middle" fill="#a0aec0" fontSize="7.5" fontFamily="monospace">DUMP VALVE — INSPECT ALL PORTS</text>
        <text x="500" y="75" fill="#a0aec0" fontSize="9" fontFamily="monospace">CHAIN TONGS</text>
        <text x="500" y="87" fill="#a0aec0" fontSize="9" fontFamily="monospace">ON BODY</text>
        <rect x="600" y="55" width="30" height="70" rx="2" fill="none" stroke="#a0aec0" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="615" y="98" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">GRIP</text>
      </svg>
    ),
  },

  // ──────────────────── STEP 3 ────────────────────
  {
    id: 3,
    title: "Step 3 — Remove Power Section",
    subtitle: "Separating the stator housing from the bent housing",
    color: "#00d4ff",
    timeEstimate: "30-45 min",
    difficulty: "Medium-Hard",
    tools: [
      "Breakout tongs (hydraulic, rated for 15,000+ ft-lbs)",
      "Chain tongs (backup)",
      "36\" pipe wrench (x2)",
      "Overhead crane with 500kg sling",
      "Pipe stands / roller supports",
      "Penetrating oil (PB Blaster or equivalent)",
      "Thread protectors",
    ],
    description: `The power section is the heart of the mud motor — it's where hydraulic energy from the mud converts into mechanical rotation. It consists of the stator (the outer housing lined with a precisely molded rubber helix) and the rotor (a chrome-plated steel helix that fits inside the stator with an interference fit).

The power section connects to the bent housing below it via a threaded connection (typically RIGHT-HAND thread). This connection carries the full operating torque of the motor, so it's assembled with high torque values (8,000-12,000 ft-lbs for 172mm). Breaking this connection requires hydraulic breakout tongs or heavy chain tongs.

IMPORTANT: The power section on a 172mm motor weighs 80-150 kg and is 3-5 meters long. Once the connection breaks, the power section will be free to slide — have a crane sling ready BEFORE you break the connection. Never let an unsupported power section fall — it will damage the stator rubber and potentially injure personnel.

The rotor remains inside the stator at this point — you're removing the entire power section assembly as a unit. The rotor's lower end is connected to the transmission/flex shaft below via a threaded or splined connection that separates when you pull the power section off.`,
    substeps: [
      { text: "Rig up the overhead crane with a nylon sling around the power section housing, centered on its length. Take up the slack so the sling is supporting about 30% of the weight.", note: "A 172mm power section is 80-150 kg and 3-5 meters — it WILL fall if unsupported when the connection breaks." },
      { text: "Secure the bent housing / bearing section in breakout tongs or chain vise. The power section must be free to rotate.", note: "Grip on the bent housing body — never on the adjustable ring or threads." },
      { text: "Apply penetrating oil to the power section / bent housing thread shoulder. Let it soak for 10-15 minutes while you prepare the tongs.", note: "Even a well-maintained connection benefits from penetrating oil — these connections see extreme vibration and heat cycling downhole." },
      { text: "Apply breakout tongs to the power section housing. This is typically RIGHT-HAND thread, so break out COUNTER-CLOCKWISE (standard).", note: "Verify thread direction from OEM manual — this connection is almost always RH, but some specialty motors differ." },
      { text: "Apply steady, increasing hydraulic pressure. The connection should break at 8,000-15,000 ft-lbs. If it doesn't break at rated capacity, STOP — apply more penetrating oil, heat if permitted, and retry.", note: "NEVER exceed the rated capacity of your breakout tongs — they can fail catastrophically." },
      { text: "Once the connection breaks, spin the power section off by hand while the crane takes the weight. Guide it clear of the lower assembly.", note: "The rotor shaft will pull out of the transmission connection as the power section slides off — support it." },
      { text: "Lay the power section assembly on padded V-blocks or pipe stands. Install thread protectors on both ends immediately.", note: "The stator rubber is soft — never lay a power section directly on a steel pipe rack without padding." },
      { text: "Inspect the thread shoulders on both the power section end and the bent housing end. Look for galling, cross-threading, washout, or erosion.", note: "Thread damage here is common — erosion grooves on the shoulder face indicate a mud leak path during operation." },
    ],
    warnings: [
      "CRANE OR SLING REQUIRED — 172mm power section weighs 80-150 kg, 3-5 meters long",
      "Never let the power section free-fall when the connection breaks — serious injury risk",
      "If the connection won't break at rated tong capacity, do NOT increase — apply penetrating oil and heat",
      "The rotor shaft will separate from the transmission as the power section slides off — be ready to support it",
      "Lay the power section on PADDED supports only — bare steel racks damage the stator rubber",
    ],
    specs: {
      "Power Section Length": "3.0 - 5.0 meters (depending on lobe config)",
      "Power Section Weight": "80 - 150 kg",
      "Thread Connection": "Typically proprietary pin/box, RIGHT-HAND",
      "Breakout Torque": "8,000 - 15,000 ft-lbs",
      "Stator Rubber Thickness": "8 - 15mm (varies with lobe profile)",
      "Rotor OD": "85 - 110mm (varies with lobe config)",
    },
    resources: [
      { label: "NOV Agitator Systems — Power Section Details", url: "https://www.nov.com/products/positive-displacement-motors" },
      { label: "Smith Bits Motor Cross-Reference", url: "https://www.slb.com/drilling/bottomhole-assemblies/drilling-motors" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="80" y="45" width="250" height="80" rx="3" fill="#0e4c6e" stroke="#00d4ff" strokeWidth="2" />
        <rect x="88" y="53" width="234" height="64" rx="2" fill="#0c3354" />
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <ellipse key={i} cx={100 + i * 24} cy={85} rx={10} ry={22} fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity={0.6} />
        ))}
        <text x="205" y="30" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" fontWeight="bold">POWER SECTION (80-150 KG)</text>
        <text x="130" y="150" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">STATOR (OUTER — RUBBER LINED)</text>
        <text x="330" y="150" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">ROTOR (INNER — HELICAL STEEL)</text>
        <line x1="330" y1="35" x2="330" y2="135" stroke="#f6ad55" strokeWidth="2" strokeDasharray="5,3" />
        <text x="330" y="28" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">BREAK HERE (RH THREAD)</text>
        <rect x="330" y="55" width="300" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <text x="480" y="88" textAnchor="middle" fill="#a0aec0" fontSize="9" fontFamily="monospace">BENT HOUSING + BEARING</text>
        <line x1="205" y1="45" x2="205" y2="10" stroke="#68d391" strokeWidth="2" />
        <polygon points="200,8 210,8 205,0" fill="#68d391" />
        <text x="225" y="16" fill="#68d391" fontSize="9" fontFamily="monospace">CRANE SLING</text>
      </svg>
    ),
  },

  // ──────────────────── STEP 4 ────────────────────
  {
    id: 4,
    title: "Step 4 — Extract Rotor from Stator",
    subtitle: "The critical clog-clearing step — rotor extraction and stator inspection",
    color: "#fc8181",
    timeEstimate: "30-60 min (longer if seized)",
    difficulty: "Hard",
    tools: [
      "Padded bench vise or stator holding fixture",
      "Penetrating oil (PB Blaster, WD-40, or diesel)",
      "Wooden dowels / rubber mallets (NO metal tools on stator)",
      "High-pressure washer",
      "Flashlight / bore scope",
      "Micrometer (0-150mm range)",
      "Stator bore gauge",
      "Clean rags / cotton waste",
      "Gloves (rubber lining is abrasive when dry)",
    ],
    description: `This is the most critical step for a clogged motor. The rotor is a precision chrome-plated helical steel shaft that sits inside the stator with a controlled interference fit. When the motor stalls due to clogging, drilling solids, LCM, or barite pack tightly into the helical cavities between the rotor and stator, creating a hydraulic lock that prevents rotation.

The rotor must be extracted by simultaneously rotating it in the normal drilling direction (usually right-hand/clockwise when viewed from the top) while pulling axially. Because of its helical geometry, the rotor spirals out like a corkscrew — you cannot simply pull it straight out. The rotation-to-advance ratio depends on the lobe configuration (pitch of the helix).

IF THE ROTOR IS SEIZED (won't rotate or pull): Do NOT use hammers, impact tools, or excessive force. Instead:
1. Stand the power section vertically, stator up
2. Fill the bore from the top with penetrating oil (diesel works well)
3. Let it soak for 20-30 minutes (longer for severe clogs — up to 2 hours)
4. Try again with gentle rotational force
5. If still seized after 2 hours of soaking: the motor must go to a shop with a hydraulic rotor extractor

After extraction, inspect BOTH the rotor and stator thoroughly. This inspection determines whether the motor can be rebuilt in the field or must go to a shop.`,
    substeps: [
      { text: "Secure the stator in a padded bench vise or stator holding fixture. The pads must be soft (wood, rubber, or nylon) — steel vise jaws will crush the stator housing and damage the rubber lining.", note: "If no padded vise is available, wrap the stator in thick rubber mat or conveyor belt material before clamping." },
      { text: "Stand at the end where the rotor shaft protrudes. Grip the rotor shaft with a pipe wrench (wrap the chrome with a rag first to prevent scoring).", note: "Chrome damage on the rotor = motor failure. Always protect the rotor surface from tool contact." },
      { text: "Apply steady clockwise rotation (viewed from top/driving end) while pulling axially. The rotor should begin to spiral out. One full rotation advances the rotor by one pitch length.", note: "172mm motors: pitch is typically 200-400mm. So each full rotation moves the rotor 200-400mm outward." },
      { text: "IF SEIZED: Stop. Fill the bore with penetrating oil from the top end. Let soak for 20-30 minutes minimum. Try again with gentle rocking motion (quarter-turn clockwise, eighth-turn back, repeat).", note: "Diesel fuel works as penetrating oil in the field. For severe cases, a 50/50 mix of diesel and acetone penetrates faster." },
      { text: "As the rotor comes out, observe what's packed in the cavities. Collect samples of the clog material for analysis — this helps determine what caused the stall.", note: "LCM (nut plug, mica, fibrous material) = pumped through motor. Barite (white powder) = mud weight settling. Sand/cuttings (gray/brown grit) = poor solids control." },
      { text: "Once the rotor is fully extracted, flush the stator bore with high-pressure water. Flush until the water runs completely clear.", note: "Use a rotating nozzle if available — it cleans the helical cavities much more effectively than a straight nozzle." },
      { text: "Use wooden dowels or rubber rods to probe each stator lobe cavity. Push along the helix — feel for remaining packed material that the water didn't remove.", note: "NEVER use metal tools inside the stator — even a screwdriver will cut the rubber. Wood or rubber only." },
      { text: "INSPECT THE STATOR: Shine a flashlight into the bore and look for: torn rubber, missing chunks, swollen sections, delamination from the steel housing, and excessive wear (widened cavities).", note: "If you can see bare steel through the rubber anywhere = stator is scrap. If rubber chunks are missing = stator is scrap. Minor surface wear is acceptable." },
      { text: "INSPECT THE ROTOR: Check the chrome plating for scoring, pitting, peeling, corrosion, or flat spots. Roll the rotor on a flat surface to check for straightness (bend).", note: "Any chrome damage that you can feel with a fingernail = rotor needs re-chroming (shop work). A bent rotor is scrap." },
      { text: "MEASURE FIT: Insert the clean rotor back into the clean stator. Rotate by hand — you should feel a definite interference fit (resistance) but it should still turn. If it spins freely = too worn. If it won't turn = swollen rubber.", note: "The fit test is the most important check. A motor with correct fit produces proper differential pressure. Loose fit = low torque output." },
    ],
    warnings: [
      "NEVER use hammers, impact tools, or pry bars on the rotor — chrome damage means a $5,000-10,000 replacement",
      "NEVER use metal tools inside the stator bore — use ONLY wood, rubber, or plastic implements",
      "If the rotor is seized and penetrating oil doesn't free it in 2 hours, SEND TO SHOP — do not force",
      "Stator elastomer assessment is critical — stall damage is often internal and invisible from outside",
      "Chrome scoring that you can feel with a fingernail = rotor needs professional re-chroming",
      "A rotor that rolls with visible wobble on a flat surface is BENT — it cannot be field repaired",
    ],
    specs: {
      "Rotor Material": "Chrome-plated alloy steel",
      "Chrome Thickness": "0.15 - 0.30mm",
      "Stator Rubber": "NBR (Nitrile) or HNBR (Hydrogenated Nitrile)",
      "Interference Fit": "0.2 - 0.8mm diametral (varies by design)",
      "Max Rotor Runout": "0.25mm (0.010\") over full length",
      "Helix Pitch (typical)": "200 - 400mm per lobe revolution",
      "Stator Rubber Max Temp": "150°C (NBR) / 175°C (HNBR)",
    },
    resources: [
      { label: "SPE Paper 178834 — PDM Stator Elastomer Selection", url: "https://www.onepetro.org/search?q=PDM+stator+elastomer" },
      { label: "NOV PowerPak Motor Maintenance Manual", url: "https://www.nov.com/products/positive-displacement-motors" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="20" y="50" width="200" height="70" rx="3" fill="#0c3354" stroke="#4a5568" strokeWidth="2" />
        <rect x="10" y="48" width="15" height="74" rx="2" fill="#4a5568" />
        <rect x="215" y="48" width="15" height="74" rx="2" fill="#4a5568" />
        <text x="120" y="148" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">STATOR — SECURE IN PADDED VISE</text>
        <g>
          <rect x="220" y="62" width="280" height="46" rx="4" fill="#2b6cb0" stroke="#00d4ff" strokeWidth="1.5" />
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <line key={i} x1={228 + i * 28} y1={62} x2={242 + i * 28} y2={108} stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" />
          ))}
          <text x="360" y="82" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">ROTOR</text>
          <text x="360" y="95" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">(CHROME-PLATED HELIX)</text>
        </g>
        <line x1="510" y1="85" x2="560" y2="85" stroke="#fc8181" strokeWidth="3" />
        <polygon points="563,81 563,89 572,85" fill="#fc8181" />
        <text x="590" y="78" fill="#fc8181" fontSize="9" fontFamily="monospace">PULL</text>
        <text x="590" y="90" fill="#fc8181" fontSize="9" fontFamily="monospace">AXIALLY</text>
        <path d="M 480 55 A 30 30 0 0 1 510 75" fill="none" stroke="#f6ad55" strokeWidth="2" />
        <text x="490" y="45" fill="#f6ad55" fontSize="9" fontFamily="monospace">ROTATE</text>
        <text x="490" y="55" fill="#f6ad55" fontSize="8" fontFamily="monospace">CLOCKWISE</text>
        <text x="350" y="20" textAnchor="middle" fill="#68d391" fontSize="8.5" fontFamily="monospace">{"IF SEIZED: PENETRATING OIL -> SOAK 20-30 MIN -> RETRY"}</text>
        <text x="120" y="35" textAnchor="middle" fill="#fc8181" fontSize="8" fontFamily="monospace">INSPECT RUBBER FOR STALL DAMAGE</text>
        <line x1="120" y1="38" x2="120" y2="48" stroke="#fc8181" strokeWidth="0.5" />
      </svg>
    ),
  },

  // ──────────────────── STEP 5 ────────────────────
  {
    id: 5,
    title: "Step 5 — Remove Bent Housing",
    subtitle: "Separating the adjustable bend section and recording settings",
    color: "#b794f4",
    timeEstimate: "20-30 min",
    difficulty: "Medium",
    tools: [
      "Spanner wrench (for bent housing lock ring)",
      "Breakout tongs or chain tongs",
      "Paint pen / marking crayon",
      "Protractor or angle measuring device",
      "Thread compound (API modified)",
      "Camera (for documenting settings)",
    ],
    description: `The bent housing (also called the adjustable housing or kick sub) is what gives the motor its directional capability. It introduces a controlled bend angle — typically 0.5° to 3.0° — between the power section and the bearing section. This small angle, combined with the motor's length, creates the side force that steers the wellbore.

CRITICAL: Before breaking ANY connection on the bent housing, you MUST record the current bend angle setting. This is set by the position of the adjustable ring relative to index marks on the housing. Each click or position corresponds to a specific angle (typically 0.25° or 0.5° increments).

The bend angle setting is determined by the directional drilling plan and is set by a directional driller. If you reassemble the motor with the wrong angle, the well trajectory will be wrong — this can cost hundreds of thousands of dollars in corrective drilling.

Record: (1) the angle reading from the index marks, (2) photograph the alignment of upper and lower housing marks, (3) photograph the lock ring position, (4) paint-mark the rotational position before breaking connections.`,
    substeps: [
      { text: "BEFORE TOUCHING ANYTHING: Photograph the bent housing from multiple angles, capturing the adjustment ring position, index marks, and alignment marks.", note: "This is your insurance policy. If the marks are worn or paint fades, you'll need these photos to reassemble correctly." },
      { text: "Read and record the bend angle from the index marks on the adjustment ring. Typical range: 0° (straight) to 3.0° in 0.25° or 0.5° increments.", note: "The angle is usually stamped on the ring and indicated by a pointer or scribe mark aligned to a scale on the housing body." },
      { text: "Apply paint marks across BOTH connections (upper: power section to bent housing, lower: bent housing to transmission). Use a straight line across the joint.", note: "These alignment marks ensure you can verify correct rotational position on reassembly." },
      { text: "Secure the transmission/bearing section below in chain tongs. Apply breakout tongs to the bent housing body.", note: "Grip on the solid housing body — NEVER on the adjustable ring or lock ring." },
      { text: "Break the upper connection first (bent housing to power section — this was already separated in Step 3). Now break the lower connection (bent housing to transmission).", note: "Lower connection is typically RIGHT-HAND thread. Break out counter-clockwise." },
      { text: "Remove the bent housing assembly. Inspect the bore for erosion, the adjustment ring for free movement, and all threads for damage.", note: "The adjustment ring should move freely between detent positions. If it's frozen, soak in penetrating oil and work it back and forth." },
      { text: "Check the bent housing bore with a flashlight — look for erosion from sand-laden mud passing through at high velocity.", note: "Bore erosion is common in the bent housing because the flow path changes direction here, creating turbulence." },
    ],
    warnings: [
      "RECORD BEND ANGLE SETTING BEFORE DISASSEMBLY — wrong angle = wrong well trajectory = $$$ to fix",
      "Photograph from multiple angles — index marks and paint can fade or be wiped off during cleaning",
      "Never grip the adjustable ring or lock ring with tongs — this damages the precision adjustment mechanism",
      "The bent housing is a precision component — handle carefully, do not drop or impact",
      "If the adjustment ring is frozen, do NOT force — soak in penetrating oil and work gently",
    ],
    specs: {
      "Bend Angle Range": "0° to 3.0° (typical for 172mm)",
      "Angle Increments": "0.25° or 0.50° per detent",
      "Thread Connection": "Proprietary pin/box, RIGHT-HAND",
      "Housing Material": "4145H Modified alloy steel",
      "Bore ID": "~70-75mm",
      "Weight": "25-40 kg",
    },
    resources: [
      { label: "Directional Drilling Handbook (bent housing theory)", url: "https://www.iadc.org/drilling-manual/" },
      { label: "Schlumberger PowerDrive Motor Configuration Guide", url: "https://www.slb.com/drilling/bottomhole-assemblies/drilling-motors" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <polygon points="200,50 400,50 400,120 200,120" fill="#44337a" stroke="#b794f4" strokeWidth="2" />
        <line x1="300" y1="85" x2="350" y2="75" stroke="#f6ad55" strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="300" y1="85" x2="350" y2="85" stroke="#a0aec0" strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 340 85 A 10 10 0 0 1 346 78" fill="none" stroke="#f6ad55" strokeWidth="1.5" />
        <text x="355" y="80" fill="#f6ad55" fontSize="8" fontFamily="monospace">BEND ANGLE</text>
        <text x="355" y="90" fill="#f6ad55" fontSize="8" fontFamily="monospace">(0.5-3.0 deg)</text>
        <text x="300" y="95" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">BENT HOUSING</text>
        <line x1="200" y1="38" x2="200" y2="135" stroke="#b794f4" strokeWidth="2" strokeDasharray="5,3" />
        <text x="200" y="32" textAnchor="middle" fill="#b794f4" fontSize="8" fontFamily="monospace">BREAK (UPPER)</text>
        <line x1="400" y1="38" x2="400" y2="135" stroke="#b794f4" strokeWidth="2" strokeDasharray="5,3" />
        <text x="400" y="32" textAnchor="middle" fill="#b794f4" fontSize="8" fontFamily="monospace">BREAK (LOWER)</text>
        <rect x="50" y="55" width="150" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <text x="125" y="88" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">POWER SECTION</text>
        <text x="125" y="100" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="monospace">(ALREADY REMOVED)</text>
        <rect x="400" y="55" width="200" height="60" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
        <text x="500" y="88" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">TRANSMISSION +</text>
        <text x="500" y="100" textAnchor="middle" fill="#a0aec0" fontSize="8" fontFamily="monospace">BEARING SECTION</text>
        <rect x="205" y="52" width="12" height="15" fill="#f6ad55" opacity="0.8" rx="1" />
        <text x="250" y="148" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">PAINT MARK + PHOTOGRAPH BEFORE BREAKING</text>
        <line x1="213" y1="67" x2="213" y2="141" stroke="#f6ad55" strokeWidth="0.5" strokeDasharray="3,2" />
      </svg>
    ),
  },

  // ──────────────────── STEP 6 ────────────────────
  {
    id: 6,
    title: "Step 6 — Disassemble Transmission",
    subtitle: "CV joint / flex shaft extraction and inspection",
    color: "#f6ad55",
    timeEstimate: "20-30 min",
    difficulty: "Medium",
    tools: [
      "Breakout tongs or chain tongs",
      "36\" pipe wrench",
      "Snap ring pliers (internal and external)",
      "Soft hammer (brass or dead-blow)",
      "Dye penetrant test kit (optional but recommended)",
      "Calipers / micrometer",
      "Clean rags",
      "Grease (CV joint specific)",
    ],
    description: `The transmission section (also called the universal joint housing, flex shaft assembly, or constant velocity joint) performs a critical function: it converts the rotor's eccentric (wobbling) motion into smooth concentric rotation at the bit. Without this section, the bit would wobble in a circle instead of rotating on center.

There are two main transmission designs:
1. CV (Constant Velocity) Joint — a ball-and-socket type joint similar to automotive CV joints, enclosed in a rubber boot with grease. More common on newer motors.
2. Flex Shaft — a long, flexible steel shaft with universal joints at each end. More common on older designs.

Both types are high-wear components that see extreme cyclic loading. A 172mm motor running at 200 RPM subjects the transmission to 200 eccentric load cycles per second. Over a 100-hour run, that's 72 million cycles. Fatigue failure of the transmission is one of the most common causes of downhole motor failure.

The transmission housing connects to the bent housing above and the bearing section below. Remove the upper and lower drive shaft subs that connect the transmission shaft to the rotor (above) and the bearing mandrel (below).`,
    substeps: [
      { text: "Secure the bearing section in chain tongs. Break the connection between the transmission housing and the bearing section (typically RIGHT-HAND thread).", note: "This connection carries the full bit weight load — it can be very tight (6,000-10,000 ft-lbs)." },
      { text: "Slide the transmission housing off, exposing the flex shaft or CV joint assembly.", note: "The transmission shaft may remain attached to the bearing mandrel or come out with the housing — depends on the design." },
      { text: "Remove the upper drive shaft sub (connects to rotor). This may be threaded or splined — check OEM manual.", note: "Splined connections: look for a retaining ring or set screw. Threaded connections: standard RH thread." },
      { text: "Remove the lower drive shaft sub (connects to bearing mandrel). Same — threaded or splined.", note: "Mark upper and lower subs before removal — they are NOT interchangeable on most designs." },
      { text: "Pull the CV joint or flex shaft assembly out of the housing axially.", note: "If it won't slide out freely, check for retaining rings, set screws, or swollen rubber boots jamming the bore." },
      { text: "INSPECT CV JOINT TYPE: Check rubber boot for cracks, tears, or grease leaks. Grip the joint and check for excessive play (wobble). Rotate through full range — feel for rough spots or clicking.", note: "Any play in the CV joint = replace. Any boot damage = replace (grease contamination leads to rapid failure)." },
      { text: "INSPECT FLEX SHAFT TYPE: Check U-joints for play, binding, or rough rotation. Look for cracks at the shaft-to-joint weld zone. Roll the shaft on a flat surface to check for bend.", note: "U-joint needle bearings are the failure point — any roughness or play means replacement." },
      { text: "IF DYE PENETRANT AVAILABLE: Perform DPI on the flex shaft, particularly at weld zones and high-stress areas. This reveals fatigue cracks invisible to the naked eye.", note: "Dye penetrant is a 30-minute test that can prevent a $50,000 fishing job. Highly recommended." },
      { text: "Inspect the drive shaft sub splines or threads for wear, stripping, or deformation. Measure critical dimensions against OEM specs.", note: "Worn splines cause power transmission loss and vibration — replace if wear exceeds 10% of tooth thickness." },
    ],
    warnings: [
      "CV joint failure is a TOP-3 cause of downhole motor failure — inspect thoroughly, not casually",
      "Do NOT mix upper and lower drive shaft subs — they are different lengths/configurations on most motors",
      "Flex shaft fatigue cracks are invisible without dye penetrant testing — DPI is strongly recommended",
      "If CV boot is damaged, the grease is contaminated — replace the entire CV joint, do not just re-grease",
      "A transmission with ANY play or roughness should be replaced, not reused — it WILL fail downhole",
    ],
    specs: {
      "CV Joint Articulation": "+/- 2° to 4° (supports the bent housing angle)",
      "Flex Shaft Length": "600 - 1,000mm typical",
      "Operating Speed": "80 - 350 RPM (continuous cyclic loading)",
      "Fatigue Life": "300 - 800 hours (depends on operating conditions)",
      "Drive Sub Thread": "Proprietary or API, RIGHT-HAND",
      "CV Boot Material": "Polyurethane or Nitrile rubber",
    },
    resources: [
      { label: "SPE Paper — PDM Transmission Fatigue Analysis", url: "https://www.onepetro.org/search?q=PDM+transmission+fatigue" },
      { label: "ASNT Dye Penetrant Testing Guide", url: "https://www.asnt.org/MajorSiteSections/Learn/Resources" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="150" y="50" width="400" height="70" rx="3" fill="#744210" stroke="#f6ad55" strokeWidth="2" />
        <ellipse cx="350" cy="85" rx="35" ry="30" fill="#92400e" stroke="#f6ad55" strokeWidth="2" />
        <text x="350" y="82" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">CV JOINT</text>
        <text x="350" y="93" textAnchor="middle" fill="#fbd38d" fontSize="7" fontFamily="monospace">CHECK FOR PLAY</text>
        <rect x="155" y="78" width="110" height="14" rx="2" fill="#c05621" />
        <text x="210" y="72" textAnchor="middle" fill="#fbd38d" fontSize="8" fontFamily="monospace">UPPER DRIVE SUB</text>
        <rect x="435" y="78" width="110" height="14" rx="2" fill="#c05621" />
        <text x="490" y="72" textAnchor="middle" fill="#fbd38d" fontSize="8" fontFamily="monospace">LOWER DRIVE SUB</text>
        <g>
          <ellipse cx="210" cy="115" rx="18" ry="8" fill="none" stroke="#fc8181" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="210" y="140" textAnchor="middle" fill="#fc8181" fontSize="7" fontFamily="monospace">ECCENTRIC IN</text>
          <text x="210" y="150" textAnchor="middle" fill="#fc8181" fontSize="7" fontFamily="monospace">(FROM ROTOR)</text>
        </g>
        <g>
          <circle cx="490" cy="115" r="12" fill="none" stroke="#68d391" strokeWidth="1.5" />
          <text x="490" y="140" textAnchor="middle" fill="#68d391" fontSize="7" fontFamily="monospace">CONCENTRIC OUT</text>
          <text x="490" y="150" textAnchor="middle" fill="#68d391" fontSize="7" fontFamily="monospace">(TO BIT)</text>
        </g>
        <line x1="350" y1="10" x2="350" y2="47" stroke="#f6ad55" strokeWidth="2" strokeDasharray="3,2" />
        <polygon points="345,12 355,12 350,4" fill="#f6ad55" />
        <text x="420" y="18" fill="#f6ad55" fontSize="9" fontFamily="monospace">EXTRACT + DPI TEST</text>
      </svg>
    ),
  },

  // ──────────────────── STEP 7 ────────────────────
  {
    id: 7,
    title: "Step 7 — Disassemble Bearing Section",
    subtitle: "Thrust bearings, radial bearings, flow restrictor, and driveshaft mandrel",
    color: "#68d391",
    timeEstimate: "45-60 min",
    difficulty: "Hard",
    tools: [
      "Hydraulic press (10+ ton capacity)",
      "Bearing mandrel puller (OEM specific or universal)",
      "Snap ring pliers (heavy duty, internal + external)",
      "Soft hammer (brass or dead-blow)",
      "Dial indicator with magnetic base",
      "Micrometer set (0-100mm, 100-200mm)",
      "Clean bench mat / white cloth",
      "Parts wash tank with diesel or solvent",
      "Compressed air (for drying after wash)",
      "Replacement O-ring kit (motor-specific)",
      "Bearing grease (as specified by OEM)",
    ],
    description: `The bearing section is the most complex and expensive section of the mud motor. It carries the entire weight-on-bit (WOB) load through a stack of thrust bearings, maintains the driveshaft on center through radial bearings, and contains the flow restrictor that meters mud flow to lubricate the bearings (on mud-lubricated designs).

A typical 172mm bearing section contains:
- 1-2 upper radial bearings (journal or roller type)
- 3-5 thrust bearing cartridges (ball or roller type, stacked in alternating orientation)
- 1 flow restrictor / orifice (meters mud for bearing lubrication)
- 1-2 lower radial bearings
- The driveshaft mandrel (connects the transmission to the bit box)
- Multiple O-rings, seals, and spacer rings

THE ORDER MATTERS. Thrust bearings are stacked in a specific sequence — alternating between "on-bottom" bearings (carry WOB when drilling) and "off-bottom" bearings (carry reactive torque when tripping or reaming). If you mix up the order, the motor will fail immediately under load.

PHOTOGRAPH THE ENTIRE STACK BEFORE DISASSEMBLY. Lay each component on a clean mat in the exact order it came out. Number each piece with a marker.

For sealed-bearing designs: the bearing section is pre-packed with grease and sealed with a pressure compensator (rubber bladder or piston). These are NOT field-serviceable — if the seal is broken, the entire bearing pack must be sent to a shop.`,
    substeps: [
      { text: "Remove the bit box from the bearing housing (typically RIGHT-HAND thread). Use breakout tongs. This exposes the lower end of the bearing stack.", note: "The bit box connection is usually 6-5/8\" API Regular or proprietary. Breakout torque: 5,000-8,000 ft-lbs." },
      { text: "DETERMINE BEARING TYPE: Is this a mud-lubricated or sealed-bearing design? Check OEM nameplate. Sealed bearings have a grease fill port and pressure compensator.", note: "SEALED BEARINGS: If the pressure compensator piston is fully extended = bearing pack is end-of-life. Do NOT open — send to shop." },
      { text: "For MUD-LUBRICATED DESIGNS: Remove the lower retaining ring (snap ring) using heavy-duty internal snap ring pliers.", note: "These snap rings are under tension and can fly out with significant force — wear safety glasses and control the ring during removal." },
      { text: "Mount the bearing housing in a hydraulic press. Press the driveshaft mandrel UPWARD (toward the transmission end) out of the bearing housing.", note: "The mandrel and bearing stack will slide out as a unit. Support the mandrel as it exits — it's heavy and will fall." },
      { text: "As the bearing stack slides out, photograph it continuously. Each component should slide out in sequence — catch each one and lay it on the clean mat IN ORDER.", note: "Number each piece: #1 = first out (lower radial), #2, #3... Last out (upper radial). This exact sequence must be reversed on reassembly." },
      { text: "Inspect the flow restrictor / orifice FIRST — this is a prime clog location. Check for packed solids, erosion of the orifice bore, and correct orifice size.", note: "A clogged flow restrictor starves the bearings of lubrication, causing rapid bearing failure. Clean thoroughly." },
      { text: "Clean each bearing component in diesel or parts-washing solvent. Dry with compressed air. Lay back on the mat in order.", note: "Do NOT spin bearings with compressed air — the bearing balls can exceed 10,000 RPM and explode the cage." },
      { text: "INSPECT EACH THRUST BEARING: Check for spalling (surface flaking), pitting (small craters), discoloration (heat damage), and cage cracking. Rotate each bearing by hand — feel for roughness.", note: "ANY roughness, spalling, or pitting = replace the bearing. Bearing failure downhole = fishing job ($100,000+)." },
      { text: "INSPECT RADIAL BEARINGS: Check for play by gripping the inner race and rocking it relative to the outer race. Any detectable play = replace.", note: "Radial bearing play causes the driveshaft to wobble, which accelerates wear on every other component." },
      { text: "INSPECT DRIVESHAFT MANDREL: Mount in V-blocks, attach a dial indicator. Rotate slowly and measure Total Indicated Runout (TIR) at multiple points. Max TIR: 0.25mm (0.010\").", note: "A bent mandrel causes vibration that destroys bearings and the bit box bearing surface." },
      { text: "Check all O-ring grooves for damage, erosion, or scoring. Replace ALL O-rings regardless of visual condition — O-rings are cheap, downhole failures are not.", note: "Use the OEM O-ring kit specific to your motor model — generic O-rings may be wrong material or size." },
    ],
    warnings: [
      "PHOTOGRAPH THE BEARING STACK BEFORE AND DURING DISASSEMBLY — the order is critical for reassembly",
      "NEVER spin bearings with compressed air — they can reach 10,000+ RPM and explosively disintegrate",
      "Sealed-bearing designs are NOT field-serviceable — if the seal is broken, send to shop",
      "Thrust bearing cartridge ORDER matters — mixing up on-bottom and off-bottom bearings = immediate failure",
      "Replace ALL O-rings regardless of appearance — they are single-use items in high-pressure service",
      "A bent mandrel (>0.010\" TIR) must be replaced — it cannot be straightened in the field",
    ],
    specs: {
      "Thrust Bearing Type": "Ball or roller, 3-5 cartridges stacked",
      "Radial Bearing Type": "Journal, roller, or diamond (PDC) on premium motors",
      "WOB Capacity": "80 - 180 kN (18,000 - 40,000 lbf)",
      "Flow Restrictor Orifice": "6 - 12mm typical (critical for bearing life)",
      "Mandrel Max Runout (TIR)": "0.25mm (0.010\")",
      "Bearing Housing Length": "1.5 - 3.0 meters",
      "Bearing Section Weight": "80 - 120 kg",
      "O-rings": "NBR or Viton, multiple sizes (use OEM kit)",
    },
    resources: [
      { label: "SKF Bearing Damage Analysis Guide", url: "https://www.skf.com/group/knowledge-centre/bearing-damage-analysis" },
      { label: "Timken Bearing Inspection Handbook", url: "https://www.timken.com/resources/" },
      { label: "NOV Bearing Assembly Maintenance Guide", url: "https://www.nov.com/products/positive-displacement-motors" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="100" y="40" width="500" height="90" rx="3" fill="#1a365d" stroke="#68d391" strokeWidth="2" />
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
        {[1,2,3,4,5,6,7].map((n, i) => {
          const xs = [132, 195, 265, 335, 400, 457, 540];
          return <text key={n} x={xs[i]} y={145} textAnchor="middle" fill="#68d391" fontSize="9" fontFamily="monospace">#{n}</text>;
        })}
        <rect x="375" y="48" width="50" height="74" rx="2" fill="none" stroke="#f6ad55" strokeWidth="2" />
        <text x="400" y="36" textAnchor="middle" fill="#f6ad55" fontSize="8" fontFamily="monospace">CLOG CHECK</text>
        <text x="350" y="22" textAnchor="middle" fill="#68d391" fontSize="9" fontFamily="monospace">PHOTOGRAPH + NUMBER EACH COMPONENT IN ORDER</text>
      </svg>
    ),
  },

  // ──────────────────── STEP 8 ────────────────────
  {
    id: 8,
    title: "Step 8 — Inspect & Clean All Components",
    subtitle: "Systematic assessment and rebuild/scrap decision",
    color: "#00d4ff",
    timeEstimate: "60-90 min",
    difficulty: "Requires experience",
    tools: [
      "Parts wash tank with diesel or biodegradable solvent",
      "High-pressure washer",
      "Compressed air",
      "Micrometer set (multiple ranges)",
      "Bore gauge set",
      "Dial indicator with magnetic base and V-blocks",
      "Thread gauges (API)",
      "Flashlight / bore scope",
      "Dye penetrant test kit",
      "Magnetic particle inspection (MPI) if available",
      "Surface roughness comparator (optional)",
      "Inspection checklist form",
    ],
    description: `This step is where you make the critical GO/NO-GO decision for each component: rebuild in the field, send to a shop for repair, or scrap and replace.

The inspection should be systematic — use a checklist. Going through each component methodically prevents missed defects that cause premature failure on the next run. A motor that fails downhole after a rebuild is far more expensive than replacing a questionable component.

GENERAL RULE: When in doubt, replace it. The cost of a new bearing cartridge ($200-500) or CV joint ($1,000-2,000) is trivial compared to a fishing job ($100,000-500,000) or lost-in-hole event ($500,000+).

Key measurements for the GO/NO-GO decision:
- Rotor OD: measured at multiple points along the helix, compared to OEM spec. Wear limit: typically -0.5mm from nominal.
- Stator bore: measured with bore gauge at multiple points. Wear limit: typically +1.0mm from nominal.
- Rotor-Stator fit: insert rotor, turn by hand. Should be firm but turnable. Loose = worn out.
- Mandrel TIR: <0.25mm (0.010") = pass, >0.25mm = replace.
- Bearing play: zero detectable play = pass, any play = replace.
- Thread gauges: check all connections for stretch and wear.`,
    substeps: [
      { text: "Set up a clean inspection area: bench with white cloth, good lighting, all measuring instruments laid out and zeroed.", note: "Cleanliness is critical — a grain of sand left in a bearing will destroy it in 10 hours of operation." },
      { text: "Wash ALL components in parts-washing solvent. Use a brush for threads and bearing surfaces. Dry completely with compressed air.", note: "Never leave components wet — flash rust forms in minutes on exposed steel." },
      { text: "ROTOR INSPECTION: Measure OD with micrometer at 5+ points along the length. Check chrome for scoring, peeling, pitting. Roll on flat surface for straightness.", note: "Any chrome damage you can feel with a fingernail = rotor needs re-chroming. Chrome peeling = scrap." },
      { text: "STATOR INSPECTION: Measure bore with bore gauge at multiple points. Check rubber for tears, chunks, swelling, delamination. Perform fit test with rotor.", note: "If rubber is chunked, torn, or delaminated from the steel housing = stator is scrap. Minor surface wear is OK." },
      { text: "BEARING INSPECTION: Rotate each bearing by hand. Feel for ANY roughness, clicking, or resistance variation. Check for spalling and pitting under good light.", note: "Bearing inspection is partly by feel — experienced hands can detect defects that eyes can't see." },
      { text: "MANDREL INSPECTION: Mount in V-blocks, measure TIR with dial indicator at 5+ points along the length. Check bearing journal surfaces for scoring.", note: "Max TIR: 0.25mm. Journal surface must be smooth and within OEM diameter tolerance." },
      { text: "TRANSMISSION INSPECTION: Check CV joint or flex shaft for play, cracks, boot damage. Perform DPI on high-stress areas.", note: "Flex shaft fatigue cracks are invisible without DPI — this test saves lives." },
      { text: "THREAD INSPECTION: Run API thread gauges on all connections. Check for stretch, galling, cross-threading, erosion.", note: "Stretched threads = the connection was over-torqued. Galled threads need re-cutting (shop work)." },
      { text: "HOUSING INSPECTION: Check all housings (stator, bent, bearing, transmission) for cracks, dents, erosion, and bore wear.", note: "Any crack in a housing = scrap. Dents that reduce bore diameter = scrap. Bore erosion > 1mm = shop repair." },
      { text: "Fill out the inspection checklist. For each component, mark: PASS (reuse), REPAIR (send to shop), or SCRAP (replace). This is your rebuild bill of materials.", note: "Be honest and conservative. The person running this motor is trusting your inspection with their well and their safety." },
    ],
    warnings: [
      "When in doubt, REPLACE — the cost of a new part is trivial vs. a $100K-500K fishing job",
      "A motor that passes visual inspection can still fail if measurements are out of spec — ALWAYS measure",
      "Stator elastomer damage is often internal — the fit test with rotor is the definitive check",
      "Dye penetrant inspection on the flex shaft/CV joint is not optional — fatigue cracks kill wells",
      "Replace ALL O-rings, ALL seal rings, and ALL elastomeric components — no exceptions, no reuse",
      "Cleanliness during inspection prevents contamination-induced failures on the next run",
    ],
    specs: {
      "Rotor Wear Limit": "Typically -0.5mm from nominal OD",
      "Stator Wear Limit": "Typically +1.0mm from nominal bore",
      "Mandrel Max TIR": "0.25mm (0.010\")",
      "Bearing Play": "Zero detectable = pass",
      "Thread Stretch": "Per API Spec 7-2 limits",
      "Housing Bore Erosion": "Max 1.0mm before shop repair required",
      "Chrome Min Thickness": "0.10mm remaining (measure with eddy current if available)",
    },
    resources: [
      { label: "API RP 7G-2 — Inspection and Classification of Drill String Components", url: "https://www.api.org/products-and-services/standards" },
      { label: "DS-1 Drill Stem Inspection Standard", url: "https://www.ds1-drillstem.com/" },
      { label: "ASNT NDE Standards for Oilfield Equipment", url: "https://www.asnt.org/MajorSiteSections/Standards" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 160" className="w-full">
        <rect x="30" y="120" width="640" height="10" rx="2" fill="#4a5568" />
        {[
          { x: 50, y: 80, w: 80, h: 35, label: "ROTOR", color: "#2b6cb0", check: "Measure OD\nChrome check" },
          { x: 150, y: 70, w: 100, h: 45, label: "STATOR", color: "#0c3354", check: "Bore gauge\nFit test" },
          { x: 270, y: 80, w: 70, h: 35, label: "CV JOINT", color: "#744210", check: "Play test\nDPI cracks" },
          { x: 360, y: 75, w: 90, h: 40, label: "BEARING\nSTACK", color: "#276749", check: "Spalling?\nPitting?" },
          { x: 465, y: 82, w: 40, h: 30, label: "FLOW\nORIFICE", color: "#744210", check: "Clear\nclog?" },
          { x: 520, y: 78, w: 120, h: 38, label: "DRIVE SHAFT", color: "#4a5568", check: "TIR < 0.010\"\nJournal check" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3} fill={c.color} stroke="#a0aec0" strokeWidth="1" />
            {c.label.split("\n").map((l, j) => (
              <text key={j} x={c.x + c.w / 2} y={c.y + 14 + j * 11} textAnchor="middle" fill="white" fontSize="7.5" fontFamily="monospace" fontWeight="bold">{l}</text>
            ))}
            {c.check.split("\n").map((l, j) => (
              <text key={j} x={c.x + c.w / 2} y={c.y + c.h + 12 + j * 9} textAnchor="middle" fill="#f6ad55" fontSize="6.5" fontFamily="monospace">{l}</text>
            ))}
          </g>
        ))}
        <text x="350" y="18" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">SYSTEMATIC INSPECTION — MEASURE EVERYTHING</text>
        <text x="350" y="32" textAnchor="middle" fill="#fc8181" fontSize="8.5" fontFamily="monospace">WHEN IN DOUBT, REPLACE — CHEAPER THAN A FISHING JOB</text>
      </svg>
    ),
  },

  // ──────────────────── STEP 9 (Clog Locations + Reassembly + Image Tutorial) ────────────────────
  {
    id: 9,
    title: "Step 9 — Reassembly & Testing",
    subtitle: "Rebuild sequence, torque specs, flow test, and common clog locations reference",
    color: "#fc8181",
    timeEstimate: "2-3 hours",
    difficulty: "Hard — requires precision",
    tools: [
      "Calibrated torque wrench (high-range: 0-15,000 ft-lbs)",
      "Chain tongs / breakout tongs",
      "API modified thread compound",
      "Bearing grease (OEM specified)",
      "O-ring kit (motor-specific, fresh)",
      "Thread protectors (all sizes)",
      "Flow test pump (water, low rate)",
      "Pressure gauge (0-1,500 PSI)",
      "Hydraulic press (for bearing pack assembly)",
      "Snap ring pliers",
      "Torque multiplier (if manual torquing)",
    ],
    description: `Reassembly is the reverse of disassembly, with critical additions: precise torque values, new O-rings and seals, thread compound, and bearing grease. The sequence is bottom-to-top:

1. Bit Box + Driveshaft Mandrel
2. Bearing Pack (new O-rings, greased, in EXACT original sequence)
3. Transmission / CV Joint (re-greased)
4. Bent Housing (set to RECORDED angle from Step 5)
5. Power Section — Rotor into Stator (lubricate with mud or mineral oil)
6. Dump Valve (new spring if fatigued, check poppet seating)
7. Top Sub (with thread compound)

After assembly, the motor MUST be flow-tested before it goes back downhole. Pump clean water at low rate (200-400 LPM) and check:
- Dump valve closes when pressure builds
- No leaks at any connection
- Motor rotates freely (hold the bit box and feel rotation)
- Differential pressure is within spec for the lobe configuration
- Motor stalls evenly without vibration when the bit box is restrained

COMMON CLOG LOCATIONS (for reference): These four areas account for 90%+ of clog-related stalls: (1) Dump valve ports, (2) Rotor-stator cavities, (3) Flow restrictor/bearing bypass orifice, (4) Bit box / bit nozzles.`,
    substeps: [
      { text: "Assemble the bearing pack: press mandrel into bearing housing with bearings in EXACT original sequence (use your photos from Step 7). Install new O-rings on all grooves. Apply bearing grease.", note: "Use a hydraulic press — do NOT hammer the mandrel in. Hammering damages the bearing races." },
      { text: "Install the bit box onto the bearing housing. Apply API modified thread compound. Torque: 5,000-8,000 ft-lbs.", note: "Thread compound: apply to pin threads AND shoulder face. Use enough to fill the thread roots." },
      { text: "Install the transmission / CV joint assembly. Connect lower drive sub to mandrel, upper drive sub ready for rotor connection.", note: "Re-grease the CV joint with fresh OEM-specified grease. Replace the boot if damaged." },
      { text: "Install the bent housing. Set the adjustable ring to the EXACT angle recorded in Step 5. Verify against your photos. Lock the ring.", note: "Double-check: angle setting, rotational alignment (paint marks), lock ring engagement. This affects well trajectory." },
      { text: "Prepare the power section: lubricate the stator bore with drilling mud or mineral oil. Insert the rotor by spiraling it in (rotate + push), same as extraction but in reverse.", note: "Never force a dry rotor into a dry stator — the rubber will tear. Always lubricate." },
      { text: "Thread the power section onto the bent housing. Apply thread compound. Torque: 8,000-12,000 ft-lbs.", note: "Ensure the rotor engages the upper drive sub — you should feel it click into the splined or threaded connection." },
      { text: "Install the dump valve assembly: spring, poppet, retainer. Hand-tight plus 1/4 turn on the retainer.", note: "Verify the poppet moves freely in the bore — push it with a dowel, it should spring back." },
      { text: "Install the top sub. Apply thread compound. Torque: 8,000-15,000 ft-lbs. Remember: LEFT-HAND thread (tighten counter-clockwise).", note: "For LH thread: the wrench turns counter-clockwise to tighten. Verify you're not accidentally backing it off." },
      { text: "FLOW TEST: Connect a water pump to the top sub. Pump clean water at 200-400 LPM. Verify: dump valve closes, all connections leak-free, bit box rotates, pressure within spec.", note: "Expected differential pressure: varies by lobe config (check OEM spec). Typically 200-600 PSI for 172mm at flow test rate." },
      { text: "STALL TEST: While pumping, apply a gentle brake to the bit box with a chain wrench. The motor should stall smoothly and evenly. Vibration or chattering during stall = bearing or fit problem.", note: "If the stall is rough or the motor vibrates, disassemble and re-inspect — something is wrong." },
    ],
    warnings: [
      "Bearing assembly sequence MUST match original — use your photos. Wrong order = immediate failure under load",
      "The bent housing angle MUST match the recorded value — wrong angle = wrong well trajectory",
      "Thread compound is mandatory on ALL connections — dry assembly causes galling and joint failure",
      "The rotor must be LUBRICATED before insertion into the stator — dry insertion tears the rubber",
      "Top sub is LEFT-HAND thread — tighten COUNTER-CLOCKWISE. Verify before applying full torque",
      "Flow test is NOT optional — a motor that fails the flow test will fail downhole",
    ],
    specs: {
      "Top Sub Torque": "8,000 - 15,000 ft-lbs (LEFT-HAND thread)",
      "Power Section Torque": "8,000 - 12,000 ft-lbs",
      "Bearing Housing Torque": "6,000 - 10,000 ft-lbs",
      "Bit Box Torque": "5,000 - 8,000 ft-lbs",
      "Dump Valve": "Hand-tight + 1/4 turn",
      "Flow Test Rate": "200 - 400 LPM",
      "Expected Diff Pressure": "200 - 600 PSI at flow test rate (check OEM)",
      "Thread Compound": "API Modified (zinc-based or copper-based)",
    },
    resources: [
      { label: "API RP 7G — Recommended Practice for Drill Stem", url: "https://www.api.org/products-and-services/standards" },
      { label: "NOV Motor Rebuild & Testing Procedures", url: "https://www.nov.com/products/positive-displacement-motors" },
      { label: "Halliburton Motor Shop Standards Manual", url: "https://www.halliburton.com/en/drill-bits-services/drilling-services/drilling-motors" },
    ],
    diagram: () => (
      <svg viewBox="0 0 700 180" className="w-full">
        {/* Reassembly sequence */}
        {[
          { x: 20, w: 85, label: "BIT BOX", color: "#4a5568", torque: "5-8K" },
          { x: 110, w: 95, label: "BEARING\nPACK", color: "#276749", torque: "6-10K" },
          { x: 210, w: 85, label: "TRANS-\nMISSION", color: "#744210", torque: "" },
          { x: 300, w: 85, label: "BENT\nHOUSING", color: "#44337a", torque: "" },
          { x: 390, w: 120, label: "POWER\nSECTION", color: "#0e7490", torque: "8-12K" },
          { x: 515, w: 65, label: "DUMP\nVALVE", color: "#6b46c1", torque: "HT+1/4" },
          { x: 585, w: 85, label: "TOP\nSUB", color: "#4a5568", torque: "8-15K" },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y={25} width={s.w} height={50} rx={3} fill={s.color} opacity={0.85} />
            {s.label.split("\n").map((l, j) => (
              <text key={j} x={s.x + s.w / 2} y={45 + j * 12} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">{l}</text>
            ))}
            {s.torque && <text x={s.x + s.w / 2} y={88} textAnchor="middle" fill="#f6ad55" fontSize="7" fontFamily="monospace">{s.torque} ft-lbs</text>}
            {i < 6 && <text x={s.x + s.w + 3} y={50} fill="#68d391" fontSize="12" fontFamily="monospace">→</text>}
          </g>
        ))}
        <text x="350" y="16" textAnchor="middle" fill="#68d391" fontSize="9" fontFamily="monospace">REASSEMBLY SEQUENCE: BOTTOM → TOP</text>

        {/* Clog locations reference */}
        {[
          { x: 60, y: 110, w: 130, title: "DUMP PORTS", color: "#742a2a" },
          { x: 220, y: 110, w: 130, title: "ROTOR/STATOR", color: "#1a365d" },
          { x: 380, y: 110, w: 130, title: "FLOW RESTRICTOR", color: "#744210" },
          { x: 540, y: 110, w: 130, title: "BIT BOX", color: "#276749" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={35} rx={3} fill={c.color} stroke="#fc8181" strokeWidth="1.5" />
            <text x={c.x + c.w / 2} y={c.y + 22} textAnchor="middle" fill="#fc8181" fontSize="8" fontFamily="monospace" fontWeight="bold">{c.title}</text>
          </g>
        ))}
        <text x="350" y="108" textAnchor="middle" fill="#fc8181" fontSize="8" fontFamily="monospace">COMMON CLOG LOCATIONS — VERIFY ALL CLEAR BEFORE ASSEMBLY</text>
        <text x="350" y="168" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">FLOW TEST MANDATORY BEFORE RUNNING IN HOLE</text>
      </svg>
    ),
  },

  // ──────────────────── IMAGE TUTORIAL ────────────────────
  {
    id: 10,
    title: "Visual Reference Guide",
    subtitle: "Swipe through field-ready diagram pages",
    color: "#00d4ff",
    timeEstimate: "",
    difficulty: "",
    tools: [],
    description: "Use this visual walkthrough as a quick reference in the yard. Swipe left/right to move between pages. Each page maps to the disassembly sequence from component overview through reassembly checks.",
    substeps: [],
    warnings: [
      "Swipe left or right on image area to move between pages",
      "Use page dots for quick jumps to a specific diagram",
      "Confirm each step physically before moving to next page",
    ],
    specs: {},
    resources: [],
    slides: tutorialSlides,
  },
];


// ═══════════════════════════════════════════════════
//  HOOKS
// ═══════════════════════════════════════════════════

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    setMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return mobile;
}


// ═══════════════════════════════════════════════════
//  UI COMPONENTS
// ═══════════════════════════════════════════════════

function ImageTutorialSlider({ slides, accentColor }) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(null);
  const threshold = 60;
  const clampIndex = (next) => Math.max(0, Math.min(slides.length - 1, next));
  const moveTo = (next) => { setIndex(clampIndex(next)); setDragOffset(0); };
  const onPointerDown = (e) => { startXRef.current = e.clientX; setIsDragging(true); if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId); };
  const onPointerMove = (e) => { if (!isDragging || startXRef.current == null) return; setDragOffset(e.clientX - startXRef.current); };
  const onPointerUp = () => { if (!isDragging) return; if (dragOffset <= -threshold) moveTo(index + 1); else if (dragOffset >= threshold) moveTo(index - 1); else setDragOffset(0); startXRef.current = null; setIsDragging(false); };
  return (
    <div>
      <div style={{ background: "#0d1117", border: `1px solid ${accentColor}33`, borderRadius: "6px", padding: "12px", marginBottom: "14px", boxShadow: `0 0 30px ${accentColor}11` }}>
        <div style={{ fontSize: "10px", color: accentColor, letterSpacing: "2px", marginBottom: "8px" }}>IMAGE TUTORIAL — SWIPE LEFT/RIGHT</div>
        <div onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} style={{ overflow: "hidden", borderRadius: "6px", border: "1px solid #21262d", touchAction: "pan-y", background: "#0b0f14", userSelect: "none", cursor: isDragging ? "grabbing" : "grab" }}>
          <div style={{ display: "flex", transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`, transition: isDragging ? "none" : "transform 0.25s ease-out" }}>
            {slides.map((slide) => (
              <div key={slide.title} style={{ minWidth: "100%", padding: "10px" }}>
                <img src={slide.src} alt={slide.title} style={{ width: "100%", maxHeight: "520px", objectFit: "contain", background: "#11161d", borderRadius: "4px" }} draggable={false} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "10px", marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#e2e8f0", marginBottom: "3px" }}>{slides[index].title}</div>
          <div style={{ fontSize: "10px", color: "#8b949e" }}>{slides[index].subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <button onClick={() => moveTo(index - 1)} disabled={index === 0} style={{ padding: "8px 14px", background: index === 0 ? "#21262d" : "#161b22", border: `1px solid ${index === 0 ? "#30363d" : accentColor}`, borderRadius: "4px", color: index === 0 ? "#6e7681" : accentColor, cursor: index === 0 ? "not-allowed" : "pointer", fontSize: "10px", letterSpacing: "1px" }}>PREV</button>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {slides.map((slide, dotIdx) => (
              <div key={slide.title} onClick={() => moveTo(dotIdx)} style={{ width: dotIdx === index ? "20px" : "6px", height: "6px", borderRadius: "3px", background: dotIdx === index ? accentColor : "#30363d", cursor: "pointer", transition: "all 0.2s" }} />
            ))}
          </div>
          <button onClick={() => moveTo(index + 1)} disabled={index === slides.length - 1} style={{ padding: "8px 14px", background: index === slides.length - 1 ? "#21262d" : "#161b22", border: `1px solid ${index === slides.length - 1 ? "#30363d" : accentColor}`, borderRadius: "4px", color: index === slides.length - 1 ? "#6e7681" : accentColor, cursor: index === slides.length - 1 ? "not-allowed" : "pointer", fontSize: "10px", letterSpacing: "1px" }}>NEXT</button>
        </div>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, color, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: "6px", marginBottom: "12px", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: color || "#6e7681", fontSize: "14px", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>&#9654;</span>
        <span style={{ fontSize: "11px", color: color || "#8b949e", letterSpacing: "2px", fontFamily: "monospace", fontWeight: "bold" }}>{title}</span>
      </button>
      {open && <div style={{ padding: "0 16px 16px 16px" }}>{children}</div>}
    </div>
  );
}

function MobileNav({ steps, active, setActive, step, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile top bar with hamburger + step info */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 14px", background: "#161b22", borderBottom: "1px solid #21262d",
      }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          background: "none", border: `1px solid ${step.color}55`, borderRadius: "4px",
          color: step.color, padding: "6px 10px", cursor: "pointer", fontSize: "16px", lineHeight: 1,
        }}>
          {sidebarOpen ? "\u2715" : "\u2630"}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "10px", color: step.color, letterSpacing: "2px", fontFamily: "monospace" }}>
            {active === 0 ? "OVERVIEW" : active === steps.length - 1 ? "VISUAL REF" : `STEP ${active} / ${steps.length - 2}`}
          </div>
          <div style={{ fontSize: "13px", color: "#e2e8f0", fontFamily: "monospace", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {step.title.replace(/Step \d+ — /, "")}
          </div>
        </div>
        {step.timeEstimate && (
          <div style={{ fontSize: "9px", color: "#8b949e", background: "#21262d", padding: "3px 8px", borderRadius: "10px", whiteSpace: "nowrap", fontFamily: "monospace" }}>
            {step.timeEstimate}
          </div>
        )}
      </div>

      {/* Slide-down sidebar overlay */}
      {sidebarOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
        }} onClick={() => setSidebarOpen(false)}>
          <div style={{
            background: "#0d1117", borderBottom: "2px solid #21262d", maxHeight: "70vh", overflowY: "auto",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #21262d", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "11px", color: "#00d4ff", letterSpacing: "2px", fontFamily: "monospace", fontWeight: "bold" }}>SELECT STEP</div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "#6e7681", fontSize: "18px", cursor: "pointer", padding: "4px" }}>{"\u2715"}</button>
            </div>
            {steps.map((s, i) => (
              <button key={i} onClick={() => { setActive(i); setSidebarOpen(false); }} style={{
                display: "block", width: "100%", textAlign: "left",
                background: active === i ? "#161b22" : "transparent",
                border: "none", borderLeft: active === i ? `3px solid ${s.color}` : "3px solid transparent",
                padding: "12px 16px", cursor: "pointer",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    minWidth: "28px", height: "28px", borderRadius: "50%",
                    background: active === i ? `${s.color}30` : "#21262d",
                    border: `1px solid ${active === i ? s.color : "#30363d"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", color: active === i ? s.color : "#6e7681", fontFamily: "monospace", fontWeight: "bold",
                  }}>
                    {i === 0 ? "O" : i === steps.length - 1 ? "V" : i}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", color: active === i ? "#e2e8f0" : "#8b949e", fontFamily: "monospace", lineHeight: "1.3" }}>
                      {s.title.replace(/Step \d+ — /, "")}
                    </div>
                    {s.timeEstimate && (
                      <div style={{ fontSize: "10px", color: "#6e7681", marginTop: "2px", fontFamily: "monospace" }}>{s.timeEstimate}</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


// ═══════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════

export default function MudMotorDiagram() {
  const [active, setActive] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const step = steps[active];

  const m = isMobile; // shorthand

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", fontFamily: "monospace", color: "#e2e8f0", padding: "0" }}>
      {/* ── Header (desktop) ── */}
      {!m && (
        <div style={{ background: "#161b22", borderBottom: "1px solid #30363d", padding: "16px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 10px #00d4ff" }} />
          <div>
            <div style={{ fontSize: "13px", color: "#00d4ff", letterSpacing: "3px", fontWeight: "bold" }}>PDM DISASSEMBLY GUIDE</div>
            <div style={{ fontSize: "10px", color: "#6e7681", letterSpacing: "2px" }}>172mm DOWNHOLE MUD MOTOR — CLOG RECOVERY PROCEDURE</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
            {step.timeEstimate && (
              <div style={{ fontSize: "10px", color: "#8b949e", background: "#21262d", padding: "4px 10px", borderRadius: "12px" }}>{step.timeEstimate}</div>
            )}
            {step.difficulty && (
              <div style={{ fontSize: "10px", color: step.color, background: `${step.color}15`, padding: "4px 10px", borderRadius: "12px", border: `1px solid ${step.color}33` }}>{step.difficulty}</div>
            )}
            <div style={{ fontSize: "10px", color: "#6e7681" }}>
              {active === 0 ? "OVERVIEW" : active === steps.length - 1 ? "VISUAL REF" : `STEP ${active} / ${steps.length - 2}`}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Header ── */}
      {m && (
        <div style={{ background: "#161b22", borderBottom: "1px solid #30363d", padding: "10px 14px" }}>
          <div style={{ fontSize: "11px", color: "#00d4ff", letterSpacing: "2px", fontWeight: "bold" }}>PDM DISASSEMBLY GUIDE</div>
          <div style={{ fontSize: "9px", color: "#6e7681", letterSpacing: "1px" }}>172mm MUD MOTOR — CLOG RECOVERY</div>
        </div>
      )}

      {/* ── Mobile Nav ── */}
      {m && <MobileNav steps={steps} active={active} setActive={setActive} step={step} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      <div style={{ display: "flex", height: m ? "auto" : "calc(100vh - 57px)", minHeight: m ? "calc(100vh - 110px)" : undefined }}>
        {/* ── Sidebar (desktop only) ── */}
        {!m && (
          <div style={{ width: "240px", minWidth: "240px", background: "#0d1117", borderRight: "1px solid #21262d", overflowY: "auto", padding: "8px 0" }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                display: "block", width: "100%", textAlign: "left",
                background: active === i ? "#161b22" : "transparent",
                border: "none", borderLeft: active === i ? `3px solid ${s.color}` : "3px solid transparent",
                padding: "10px 14px", cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{ fontSize: "9px", color: active === i ? s.color : "#6e7681", letterSpacing: "2px", marginBottom: "2px", fontFamily: "monospace" }}>
                  {i === 0 ? "OVERVIEW" : i === steps.length - 1 ? "VISUAL REF" : `STEP ${i}`}
                </div>
                <div style={{ fontSize: "11px", color: active === i ? "#e2e8f0" : "#8b949e", lineHeight: "1.3", fontFamily: "monospace" }}>
                  {s.title.replace(/Step \d+ — /, "")}
                </div>
                {s.timeEstimate && (
                  <div style={{ fontSize: "9px", color: "#6e7681", marginTop: "2px", fontFamily: "monospace" }}>{s.timeEstimate}</div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Main Content ── */}
        <div style={{ flex: 1, overflowY: m ? "visible" : "auto", padding: m ? "16px 12px" : "24px" }}>
          {/* Step header */}
          <div style={{ marginBottom: m ? "14px" : "20px" }}>
            <div style={{ fontSize: m ? "11px" : "10px", color: step.color, letterSpacing: "3px", marginBottom: "4px" }}>
              {active === 0 ? "OVERVIEW" : active === steps.length - 1 ? "VISUAL REFERENCE" : `STEP ${active} OF ${steps.length - 2}`}
            </div>
            <div style={{ fontSize: m ? "18px" : "20px", fontWeight: "bold", color: "#e2e8f0", marginBottom: "4px" }}>{step.title}</div>
            <div style={{ fontSize: m ? "12px" : "11px", color: "#6e7681", letterSpacing: "1px", lineHeight: "1.4" }}>{step.subtitle}</div>
            {/* Mobile badges */}
            {m && (step.timeEstimate || step.difficulty) && (
              <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                {step.timeEstimate && (
                  <div style={{ fontSize: "10px", color: "#8b949e", background: "#21262d", padding: "3px 10px", borderRadius: "10px" }}>{step.timeEstimate}</div>
                )}
                {step.difficulty && (
                  <div style={{ fontSize: "10px", color: step.color, background: `${step.color}15`, padding: "3px 10px", borderRadius: "10px", border: `1px solid ${step.color}33` }}>{step.difficulty}</div>
                )}
              </div>
            )}
          </div>

          {/* Diagram or Image Tutorial */}
          {step.slides ? (
            <ImageTutorialSlider slides={step.slides} accentColor={step.color} />
          ) : (
            <div style={{ background: "#0d1117", border: `1px solid ${step.color}33`, borderRadius: "6px", padding: m ? "10px" : "20px", marginBottom: m ? "14px" : "20px", boxShadow: `0 0 30px ${step.color}11`, overflowX: "auto" }}>
              <step.diagram />
            </div>
          )}

          {/* Description */}
          <div style={{
            background: "#161b22", border: "1px solid #21262d", borderRadius: "6px",
            padding: m ? "14px" : "16px", marginBottom: m ? "12px" : "16px",
            fontSize: m ? "13px" : "12px", lineHeight: m ? "1.9" : "1.8", color: "#c9d1d9", whiteSpace: "pre-line",
          }}>
            {step.description}
          </div>

          {/* Substeps */}
          {step.substeps && step.substeps.length > 0 && (
            <CollapsibleSection title={`DETAILED PROCEDURE (${step.substeps.length} sub-steps)`} color={step.color} defaultOpen={!m}>
              {step.substeps.map((sub, i) => (
                <div key={i} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: i < step.substeps.length - 1 ? "1px solid #21262d" : "none" }}>
                  <div style={{ display: "flex", gap: m ? "10px" : "12px", marginBottom: "6px" }}>
                    <div style={{
                      minWidth: m ? "26px" : "28px", height: m ? "26px" : "28px", borderRadius: "50%",
                      background: `${step.color}20`, border: `1px solid ${step.color}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: m ? "12px" : "11px", color: step.color, fontWeight: "bold", flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize: m ? "13px" : "12px", color: "#e2e8f0", lineHeight: m ? "1.8" : "1.7", paddingTop: "3px" }}>{sub.text}</div>
                  </div>
                  {sub.note && (
                    <div style={{
                      marginLeft: m ? "36px" : "40px", fontSize: m ? "12px" : "11px",
                      color: "#8b949e", lineHeight: "1.6", fontStyle: "italic",
                      borderLeft: `2px solid ${step.color}33`, paddingLeft: "10px",
                    }}>
                      {sub.note}
                    </div>
                  )}
                </div>
              ))}
            </CollapsibleSection>
          )}

          {/* Tools */}
          {step.tools && step.tools.length > 0 && (
            <CollapsibleSection title={`TOOLS REQUIRED (${step.tools.length})`} color="#f6ad55">
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: m ? "8px" : "6px" }}>
                {step.tools.map((tool, i) => (
                  <div key={i} style={{ fontSize: m ? "12px" : "11px", color: "#c9d1d9", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "#f6ad55", minWidth: "12px" }}>+</span>
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Specifications */}
          {step.specs && Object.keys(step.specs).length > 0 && (
            <CollapsibleSection title="SPECIFICATIONS" color="#00d4ff">
              <table style={{ width: "100%", fontSize: m ? "12px" : "11px", borderCollapse: "collapse" }}>
                <tbody>
                  {Object.entries(step.specs).map(([key, val], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #21262d" }}>
                      <td style={{ padding: "6px 12px 6px 0", color: "#8b949e", whiteSpace: m ? "normal" : "nowrap", verticalAlign: "top", width: m ? "40%" : undefined }}>{key}</td>
                      <td style={{ padding: "6px 0", color: "#e2e8f0" }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CollapsibleSection>
          )}

          {/* Warnings */}
          {step.warnings && step.warnings.length > 0 && (
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "6px", padding: m ? "14px" : "16px", marginBottom: m ? "12px" : "16px" }}>
              <div style={{ fontSize: m ? "10px" : "9px", color: "#fc8181", letterSpacing: "2px", marginBottom: "12px", fontWeight: "bold" }}>
                CRITICAL NOTES ({step.warnings.length})
              </div>
              {step.warnings.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: m ? "13px" : "11px", color: "#8b949e", lineHeight: m ? "1.7" : "1.5" }}>
                  <span style={{ color: "#fc8181", minWidth: "12px", flexShrink: 0 }}>!</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}

          {/* Resources */}
          {step.resources && step.resources.length > 0 && (
            <CollapsibleSection title="RESOURCES & REFERENCES" color="#b794f4">
              {step.resources.map((r, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: m ? "13px" : "11px", color: "#b794f4", textDecoration: "none", borderBottom: "1px solid #b794f433", lineHeight: "1.6" }}>
                    {r.label}
                  </a>
                </div>
              ))}
            </CollapsibleSection>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: m ? "16px" : "20px", gap: "12px", paddingBottom: m ? "24px" : "0" }}>
            <button onClick={() => { setActive(Math.max(0, active - 1)); window.scrollTo(0, 0); }} disabled={active === 0} style={{
              padding: m ? "12px 18px" : "10px 20px", background: active === 0 ? "#21262d" : "#161b22",
              border: `1px solid ${active === 0 ? "#30363d" : step.color}`, borderRadius: "4px",
              color: active === 0 ? "#6e7681" : step.color, cursor: active === 0 ? "not-allowed" : "pointer",
              fontSize: m ? "13px" : "11px", letterSpacing: "1px", fontFamily: "monospace",
            }}>PREV</button>
            {!m && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {steps.map((s, i) => (
                  <div key={i} onClick={() => setActive(i)} style={{
                    width: i === active ? "20px" : "6px", height: "6px", borderRadius: "3px",
                    background: i === active ? step.color : "#21262d", cursor: "pointer", transition: "all 0.2s",
                  }} />
                ))}
              </div>
            )}
            {m && (
              <div style={{ fontSize: "12px", color: "#6e7681", display: "flex", alignItems: "center", fontFamily: "monospace" }}>
                {active + 1} / {steps.length}
              </div>
            )}
            <button onClick={() => { setActive(Math.min(steps.length - 1, active + 1)); window.scrollTo(0, 0); }} disabled={active === steps.length - 1} style={{
              padding: m ? "12px 18px" : "10px 20px", background: active === steps.length - 1 ? "#21262d" : "#161b22",
              border: `1px solid ${active === steps.length - 1 ? "#30363d" : step.color}`, borderRadius: "4px",
              color: active === steps.length - 1 ? "#6e7681" : step.color, cursor: active === steps.length - 1 ? "not-allowed" : "pointer",
              fontSize: m ? "13px" : "11px", letterSpacing: "1px", fontFamily: "monospace",
            }}>NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
