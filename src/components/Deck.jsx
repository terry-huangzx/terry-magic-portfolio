import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { spawnConfetti } from './Confetti.jsx'

function CornerPip({ rank, suit, accent, position }) {
  return (
    <div className={`pip pip-${position}`} style={{ color: accent }}>
      <span className="pip-rank">{rank}</span>
      <span className="pip-suit">{suit}</span>
    </div>
  )
}

function CardFront({ card }) {
  return (
    <>
      <CornerPip rank={card.suit} suit={card.suitGlyph} accent={card.accent} position="tl" />
      <CornerPip rank={card.suit} suit={card.suitGlyph} accent={card.accent} position="br" />
      <div className="face-stack">
        <div className="face-tag" style={{ color: card.accent }}>
          {card.tag}
          {card.current && <span className="face-pip" />}
        </div>
        <div className="face-suit-big" style={{ color: card.accent }}>
          {card.suitGlyph}
        </div>
        <h3 className="face-title">{card.title}</h3>
        <div className="face-sub">{card.subtitle}</div>
        {card.period && <div className="face-period">{card.period}</div>}
      </div>
    </>
  )
}

function CardBack({ card }) {
  return (
    <>
      <CornerPip rank={card.suit} suit={card.suitGlyph} accent={card.accent} position="tl" />
      <CornerPip rank={card.suit} suit={card.suitGlyph} accent={card.accent} position="br" />
      <div className="full-body">
        <div className="full-head">
          <div className="full-tag" style={{ color: card.accent }}>
            {card.tag}
            {card.current && <span className="face-pip" />}
          </div>
          <h3 className="full-title">{card.title}</h3>
          <div className="full-sub">
            <span style={{ color: card.accent }}>{card.subtitle}</span>
            {card.period && <span className="dim"> · {card.period}</span>}
            {card.location && <span className="dim"> · {card.location}</span>}
          </div>
        </div>
        <div className="full-summary">{card.summary}</div>
        <ul className="full-list">
          {card.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        {card.link && (
          <a
            className="full-link"
            href={card.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Open repo ↗
          </a>
        )}
      </div>
    </>
  )
}

function FanCard({ card, index, total, isOpen, isAnyOpen, isSpread, fanConfig, onDraw }) {
  // Geometry — fan around bottom-center pivot
  const offset = index - (total - 1) / 2
  const tx = offset * fanConfig.step
  const rot = offset * fanConfig.rotStep
  const y = Math.abs(offset) * fanConfig.arc

  const stripStyle = isSpread
    ? {
        '--accent': card.accent,
        '--tx': `${tx}px`,
        '--ty': `${y}px`,
        '--rot': `${rot}deg`,
        zIndex: isOpen ? 9999 : 10 + index
      }
    : {
        '--accent': card.accent,
        '--tx': `${index * 1.5}px`,
        '--ty': `${index * -2}px`,
        '--rot': `${index * 0.5}deg`,
        zIndex: isOpen ? 9999 : 10 + index
      }

  return (
    <article
      className={`fan-card ${isOpen ? 'is-open' : ''} ${isAnyOpen && !isOpen ? 'is-dimmed' : ''} ${
        isSpread ? 'is-spread' : 'is-stacked'
      } ${card.current ? 'is-current' : ''}`}
      style={stripStyle}
    >
      <div className="card-inner">
        <button
          type="button"
          className="card-face card-front"
          aria-label={`Draw ${card.title}`}
          tabIndex={isOpen ? -1 : 0}
          onClick={(e) => {
            if (isOpen) return
            e.stopPropagation()
            onDraw(card.id, e.clientX, e.clientY)
          }}
        >
          <CardFront card={card} />
        </button>
        <div className="card-face card-back" aria-hidden={!isOpen}>
          <CardBack card={card} />
        </div>
      </div>
    </article>
  )
}

function DeckPile({ leftmostTx, leftmostRot, accent }) {
  // Render same-size cards stacked underneath the leftmost fan card.
  // Each successive layer shifts a bit further left and rotates a bit more,
  // suggesting "the rest of the deck" peeking out from behind.
  const layers = [
    { dx: -10, drot: -1.4, depth: 1, opacity: 0.95 },
    { dx: -22, drot: -2.6, depth: 2, opacity: 0.78 },
    { dx: -34, drot: -3.8, depth: 3, opacity: 0.62 },
    { dx: -46, drot: -5.0, depth: 4, opacity: 0.46 }
  ]
  return (
    <>
      {layers.map((l, i) => (
        <div
          key={i}
          className={`pile-card pile-depth-${l.depth}`}
          aria-hidden="true"
          style={{
            '--p-tx': `${leftmostTx + l.dx}px`,
            '--p-rot': `${leftmostRot + l.drot}deg`,
            opacity: l.opacity,
            zIndex: 5 - l.depth
          }}
        >
          <div className="pile-back" style={{ '--accent': accent }}>
            <span className="pile-mono">T</span>
            <span className="pile-orn pile-orn-tl">✦</span>
            <span className="pile-orn pile-orn-br">✦</span>
          </div>
        </div>
      ))}
    </>
  )
}

const Deck = forwardRef(function Deck(
  { id, eyebrow, num, title, subtitle, helperText, cards, fanConfig, onSwitch, switchLabel },
  ref
) {
  const [openId, setOpenId] = useState(null)
  const [spread, setSpread] = useState(false)
  const wrapRef = useRef(null)

  const setRefs = (el) => {
    wrapRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  useEffect(() => {
    if (spread) return
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.18) {
            setSpread(true)
            obs.disconnect()
          }
        })
      },
      { threshold: [0.18] }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [spread])

  useEffect(() => {
    if (openId) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openId])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const draw = (cardId, x, y) => {
    spawnConfetti(x, y, 140)
    // tiny delay so confetti starts before flip kicks in
    setTimeout(() => setOpenId(cardId), 40)
  }
  const close = () => setOpenId(null)

  return (
    <section className="section deck-section" id={id} ref={setRefs}>
      <div className="r deck-head">
        <div className="deck-head-text">
          <div className="section-eyebrow">
            <span className="num">{num}</span> {eyebrow}
          </div>
          <h2 className="section-title">{title}</h2>
          <p className="section-sub">{subtitle}</p>
          <div className="deck-helper">
            <span className="dot-now" />
            <span>{openId ? 'Click anywhere outside the card to put it back.' : helperText}</span>
          </div>
        </div>
        {onSwitch && (
          <button className="deck-switch" type="button" onClick={onSwitch}>
            <span className="ds-label">{switchLabel}</span>
            <span className="ds-arrow">↗</span>
          </button>
        )}
      </div>

      <div
        className={`fan-stage ${spread ? 'is-spread' : 'is-stacked'} ${openId ? 'has-open' : ''}`}
        style={{
          '--leftmost-tx': `${-((cards.length - 1) / 2) * fanConfig.step}px`,
          '--leftmost-rot': `${-((cards.length - 1) / 2) * fanConfig.rotStep}deg`
        }}
      >
        <div className="felt" aria-hidden="true">
          <div className="felt-glow" />
        </div>
        <DeckPile
          leftmostTx={-((cards.length - 1) / 2) * fanConfig.step}
          leftmostRot={-((cards.length - 1) / 2) * fanConfig.rotStep}
          accent={cards[0]?.accent || '#f5d77a'}
        />
        {cards.map((c, i) => (
          <FanCard
            key={c.id}
            card={c}
            index={i}
            total={cards.length}
            isOpen={openId === c.id}
            isAnyOpen={!!openId}
            isSpread={spread}
            fanConfig={fanConfig}
            onDraw={draw}
          />
        ))}
      </div>

      {openId && (
        <div className="deck-backdrop" onClick={close}>
          <button className="deck-close" type="button" onClick={close} aria-label="Close">
            ✕
          </button>
        </div>
      )}
    </section>
  )
})

export default Deck
