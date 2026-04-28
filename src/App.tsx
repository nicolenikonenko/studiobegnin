import { type MouseEvent, useEffect, useState } from 'react'
import './App.css'

const pages = [
  { path: '/ansatz', label: 'Ansatz' },
  { path: '/leistungen', label: 'Leistungen' },
  { path: '/wissen', label: 'Wissen' },
  { path: '/ueber-mich', label: 'Über mich' },
  { path: '/kontakt', label: 'Kontakt' },
]

const problems = [
  'Viele Informationen sind vorhanden, aber sie ergeben noch kein gemeinsames Steuerungsbild.',
  'Projektstände, Honorare und Stunden werden nicht immer im gleichen Zusammenhang betrachtet.',
  'Rechnungsstellung, offene Leistungen und Liquidität werden eher nachgeführt als aktiv gesteuert.',
  'Kapazitäten, Rollen und Verantwortlichkeiten sind im Alltag gewachsen, aber nicht immer klar genug geordnet.',
  'Besprechungen klären vieles kurzfristig, ersetzen aber keine verlässliche Managementroutine.',
]

const topics = [
  {
    number: '01',
    title: 'Wirtschaftliche Transparenz',
    text: 'Zahlen nicht nur sammeln, sondern verstehen: BWA, Projektstände, offene Leistungen, Liquidität und Aufwand werden zu belastbaren Entscheidungsgrundlagen.',
  },
  {
    number: '02',
    title: 'Projektcontrolling mit Logik',
    text: 'Honorare, Stunden, Nachträge, Leistungsstände und Forecasts werden so betrachtet, dass Risiken früher sichtbar und Maßnahmen konkreter werden.',
  },
  {
    number: '03',
    title: 'Kapazitäten realistisch planen',
    text: 'Einsatzplanung wird mit Projektlage, Leistungsphasen, Termindruck und verfügbaren Stunden abgeglichen, statt nur kurzfristig zu reagieren.',
  },
  {
    number: '04',
    title: 'Verantwortung und Routinen',
    text: 'Zuständigkeiten, Besprechungsformate und Entscheidungswege werden geklärt, damit Steuerung nicht an einzelnen Personen hängen bleibt.',
  },
]

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo(0, 0)
  }

  const currentPage = pages.find((page) => page.path === currentPath)

  if (currentPage) {
    return (
      <main className="page-shell">
        <SiteHeader navigate={navigate} />
        <section className="empty-page" aria-label={currentPage.label}></section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero" id="top">
        <SiteHeader navigate={navigate} />

        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              Klarheit in Zahlen.<br />
              Struktur im Alltag.<br />
              Spielraum für gute<br />
              <em>Architektur.</em>
            </h1>
            <span className="accent-rule" aria-hidden="true"></span>
            <p>
              Ich unterstütze Architektur- und Planungsbüros dabei, ihre wirtschaftliche,
              organisatorische und operative Steuerung belastbarer zu strukturieren.
            </p>
            <div className="button-row">
              <a className="button primary" href="/leistungen" onClick={navigate('/leistungen')}>Leistungen <span>→</span></a>
              <a className="button ghost" href="/ansatz" onClick={navigate('/ansatz')}>Ansatz ansehen <span>→</span></a>
            </div>
          </div>
          <div className="image-placeholder hero-image" aria-label="Editoriales Stillleben-Bildplatzhalter">
            {/* Replace with hero still life image: table, project overview, pen, glass and plan. */}
            <span>Hero image placeholder</span>
          </div>
        </div>
      </section>

      <section className="two-column-section" id="ansatz">
        <article className="benefit-panel">
          <p className="kicker">Was Sie bekommen</p>
          <h2>Steuerbarkeit, Überblick &amp; mehr Sicherheit in Entscheidungen.</h2>
          <p>
            Nicht jedes Büro braucht mehr Kontrolle. Viele Büros brauchen klarere
            Zusammenhänge zwischen Projekten, Kapazitäten, Verantwortung und Entscheidungen.
          </p>
          <p>
            Studio Benign macht diese Zusammenhänge sichtbar — als Arbeitsgrundlage für
            Führung, Projektleitung und Büroorganisation.
          </p>
        </article>
        <article className="problem-panel">
          <p className="kicker">Kennen Sie das?</p>
          <ul>
            {problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="topics-section" id="themen">
        <p className="kicker">Themenfelder</p>
        <div className="topic-grid">
          {topics.map((topic) => (
            <article className="topic-card" key={topic.number}>
              <span>{topic.number}</span>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="audit-strip" id="leistungen">
        <article className="audit-copy">
          <p className="kicker">Leistungen</p>
          <h2>Drei Zugänge zu besserer Bürosteuerung.</h2>
          <p>
            Fachvorträge schaffen Orientierung. Praxisworkshops sortieren konkrete
            Steuerungsthemen. Beratungsaufträge beginnen mit dem Büro-Klarheits-Audit
            und führen von der Standortbestimmung in konkrete Routinen für Projekte,
            Honorare, Rechnungen, Liquidität, Kapazitäten und Verantwortlichkeiten.
          </p>
          <a className="button primary" href="/kontakt" onClick={navigate('/kontakt')}>Leistungen ansehen <span>→</span></a>
        </article>
        <div className="image-placeholder audit-image" aria-label="Audit-Report-Bildplatzhalter">
          {/* Replace with audit report image: cover, matrix, score page and priorities. */}
          <span>Audit report placeholder</span>
        </div>
      </section>

      <section className="about-contact-row">
        <div className="image-placeholder portrait-image" aria-label="Portrait-Bildplatzhalter">
          {/* Replace with calm portrait image at a bright table. */}
          <span>Portrait placeholder</span>
        </div>
        <article className="about-panel" id="ueber-mich">
          <p className="kicker">Über Studio Benign</p>
          <h2>
            Aus der Büropraxis.<br />
            Mit Verständnis für Architektur.<br />
            Und Blick für Zahlen.
          </h2>
          <p>
            Studio Benign entsteht aus der praktischen Arbeit an der Schnittstelle von
            Architektur, Finanzen, Controlling, Projektadministration und Büroorganisation.
          </p>
          <p>
            Die Arbeit verbindet architektonisches Verständnis mit wirtschaftlicher Analyse
            und organisatorischer Klarheit — für den realen Büroalltag.
          </p>
          <a href="/ansatz" onClick={navigate('/ansatz')}>Mehr über den Ansatz →</a>
        </article>
        <article className="contact-panel" id="kontakt">
          <p className="kicker">Lassen Sie uns sprechen</p>
          <h2>Ein unverbindliches Erstgespräch klärt,</h2>
          <p>
            Wo Ihr Büro heute steht, welche Steuerungsfragen besonders drängen und ob ein
            Klarheits-Audit der richtige erste Schritt ist.
          </p>
          <a className="button primary" href="mailto:hallo@studiobenign.com?subject=Erstgespräch%20Studio%20Benign">
            Erstgespräch vereinbaren <span>→</span>
          </a>
        </article>
      </section>

      <section className="knowledge-anchor" id="wissen" aria-label="Wissen"></section>

      <footer className="site-footer">
        <div>
          <span className="wordmark">Studio Benign</span>
          <p>Bürosteuerung für Architektur- und Planungsbüros</p>
          <p>Klarheit in Zahlen.<br />Struktur im Alltag.<br />Spielraum für gute Architektur.</p>
          <small>Studio Benign 2026</small>
        </div>
        <div>
          <h4>Navigation</h4>
          {pages.map((page) => (
            <a href={page.path} onClick={navigate(page.path)} key={page.path}>{page.label}</a>
          ))}
        </div>
        <div>
          <h4>Wissen</h4>
          <a href="/wissen" onClick={navigate('/wissen')}>Artikel</a>
          <a href="/wissen" onClick={navigate('/wissen')}>Vorlagen</a>
          <a href="/wissen" onClick={navigate('/wissen')}>Impulse für Büros</a>
          <a href="/wissen" onClick={navigate('/wissen')}>Report-Beispiele</a>
        </div>
        <div>
          <h4>Kontakt</h4>
          <a href="mailto:hallo@studiobenign.com">hallo@studiobenign.com</a>
          <a href="tel:+436706074388">+43 6706074388</a>
          <span>INNSBRUCK</span>
        </div>
        <div className="legal-links">
          <a href="/kontakt" onClick={navigate('/kontakt')}>Impressum</a>
          <a href="/kontakt" onClick={navigate('/kontakt')}>Datenschutz</a>
        </div>
      </footer>
    </main>
  )
}

type SiteHeaderProps = {
  navigate: (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void
}

function SiteHeader({ navigate }: SiteHeaderProps) {
  return (
    <header className="site-header" aria-label="Hauptnavigation">
      <a className="brand-lockup" href="/" onClick={navigate('/')} aria-label="Studio Benign Startseite">
        <span className="wordmark">Studio Benign</span>
        <span>Bürosteuerung für Architektur- und Planungsbüros</span>
      </a>
      <nav className="nav-links" aria-label="Seitennavigation">
        {pages.map((page) => (
          <a href={page.path} onClick={navigate(page.path)} key={page.path}>{page.label}</a>
        ))}
      </nav>
    </header>
  )
}

export default App
