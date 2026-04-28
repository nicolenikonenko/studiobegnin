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

const serviceFormats = [
  {
    number: '01',
    title: 'Fachvorträge',
    subtitle: 'Orientierung für neue Perspektiven.',
    text: 'Kompakte Impulse für ein gemeinsames Verständnis zentraler Steuerungsthemen im Architektur- und Planungsbüro.',
    cta: 'Vortrag anfragen',
    details: [
      {
        label: 'Geeignet für',
        text: 'Büroinhaber:innen, Partner:innen, Projektleitungen, Netzwerke, Veranstaltungsthemen und interne Strategietage.',
      },
      {
        label: 'Typische Themen',
        text: 'Wie Büros wirtschaftliche, organisatorische und operative Fragen besser zusammenführen: Projekte, Honorare, Stunden, Rollen, Kapazitäten, Besprechungsformate und Entscheidungen.',
      },
      {
        label: 'Ergebnis',
        text: 'Ein gemeinsames Verständnis und eine Sprache für Steuerungsthemen im Büro.',
      },
    ],
  },
  {
    number: '02',
    title: 'Praxisworkshops',
    subtitle: 'Klärung für konkrete Themen.',
    text: 'Gemeinsam ein Steuerungsthema sortieren, Ursachen verstehen und eine praktikable Arbeitslogik entwickeln.',
    cta: 'Workshop besprechen',
    details: [
      {
        label: 'Geeignet für',
        text: 'Büros mit einem klar erkennbaren Thema, aber noch ohne tragfähige Routine.',
      },
      {
        label: 'Typische Themen',
        text: 'Konkrete Arbeitsroutinen im Büroalltag: Projektbesprechungen, Zuständigkeiten, Rechnungs- und Nachtragsprozesse, Kapazitätsabstimmung, Maßnahmenverfolgung und Entscheidungswege.',
      },
      {
        label: 'Ergebnis',
        text: 'Eine konkrete Arbeitsgrundlage mit klaren Zusammenhängen, Zuständigkeiten und nächsten Schritten.',
      },
    ],
  },
  {
    number: '03',
    title: 'Büro-Klarheits-Audit & Beratung',
    subtitle: 'Umsetzung für nachhaltige Steuerung.',
    text: 'Strukturierte Einschätzung und Begleitung bei der Umsetzung einer belastbaren Bürosteuerung.',
    cta: 'Audit kennenlernen',
    details: [
      {
        label: 'Geeignet für',
        text: 'Büros, die ihre Steuerungsfähigkeit gesamthaft prüfen und priorisierte nächste Schritte ableiten möchten.',
      },
      {
        label: 'Typische Themen',
        text: 'Das Zusammenspiel von Bürostruktur, Projektsteuerung, Verantwortung, Kapazität, Liquidität, Honorarlogik, Managementroutinen und internen Abläufen.',
      },
      {
        label: 'Ergebnis',
        text: 'Audit-Report mit Einschätzung, Handlungsfeldern und einem klaren Fahrplan für die Umsetzung.',
      },
    ],
  },
]

const approachSections = [
  {
    title: 'Was Bürosteuerung bedeutet',
    paragraphs: [
      'Bürosteuerung heißt, wirtschaftliche, operative und organisatorische Zusammenhänge so sichtbar zu machen, dass Entscheidungen rechtzeitig und nachvollziehbar getroffen werden können.',
      'Im Architektur- und Planungsbüro betrifft das nicht nur Zahlen. Es betrifft das Zusammenspiel von Projekten, Leistungsständen, Honoraren, Stunden, Rechnungen, offenen Leistungen, Liquidität, Kapazitäten und Verantwortlichkeiten.',
      'Ein Büro ist steuerungsfähig, wenn nicht erst im Rückblick deutlich wird, welche Projekte wirtschaftlich getragen haben, welche Leistungen nicht abgerechnet wurden oder welche Personen dauerhaft überlastet waren.',
    ],
  },
  {
    title: 'Keine Softwareberatung',
    paragraphs: [
      'Studio Benign beginnt nicht mit der Frage, welches Tool ein Büro braucht.',
      'Software kann helfen, Informationen zugänglich zu machen. Sie ersetzt aber keine klare Steuerungslogik: Welche Informationen sind relevant? Wer pflegt sie? Wann werden sie besprochen? Wer entscheidet? Was passiert, wenn ein Projekt kippt?',
      'Deshalb steht am Anfang nicht die Systemfrage, sondern die Führungsfrage.',
    ],
  },
  {
    title: 'Keine klassische Controllingberatung',
    paragraphs: [
      'Controlling im Architektur- und Planungsbüro darf nicht bei Auswertungen stehen bleiben.',
      'Eine BWA, eine Stundenliste oder eine Projektübersicht entfalten erst dann Wirkung, wenn sie in den Büroalltag übersetzt werden: in Projektbesprechungen, Rechnungsroutinen, Kapazitätsplanung, Nachtragsklärung und Verantwortlichkeiten.',
      'Studio Benign betrachtet Zahlen deshalb nicht isoliert, sondern im Zusammenhang mit Projektlogik, Leistungsphasen, Honorarstruktur, Büroorganisation und Entscheidungspraxis.',
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
        ) : (
          <section className="empty-page" aria-label={currentPage.label}></section>
        )}
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
            Drei Formate.<br />
            Für bessere Bürosteuerung.
          </h1>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>
            Studio Benign arbeitet mit drei Leistungsformaten, die sich in Tiefe und Ziel
            unterscheiden — je nach Ausgangslage, Fragestellung und gewünschtem Einstieg.
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
          <h2>Welches Format passt zu Ihrem Büro?</h2>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>
            In einem unverbindlichen Erstgespräch klären wir gemeinsam, welcher Einstieg
            für Ihre aktuelle Situation sinnvoll ist.
          </p>
          <a href="/kontakt" onClick={navigate('/kontakt')}>
            Erstgespräch vereinbaren <span>→</span>
          </a>
        </div>
        <div>
          <p>
            Mehr über Arbeitsweise, Erfahrung und Hintergrund erfahren Sie
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
          Bürosteuerung beginnt<br />
          nicht bei Zahlen.<br />
          Sondern bei Zusammenhängen.
        </h1>
        <span className="accent-rule" aria-hidden="true"></span>
        <div>
          <p>
            Viele Architektur- und Planungsbüros verfügen bereits über zahlreiche
            Informationen: Projektlisten, Stundenstände, Honorarvereinbarungen,
            Rechnungen, offene Forderungen, Kapazitätsplanungen oder
            betriebswirtschaftliche Auswertungen.
          </p>
          <p>
            Die eigentliche Herausforderung liegt oft nicht darin, noch mehr Daten zu
            erfassen. Entscheidend ist, ob diese Informationen regelmäßig
            zusammengeführt, richtig eingeordnet und für Entscheidungen genutzt werden.
          </p>
          <p>
            Studio Benign unterstützt Architektur- und Planungsbüros dabei, aus
            vorhandenen Informationen ein klares Steuerungsbild zu entwickeln — für
            Geschäftsführung, Projektleitung und Büroorganisation.
          </p>
        </div>
      </div>

      <div className="approach-section-list">
        {approachSections.map((section) => (
          <article className="approach-section" key={section.title}>
            <h2>{section.title}</h2>
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
            Das Ziel ist nicht einfach ein Controllingsystem und keine zusätzliche
            Bürokratie.
          </p>
          <p>
            Das Ziel ist ein Büro, das regelmäßig erkennen kann, welche Projekte stabil
            laufen, wo Risiken entstehen, welche Leistungen nachverfolgt werden müssen,
            welche Kapazitäten verfügbar sind und welche Entscheidungen anstehen.
          </p>
          <p>
            So entsteht Steuerungsfähigkeit: nicht als Kontrolle von außen, sondern als
            Entlastung für Geschäftsführung, Projektleitung und Büroorganisation.
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
            Und Blick für Zahlen.
          </h1>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>
            Meine Arbeit verbindet Architekturpraxis, Finanzen, Controlling,
            Betriebswirtschaft, Forschung und Lehre. Ich kenne Architektur- und
            Planungsbüros aus der fachlichen Arbeit, aus der wirtschaftlichen Steuerung
            und aus der Vermittlung komplexer Zusammenhänge.
          </p>
          <p>
            Studio Benign setzt dort an, wo Bürorealität entsteht: bei Projekten,
            Honoraren, Stunden, Rechnungen, Kapazitäten, Verantwortlichkeiten und
            Entscheidungen.
          </p>
        </div>
        <div className="about-page-portrait" aria-label="Portrait"></div>
      </div>

      <div className="about-page-sections">
        <article>
          <h2>Fachlicher Hintergrund</h2>
          <ul>
            <li>Masterstudium Architektur</li>
            <li>Promotion in Urban Design</li>
            <li>Bachelorstudium Betriebswirtschaft</li>
            <li>7 Jahre Erfahrung in Architekturpraxis, Finance Management, Controlling und Büroorganisation</li>
            <li>Lehrtätigkeit in Architekturtheorie, Baubetriebswirtschaft und Controlling</li>
          </ul>
        </article>

        <article>
          <h2>Was daraus entsteht</h2>
          <p>
            Eine Beratung, die Architektur- und Planungsbüros nicht nur über Zahlen
            betrachtet, sondern über Projekte, Routinen, Verantwortlichkeiten und
            Entscheidungen.
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
        <span className="accent-rule" aria-hidden="true"></span>
        <div className="contact-links">
          <a href="mailto:nicolenikonenko@gmail.com">nicolenikonenko@gmail.com</a>
          <a href="tel:+436706074388">+43 6706074388</a>
        </div>
      </div>
    </section>
  )
}

export default App
