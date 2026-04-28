import './App.css'

const problems = [
  'Projekte laufen, aber der wirtschaftliche Stand ist nicht eindeutig.',
  'Stunden werden erfasst, aber selten konsequent mit Honorar, Leistungsstand und Forecast verbunden.',
  'Nachträge, Zusatzleistungen oder offene Stunden sind fachlich bekannt, aber organisatorisch nicht sauber nachverfolgt.',
  'Die Auslastung ist hoch, trotzdem bleibt unklar, welche Projekte tatsächlich tragen.',
  'Liquidität wird beobachtet, aber nicht immer früh genug mit Rechnungsstellung, offenen Forderungen und Projektfortschritt verknüpft.',
  'Verantwortlichkeiten sind im Alltag oft gewachsen, aber nicht klar genug verteilt.',
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
  return (
    <main className="page-shell">
      <section className="hero" id="top">
        <header className="site-header" aria-label="Hauptnavigation">
          <a className="brand-lockup" href="#top" aria-label="Studio Benign Startseite">
            <span className="wordmark">Studio Benign</span>
            <span>Bürosteuerung für Architektur- und Planungsbüros</span>
          </a>
          <nav className="nav-links" aria-label="Seitennavigation">
            <a href="#ansatz">Ansatz</a>
            <a href="#audit">Klarheits-Audit</a>
            <a href="#themen">Themen</a>
            <a href="#ueber-mich">Über mich</a>
            <a href="#wissen">Wissen</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <a className="nav-cta" href="#kontakt">Erstgespräch <span>→</span></a>
        </header>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>Klarheit in Zahlen. Struktur im Alltag. Spielraum für gute <em>Architektur.</em></h1>
            <span className="accent-rule" aria-hidden="true"></span>
            <p>
              Ich unterstütze Architektur- und Planungsbüros dabei, ihre wirtschaftliche,
              organisatorische und operative Steuerung so zu ordnen, dass Projekte,
              Kapazitäten und Entscheidungen besser zusammenfinden.
            </p>
            <div className="button-row">
              <a className="button primary" href="#audit">Klarheits-Audit kennenlernen <span>→</span></a>
              <a className="button ghost" href="#ansatz">Ansatz ansehen <span>→</span></a>
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
            Nicht jedes Büro braucht mehr Kontrolle. Viele Büros brauchen vor allem
            bessere Zusammenhänge zwischen Honorar, Stunden, Projektstand, Liquidität,
            Kapazität und Verantwortung.
          </p>
          <p>
            Studio Benign macht diese Zusammenhänge sichtbar und übersetzt sie in eine
            klare Arbeitsgrundlage für Führung, Projektleitung und Büroorganisation.
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

      <section className="audit-strip" id="audit">
        <article className="audit-copy">
          <p className="kicker">Leistungen</p>
          <h2>Drei Zugänge zu besserer Bürosteuerung.</h2>
          <p>
            Fachvorträge schaffen Orientierung. Praxisworkshops sortieren konkrete
            Steuerungsthemen. Beratungsaufträge beginnen mit dem Büro-Klarheits-Audit
            und führen von der Standortbestimmung in konkrete Routinen für Projekte,
            Honorare, Rechnungen, Liquidität, Kapazitäten und Verantwortlichkeiten.
          </p>
          <a className="button primary" href="#kontakt">Leistungen ansehen <span>→</span></a>
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
          <a href="#ansatz">Mehr über den Ansatz →</a>
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

      <section className="knowledge-anchor" id="wissen" aria-label="Wissen">
        <span>Wissen: Artikel, Vorlagen, Impulse für Büros und Report-Beispiele.</span>
      </section>

      <footer className="site-footer">
        <div>
          <span className="wordmark">Studio Benign</span>
          <p>Bürosteuerung für Architektur- und Planungsbüros</p>
          <p>Klarheit in Zahlen.<br />Struktur im Alltag.<br />Spielraum für gute Architektur.</p>
          <small>Studio Benign 2026</small>
        </div>
        <div>
          <h4>Navigation</h4>
          <a href="#ansatz">Ansatz</a>
          <a href="#audit">Klarheits-Audit</a>
          <a href="#themen">Themen</a>
          <a href="#ueber-mich">Über mich</a>
          <a href="#wissen">Wissen</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <div>
          <h4>Wissen</h4>
          <a href="#wissen">Artikel</a>
          <a href="#wissen">Vorlagen</a>
          <a href="#wissen">Impulse für Büros</a>
          <a href="#wissen">Report-Beispiele</a>
        </div>
        <div>
          <h4>Kontakt</h4>
          <a href="mailto:hallo@studiobenign.com">hallo@studiobenign.com</a>
          <a href="tel:+436706074388">+43 6706074388</a>
          <span>INNSBRUCK</span>
        </div>
        <div className="legal-links">
          <a href="#kontakt">Impressum</a>
          <a href="#kontakt">Datenschutz</a>
        </div>
      </footer>
    </main>
  )
}

export default App
