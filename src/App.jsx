import React, { useEffect, useRef, useState } from 'react'
import Deck from './components/Deck.jsx'
import Sparkles from './components/Sparkles.jsx'
import ConfettiLayer, { spawnConfetti } from './components/Confetti.jsx'
import Cursor from './components/Cursor.jsx'
import { skills, experiences, projects } from './data.js'

function MagicianSVG() {
  return (
    <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5d77a" stopOpacity=".95" />
          <stop offset="1" stopColor="#d4af37" stopOpacity=".4" />
        </linearGradient>
        <radialGradient id="g2" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="#5b8def" stopOpacity=".6" />
          <stop offset="1" stopColor="#5b8def" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="80" r="70" fill="url(#g2)" />
      <rect x="56" y="74" width="88" height="12" fill="#0a1430" stroke="url(#g1)" strokeWidth="1.5" />
      <ellipse cx="100" cy="80" rx="60" ry="8" fill="#0a1430" stroke="url(#g1)" strokeWidth="1.5" />
      <rect x="62" y="20" width="76" height="60" fill="#0a1430" stroke="url(#g1)" strokeWidth="1.5" />
      <line x1="68" y1="30" x2="68" y2="70" stroke="url(#g1)" strokeWidth=".6" opacity=".5" />
      <path d="M100 38 L102 44 L108 44 L103 48 L105 54 L100 50 L95 54 L97 48 L92 44 L98 44 Z" fill="url(#g1)" />
      <line x1="40" y1="160" x2="160" y2="120" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="160" r="5" fill="url(#g1)" />
      <circle cx="160" cy="120" r="5" fill="#f4ecd8" />
      <g transform="translate(100 200) rotate(-30)">
        <rect x="-25" y="-35" width="50" height="70" rx="4" fill="#0a1430" stroke="url(#g1)" strokeWidth="1" />
        <text x="0" y="5" textAnchor="middle" fill="url(#g1)" fontFamily="Fraunces,serif" fontSize="20" fontStyle="italic">A</text>
      </g>
      <g transform="translate(100 200) rotate(-10)">
        <rect x="-25" y="-35" width="50" height="70" rx="4" fill="#141d3f" stroke="url(#g1)" strokeWidth="1" />
        <text x="0" y="5" textAnchor="middle" fill="url(#g1)" fontFamily="Fraunces,serif" fontSize="20" fontStyle="italic">K</text>
      </g>
      <g transform="translate(100 200) rotate(10)">
        <rect x="-25" y="-35" width="50" height="70" rx="4" fill="#1a2451" stroke="url(#g1)" strokeWidth="1" />
        <text x="0" y="5" textAnchor="middle" fill="url(#g1)" fontFamily="Fraunces,serif" fontSize="20" fontStyle="italic">Q</text>
      </g>
      <g transform="translate(100 200) rotate(30)">
        <rect x="-25" y="-35" width="50" height="70" rx="4" fill="#2d3f7e" stroke="url(#g1)" strokeWidth="1" />
        <text x="0" y="5" textAnchor="middle" fill="url(#g1)" fontFamily="Fraunces,serif" fontSize="20" fontStyle="italic">H</text>
      </g>
      <circle cx="35" cy="50" r="2" fill="url(#g1)">
        <animate attributeName="opacity" values="1;.2;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="180" r="1.5" fill="url(#g1)">
        <animate attributeName="opacity" values=".2;1;.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="220" r="2" fill="url(#g1)">
        <animate attributeName="opacity" values="1;.4;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="60" r="1.5" fill="url(#g1)">
        <animate attributeName="opacity" values=".4;1;.4" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

const SECTIONS = [
  { id: 'hero', num: '✦', label: 'Top' },
  { id: 'acts', num: 'I', label: 'Acts' },
  { id: 'tricks', num: 'II', label: 'Tricks' },
  { id: 'library', num: 'III', label: 'Library' },
  { id: 'stage', num: 'IV', label: 'Stage' },
  { id: 'encore', num: 'V', label: 'Encore' }
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="brand">
        <img className="brand-logo" src="/logo.png" alt="TH monogram" />
        <span>
          Terry<em>.</em>
        </span>
      </a>
      <div className="nav-links">
        <a href="#acts">Acts</a>
        <a href="#tricks">Tricks</a>
        <a href="#library">Library</a>
        <a href="#stage">Stage</a>
        <a href="#encore" className="nav-cta">
          <span className="dot" />
          Say hi
        </a>
      </div>
    </nav>
  )
}

function SideDock() {
  const [activeId, setActiveId] = useState('hero')
  useEffect(() => {
    const onScroll = () => {
      let best = SECTIONS[0].id
      let bestDist = Infinity
      const threshold = window.innerHeight * 0.35
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const dist = Math.abs(r.top - threshold)
        if (r.top - threshold <= 0 && dist < bestDist) {
          best = s.id
          bestDist = dist
        }
      }
      setActiveId(best)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside className="side-dock" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`dock-pip ${activeId === s.id ? 'is-active' : ''}`}
          aria-label={s.label}
        >
          <span className="dp-roman">{s.num}</span>
          <span className="dp-label">{s.label}</span>
        </a>
      ))}
    </aside>
  )
}

function Chooser({ onActs, onTricks, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '1' || e.key === 'a') onActs()
      if (e.key === '2' || e.key === 't') onTricks()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onActs, onTricks, onClose])

  return (
    <div className="chooser-overlay" onClick={onClose}>
      <div className="chooser-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chooser-eyebrow">★ pick your hand ★</div>
        <h3 className="chooser-title">
          Which deck shall I <em>shuffle</em>?
        </h3>
        <div className="chooser-options">
          <button className="chooser-card chooser-acts" onClick={onActs}>
            <span className="cc-corner cc-tl">A<small>♠</small></span>
            <span className="cc-corner cc-br">A<small>♠</small></span>
            <div className="cc-mid">
              <span className="cc-suit-big">♠</span>
              <span className="cc-name">The Acts</span>
              <span className="cc-sub">Where I've worked</span>
              <span className="cc-count">5 cards · career</span>
              <span className="cc-key">press 1</span>
            </div>
          </button>
          <button className="chooser-card chooser-tricks" onClick={onTricks}>
            <span className="cc-corner cc-tl">A<small>♥</small></span>
            <span className="cc-corner cc-br">A<small>♥</small></span>
            <div className="cc-mid">
              <span className="cc-suit-big">♥</span>
              <span className="cc-name">The Tricks</span>
              <span className="cc-sub">What I've built</span>
              <span className="cc-count">7 cards · projects</span>
              <span className="cc-key">press 2</span>
            </div>
          </button>
        </div>
        <button className="chooser-close" onClick={onClose}>
          maybe later — keep scrolling
        </button>
      </div>
    </div>
  )
}

function Hero({ onActs, onTricks, onMagicianClick }) {
  return (
    <header className="hero" id="hero">
      <div className="hero-grid">
        <div className="hero-text">
          <div className="hero-greet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
            </svg>
            Hi there, welcome in
          </div>
          <h1 className="hero-h1">
            <span className="hn-name">
              <span className="hn-first">Zixiang</span>{' '}
              <span className="hn-paren">(Terry)</span>{' '}
              <span className="hn-last">Huang,</span>
            </span>
            <span className="hn-role">
              an <em>undergraduate magician</em> in
            </span>
            <span className="hn-subjects">
              <em>Computer Science</em>,&nbsp;
              <em>Statistical Science</em>,
              <span className="amp"> &amp; </span>
              <em>Economics</em>.
            </span>
          </h1>
          <p className="hero-tag">
            Currently <b>building data pipelines</b> at SingleKey through U of T's ASIP program. By night I train computer vision models, build little games in MIPS, and pull confetti out of my projects whenever you're not looking.
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={onActs}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.6-6.2 4.6 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
              See the Acts
            </button>
            <button className="btn btn-blue" onClick={onTricks}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
              See the Tricks
            </button>
            <a href="#encore" className="btn btn-ghost">
              Get in touch →
            </a>
          </div>

          <div className="hero-quickstats">
            <div className="qs">
              <span className="qs-k">Cumulative GPA</span>
              <span className="qs-v">3.93<small>/4.0</small></span>
            </div>
            <div className="qs">
              <span className="qs-k">Internships</span>
              <span className="qs-v">5</span>
            </div>
            <div className="qs">
              <span className="qs-k">Public repos</span>
              <span className="qs-v">14<small>+</small></span>
            </div>
            <div className="qs">
              <span className="qs-k">Dean's list</span>
              <span className="qs-v">3<small>×</small></span>
            </div>
          </div>
        </div>

        <div className="hero-art" onClick={onMagicianClick} role="button" aria-label="Open the deck chooser">
          <div className="card-orbits">
            <div className="orbit o1" />
            <div className="orbit o2" />
          </div>
          <div className="magician-card">
            <span className="card-corner tl">T<small>♠</small></span>
            <span className="card-corner br">T<small>♠</small></span>
            <div className="card-art">
              <MagicianSVG />
            </div>
            <div className="card-label">— The Magician —</div>
          </div>

          <div className="float-tag t1">
            <svg viewBox="0 0 24 24" fill="none" stroke="#5b8def" strokeWidth="2">
              <path d="M12 2v8M12 14v8M2 12h8M14 12h8" />
            </svg>
            Now: Toronto, ON
          </div>
          <div className="float-tag t2">
            <svg viewBox="0 0 24 24" fill="#f5d77a" stroke="none">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#f5d77a" strokeWidth="2" />
            </svg>
            ASIP @ SingleKey
          </div>
          <div className="float-tag t3">click ✦</div>
        </div>
      </div>

      <div className="hero-bento">
        <div className="hb b-now">
          <div className="hb-label">currently...</div>
          <h4>Data Engineer at SingleKey</h4>
          <p>16-month PEY co-op — pipelines, dashboards, and a lot of SQL.</p>
          <div className="now-pulse">
            <span className="pip" /> May 2026 — Aug 2027
          </div>
        </div>
        <div className="hb b-piano">
          <div>
            <h4>RCM Level 10 — Piano &amp; Theory</h4>
            <p>recovering classical pianist</p>
          </div>
          <div className="piano-keys">
            <div className="k-w" /><div className="k-w" /><div className="k-w" /><div className="k-w" />
            <div className="k-w" /><div className="k-w" /><div className="k-w" /><div className="k-w" />
            <div className="k-b" style={{ left: '8%' }} />
            <div className="k-b" style={{ left: '21%' }} />
            <div className="k-b" style={{ left: '46%' }} />
            <div className="k-b" style={{ left: '59%' }} />
            <div className="k-b" style={{ left: '72%' }} />
          </div>
        </div>
        <div className="hb b-langs">
          <h4>Languages</h4>
          <div className="lang-list">
            <div className="lang-row">
              <span className="nm">English</span>
              <span className="lvl"><i className="on" /><i className="on" /><i className="on" /><i className="on" /><i /></span>
            </div>
            <div className="lang-row">
              <span className="nm">Mandarin</span>
              <span className="lvl"><i className="on" /><i className="on" /><i className="on" /><i className="on" /><i className="on" /></span>
            </div>
            <div className="lang-row">
              <span className="nm">Japanese</span>
              <span className="lvl"><i className="on" /><i className="on" /><i /><i /><i /></span>
            </div>
          </div>
        </div>
        <div className="hb b-quote">
          <span className="qmark">&ldquo;</span>
          <blockquote>
            The data scientist's job is half archaeology, half stage magic — first you dig through the rubble, then you make something <em>appear</em>.
          </blockquote>
          <cite>— A philosophy I'm working on</cite>
        </div>
      </div>

      <div className="scroll-cue">scroll, slowly...</div>
    </header>
  )
}

function Library() {
  return (
    <section className="section" id="library">
      <div className="r">
        <div className="section-eyebrow">
          <span className="num">iii.</span> Skills
        </div>
        <h2 className="section-title">
          My <em>library</em>.
        </h2>
        <p className="section-sub">
          The shelves I keep coming back to. Some are well-thumbed; others I'm still working through.
        </p>
      </div>

      <div className="shelf">
        {skills.map((s, i) => (
          <div className="book r" key={i}>
            <div className="book-spine" />
            <div className="book-sub">{s.vol}</div>
            <div className="book-title">{s.title}</div>
            <div className="book-tags">
              {s.tags.map((t) => (
                <span className="tg" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Stage() {
  const courses = [
    'Software Design',
    'Data Structures & Algorithms',
    'Artificial Intelligence',
    'Computer Vision',
    'Machine Learning',
    'Database Management',
    'Systems Programming',
    'Computer Organization',
    'Probability & Stats',
    'Data Visualization',
    'Survey Design',
    'Financial Economics',
    'Microeconomics',
    'Macroeconomics'
  ]
  return (
    <section className="section" id="stage">
      <div className="r">
        <div className="section-eyebrow">
          <span className="num">iv.</span> Education
        </div>
        <h2 className="section-title">
          The <em>stage</em>.
        </h2>
      </div>

      <div className="playbill r">
        <div className="bill-mark">★ presented by ★</div>
        <h3 className="bill-title">
          University of <em>Toronto</em>
        </h3>
        <p className="bill-degree">
          Statistical Science Specialist (Economy Focus) · Computer Science Major (AI Focus) · Economics Minor
        </p>
        <div className="bill-meta">
          <span><b>2022–2027</b> Sep – Aug</span>
          <span><b>3.93</b> CGPA</span>
          <span><b>3×</b> Dean's List</span>
          <span><b>ASIP</b> Internship Program</span>
        </div>
        <div className="bill-courses">
          {courses.map((c) => (
            <span className="course" key={c}>
              {c}
            </span>
          ))}
        </div>

        <div className="bill-bottom">
          <div className="medal">
            <div className="medal-ring">G</div>
            <div className="medal-text">
              <strong>Governor General's Academic Medal</strong>
              <small>2022–2023 · academic excellence</small>
            </div>
          </div>
          <div className="medal">
            <div className="medal-ring">♪</div>
            <div className="medal-text">
              <strong>RCM Level 10 — Piano &amp; Theory</strong>
              <small>Royal Conservatory of Music</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Encore() {
  return (
    <section className="section" id="encore">
      <div className="encore r">
        <div className="bill-mark">— encore —</div>
        <h2 className="encore-title">
          Stay for one <em>more</em> trick?
        </h2>
        <p className="encore-sub">
          I'm always around for collaborations, internship chats, or just to talk about magic, music, or models. Drop me a line.
        </p>
        <div className="contact-rows">
          <a href="mailto:terryzx.huang@mail.utoronto.ca" className="con">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            terryzx.huang@mail.utoronto.ca
          </a>
          <a href="https://github.com/terry-huangzx" target="_blank" rel="noreferrer" className="con">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0012 .3" />
            </svg>
            github.com/terry-huangzx
          </a>
          <a href="https://www.linkedin.com/in/terry-zixiang-huang" target="_blank" rel="noreferrer" className="con">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.7a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM20 19h-3v-5.6c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1 1V19h-3V8h3v1.3a3 3 0 012.7-1.5c2 0 3.5 1.3 3.5 4.1V19z" />
            </svg>
            linkedin.com/in/terry-zixiang-huang
          </a>
          <a href="tel:437-667-0836" className="con">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L7.9 9.7a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0122 16.9z" />
            </svg>
            437 · 667 · 0836
          </a>
        </div>
      </div>
    </section>
  )
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.r').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function App() {
  const actsRef = useRef(null)
  const tricksRef = useRef(null)
  const [chooserOpen, setChooserOpen] = useState(false)

  useReveal()

  const goActs = () => {
    setChooserOpen(false)
    actsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const goTricks = () => {
    setChooserOpen(false)
    tricksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const openChooser = () => setChooserOpen(true)

  return (
    <>
      <Sparkles />
      <ConfettiLayer />
      <Cursor />
      <Nav />
      <SideDock />
      <Hero onActs={goActs} onTricks={goTricks} onMagicianClick={openChooser} />
      <Deck
        ref={actsRef}
        id="acts"
        num="i."
        eyebrow="Experience"
        title={
          <>
            The <em>Acts</em>.
          </>
        }
        subtitle="A small hand of cards — every job I've held, fanned out for you. Pick one to draw it out."
        helperText="5 cards in this hand. The Ace of Spades is the one I'm playing right now."
        cards={experiences}
        fanConfig={{ step: 200, rotStep: 7, arc: 18 }}
        switchLabel="Switch to the Tricks"
        onSwitch={goTricks}
      />
      <Deck
        ref={tricksRef}
        id="tricks"
        num="ii."
        eyebrow="Projects"
        title={
          <>
            The <em>Tricks</em>.
          </>
        }
        subtitle="A bigger spread — every project I've shipped, dealt across the table. Tap any card to flip it over."
        helperText="7 cards on the felt. Pick one and the rest stay quiet."
        cards={projects}
        fanConfig={{ step: 170, rotStep: 5, arc: 14 }}
        switchLabel="Back to the Acts"
        onSwitch={goActs}
      />
      <Library />
      <Stage />
      <Encore />
      <footer>
        <div>© 2026 · Made with a top hat &amp; some velvet curtain.</div>
        <div className="sig">— Terry</div>
      </footer>
      {chooserOpen && (
        <Chooser onActs={goActs} onTricks={goTricks} onClose={() => setChooserOpen(false)} />
      )}
    </>
  )
}
