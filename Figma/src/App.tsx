import { useState, useEffect } from 'react'

type Tab = 'dashboard' | 'rutinas' | 'mapa' | 'progreso'

const QUOTES = [
  { text: "El límite eres tú.", author: "JP Fitness" },
  { text: "Cada rep cuenta.", author: "JP Fitness" },
  { text: "Hoy entrenas, mañana brillás.", author: "JP Fitness" },
]

const ROUTINES_INIT = [
  { id: 1, name: "Press de Banca", sets: 4, reps: 10, weight: "80kg", emoji: "🏋️", done: false },
  { id: 2, name: "Pull-ups", sets: 3, reps: 12, weight: "Peso corporal", emoji: "💪", done: true },
  { id: 3, name: "Sentadillas", sets: 4, reps: 12, weight: "100kg", emoji: "🦵", done: false },
  { id: 4, name: "Carrera", sets: 1, reps: 1, weight: "5km", emoji: "🏃", done: false },
  { id: 5, name: "Plancha", sets: 3, reps: 1, weight: "60 seg", emoji: "⚡", done: false },
]

const WEIGHT_DATA = [
  { month: "Ene", weight: 92 },
  { month: "Feb", weight: 89.5 },
  { month: "Mar", weight: 87 },
  { month: "Abr", weight: 85 },
  { month: "May", weight: 83.5 },
  { month: "Jun", weight: 81 },
  { month: "Jul", weight: 79.5 },
]

const PROGRESS_PHOTOS = [
  "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=200&h=200&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=200&h=200&fit=crop&auto=format",
]

// ── Icons ────────────────────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        stroke={active ? '#00FF87' : '#555'} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        fill={active ? 'rgba(0,255,135,0.12)' : 'none'} />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <line x1="8" y1="6" x2="21" y2="6" stroke={active ? '#00FF87' : '#555'} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="12" x2="21" y2="12" stroke={active ? '#00FF87' : '#555'} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="18" x2="21" y2="18" stroke={active ? '#00FF87' : '#555'} strokeWidth="2" strokeLinecap="round" />
      <circle cx="3.5" cy="6" r="1.5" fill={active ? '#00FF87' : '#555'} />
      <circle cx="3.5" cy="12" r="1.5" fill={active ? '#00FF87' : '#555'} />
      <circle cx="3.5" cy="18" r="1.5" fill={active ? '#00FF87' : '#555'} />
    </svg>
  )
}

function MapPinIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        stroke={active ? '#00FF87' : '#555'} strokeWidth="2"
        fill={active ? 'rgba(0,255,135,0.12)' : 'none'} />
      <circle cx="12" cy="10" r="3" stroke={active ? '#00FF87' : '#555'} strokeWidth="2" />
    </svg>
  )
}

function TrendIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"
        stroke={active ? '#00FF87' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 7 22 7 22 13"
        stroke={active ? '#00FF87' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function DashboardScreen() {
  const [bpm, setBpm] = useState(72)
  const quote = QUOTES[0]

  useEffect(() => {
    const id = setInterval(() => {
      setBpm(prev => Math.max(62, Math.min(84, prev + Math.floor(Math.random() * 5) - 2)))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#666', fontFamily: 'Outfit' }}>Jueves, 1 Oct 2026</p>
            <h1 className="text-2xl font-black mt-1" style={{ color: '#F0F0F0', fontFamily: 'Outfit' }}>Hola, JP 👋</h1>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden" style={{ border: '2px solid #00FF87' }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format" alt="JP" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00FF87' }}>
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Banner */}
      <div className="mx-5 mt-4 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #00FF87 0%, #00D974 100%)', minHeight: '128px' }}>
        <div className="absolute top-0 right-0 text-9xl font-black select-none" style={{ color: 'rgba(0,0,0,0.07)', fontFamily: 'Outfit', lineHeight: 1, transform: 'translate(10px,-10px)' }}>JP</div>
        <div className="relative p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: 'Outfit' }}>Frase del día</span>
          </div>
          <p className="text-[22px] font-black leading-snug" style={{ color: '#0A0A0A', fontFamily: 'Outfit' }}>"{quote.text}"</p>
          <p className="text-xs font-medium mt-2" style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'Outfit' }}>— {quote.author}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-3">
        {/* Heart Rate */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
          <div className="flex items-center gap-1 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" fill="#FF4D6D" /></svg>
            <span className="text-xs" style={{ color: '#666', fontFamily: 'Outfit' }}>BPM</span>
          </div>
          <p className="text-3xl font-black leading-none tabular-nums" style={{ color: '#FF4D6D', fontFamily: 'Space Mono' }}>{bpm}</p>
          <div className="flex items-center gap-1 mt-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00FF87', animation: 'pulse 1.5s infinite' }} />
            <span className="text-xs" style={{ color: '#555', fontFamily: 'Outfit' }}>Live</span>
          </div>
        </div>

        {/* Calories */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
          <div className="flex items-center gap-1 mb-2">
            <span style={{ fontSize: '12px' }}>🔥</span>
            <span className="text-xs" style={{ color: '#666', fontFamily: 'Outfit' }}>Cal</span>
          </div>
          <p className="text-3xl font-black leading-none" style={{ color: '#FF6B2C', fontFamily: 'Space Mono' }}>487</p>
          <p className="text-xs mt-2" style={{ color: '#444', fontFamily: 'Outfit' }}>/600</p>
        </div>

        {/* Steps */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
          <div className="flex items-center gap-1 mb-2">
            <span style={{ fontSize: '12px' }}>👟</span>
            <span className="text-xs" style={{ color: '#666', fontFamily: 'Outfit' }}>Pasos</span>
          </div>
          <p className="text-2xl font-black leading-none" style={{ color: '#00FF87', fontFamily: 'Space Mono' }}>8.2k</p>
          <p className="text-xs mt-2" style={{ color: '#444', fontFamily: 'Outfit' }}>/10k</p>
        </div>
      </div>

      {/* Bluetooth Device */}
      <div className="mx-5 mt-3 rounded-2xl p-4 flex items-center justify-between" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0,120,255,0.12)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" stroke="#4D9EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#EBEBEB', fontFamily: 'Outfit' }}>Apple Watch</p>
            <p className="text-xs" style={{ color: '#00FF87', fontFamily: 'Outfit' }}>Conectado via Bluetooth</p>
          </div>
        </div>
        <div className="flex items-end gap-0.5">
          {[6, 10, 14, 10].map((h, i) => (
            <div key={i} className="w-1 rounded-full" style={{ height: `${h}px`, backgroundColor: '#4D9EFF', opacity: 0.3 + i * 0.2 }} />
          ))}
        </div>
      </div>

      {/* Today's Session */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold" style={{ color: '#EBEBEB', fontFamily: 'Outfit' }}>Sesión de hoy</h2>
          <span className="text-xs font-semibold" style={{ color: '#00FF87', fontFamily: 'Outfit' }}>Ver todo →</span>
        </div>
        <div className="rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: '#1A1A1A' }}>🏋️</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: '#EBEBEB', fontFamily: 'Outfit' }}>Día Pecho + Espalda</p>
            <p className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Outfit' }}>5 ejercicios · ~45 min</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00FF87, #00D974)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polygon points="5 3 19 12 5 21 5 3" fill="#0A0A0A" /></svg>
          </div>
        </div>
      </div>

      {/* QR Scan Button */}
      <div className="px-5 mt-4 mb-6">
        <button className="w-full rounded-2xl py-4 flex items-center justify-center gap-3 font-bold text-base transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #00FF87, #00D974)', color: '#0A0A0A', fontFamily: 'Outfit', boxShadow: '0 8px 32px rgba(0,255,135,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#0A0A0A" strokeWidth="2" />
            <rect x="5.5" y="5.5" width="2" height="2" fill="#0A0A0A" />
            <rect x="16.5" y="5.5" width="2" height="2" fill="#0A0A0A" />
            <rect x="5.5" y="16.5" width="2" height="2" fill="#0A0A0A" />
            <circle cx="17.5" cy="17.5" r="1" fill="#0A0A0A" />
            <path d="M14 17.5h2M17.5 14v2M20 17.5h1M17.5 20v1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Escanear QR de Máquina
        </button>
      </div>
    </div>
  )
}

// ── Rutinas ──────────────────────────────────────────────────────────────────

function RutinasScreen() {
  const [routines, setRoutines] = useState(ROUTINES_INIT)
  const [swipedId, setSwipedId] = useState<number | null>(3)

  const markDone = (id: number) => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, done: true } : r))
    setSwipedId(null)
  }

  const doneCount = routines.filter(r => r.done).length

  return (
    <div className="flex-1 overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
      <div className="px-5 pt-12 pb-2">
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#666', fontFamily: 'Outfit' }}>Jueves · Plan A</p>
        <h1 className="text-2xl font-black mt-1" style={{ color: '#F0F0F0', fontFamily: 'Outfit' }}>Mis Rutinas</h1>
      </div>

      {/* Progress */}
      <div className="mx-5 mb-4 mt-2 rounded-2xl p-4" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs" style={{ color: '#666', fontFamily: 'Outfit' }}>Completados hoy</span>
          <span className="text-sm font-black" style={{ color: '#00FF87', fontFamily: 'Space Mono' }}>{doneCount}/{routines.length}</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#1E1E1E' }}>
          <div className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / routines.length) * 100}%`, background: 'linear-gradient(90deg, #00FF87, #00D974)' }} />
        </div>
      </div>

      {/* Exercise List */}
      <div className="px-5 space-y-3">
        {routines.map(routine => {
          const isSwiped = swipedId === routine.id
          return (
            <div key={routine.id} className="relative overflow-hidden rounded-2xl" style={{ height: '76px' }}>
              {/* Action layer */}
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center rounded-r-2xl"
                style={{ width: '88px', background: 'linear-gradient(135deg, #00C96B, #00FF87)' }}>
                <button
                  onClick={() => markDone(routine.id)}
                  className="flex flex-col items-center gap-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-bold" style={{ color: '#0A0A0A', fontFamily: 'Outfit' }}>Hecho</span>
                </button>
              </div>

              {/* Card */}
              <div
                onClick={() => !routine.done && setSwipedId(isSwiped ? null : routine.id)}
                className="absolute inset-0 flex items-center gap-4 px-4 cursor-pointer"
                style={{
                  backgroundColor: '#141414',
                  border: `1px solid ${routine.done ? '#00FF8744' : '#1E1E1E'}`,
                  borderRadius: '16px',
                  transform: isSwiped ? 'translateX(-78px)' : 'translateX(0)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: routine.done ? 0.55 : 1,
                }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: '#1A1A1A' }}>
                  {routine.done ? '✅' : routine.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate"
                    style={{ color: routine.done ? '#444' : '#EBEBEB', fontFamily: 'Outfit', textDecoration: routine.done ? 'line-through' : 'none' }}>
                    {routine.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Space Mono' }}>
                    {routine.sets} × {routine.reps} · {routine.weight}
                  </p>
                </div>
                {!routine.done && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M9 18l6-6-6-6" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Swipe hint */}
      <p className="text-center text-xs mt-4" style={{ color: '#333', fontFamily: 'Outfit' }}>← Desliza para marcar como hecho</p>

      {/* Add button */}
      <div className="px-5 mt-4">
        <button className="w-full rounded-2xl py-4 flex items-center justify-center gap-2 text-sm font-semibold"
          style={{ border: '1.5px dashed #2A2A2A', color: '#444', fontFamily: 'Outfit' }}>
          <span className="text-lg leading-none">+</span> Agregar ejercicio
        </button>
      </div>
    </div>
  )
}

// ── Mapa ─────────────────────────────────────────────────────────────────────

function MapaScreen() {
  const [playing, setPlaying] = useState(true)

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Offline pill */}
      <div className="absolute top-12 left-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ transform: 'translateX(-50%)', backgroundColor: '#FF6B2C', boxShadow: '0 4px 20px rgba(255,107,44,0.45)' }}>
        <div className="w-2 h-2 rounded-full bg-white" style={{ animation: 'pulse 1.5s infinite' }} />
        <span className="text-xs font-bold text-white" style={{ fontFamily: 'Outfit' }}>Conexión Offline</span>
      </div>

      {/* Map area */}
      <div className="flex-1 relative">
        <svg width="100%" height="100%" viewBox="0 0 390 620" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
          <rect width="390" height="620" fill="#0F1410" />

          {/* City grid — minor streets */}
          {[70, 120, 170, 220, 270, 320, 370, 420, 470, 520, 570].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="390" y2={y} stroke="#181E14" strokeWidth="1.5" />
          ))}
          {[45, 95, 145, 195, 245, 295, 345].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="620" stroke="#181E14" strokeWidth="1.5" />
          ))}

          {/* Main avenues */}
          <line x1="0" y1="270" x2="390" y2="270" stroke="#1C2618" strokeWidth="4" />
          <line x1="195" y1="0" x2="195" y2="620" stroke="#1C2618" strokeWidth="4" />

          {/* City blocks */}
          {[
            [47, 72, 96, 46], [147, 72, 46, 46], [247, 72, 96, 46],
            [47, 122, 46, 96], [97, 122, 96, 46], [247, 122, 46, 46], [297, 122, 46, 46],
            [47, 322, 46, 46], [97, 322, 96, 46], [297, 322, 46, 96],
            [47, 422, 46, 96], [147, 422, 96, 46], [247, 422, 46, 96],
            [297, 472, 46, 46],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#131A0F" rx="3" />
          ))}

          {/* Park */}
          <rect x="97" y="322" width="96" height="96" fill="#0D180A" rx="6" />
          <text x="145" y="378" textAnchor="middle" fontSize="28" style={{ userSelect: 'none' }}>🌲</text>

          {/* Route glow */}
          <path d="M 70 570 L 70 420 L 145 420 L 145 270 L 195 270 L 195 170 L 295 170 L 295 80"
            stroke="#00FF87" strokeWidth="14" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />

          {/* Route line */}
          <path d="M 70 570 L 70 420 L 145 420 L 145 270 L 195 270 L 195 170 L 295 170 L 295 80"
            stroke="#00FF87" strokeWidth="4.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

          {/* Route direction dots */}
          {[[70, 490], [70, 420], [145, 340], [195, 220], [250, 170], [295, 120]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#00FF87" opacity="0.4" />
          ))}

          {/* Start marker */}
          <circle cx="70" cy="570" r="10" fill="#00FF87" opacity="0.2" />
          <circle cx="70" cy="570" r="5" fill="#00FF87" />
          <text x="86" y="575" fill="#00FF87" fontSize="10" style={{ fontFamily: 'Outfit', fontWeight: 600 }}>Inicio</text>

          {/* End marker */}
          <circle cx="295" cy="80" r="10" fill="#FF6B2C" opacity="0.25" />
          <circle cx="295" cy="80" r="5" fill="#FF6B2C" />
          <text x="311" y="85" fill="#FF6B2C" fontSize="10" style={{ fontFamily: 'Outfit', fontWeight: 600 }}>Meta</text>

          {/* Current location — animated pulse */}
          <circle cx="195" cy="270" r="22" fill="#00FF87" opacity="0">
            <animate attributeName="r" from="10" to="26" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.25" to="0" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="195" cy="270" r="10" fill="#00FF87" opacity="0.2" />
          <circle cx="195" cy="270" r="7" fill="#00FF87" />
          <circle cx="195" cy="270" r="3" fill="white" />
        </svg>

        {/* Stats overlay */}
        <div className="absolute top-20 right-4 rounded-2xl p-3 text-center"
          style={{ backgroundColor: 'rgba(14,20,12,0.92)', border: '1px solid #1E2A1A', backdropFilter: 'blur(8px)' }}>
          <p className="text-2xl font-black leading-none" style={{ color: '#00FF87', fontFamily: 'Space Mono' }}>3.2</p>
          <p className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Outfit' }}>km</p>
          <div className="my-2" style={{ borderTop: '1px solid #1E2A1A' }} />
          <p className="text-xl font-black leading-none" style={{ color: '#EBEBEB', fontFamily: 'Space Mono' }}>24:18</p>
          <p className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Outfit' }}>tiempo</p>
          <div className="my-2" style={{ borderTop: '1px solid #1E2A1A' }} />
          <p className="text-base font-black leading-none" style={{ color: '#FF6B2C', fontFamily: 'Space Mono' }}>4:58</p>
          <p className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Outfit' }}>min/km</p>
        </div>
      </div>

      {/* Music Player */}
      <div className="px-4 pt-3 pb-3" style={{ backgroundColor: '#0F0F0F', borderTop: '1px solid #1A1A1A' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #FF6B2C, #FF4D6D)' }}>🎵</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: '#EBEBEB', fontFamily: 'Outfit' }}>Power</p>
            <p className="text-xs truncate" style={{ color: '#555', fontFamily: 'Outfit' }}>Kanye West</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <polygon points="19 20 9 12 19 4 19 20" stroke="#444" strokeWidth="1.8" fill="none" />
                <line x1="5" y1="19" x2="5" y2="5" stroke="#444" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button onClick={() => setPlaying(p => !p)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00FF87, #00D974)', boxShadow: '0 0 16px rgba(0,255,135,0.3)' }}>
              {playing
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A0A0A"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              }
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <polygon points="5 4 15 12 5 20 5 4" stroke="#444" strokeWidth="1.8" fill="none" />
                <line x1="19" y1="5" x2="19" y2="19" stroke="#444" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-2.5 w-full h-1 rounded-full" style={{ backgroundColor: '#1E1E1E' }}>
          <div className="h-1 rounded-full" style={{ width: '38%', backgroundColor: '#00FF87' }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: '#444', fontFamily: 'Space Mono' }}>2:01</span>
          <span className="text-xs" style={{ color: '#444', fontFamily: 'Space Mono' }}>5:11</span>
        </div>
      </div>
    </div>
  )
}

// ── Weight Chart ─────────────────────────────────────────────────────────────

function WeightChart() {
  const W = 320, H = 150
  const pad = { t: 12, r: 16, b: 28, l: 38 }
  const minW = 77, maxW = 94
  const chartW = W - pad.l - pad.r
  const chartH = H - pad.t - pad.b
  const xStep = chartW / (WEIGHT_DATA.length - 1)
  const yScale = (w: number) => pad.t + chartH * (1 - (w - minW) / (maxW - minW))
  const pts = WEIGHT_DATA.map((d, i) => ({ x: pad.l + i * xStep, y: yScale(d.weight), ...d }))
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H - pad.b} L ${pts[0].x} ${H - pad.b} Z`
  const gridWeights = [80, 85, 90]

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF87" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00FF87" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridWeights.map(w => {
        const y = yScale(w)
        return (
          <g key={w}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#1E1E1E" strokeWidth="1" />
            <text x={pad.l - 6} y={y + 4} textAnchor="end" fill="#444" fontSize="9" fontFamily="Space Mono">{w}</text>
          </g>
        )
      })}

      <path d={areaD} fill="url(#wGrad)" />
      <path d={pathD} stroke="#00FF87" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#00FF87" opacity="0.2" />
          <circle cx={p.x} cy={p.y} r="3.5" fill="#00FF87" />
          <circle cx={p.x} cy={p.y} r="1.5" fill="#0A0A0A" />
          <text x={p.x} y={H - pad.b + 14} textAnchor="middle" fill="#444" fontSize="9" fontFamily="Outfit">{p.month}</text>
        </g>
      ))}
    </svg>
  )
}

// ── Progreso ─────────────────────────────────────────────────────────────────

function ProgresoScreen() {
  const [modal, setModal] = useState(false)
  const [newWeight, setNewWeight] = useState('')

  return (
    <div className="flex-1 overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
      {/* Profile */}
      <div className="px-5 pt-12 pb-2">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden" style={{ border: '2.5px solid #00FF87' }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format" alt="JP" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#141414', border: '2px solid #0A0A0A' }}>
              <span style={{ fontSize: '12px' }}>🏅</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-black" style={{ color: '#F0F0F0', fontFamily: 'Outfit' }}>JP Fitness</h2>
            <p className="text-xs" style={{ color: '#555', fontFamily: 'Outfit' }}>Miembro desde enero 2026</p>
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.2)' }}>
              <span style={{ fontSize: '11px', color: '#00FF87', fontFamily: 'Outfit', fontWeight: 700 }}>🔥 Racha: 24 días</span>
            </div>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="text-2xl font-black" style={{ color: '#00FF87', fontFamily: 'Space Mono' }}>79.5</p>
            <p className="text-xs" style={{ color: '#555', fontFamily: 'Outfit' }}>kg actual</p>
          </div>
        </div>

        {/* Stat chips */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Perdido', value: '−12.5 kg', color: '#00FF87' },
            { label: 'Sesiones', value: '87', color: '#FF6B2C' },
            { label: 'Meta', value: '75 kg', color: '#555' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
              <p className="text-sm font-black" style={{ color: s.color, fontFamily: 'Space Mono' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Outfit' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weight Chart */}
      <div className="mx-5 mt-4 rounded-2xl p-4" style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold" style={{ color: '#EBEBEB', fontFamily: 'Outfit' }}>Pérdida de peso</h3>
          <span className="text-xs font-black" style={{ color: '#00FF87', fontFamily: 'Space Mono' }}>−12.5 kg</span>
        </div>
        <WeightChart />
      </div>

      {/* Photo Grid */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold" style={{ color: '#EBEBEB', fontFamily: 'Outfit' }}>Fotos de progreso</h3>
          <button className="text-xs font-bold" style={{ color: '#00FF87', fontFamily: 'Outfit' }}>+ Añadir</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PROGRESS_PHOTOS.map((url, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '1', backgroundColor: '#141414' }}>
              <img src={url} alt={`Progreso ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-8"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
              <span className="absolute bottom-1.5 left-2 text-xs font-medium"
                style={{ color: '#bbb', fontFamily: 'Outfit', fontSize: '10px' }}>
                {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Register Weight */}
      <div className="px-5 mt-5">
        <button
          onClick={() => setModal(true)}
          className="w-full rounded-2xl py-4 flex items-center justify-center gap-3 font-bold text-base transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #00FF87, #00D974)', color: '#0A0A0A', fontFamily: 'Outfit', boxShadow: '0 8px 32px rgba(0,255,135,0.2)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Registrar nuevo peso
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setModal(false)}>
          <div className="w-full rounded-t-3xl p-6" style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A' }}
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#2A2A2A' }} />
            <h3 className="text-xl font-black mb-5" style={{ color: '#F0F0F0', fontFamily: 'Outfit' }}>Nuevo registro</h3>
            <div className="flex items-center gap-3 mb-5">
              <input
                type="number"
                value={newWeight}
                onChange={e => setNewWeight(e.target.value)}
                placeholder="79.5"
                className="flex-1 rounded-2xl px-4 py-4 text-3xl font-black text-center outline-none"
                style={{ backgroundColor: '#1A1A1A', color: '#F0F0F0', border: '2px solid #00FF87', fontFamily: 'Space Mono' }}
                autoFocus
              />
              <span className="text-xl font-bold flex-shrink-0" style={{ color: '#555', fontFamily: 'Outfit' }}>kg</span>
            </div>
            <button
              onClick={() => setModal(false)}
              className="w-full rounded-2xl py-4 font-bold text-base"
              style={{ background: 'linear-gradient(135deg, #00FF87, #00D974)', color: '#0A0A0A', fontFamily: 'Outfit' }}>
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────

function BottomNav({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'rutinas', label: 'Rutinas' },
    { id: 'mapa', label: 'Mapa' },
    { id: 'progreso', label: 'Progreso' },
  ]

  return (
    <div className="flex-shrink-0 flex items-center justify-around px-2 pt-2 pb-3"
      style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid #161616' }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button key={t.id} onClick={() => setActive(t.id)}
            className="flex flex-col items-center gap-1.5 flex-1 py-1 transition-all duration-200"
            style={{ opacity: isActive ? 1 : 0.45, transform: isActive ? 'translateY(-1px)' : 'translateY(0)' }}>
            {t.id === 'dashboard' && <HomeIcon active={isActive} />}
            {t.id === 'rutinas' && <ListIcon active={isActive} />}
            {t.id === 'mapa' && <MapPinIcon active={isActive} />}
            {t.id === 'progreso' && <TrendIcon active={isActive} />}
            <span className="text-xs font-semibold" style={{ color: isActive ? '#00FF87' : '#555', fontFamily: 'Outfit', fontSize: '10px', letterSpacing: '-0.01em' }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#050505' }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 'min(390px, 100vw)',
          height: 'min(844px, 100dvh)',
          backgroundColor: '#0A0A0A',
          borderRadius: 'clamp(0px, 44px, 44px)',
          boxShadow: '0 0 0 1px #1A1A1A, 0 40px 120px rgba(0,255,135,0.07), 0 20px 80px rgba(0,0,0,0.9)',
        }}>
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'rutinas' && <RutinasScreen />}
        {activeTab === 'mapa' && <MapaScreen />}
        {activeTab === 'progreso' && <ProgresoScreen />}
        <BottomNav active={activeTab} setActive={setActiveTab} />
      </div>
    </div>
  )
}
