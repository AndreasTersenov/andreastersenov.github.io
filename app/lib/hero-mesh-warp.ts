/* ============================================================================
   hero-mesh-warp.ts — square spacetime mesh + two fields + line-bound particles.
   Ported from the design-system reference (hero-mesh-warp.js, v5).

   Public entry: initHeroMeshWarp(canvas) → cleanup function.
   ========================================================================== */

const CONFIG = {
  gridSpacing:                22,
  mobileGridSpacing:          36,
  samplesPerLine:             90,
  mobileSamplesPerLine:       60,
  segmentsPerLine:            8,
  mobileSegmentsPerLine:      6,
  edgeBuffer:                 160,

  wellCount:                  8,
  wellAmplitudeRange:         [850, 1200] as [number, number],
  wellSwirlFractionRange:     [0.0, 0.05] as [number, number],
  wellNegativeProbability:    0.15,
  wellEpsilonRange:           [100, 140] as [number, number],
  wellDriftPeriodRange:       [30000, 56000] as [number, number],
  wellDriftAmpFraction:       0.25,

  displacementCap:            90,
  displacementAlpha:          0.72,

  visibilityNoiseScale:       1 / 450,
  visibilityNoiseTimeSpeed:   0.05,
  visibilityBlurOffsetFrac:   0.4,
  vMin:                       0.45,
  vMax:                       1.0,
  smoothstepEdge0:           -1.2,
  smoothstepEdge1:            1.2,

  cursorGravityAmplitude:     950,
  cursorGravityEpsilon:       140,
  cursorSwirlFraction:        0.05,
  cursorVisibilityAmplitude:  0.60,
  cursorVisibilitySigma:      140,
  cursorRiseMs:               200,
  cursorDecayMs:              1500,

  particleCount:              115,
  mobileParticleCount:        40,
  freeParticleFraction:       0.20,
  particleSize:               2.5,
  particleAlpha:              0.55,
  particleSpeedRange:         [18, 34] as [number, number],
  particleLifetimeRange:      [8000, 16000] as [number, number],
  particleFadeInMs:           600,
  particleFadeOutMs:          600,
  speedModK:                  1.2,

  baseAlpha:                  0.14,
  lineWidth:                  0.7,
};

function makeNoise3D() {
  const grad3 = [
    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
  ];
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const F3 = 1 / 3, G3 = 1 / 6;
  return function (x: number, y: number, z: number): number {
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const x0 = x - (i - t), y0 = y - (j - t), z0 = z - (k - t);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0)       { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0; }
      else if (x0 >= z0)  { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1; }
      else                { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1; }
    } else {
      if (y0 < z0)        { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1; }
      else if (x0 < z0)   { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1; }
      else                { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0; }
    }
    const x1 = x0 - i1 + G3,     y1 = y0 - j1 + G3,     z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2*G3,   y2 = y0 - j2 + 2*G3,   z2 = z0 - k2 + 2*G3;
    const x3 = x0 - 1 + 3*G3,    y3 = y0 - 1 + 3*G3,    z3 = z0 - 1 + 3*G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    function corner(dx: number, dy: number, dz: number, gi: number) {
      let tt = 0.6 - dx*dx - dy*dy - dz*dz;
      if (tt < 0) return 0;
      tt *= tt;
      const g = grad3[gi % 12];
      return tt * tt * (g[0]*dx + g[1]*dy + g[2]*dz);
    }
    const n0 = corner(x0,y0,z0, perm[ii+perm[jj+perm[kk]]]);
    const n1 = corner(x1,y1,z1, perm[ii+i1+perm[jj+j1+perm[kk+k1]]]);
    const n2 = corner(x2,y2,z2, perm[ii+i2+perm[jj+j2+perm[kk+k2]]]);
    const n3 = corner(x3,y3,z3, perm[ii+1 +perm[jj+1 +perm[kk+1]]]);
    return 32 * (n0 + n1 + n2 + n3);
  };
}

function rgba(hex: string, alpha: number) {
  const m = (hex || '').match(/^#?([0-9a-f]{3,6})$/i);
  if (!m) return `rgba(28,42,74,${alpha})`;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
}

function readColors(canvas: HTMLCanvasElement) {
  const cs = getComputedStyle(canvas);
  return { color: (cs.getPropertyValue('--mesh-color') || '#1c2a4a').trim() };
}

function smoothstep(e0: number, e1: number, x: number) {
  let t = (x - e0) / (e1 - e0);
  if (t < 0) t = 0; else if (t > 1) t = 1;
  return t * t * (3 - 2 * t);
}

type Well = {
  id: number; cx: number; cy: number;
  driftAmpX: number; driftAmpY: number;
  phaseX: number; phaseY: number; period: number;
  A: number; B: number; eps: number; eps2: number;
  x: number; y: number;
};

type Line = { samples: Float32Array; displaced: Float32Array; n: number };

type Particle =
  | { kind: 'free'; ux: number; uy: number; vx: number; vy: number; spawnT: number; lifetime: number }
  | { kind: 'h' | 'v'; fixedCoord: number; u: number; du: number; spawnT: number; lifetime: number };

export function initHeroMeshWarp(canvas: HTMLCanvasElement): () => void {
  if (typeof window === "undefined") return () => {};
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const noiseGeom = makeNoise3D();
  const noiseVis  = makeNoise3D();

  let W = 0, H = 0;
  let dpr = window.devicePixelRatio || 1;
  let mobile = matchMedia('(max-width: 768px)').matches;
  let touch  = matchMedia('(hover: none)').matches || mobile;

  let wells: Well[] = [];
  let hLines: Line[] = [];
  let vLines: Line[] = [];
  let yGridLines: number[] = [];
  let xGridLines: number[] = [];
  let particles: Particle[] = [];
  let visBlurOff = 17;

  let mouseX = -1e6, mouseY = -1e6, mouseLastMove = -1e6;
  let cursorAmp    = 0;
  let cursorVisAmp = 0;
  let running      = !document.hidden;
  let lastT        = performance.now();
  let colors       = readColors(canvas);
  let rafId        = 0;
  let stopped      = false;

  const ALPHA      = CONFIG.displacementAlpha;
  const cursorEps2 = CONFIG.cursorGravityEpsilon * CONFIG.cursorGravityEpsilon;
  const visSigma2  = CONFIG.cursorVisibilitySigma * CONFIG.cursorVisibilitySigma;

  function displace(px: number, py: number, outVec: [number, number]) {
    let dx = 0, dy = 0;
    for (let i = 0; i < wells.length; i++) {
      const m = wells[i];
      const ex = px - m.x, ey = py - m.y;
      const denom = Math.pow(ex*ex + ey*ey + m.eps2, ALPHA);
      const fA = m.A / denom;
      const fB = m.B / denom;
      dx -= ex * fA; dy -= ey * fA;
      dx -= ey * fB; dy += ex * fB;
    }
    if (cursorAmp > 0.5) {
      const ex = px - mouseX, ey = py - mouseY;
      const denom = Math.pow(ex*ex + ey*ey + cursorEps2, ALPHA);
      const fA = cursorAmp / denom;
      const fB = (cursorAmp * CONFIG.cursorSwirlFraction) / denom;
      dx -= ex * fA; dy -= ey * fA;
      dx -= ey * fB; dy += ex * fB;
    }
    const mag = Math.hypot(dx, dy);
    if (mag > 1e-6) {
      const cap = CONFIG.displacementCap;
      const k   = (cap * Math.tanh(mag / cap)) / mag;
      dx *= k; dy *= k;
    }
    outVec[0] = dx; outVec[1] = dy;
  }

  function visibilityRaw(x: number, y: number, t: number) {
    const s = CONFIG.visibilityNoiseScale;
    const r = noiseVis(x * s, y * s, t * 0.001 * CONFIG.visibilityNoiseTimeSpeed);
    let cursorBoost = 0;
    if (cursorVisAmp > 0.01) {
      const ex = x - mouseX, ey = y - mouseY;
      cursorBoost = cursorVisAmp * Math.exp(-(ex*ex + ey*ey) / (2 * visSigma2));
    }
    return CONFIG.vMin + (CONFIG.vMax - CONFIG.vMin) *
      smoothstep(CONFIG.smoothstepEdge0, CONFIG.smoothstepEdge1, r + cursorBoost);
  }

  function visibility(x: number, y: number, t: number) {
    const o = visBlurOff;
    return 0.25 * (
      visibilityRaw(x - o, y - o, t) +
      visibilityRaw(x + o, y - o, t) +
      visibilityRaw(x - o, y + o, t) +
      visibilityRaw(x + o, y + o, t)
    );
  }

  function setupWells() {
    wells = [];
    const [aMin, aMax] = CONFIG.wellAmplitudeRange;
    const [eMin, eMax] = CONFIG.wellEpsilonRange;
    const [pMin, pMax] = CONFIG.wellDriftPeriodRange;
    const [sMin, sMax] = CONFIG.wellSwirlFractionRange;
    for (let i = 0; i < CONFIG.wellCount; i++) {
      const eps    = eMin + Math.random() * (eMax - eMin);
      const sign   = Math.random() < CONFIG.wellNegativeProbability ? -1 : 1;
      const A      = sign * (aMin + Math.random() * (aMax - aMin));
      const swirlF = sMin + Math.random() * (sMax - sMin);
      const swirlSign = Math.random() < 0.5 ? -1 : 1;
      const B      = swirlSign * swirlF * Math.abs(A);
      wells.push({
        id:        i + 1,
        cx:        W * (-0.1 + 1.2 * Math.random()),
        cy:        H * (-0.1 + 1.2 * Math.random()),
        driftAmpX: W * CONFIG.wellDriftAmpFraction,
        driftAmpY: H * CONFIG.wellDriftAmpFraction,
        phaseX:    Math.random() * 1000,
        phaseY:    Math.random() * 1000,
        period:    pMin + Math.random() * (pMax - pMin),
        A, B,
        eps,
        eps2:      eps * eps,
        x: 0, y: 0,
      });
    }
  }

  function buildLine(orientation: 0 | 1, fixedCoord: number, sp: number, buf: number): Line {
    const samples   = new Float32Array(sp * 2);
    const displaced = new Float32Array(sp * 2);
    if (orientation === 0) {
      for (let i = 0; i < sp; i++) {
        const x = -buf + (i / (sp - 1)) * (W + 2 * buf);
        samples[i * 2]     = x;
        samples[i * 2 + 1] = fixedCoord;
      }
    } else {
      for (let i = 0; i < sp; i++) {
        const y = -buf + (i / (sp - 1)) * (H + 2 * buf);
        samples[i * 2]     = fixedCoord;
        samples[i * 2 + 1] = y;
      }
    }
    return { samples, displaced, n: sp };
  }

  function setupGrid() {
    hLines = []; vLines = [];
    yGridLines = []; xGridLines = [];
    const gs  = mobile ? CONFIG.mobileGridSpacing : CONFIG.gridSpacing;
    const sp  = mobile ? CONFIG.mobileSamplesPerLine : CONFIG.samplesPerLine;
    const buf = CONFIG.edgeBuffer;
    visBlurOff = gs * CONFIG.visibilityBlurOffsetFrac;

    for (let y = -buf; y <= H + buf; y += gs) {
      hLines.push(buildLine(0, y, sp, buf));
      yGridLines.push(y);
    }
    for (let x = -buf; x <= W + buf; x += gs) {
      vLines.push(buildLine(1, x, sp, buf));
      xGridLines.push(x);
    }
  }

  function spawnParticle(now: number): Particle {
    const [sMin, sMax] = CONFIG.particleSpeedRange;
    const speed = sMin + Math.random() * (sMax - sMin);
    const dir   = Math.random() < 0.5 ? -1 : 1;
    const [lMin, lMax] = CONFIG.particleLifetimeRange;
    const lifetime = lMin + Math.random() * (lMax - lMin);
    const buf = CONFIG.edgeBuffer;
    const isFree = Math.random() < CONFIG.freeParticleFraction;

    if (isFree) {
      const angle = Math.random() * Math.PI * 2;
      return {
        kind:   'free',
        ux:     Math.random() * W,
        uy:     Math.random() * H,
        vx:     Math.cos(angle) * speed,
        vy:     Math.sin(angle) * speed,
        spawnT: now, lifetime,
      };
    }

    if (Math.random() < 0.5) {
      const fixedCoord = yGridLines[(Math.random() * yGridLines.length) | 0] ?? 0;
      return {
        kind: 'h',
        fixedCoord,
        u:    -buf + Math.random() * (W + 2 * buf),
        du:   speed * dir,
        spawnT: now, lifetime,
      };
    } else {
      const fixedCoord = xGridLines[(Math.random() * xGridLines.length) | 0] ?? 0;
      return {
        kind: 'v',
        fixedCoord,
        u:    -buf + Math.random() * (H + 2 * buf),
        du:   speed * dir,
        spawnT: now, lifetime,
      };
    }
  }

  function setupParticles() {
    particles = [];
    const n   = mobile ? CONFIG.mobileParticleCount : CONFIG.particleCount;
    const now = performance.now();
    for (let i = 0; i < n; i++) {
      const p = spawnParticle(now);
      p.spawnT = now - Math.random() * p.lifetime * 0.95;
      particles.push(p);
    }
  }

  function updateWells(now: number) {
    for (const m of wells) {
      const t = now / m.period;
      m.x = m.cx + noiseGeom(t + m.phaseX, 0, m.id)       * m.driftAmpX;
      m.y = m.cy + noiseGeom(0, t + m.phaseY, m.id + 100) * m.driftAmpY;
    }
  }

  function updateCursor(now: number, dt: number) {
    const dtMouse = now - mouseLastMove;
    let targetGrav: number, targetVis: number;
    if (touch) { targetGrav = 0; targetVis = 0; }
    else if (dtMouse < 60) {
      targetGrav = CONFIG.cursorGravityAmplitude;
      targetVis  = CONFIG.cursorVisibilityAmplitude;
    } else if (dtMouse < 60 + CONFIG.cursorDecayMs) {
      const f = Math.max(0, 1 - (dtMouse - 60) / CONFIG.cursorDecayMs);
      targetGrav = CONFIG.cursorGravityAmplitude * f;
      targetVis  = CONFIG.cursorVisibilityAmplitude * f;
    } else {
      targetGrav = 0; targetVis = 0;
    }
    const tauG = targetGrav > cursorAmp ? CONFIG.cursorRiseMs : CONFIG.cursorDecayMs;
    cursorAmp += (targetGrav - cursorAmp) * Math.min(1, dt * 1000 / tauG);
    const tauV = targetVis > cursorVisAmp ? CONFIG.cursorRiseMs : CONFIG.cursorDecayMs;
    cursorVisAmp += (targetVis - cursorVisAmp) * Math.min(1, dt * 1000 / tauV);
  }

  const tmp: [number, number] = [0, 0];

  function updateParticles(now: number, dt: number) {
    const buf = CONFIG.edgeBuffer;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (now - p.spawnT > p.lifetime) {
        particles[i] = spawnParticle(now);
        continue;
      }
      if (p.kind === 'free') {
        p.ux += p.vx * dt;
        p.uy += p.vy * dt;
        if (p.ux < -buf || p.ux > W + buf || p.uy < -buf || p.uy > H + buf) {
          particles[i] = spawnParticle(now);
        }
        continue;
      }
      const ux = (p.kind === 'h') ? p.u : p.fixedCoord;
      const uy = (p.kind === 'h') ? p.fixedCoord : p.u;
      displace(ux, uy, tmp);
      const dispMag = Math.hypot(tmp[0], tmp[1]);
      const s = Math.min(1, dispMag / CONFIG.displacementCap);
      const speedMod = 1 + CONFIG.speedModK * s;
      p.u += p.du * dt * speedMod;
      const limit = (p.kind === 'h') ? (W + buf) : (H + buf);
      if (p.u < -buf || p.u > limit) particles[i] = spawnParticle(now);
    }
  }

  function renderLineGroup(lines: Line[], segs: number) {
    for (const line of lines) {
      const s = line.samples;
      const d = line.displaced;
      const n = line.n;
      for (let i = 0; i < n; i++) {
        displace(s[i * 2], s[i * 2 + 1], tmp);
        d[i * 2]     = s[i * 2]     + tmp[0];
        d[i * 2 + 1] = s[i * 2 + 1] + tmp[1];
      }
      const span = (n - 1) / segs;
      for (let b = 0; b < segs; b++) {
        const start = Math.floor(b * span);
        const end   = (b === segs - 1) ? (n - 1) : Math.floor((b + 1) * span);
        if (start >= end) continue;
        const midI  = (start + end) >> 1;
        const v     = visibility(d[midI * 2], d[midI * 2 + 1], lastT);
        const a     = CONFIG.baseAlpha * v;
        if (a < 0.005) continue;
        ctx!.strokeStyle = rgba(colors.color, a);
        ctx!.beginPath();
        ctx!.moveTo(d[start * 2], d[start * 2 + 1]);
        for (let i = start + 1; i <= end; i++) ctx!.lineTo(d[i * 2], d[i * 2 + 1]);
        ctx!.stroke();
      }
    }
  }

  function frame(now: number) {
    if (stopped) return;
    rafId = requestAnimationFrame(frame);
    if (!running) { lastT = now; return; }
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    updateWells(now);
    updateCursor(now, dt);
    updateParticles(now, dt);

    ctx!.clearRect(0, 0, W, H);
    ctx!.lineCap   = 'round';
    ctx!.lineJoin  = 'round';
    ctx!.lineWidth = CONFIG.lineWidth;

    const segs = mobile ? CONFIG.mobileSegmentsPerLine : CONFIG.segmentsPerLine;
    renderLineGroup(hLines, segs);
    renderLineGroup(vLines, segs);

    const half = CONFIG.particleSize / 2;
    for (const p of particles) {
      const age = now - p.spawnT;
      let lifecycle = 1;
      if (age < CONFIG.particleFadeInMs) lifecycle = age / CONFIG.particleFadeInMs;
      else if (age > p.lifetime - CONFIG.particleFadeOutMs)
        lifecycle = Math.max(0, (p.lifetime - age) / CONFIG.particleFadeOutMs);
      if (lifecycle <= 0.02) continue;

      let ux: number, uy: number;
      if (p.kind === 'free') {
        ux = p.ux;
        uy = p.uy;
      } else if (p.kind === 'h') {
        ux = p.u;
        uy = p.fixedCoord;
      } else {
        ux = p.fixedCoord;
        uy = p.u;
      }
      displace(ux, uy, tmp);
      const rx = ux + tmp[0];
      const ry = uy + tmp[1];
      const v  = visibility(rx, ry, now);
      const a  = CONFIG.particleAlpha * lifecycle * v;
      if (a < 0.01) continue;
      ctx!.fillStyle = rgba(colors.color, a);
      ctx!.fillRect(rx - half, ry - half, CONFIG.particleSize, CONFIG.particleSize);
    }
  }

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = rect.width; H = rect.height;
    dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setup() {
    setupWells();
    setupGrid();
    setupParticles();
  }

  const onResize = () => {
    mobile = matchMedia('(max-width: 768px)').matches;
    touch  = matchMedia('(hover: none)').matches || mobile;
    resize();
    setup();
  };

  const onMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseLastMove = performance.now();
  };
  const onMouseLeave = () => { mouseLastMove = -1e6; };

  const onVisibility = () => {
    running = !document.hidden;
    lastT = performance.now();
  };

  window.addEventListener('resize', onResize);
  if (!touch) {
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);
  }
  document.addEventListener('visibilitychange', onVisibility);

  const obs = new MutationObserver(() => { colors = readColors(canvas); });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  resize();
  setup();
  rafId = requestAnimationFrame((t) => { lastT = t; frame(t); });

  return () => {
    stopped = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
    canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    obs.disconnect();
  };
}
