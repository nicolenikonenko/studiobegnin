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
    text: 'Informationen werden so eingeordnet, dass Entscheidungen, Prioritäten und nächste Schritte klarer werden.',
  },
  {
    number: '02',
    title: 'Projektsteuerung',
    text: 'Projekte werden fachlich, wirtschaftlich und organisatorisch lesbar - mit Blick auf Leistung, Aufwand und Handlungsbedarf.',
  },
  {
    number: '03',
    title: 'Kapazität und Einsatz',
    text: 'Projektlast, Termine und verfügbare Zeit werden zusammen betrachtet, damit Engpässe früher sichtbar werden.',
  },
  {
    number: '04',
    title: 'Verantwortung und Routinen',
    text: 'Zuständigkeiten, Besprechungen und nächste Schritte werden klarer geführt, damit Steuerung im Alltag verlässlicher wird.',
  },
]

const serviceFormats = [
  {
    number: '01',
    title: 'Fachvorträge',
    subtitle: 'Orientierung für neue Perspektiven.',
    text: 'Kompakte Impulse zu wirtschaftlicher, organisatorischer und operativer Steuerung in Architektur- und Planungsbüros.',
    cta: 'Vortrag anfragen',
    details: [
      {
        label: 'Geeignet für',
        text: 'Büroinhaber:innen, Partner:innen, Projektleitungen, Kammern, Netzwerke, Hochschulen, Fachveranstaltungen und interne Strategietage.',
      },
      {
        label: 'Typische Themen',
        text: 'Bürosteuerung in der Planungspraxis, Baubetriebswirtschaft für Planer:innen, wirtschaftliches Denken im Büroalltag sowie die Schnittstelle von Projektarbeit, Abrechnung, Controlling und Büroorganisation.',
      },
      {
        label: 'Ergebnis',
        text: 'Orientierung, gemeinsame Begriffe und ein klareres Verständnis für Steuerungsthemen im Büro.',
      },
    ],
  },
  {
    number: '02',
    title: 'Praxisworkshops',
    subtitle: 'Klärung für konkrete Steuerungsthemen.',
    text: 'Gemeinsam ein konkretes Steuerungsthema sortieren, Zusammenhänge sichtbar machen und eine praktikable Arbeitslogik entwickeln.',
    cta: 'Workshop besprechen',
    details: [
      {
        label: 'Geeignet für',
        text: 'Büros mit einem klar erkennbaren Thema, aber noch ohne tragfähige Routine.',
      },
      {
        label: 'Typische Themen',
        text: 'Projektbesprechungen, Zuständigkeiten, Rechnungs- und Nachtragsroutinen, Kapazitätsabstimmung, Maßnahmenverfolgung und Entscheidungswege.',
      },
      {
        label: 'Ergebnis',
        text: 'Eine konkrete Arbeitsgrundlage mit klaren Zusammenhängen, Zuständigkeiten und nächsten Schritten.',
      },
    ],
  },
  {
    number: '03',
    title: 'Beratungsauftrag & Umsetzungsbegleitung',
    subtitle: 'Struktur für tragfähige Bürosteuerung.',
    text: 'Analyse, Priorisierung und Begleitung beim Aufbau verlässlicher Steuerungsstrukturen. Das Büro-Klarheits-Audit bildet dabei den strukturierten Einstieg.',
    cta: 'Beratungsauftrag besprechen',
    details: [
      {
        label: 'Geeignet für',
        text: 'Büros, die ihre wirtschaftliche, organisatorische und operative Steuerung gezielt weiterentwickeln möchten - mit klarem Blick auf Projekte, Verantwortung, Kapazitäten und Entscheidungen.',
      },
      {
        label: 'Typische Themen',
        text: 'Büro-Klarheits-Audit, Projektsteuerung, Honorar- und Stundenlogik, Rechnungs- und Liquiditätsroutinen, Kapazitätsplanung, Verantwortlichkeiten, Managementroutinen und interne Abläufe.',
      },
      {
        label: 'Ergebnis',
        text: 'Audit-Report, priorisierte Handlungsfelder, umsetzbarer Fahrplan und konkrete Routinen für den Büroalltag.',
      },
    ],
  },
]

const approachSections = [
  {
    number: '01',
    title: 'Was Bürosteuerung bedeutet',
    paragraphs: [
      'Bürosteuerung macht wirtschaftliche, organisatorische und operative Zusammenhänge sichtbar. Sie verbindet Projekte, Kapazitäten, Verantwortung und Entscheidungen zu einem gemeinsamen Blick auf das Büro.',
      'So entsteht Orientierung für Geschäftsführung, Projektleitung und Büroorganisation - nicht als zusätzliche Kontrolle, sondern als Grundlage für bessere Entscheidungen.',
    ],
  },
  {
    number: '02',
    title: 'Warum Zusammenhänge zählen',
    paragraphs: [
      'Projektstände, Honorare, Stunden, Rechnungen, Kapazitäten und Verantwortlichkeiten haben nur begrenzten Wert, wenn sie nebeneinanderstehen.',
      'Steuerungsfähigkeit entsteht, wenn daraus ein gemeinsames Bild des Büros wird.',
    ],
  },
  {
    number: '03',
    title: 'Wie Struktur Führung entlastet',
    paragraphs: [
      'Führung im Planungsbüro findet oft parallel zum Projektalltag statt: zwischen Bauherrenabstimmungen, Teamfragen, Rechnungen, Terminen, Kapazitäten und kurzfristigen Entscheidungen.',
      'Gute Strukturen geben diesen Themen einen festen Ort. Sie schaffen Übersicht, klären Verantwortlichkeiten und machen nächste Schritte nachvollziehbar - ohne den Büroalltag unnötig zu verkomplizieren.',
    ],
  },
]

const workflowSteps = [
  {
    title: 'Verstehen',
    text: 'Wie arbeitet das Büro tatsächlich? Welche Projekte laufen, wie werden Honorare und Stunden geführt, wie entstehen Rechnungen, wer trifft Entscheidungen und wo bleiben Informationen hängen?',
  },
  {
    title: 'Sichtbar machen',
    text: 'Vorhandene Informationen werden zusammengeführt und in eine nachvollziehbare Struktur gebracht.',
  },
  {
    title: 'Einordnen',
    text: 'Risiken, Lücken und Handlungsfelder werden nach Dringlichkeit, Wirkung und Umsetzbarkeit bewertet.',
  },
  {
    title: 'Strukturieren',
    text: 'Aus der Analyse entstehen konkrete Routinen, Verantwortlichkeiten und Arbeitsformate.',
  },
  {
    title: 'Verankern',
    text: 'Steuerung funktioniert nur, wenn sie wiederholbar wird und im Büroalltag tragfähig bleibt.',
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
        <SiteHeader navigate={navigate} currentPath={currentPath} />
        {currentPage.path === '/ansatz' ? (
          <ApproachPage />
        ) : currentPage.path === '/leistungen' ? (
          <ServicesPage navigate={navigate} />
        ) : currentPage.path === '/ueber-mich' ? (
          <AboutPage />
        ) : currentPage.path === '/kontakt' ? (
          <ContactPage />
        ) : currentPage.path === '/wissen' ? (
          <KnowledgePage />
        ) : (
          <section className="empty-page" aria-label={currentPage.label}></section>
        )}
        <SiteFooter navigate={navigate} />
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero" id="top">
        <SiteHeader navigate={navigate} currentPath={currentPath} />

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
            Studio Benign macht diese Zusammenhänge sichtbar - als Arbeitsgrundlage für
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
            und organisatorischer Klarheit - für den realen Büroalltag.
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
          <a className="button primary" href="mailto:nicolenikonenko@gmail.com?subject=Erstgespräch%20Studio%20Benign">
            Erstgespräch vereinbaren <span>→</span>
          </a>
        </article>
      </section>

      <section className="knowledge-anchor" id="wissen" aria-label="Wissen"></section>

      <SiteFooter navigate={navigate} />
    </main>
  )
}

type SiteHeaderProps = {
  navigate: (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void
  currentPath: string
}

function SiteHeader({ navigate, currentPath }: SiteHeaderProps) {
  return (
    <header className="site-header" aria-label="Hauptnavigation">
      <a className="brand-lockup" href="/" onClick={navigate('/')} aria-label="Studio Benign Startseite">
        <span className="wordmark">Studio Benign</span>
        <span>Bürosteuerung für Architektur- und Planungsbüros</span>
      </a>
      <nav className="nav-links" aria-label="Seitennavigation">
        {pages.map((page) => (
          <a
            className={currentPath === page.path ? 'is-active' : undefined}
            href={page.path}
            onClick={navigate(page.path)}
            key={page.path}
          >
            {page.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

type SiteFooterProps = {
  navigate: (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void
}

function SiteFooter({ navigate }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div>
        <span className="wordmark">Studio Benign</span>
        <p>Bürosteuerung für Architektur- und Planungsbüros</p>
        <p>Klarheit in Zahlen.<br />Struktur im Alltag.<br />Spielraum für gute Architektur.</p>
        <small>Studio Benign 2026</small>
      </div>
      <div>
        <h4>Kontakt</h4>
        <a href="mailto:nicolenikonenko@gmail.com">nicolenikonenko@gmail.com</a>
        <a href="tel:+436706074388">+43 6706074388</a>
        <span>INNSBRUCK</span>
      </div>
      <div className="legal-links">
        <a href="/kontakt" onClick={navigate('/kontakt')}>Impressum</a>
        <a href="/kontakt" onClick={navigate('/kontakt')}>Datenschutz</a>
      </div>
    </footer>
  )
}

type ServicesPageProps = {
  navigate: (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void
}

function ServicesPage({ navigate }: ServicesPageProps) {
  return (
    <section className="services-page" aria-labelledby="services-title">
      <div className="services-hero">
        <div className="services-intro">
          <p className="kicker">Leistungen</p>
          <h1 id="services-title">
            Drei Zugänge.<br />
            Für bessere<br />
            Bürosteuerung.
          </h1>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>
            Studio Benign arbeitet mit drei Zugängen, die sich in Tiefe, Ziel und
            Verbindlichkeit unterscheiden - je nach Ausgangslage, Fragestellung und
            gewünschtem nächstem Schritt.
          </p>
        </div>
        <img className="services-hero-image" src="/images/leistungen.png" alt="" />
      </div>

      <div className="service-format-list">
        {serviceFormats.map((format) => (
          <article className="service-format" key={format.number}>
            <div className="service-format-main">
              <span className="service-number">{format.number}</span>
              <h2>{format.title}</h2>
              <p className="service-subtitle">{format.subtitle}</p>
              <p>{format.text}</p>
              <a href="/kontakt" onClick={navigate('/kontakt')}>
                {format.cta} <span>→</span>
              </a>
            </div>

            <div className="service-format-details">
              {format.details.map((detail) => (
                <div className="service-detail" key={detail.label}>
                  <h3>{detail.label}</h3>
                  <p>{detail.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <aside className="services-callout">
        <div>
          <h2>Welcher Einstieg passt zu Ihrem Büro?</h2>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>
            In einem unverbindlichen Erstgespräch klären wir gemeinsam, welche Fragen
            aktuell im Vordergrund stehen und welcher nächste Schritt sinnvoll ist.
          </p>
          <a href="/kontakt" onClick={navigate('/kontakt')}>
            Erstgespräch vereinbaren <span>→</span>
          </a>
        </div>
        <div>
          <p>
            Mehr über Arbeitsweise, Erfahrung und Hintergrund erfahren Sie hier:
          </p>
          <a href="/ueber-mich" onClick={navigate('/ueber-mich')}>
            Über mich <span>→</span>
          </a>
        </div>
      </aside>
    </section>
  )
}

function ApproachPage() {
  return (
    <section className="approach-page" aria-labelledby="approach-title">
      <div className="approach-intro">
        <p className="kicker">Ansatz</p>
        <h1 id="approach-title">
          Steuerungslogik schafft Orientierung.<br />
          Struktur entlastet Führung.
        </h1>
        <span className="accent-rule" aria-hidden="true"></span>
        <div>
          <p>
            Architektur- und Planungsbüros führen komplexe Projekte, lange
            Leistungszeiträume und viele parallele Abstimmungen zusammen. Damit Führung
            im Alltag nicht nur reagiert, braucht es klare Zusammenhänge, wiederholbare
            Routinen und verlässliche Verantwortlichkeiten.
          </p>
          <p className="approach-intro-followup">
            Studio Benign entwickelt dafür tragfähige Steuerungsstrukturen: praxisnah,
            architekturbürospezifisch und anschlussfähig an den realen Büroalltag.
          </p>
        </div>
      </div>

      <div className="approach-section-list">
        {approachSections.map((section) => (
          <article className="approach-section" key={section.title}>
            <div className="approach-section-heading">
              <h2>{section.title}</h2>
            </div>
            <div>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="approach-workflow" aria-labelledby="workflow-title">
        <h2 id="workflow-title">Arbeitsweise</h2>
        <div>
          {workflowSteps.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-goal" aria-labelledby="goal-title">
        <h2 id="goal-title">Ziel</h2>
        <div>
          <p>
            Das Ziel ist ein Büro, das wirtschaftliche, organisatorische und operative
            Zusammenhänge rechtzeitig erkennt, einordnet und in klare Entscheidungen
            übersetzt.
          </p>
          <p>
            Projekte werden bewusster geführt, Verantwortlichkeiten sind nachvollziehbar
            und Kapazitäten realistisch einschätzbar. So entsteht Steuerungsfähigkeit:
            als Grundlage für ruhigere Entscheidungen, klarere Prioritäten und eine
            Büroorganisation, die fachliche Arbeit trägt.
          </p>
        </div>
      </section>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <div className="about-page-hero">
        <div className="about-page-copy">
          <p className="kicker">Über mich</p>
          <p className="about-name">Nicole Lilly Nikonenko</p>
          <h1 id="about-title">
            Aus der Büropraxis.<br />
            Mit Verständnis für Architektur.<br />
            Und Blick für Steuerung.
          </h1>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>
            Meine fachliche Perspektive entsteht aus einer ungewöhnlichen Verbindung:
            Architekturstudium und Planungspraxis, betriebswirtschaftliche Ausbildung,
            Promotion in Architekturtheorie sowie mehrjährige Erfahrung in Finance
            Management, Controlling und Büroorganisation.
          </p>
          <p>
            Ich kenne Architektur- und Planungsbüros aus unterschiedlichen Rollen: als
            Architektin, als kaufmännisch mitverantwortliche Schnittstelle, als
            Controllerin und als Dozentin für Architekturtheorie, Baubetriebswirtschaft
            und Controlling.
          </p>
          <p>
            Diese Kombination prägt meine Arbeit: analytisch, strukturiert, praxisnah
            und mit Verständnis für die Realität kleiner und mittelgroßer Büros.
          </p>
        </div>
        <div className="about-page-portrait" aria-label="Portrait"></div>
      </div>

      <div className="about-page-sections">
        <article>
          <h2>Fachlicher Hintergrund</h2>
          <ul>
            <li>
              <h3>Architektur &amp; Planungspraxis</h3>
              <p>Masterstudium Architektur und praktische Erfahrung als Architektin. Vertraut mit Projektarbeit, Leistungsphasen, Abstimmungen und Büroalltag.</p>
            </li>
            <li>
              <h3>Wirtschaft &amp; Steuerung</h3>
              <p>Bachelorstudium Betriebswirtschaft sowie mehrjährige Erfahrung in Finance Management, Controlling, Ressourcenplanung, Budgetsplanung und Büroorganisation.</p>
            </li>
            <li>
              <h3>Urban Design &amp; Architekturtheorie</h3>
              <p>Promotion im Bereich Urban Design zur Frage, wie Architektur, Eigentumsverhältnisse und organisatorische Strukturen städtischen Raum prägen.</p>
            </li>
            <li>
              <h3>Lehre &amp; Vermittlung</h3>
              <p>Dozentin für Architekturtheorie, Baubetriebswirtschaft und Controlling. Erfahrung darin, komplexe Zusammenhänge verständlich und praxisnah zu vermitteln.</p>
            </li>
          </ul>
        </article>

        <article>
          <h2>Was daraus entsteht</h2>
          <p>
            Eine Beratungsperspektive, die Architektur versteht, wirtschaftliche
            Zusammenhänge einordnet und gewachsene Bürostrukturen ernst nimmt.
          </p>
        </article>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-card">
        <p className="kicker">Kontakt</p>
        <h1 id="contact-title">Nicole Lilly Nikonenko</h1>
        <p className="contact-credentials">Dipl.-Ing., PhD, BBA</p>
        <span className="accent-rule" aria-hidden="true"></span>
        <div className="contact-links">
          <a href="mailto:nicolenikonenko@gmail.com">nicolenikonenko@gmail.com</a>
          <a href="tel:+436706074388">+43 6706074388</a>
        </div>
      </div>
    </section>
  )
}

function KnowledgePage() {
  return (
    <section className="knowledge-page" aria-labelledby="knowledge-title">
      <div className="knowledge-card">
        <p className="kicker">Wissen</p>
        <h1 id="knowledge-title">... wird bald folgen</h1>
        <span className="accent-rule" aria-hidden="true"></span>
        <ul>
          <li>Vorlagen</li>
          <li>Impulse für Büros</li>
          <li>Report-Beispiele</li>
        </ul>
      </div>
    </section>
  )
}

export default App
