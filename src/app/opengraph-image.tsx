import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '3D Model Management – Design Technology Service Provider';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default async function OGImage() {
  const rand = mulberry32(42);

  const stoneColors = ['#D4C5A9', '#E8DCC8', '#C9B896', '#F0E6D0', '#E0D4BE', '#DECBB0'];
  const shadowColors = ['#B8A88A', '#A89880', '#8B7D6B', '#9E8E76', '#7A6C5A'];
  const accentColors = ['#7BA3B0', '#9CB8C2', '#6D9BAA', '#B5CDD6'];

  type P = { x: number; y: number; s: number; o: number; c: string };
  const pts: P[] = [];

  function pick(arr: string[]) { return arr[Math.floor(rand() * arr.length)]; }

  function addCluster(cx: number, cy: number, spreadX: number, spreadY: number, count: number, baseSize: number, baseOpacity: number) {
    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = rand() * rand();
      pts.push({
        x: cx + Math.cos(angle) * dist * spreadX + (rand() - 0.5) * spreadX * 0.3,
        y: cy + Math.sin(angle) * dist * spreadY + (rand() - 0.5) * spreadY * 0.3,
        s: baseSize + rand() * baseSize * 1.5,
        o: baseOpacity + rand() * 0.55,
        c: rand() < 0.7 ? pick(stoneColors) : pick(shadowColors),
      });
    }
  }

  addCluster(100, 315, 70, 240, 140, 2.5, 0.5);
  addCluster(1100, 315, 70, 240, 140, 2.5, 0.5);

  addCluster(400, 300, 55, 200, 100, 2.5, 0.45);
  addCluster(800, 300, 55, 200, 100, 2.5, 0.45);

  addCluster(600, 55, 480, 35, 120, 3, 0.45);
  addCluster(600, 575, 500, 30, 90, 2.5, 0.35);

  addCluster(250, 200, 180, 140, 70, 2, 0.3);
  addCluster(950, 200, 180, 140, 70, 2, 0.3);

  for (let i = 0; i < 200; i++) {
    pts.push({
      x: rand() * 1200,
      y: rand() * 630,
      s: 1.5 + rand() * 3,
      o: 0.15 + rand() * 0.4,
      c: rand() < 0.15 ? pick(accentColors) : pick(stoneColors),
    });
  }

  for (let i = 0; i < 50; i++) {
    pts.push({
      x: 100 + rand() * 1000,
      y: 50 + rand() * 530,
      s: 5 + rand() * 7,
      o: 0.06 + rand() * 0.12,
      c: rand() < 0.3 ? pick(accentColors) : '#FFFFFF',
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060606',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {pts.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              borderRadius: '50%',
              backgroundColor: p.c,
              opacity: p.o,
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(ellipse 60% 50% at center, rgba(6,6,6,0.6) 0%, rgba(6,6,6,0.3) 60%, transparent 100%)',
            display: 'flex',
          }}
        />

        <div style={{ position: 'absolute', top: 28, left: 28, width: 36, height: 36, borderTop: '2px solid rgba(255,255,255,0.2)', borderLeft: '2px solid rgba(255,255,255,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 28, right: 28, width: 36, height: 36, borderTop: '2px solid rgba(255,255,255,0.2)', borderRight: '2px solid rgba(255,255,255,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 28, left: 28, width: 36, height: 36, borderBottom: '2px solid rgba(255,255,255,0.2)', borderLeft: '2px solid rgba(255,255,255,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 28, right: 28, width: 36, height: 36, borderBottom: '2px solid rgba(255,255,255,0.2)', borderRight: '2px solid rgba(255,255,255,0.2)', display: 'flex' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ fontSize: 64, fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.06em', lineHeight: 1.05, display: 'flex' }}>
              3D MODEL
            </div>
            <div style={{ fontSize: 64, fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.06em', lineHeight: 1.05, display: 'flex' }}>
              MANAGEMENT
            </div>
          </div>

          <div style={{ width: 64, height: 2, backgroundColor: 'rgba(255,255,255,0.35)', marginTop: 28, display: 'flex' }} />

          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.3em', marginTop: 22, display: 'flex' }}>
            DESIGN TECHNOLOGY SERVICE PROVIDER
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 36, display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', display: 'flex' }}>REALITY CAPTURE</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', display: 'flex' }}>·</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', display: 'flex' }}>DIGITAL TWINS</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', display: 'flex' }}>·</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', display: 'flex' }}>BIM MODELING</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
