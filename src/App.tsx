import { type MouseEvent, useEffect, useState } from 'react'
import './App.css'

type Lang = 'de' | 'en'

const pagePaths = ['/ansatz', '/leistungen', '/wissen', '/ueber-mich', '/kontakt'] as const
type PagePath = (typeof pagePaths)[number]

const content = {
  de: {
    brandLine: 'Bürosteuerung für Architektur- und Planungsbüros',
    nav: {
      '/ansatz': 'Ansatz',
      '/leistungen': 'Leistungen',
      '/wissen': 'Wissen',
      '/ueber-mich': 'Über mich',
      '/kontakt': 'Kontakt',
    },
    hero: {
      title: ['Klarheit in Zahlen.', 'Struktur im Alltag.', 'Spielraum für gute', 'Architektur.'],
      text: 'Ich unterstütze Architektur- und Planungsbüros dabei, ihre wirtschaftliche, organisatorische und operative Steuerung belastbarer zu strukturieren.',
      primary: 'Leistungen',
      secondary: 'Ansatz ansehen',
    },
    landing: {
      benefitKicker: 'Worum es geht',
      benefitTitle: ['Steuerbarkeit, Überblick &', 'mehr Sicherheit in', 'Entscheidungen.'],
      benefitText: [
        'Viele Büros brauchen klarere Zusammenhänge zwischen Projekten, Kapazitäten, Verantwortung und Entscheidungen.',
        'Studio Benign macht diese Zusammenhänge sichtbar - als Arbeitsgrundlage für Führung, Projektleitung und Büroorganisation.',
      ],
      problemKicker: 'Aus dem Büroalltag',
      problems: [
        'Informationen sind vorhanden, aber sie kommen nicht immer zu einem gemeinsamen Bild zusammen.',
        'Projekte, Kapazitäten und Zuständigkeiten werden oft parallel abgestimmt.',
        'Entscheidungen entstehen im laufenden Alltag - zwischen Projektarbeit, Terminen, Rechnungen und Teamfragen.',
        'Besprechungen klären vieles, brauchen aber verlässliche nächste Schritte.',
        'Führung, Projektleitung und Büroorganisation benötigen dafür einen gemeinsamen Blick auf das, was ansteht.',
      ],
      topicsKicker: 'Themenfelder',
      topics: [
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
      ],
      servicesKicker: 'Leistungen',
      servicesTitle: ['Drei Zugänge zu besserer', 'Bürosteuerung.'],
      servicesText: 'Fachvorträge geben Orientierung. Praxisworkshops sortieren konkrete Themen. Beratungsaufträge verbinden Analyse, Struktur und Umsetzung.',
      servicesButton: 'Leistungen ansehen',
      aboutKicker: 'Über Studio Benign',
      aboutTitle: ['Aus der Büropraxis.', 'Mit Verständnis für Architektur.', 'Und Blick für Zahlen.'],
      aboutText: [
        'Studio Benign entsteht aus der praktischen Arbeit an der Schnittstelle von Architektur, Finanzen, Controlling, Projektadministration und Büroorganisation.',
        'Die Arbeit verbindet architektonisches Verständnis mit wirtschaftlicher Analyse und organisatorischer Klarheit - für den realen Büroalltag.',
      ],
      aboutLink: 'Mehr über den Ansatz',
      contactKicker: 'Nächster Schritt',
      contactTitle: ['Ein unverbindliches', 'Erstgespräch klärt,'],
      contactText: 'welche Fragen aktuell im Vordergrund stehen und welcher Einstieg sinnvoll ist.',
      contactButton: 'Erstgespräch vereinbaren',
    },
    approach: {
      kicker: 'Ansatz',
      title: ['Steuerungslogik schafft Orientierung.', 'Struktur entlastet Führung.'],
      intro: [
        'Architektur- und Planungsbüros führen komplexe Projekte, lange Leistungszeiträume und viele parallele Abstimmungen zusammen. Damit Führung im Alltag nicht nur reagiert, braucht es klare Zusammenhänge, wiederholbare Routinen und verlässliche Verantwortlichkeiten.',
        'Studio Benign entwickelt dafür tragfähige Steuerungsstrukturen: praxisnah, architekturbürospezifisch und anschlussfähig an den realen Büroalltag.',
      ],
      sections: [
        {
          title: 'Was Bürosteuerung bedeutet',
          paragraphs: [
            'Bürosteuerung macht wirtschaftliche, organisatorische und operative Zusammenhänge sichtbar. Sie verbindet Projekte, Kapazitäten, Verantwortung und Entscheidungen zu einem gemeinsamen Blick auf das Büro.',
            'So entsteht Orientierung für Geschäftsführung, Projektleitung und Büroorganisation - nicht als zusätzliche Kontrolle, sondern als Grundlage für bessere Entscheidungen.',
          ],
        },
        {
          title: 'Warum Zusammenhänge zählen',
          paragraphs: [
            'Projektstände, Honorare, Stunden, Rechnungen, Kapazitäten und Verantwortlichkeiten haben nur begrenzten Wert, wenn sie nebeneinanderstehen.',
            'Steuerungsfähigkeit entsteht, wenn daraus ein gemeinsames Bild des Büros wird.',
          ],
        },
        {
          title: 'Wie Struktur Führung entlastet',
          paragraphs: [
            'Führung im Planungsbüro findet oft parallel zum Projektalltag statt: zwischen Bauherrenabstimmungen, Teamfragen, Rechnungen, Terminen, Kapazitäten und kurzfristigen Entscheidungen.',
            'Gute Strukturen geben diesen Themen einen festen Ort. Sie schaffen Übersicht, klären Verantwortlichkeiten und machen nächste Schritte nachvollziehbar - ohne den Büroalltag unnötig zu verkomplizieren.',
          ],
        },
      ],
      workflowKicker: 'Arbeitsweise',
      workflow: [
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
      ],
      goalKicker: 'Ziel',
      goal: [
        'Das Ziel ist ein Büro, das wirtschaftliche, organisatorische und operative Zusammenhänge rechtzeitig erkennt, einordnet und in klare Entscheidungen übersetzt.',
        'Projekte werden bewusster geführt, Verantwortlichkeiten sind nachvollziehbar und Kapazitäten realistisch einschätzbar. So entsteht Steuerungsfähigkeit: als Grundlage für ruhigere Entscheidungen, klarere Prioritäten und eine Büroorganisation, die fachliche Arbeit trägt.',
      ],
    },
    services: {
      kicker: 'Leistungen',
      title: ['Drei Zugänge.', 'Für bessere', 'Bürosteuerung.'],
      intro: 'Studio Benign arbeitet mit drei Zugängen, die sich in Tiefe, Ziel und Verbindlichkeit unterscheiden - je nach Ausgangslage, Fragestellung und gewünschtem nächstem Schritt.',
      formats: [
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
      ],
      calloutTitle: 'Welcher Einstieg passt zu Ihrem Büro?',
      calloutText: 'In einem unverbindlichen Erstgespräch klären wir gemeinsam, welche Fragen aktuell im Vordergrund stehen und welcher nächste Schritt sinnvoll ist.',
      calloutButton: 'Erstgespräch vereinbaren',
      aboutText: 'Mehr über Arbeitsweise, Erfahrung und Hintergrund erfahren Sie hier:',
      aboutButton: 'Über mich',
    },
    about: {
      kicker: 'Über mich',
      name: 'Nicole Lilly Nikonenko',
      title: ['Aus der Büropraxis.', 'Mit Verständnis für Architektur.', 'Und Blick für Steuerung.'],
      intro: [
        'Meine fachliche Perspektive entsteht aus einer ungewöhnlichen Verbindung: Architekturstudium und Planungspraxis, betriebswirtschaftliche Ausbildung, Promotion in Urban Design sowie mehrjährige Erfahrung in Finance Management, Controlling und Büroorganisation.',
        'Ich kenne Architektur- und Planungsbüros aus unterschiedlichen Rollen: als Architektin, als kaufmännisch mitverantwortliche Schnittstelle, als Controllerin und als Dozentin für Architekturtheorie, Baubetriebswirtschaft und Controlling.',
        'Diese Kombination prägt meine Arbeit: analytisch, strukturiert, praxisnah und mit Verständnis für die Realität kleiner und mittelgroßer Büros.',
      ],
      backgroundKicker: 'Fachlicher Hintergrund',
      background: [
        {
          title: 'Architektur & Planungspraxis',
          text: 'Masterstudium Architektur und praktische Erfahrung als Architektin. Vertraut mit Projektarbeit, Leistungsphasen, Abstimmungen und Büroalltag.',
        },
        {
          title: 'Wirtschaft & Steuerung',
          text: 'Bachelorstudium Betriebswirtschaft sowie mehrjährige Erfahrung in Finance Management, Controlling, Ressourcenplanung, Budgetplanung und Büroorganisation.',
        },
        {
          title: 'Urban Design & Architekturtheorie',
          text: 'Promotion im Bereich Urban Design zur Frage, wie Architektur, Eigentumsverhältnisse und organisatorische Strukturen städtischen Raum prägen.',
        },
        {
          title: 'Lehre & Vermittlung',
          text: 'Dozentin für Architekturtheorie, Baubetriebswirtschaft und Controlling. Erfahrung darin, komplexe Zusammenhänge verständlich und praxisnah zu vermitteln.',
        },
      ],
      resultKicker: 'Was daraus entsteht',
      result: 'Eine Beratungsperspektive, die Architektur versteht, wirtschaftliche Zusammenhänge einordnet und gewachsene Bürostrukturen ernst nimmt.',
    },
    contact: {
      kicker: 'Kontakt',
      credentials: 'Dipl.-Ing., PhD, BBA',
      note: 'Für Fragen, Anfragen oder ein erstes Gespräch erreichen Sie mich gerne per E-Mail oder Telefon.',
    },
    knowledge: {
      kicker: 'Wissen',
      title: '... wird bald folgen',
      items: ['Vorlagen', 'Impulse für Büros', 'Report-Beispiele'],
    },
    footer: {
      contact: 'Kontakt',
      legal: ['Impressum', 'Datenschutz'],
      copyright: 'Studio Benign 2026',
    },
  },
  en: {
    brandLine: 'Business steering for architecture and planning practices',
    nav: {
      '/ansatz': 'Approach',
      '/leistungen': 'Services',
      '/wissen': 'Insights',
      '/ueber-mich': 'About',
      '/kontakt': 'Contact',
    },
    hero: {
      title: ['Clarity in numbers.', 'Structure in daily work.', 'Space for good', 'architecture.'],
      text: 'I support architecture and planning practices in building more robust economic, organisational and operational steering structures.',
      primary: 'Services',
      secondary: 'View approach',
    },
    landing: {
      benefitKicker: 'What this is about',
      benefitTitle: ['Steerability, overview &', 'greater confidence in', 'decisions.'],
      benefitText: [
        'Many practices need clearer links between projects, capacity, responsibility and decisions.',
        'Studio Benign makes these links visible - as a working basis for leadership, project management and office organisation.',
      ],
      problemKicker: 'From everyday practice',
      problems: [
        'Information exists, but it does not always come together into one shared picture.',
        'Projects, capacities and responsibilities are often coordinated in parallel.',
        'Decisions emerge in day-to-day work - between project tasks, deadlines, invoices and team questions.',
        'Meetings clarify many things, but they need reliable next steps.',
        'Leadership, project management and office organisation need a shared view of what is coming up.',
      ],
      topicsKicker: 'Focus areas',
      topics: [
        {
          number: '01',
          title: 'Economic transparency',
          text: 'Information is interpreted in a way that makes decisions, priorities and next steps clearer.',
        },
        {
          number: '02',
          title: 'Project steering',
          text: 'Projects become readable from a professional, economic and organisational perspective - with a view to performance, effort and action needs.',
        },
        {
          number: '03',
          title: 'Capacity and allocation',
          text: 'Project load, deadlines and available time are considered together so bottlenecks become visible earlier.',
        },
        {
          number: '04',
          title: 'Responsibility and routines',
          text: 'Responsibilities, meetings and next steps are guided more clearly so steering becomes more reliable in everyday work.',
        },
      ],
      servicesKicker: 'Services',
      servicesTitle: ['Three ways to improve', 'practice steering.'],
      servicesText: 'Talks provide orientation. Practice workshops sort out concrete issues. Consulting assignments combine analysis, structure and implementation.',
      servicesButton: 'View services',
      aboutKicker: 'About Studio Benign',
      aboutTitle: ['From practice.', 'With an understanding of architecture.', 'And an eye for steering.'],
      aboutText: [
        'Studio Benign grows out of practical work at the intersection of architecture, finance, controlling, project administration and office organisation.',
        'The work combines architectural understanding with economic analysis and organisational clarity - for the realities of everyday practice.',
      ],
      aboutLink: 'More about the approach',
      contactKicker: 'Next step',
      contactTitle: ['An initial conversation', 'will clarify,'],
      contactText: 'which questions are currently most relevant and which starting point makes sense.',
      contactButton: 'Arrange an initial call',
    },
    approach: {
      kicker: 'Approach',
      title: ['Steering logic creates orientation.', 'Structure relieves leadership.'],
      intro: [
        'Architecture and planning practices bring together complex projects, long service phases and many parallel coordination processes. For leadership to do more than react in daily work, practices need clear connections, repeatable routines and reliable responsibilities.',
        'Studio Benign develops robust steering structures for this: practical, specific to architecture practices and connected to the realities of everyday office work.',
      ],
      sections: [
        {
          title: 'What practice steering means',
          paragraphs: [
            'Practice steering makes economic, organisational and operational relationships visible. It connects projects, capacity, responsibility and decisions into a shared view of the office.',
            'This creates orientation for leadership, project management and office organisation - not as additional control, but as a basis for better decisions.',
          ],
        },
        {
          title: 'Why connections matter',
          paragraphs: [
            'Project status, fees, hours, invoices, capacity and responsibilities have limited value if they remain side by side.',
            'A practice becomes steerable when these elements form one shared picture of the office.',
          ],
        },
        {
          title: 'How structure relieves leadership',
          paragraphs: [
            'Leadership in planning practices often happens alongside project work: between client coordination, team questions, invoices, deadlines, capacity and short-term decisions.',
            'Good structures give these issues a fixed place. They create overview, clarify responsibilities and make next steps traceable - without overcomplicating everyday work.',
          ],
        },
      ],
      workflowKicker: 'Working method',
      workflow: [
        {
          title: 'Understand',
          text: 'How does the practice actually work? Which projects are active, how are fees and hours tracked, how are invoices created, who makes decisions and where does information get stuck?',
        },
        {
          title: 'Make visible',
          text: 'Existing information is brought together and translated into a clear, traceable structure.',
        },
        {
          title: 'Assess',
          text: 'Risks, gaps and fields of action are evaluated by urgency, impact and feasibility.',
        },
        {
          title: 'Structure',
          text: 'The analysis leads to concrete routines, responsibilities and working formats.',
        },
        {
          title: 'Anchor',
          text: 'Steering only works when it becomes repeatable and sustainable in everyday office life.',
        },
      ],
      goalKicker: 'Goal',
      goal: [
        'The goal is a practice that recognises, interprets and translates economic, organisational and operational relationships into clear decisions in good time.',
        'Projects are managed more consciously, responsibilities are traceable and capacity can be assessed realistically. This creates steerability: as a basis for calmer decisions, clearer priorities and an office organisation that supports professional work.',
      ],
    },
    services: {
      kicker: 'Services',
      title: ['Three ways.', 'For better', 'practice steering.'],
      intro: 'Studio Benign works with three service formats that differ in depth, objective and level of commitment - depending on the current situation, question and desired next step.',
      formats: [
        {
          number: '01',
          title: 'Talks',
          subtitle: 'Orientation for new perspectives.',
          text: 'Compact impulses on economic, organisational and operational steering in architecture and planning practices.',
          cta: 'Enquire about a talk',
          details: [
            {
              label: 'Suitable for',
              text: 'Practice owners, partners, project leads, chambers, networks, universities, professional events and internal strategy days.',
            },
            {
              label: 'Typical topics',
              text: 'Practice steering in planning work, construction business management for planners, economic thinking in day-to-day office work and the interface between project work, billing, controlling and office organisation.',
            },
            {
              label: 'Outcome',
              text: 'Orientation, shared terminology and a clearer understanding of steering topics within the practice.',
            },
          ],
        },
        {
          number: '02',
          title: 'Practice workshops',
          subtitle: 'Clarification for concrete steering issues.',
          text: 'A concrete steering topic is sorted out together, relationships are made visible and a practical working logic is developed.',
          cta: 'Discuss a workshop',
          details: [
            {
              label: 'Suitable for',
              text: 'Practices with a clearly recognisable issue, but without a sustainable routine yet.',
            },
            {
              label: 'Typical topics',
              text: 'Project meetings, responsibilities, billing and change-order routines, capacity coordination, follow-up of measures and decision paths.',
            },
            {
              label: 'Outcome',
              text: 'A concrete working basis with clear relationships, responsibilities and next steps.',
            },
          ],
        },
        {
          number: '03',
          title: 'Consulting assignment & implementation support',
          subtitle: 'Structure for robust practice steering.',
          text: 'Analysis, prioritisation and support in building reliable steering structures. The Practice Clarity Audit provides the structured entry point.',
          cta: 'Discuss a consulting assignment',
          details: [
            {
              label: 'Suitable for',
              text: 'Practices that want to develop their economic, organisational and operational steering in a targeted way - with a clear view of projects, responsibility, capacity and decisions.',
            },
            {
              label: 'Typical topics',
              text: 'Practice Clarity Audit, project steering, fee and hours logic, billing and liquidity routines, capacity planning, responsibilities, management routines and internal processes.',
            },
            {
              label: 'Outcome',
              text: 'Audit report, prioritised fields of action, implementable roadmap and concrete routines for everyday office work.',
            },
          ],
        },
      ],
      calloutTitle: 'Which starting point suits your practice?',
      calloutText: 'In a non-binding initial conversation, we clarify which questions are currently most important and which next step makes sense.',
      calloutButton: 'Arrange an initial call',
      aboutText: 'Learn more about working method, experience and background here:',
      aboutButton: 'About',
    },
    about: {
      kicker: 'About',
      name: 'Nicole Lilly Nikonenko',
      title: ['From practice.', 'With an understanding of architecture.', 'And an eye for steering.'],
      intro: [
        'My professional perspective comes from an unusual combination: architectural studies and planning practice, business education, a PhD in Urban Design and several years of experience in finance management, controlling and office organisation.',
        'I know architecture and planning practices from different roles: as an architect, as a commercially responsible interface, as a controller and as a lecturer in architectural theory, construction business management and controlling.',
        'This combination shapes my work: analytical, structured, practical and grounded in the realities of small and medium-sized practices.',
      ],
      backgroundKicker: 'Professional background',
      background: [
        {
          title: 'Architecture & planning practice',
          text: 'Master’s degree in architecture and practical experience as an architect. Familiar with project work, service phases, coordination processes and everyday office life.',
        },
        {
          title: 'Business & steering',
          text: 'Bachelor’s degree in business administration and several years of experience in finance management, controlling, resource planning, budget planning and office organisation.',
        },
        {
          title: 'Urban Design & architectural theory',
          text: 'PhD in Urban Design focusing on how architecture, ownership structures and organisational structures shape urban space.',
        },
        {
          title: 'Teaching & communication',
          text: 'Lecturer in architectural theory, construction business management and controlling. Experienced in communicating complex relationships clearly and practically.',
        },
      ],
      resultKicker: 'What this creates',
      result: 'A consulting perspective that understands architecture, interprets economic relationships and takes grown office structures seriously.',
    },
    contact: {
      kicker: 'Contact',
      credentials: 'Dipl.-Ing., PhD, BBA',
      note: 'For questions, enquiries or an initial conversation, you are welcome to contact me by email or phone.',
    },
    knowledge: {
      kicker: 'Insights',
      title: '... coming soon',
      items: ['Templates', 'Impulses for practices', 'Report examples'],
    },
    footer: {
      contact: 'Contact',
      legal: ['Legal notice', 'Privacy'],
      copyright: 'Studio Benign 2026',
    },
  },
} satisfies Record<Lang, Record<string, unknown>>

function getInitialLanguage(): Lang {
  const storedLanguage = window.localStorage.getItem('studio-benign-language')
  return storedLanguage === 'en' ? 'en' : 'de'
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [language, setLanguage] = useState<Lang>(getInitialLanguage)
  const copy = content[language]
  const pages = pagePaths.map((path) => ({ path, label: copy.nav[path] }))

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('studio-benign-language', language)
    document.documentElement.lang = language
  }, [language])

  const navigate = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo(0, 0)
  }

  const currentPage = pages.find((page) => page.path === currentPath)
  const shellProps = { copy, navigate }

  if (currentPage) {
    return (
      <main className="page-shell">
        <SiteHeader
          copy={copy}
          currentPath={currentPath}
          language={language}
          navigate={navigate}
          pages={pages}
          setLanguage={setLanguage}
        />
        {currentPage.path === '/ansatz' ? (
          <ApproachPage copy={copy} />
        ) : currentPage.path === '/leistungen' ? (
          <ServicesPage {...shellProps} />
        ) : currentPage.path === '/ueber-mich' ? (
          <AboutPage copy={copy} />
        ) : currentPage.path === '/kontakt' ? (
          <ContactPage copy={copy} />
        ) : currentPage.path === '/wissen' ? (
          <KnowledgePage copy={copy} />
        ) : (
          <section className="empty-page" aria-label={currentPage.label}></section>
        )}
        <SiteFooter {...shellProps} />
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero" id="top">
        <SiteHeader
          copy={copy}
          currentPath={currentPath}
          language={language}
          navigate={navigate}
          pages={pages}
          setLanguage={setLanguage}
        />

        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              {copy.hero.title[0]}<br />
              {copy.hero.title[1]}<br />
              {copy.hero.title[2]}<br />
              <em>{copy.hero.title[3]}</em>
            </h1>
            <span className="accent-rule" aria-hidden="true"></span>
            <p>{copy.hero.text}</p>
            <div className="button-row">
              <a className="button primary" href="/leistungen" onClick={navigate('/leistungen')}>{copy.hero.primary} <span>→</span></a>
              <a className="button ghost" href="/ansatz" onClick={navigate('/ansatz')}>{copy.hero.secondary} <span>→</span></a>
            </div>
          </div>
          <div className="image-placeholder hero-image" aria-label="Editorial still life placeholder">
            <span>Hero image placeholder</span>
          </div>
        </div>
      </section>

      <section className="two-column-section" id="ansatz">
        <article className="benefit-panel">
          <p className="kicker">{copy.landing.benefitKicker}</p>
          <h2>
            {copy.landing.benefitTitle[0]}<br />
            {copy.landing.benefitTitle[1]}<br />
            {copy.landing.benefitTitle[2]}
          </h2>
          {copy.landing.benefitText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article className="problem-panel">
          <p className="kicker">{copy.landing.problemKicker}</p>
          <ul>
            {copy.landing.problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="topics-section" id="themen">
        <p className="kicker">{copy.landing.topicsKicker}</p>
        <div className="topic-grid">
          {copy.landing.topics.map((topic) => (
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
          <p className="kicker">{copy.landing.servicesKicker}</p>
          <h2>
            {copy.landing.servicesTitle[0]}<br />
            {copy.landing.servicesTitle[1]}
          </h2>
          <p>{copy.landing.servicesText}</p>
          <a className="button primary" href="/kontakt" onClick={navigate('/kontakt')}>{copy.landing.servicesButton} <span>→</span></a>
        </article>
        <div className="image-placeholder audit-image" aria-label="Audit report placeholder">
          <span>Audit report placeholder</span>
        </div>
      </section>

      <section className="about-contact-row">
        <div className="image-placeholder portrait-image" aria-label="Portrait placeholder">
          <span>Portrait placeholder</span>
        </div>
        <article className="about-panel" id="ueber-mich">
          <p className="kicker">{copy.landing.aboutKicker}</p>
          <h2>
            {copy.landing.aboutTitle[0]}<br />
            {copy.landing.aboutTitle[1]}<br />
            {copy.landing.aboutTitle[2]}
          </h2>
          {copy.landing.aboutText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a href="/ansatz" onClick={navigate('/ansatz')}>{copy.landing.aboutLink} →</a>
        </article>
        <article className="contact-panel" id="kontakt">
          <p className="kicker">{copy.landing.contactKicker}</p>
          <h2>
            {copy.landing.contactTitle[0]}<br />
            {copy.landing.contactTitle[1]}
          </h2>
          <p>{copy.landing.contactText}</p>
          <a className="button primary" href="mailto:nicolenikonenko@gmail.com?subject=Studio%20Benign">
            {copy.landing.contactButton} <span>→</span>
          </a>
        </article>
      </section>

      <section className="knowledge-anchor" id="wissen" aria-label={copy.nav['/wissen']}></section>

      <SiteFooter {...shellProps} />
    </main>
  )
}

type Copy = (typeof content)[Lang]

type NavPage = {
  path: PagePath
  label: string
}

type SiteHeaderProps = {
  copy: Copy
  currentPath: string
  language: Lang
  navigate: (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void
  pages: NavPage[]
  setLanguage: (language: Lang) => void
}

function SiteHeader({ copy, currentPath, language, navigate, pages, setLanguage }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigate = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false)
    navigate(path)(event)
  }

  return (
    <header className={`site-header${isMenuOpen ? ' is-menu-open' : ''}`} aria-label="Main navigation">
      <a className="brand-lockup" href="/" onClick={handleNavigate('/')} aria-label="Studio Benign home">
        <span className="wordmark">Studio Benign</span>
        <span>{copy.brandLine}</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className="nav-links" id="site-navigation" aria-label="Page navigation">
        {pages.map((page) => (
          <a
            className={currentPath === page.path ? 'is-active' : undefined}
            href={page.path}
            onClick={handleNavigate(page.path)}
            key={page.path}
          >
            {page.label}
          </a>
        ))}
      </nav>
      <div className="language-toggle" aria-label="Language selection">
        <button
          className={language === 'de' ? 'is-active' : undefined}
          type="button"
          onClick={() => {
            setIsMenuOpen(false)
            setLanguage('de')
          }}
        >
          DE
        </button>
        <span aria-hidden="true">/</span>
        <button
          className={language === 'en' ? 'is-active' : undefined}
          type="button"
          onClick={() => {
            setIsMenuOpen(false)
            setLanguage('en')
          }}
        >
          EN
        </button>
      </div>
    </header>
  )
}

type SharedPageProps = {
  copy: Copy
  navigate: (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void
}

function SiteFooter({ copy, navigate }: SharedPageProps) {
  return (
    <footer className="site-footer">
      <div>
        <span className="wordmark">Studio Benign</span>
        <p>{copy.brandLine}</p>
        <p>{copy.hero.title[0]}<br />{copy.hero.title[1]}<br />{copy.hero.title[2]} {copy.hero.title[3]}</p>
        <small>{copy.footer.copyright}</small>
      </div>
      <div>
        <h4>{copy.footer.contact}</h4>
        <a href="mailto:nicolenikonenko@gmail.com">nicolenikonenko@gmail.com</a>
        <a href="tel:+436706074388">+43 6706074388</a>
        <span>INNSBRUCK</span>
      </div>
      <div className="legal-links">
        <a href="/kontakt" onClick={navigate('/kontakt')}>{copy.footer.legal[0]}</a>
        <a href="/kontakt" onClick={navigate('/kontakt')}>{copy.footer.legal[1]}</a>
      </div>
    </footer>
  )
}

function ServicesPage({ copy, navigate }: SharedPageProps) {
  return (
    <section className="services-page" aria-labelledby="services-title">
      <div className="services-hero">
        <div className="services-intro">
          <p className="kicker">{copy.services.kicker}</p>
          <h1 id="services-title">
            {copy.services.title[0]}<br />
            {copy.services.title[1]}<br />
            {copy.services.title[2]}
          </h1>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>{copy.services.intro}</p>
        </div>
        <img className="services-hero-image" src="/images/leistungen.png" alt="" />
      </div>

      <div className="service-format-list">
        {copy.services.formats.map((format) => (
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
          <h2>{copy.services.calloutTitle}</h2>
          <span className="accent-rule" aria-hidden="true"></span>
          <p>{copy.services.calloutText}</p>
          <a href="/kontakt" onClick={navigate('/kontakt')}>
            {copy.services.calloutButton} <span>→</span>
          </a>
        </div>
        <div>
          <p>{copy.services.aboutText}</p>
          <a href="/ueber-mich" onClick={navigate('/ueber-mich')}>
            {copy.services.aboutButton} <span>→</span>
          </a>
        </div>
      </aside>
    </section>
  )
}

function ApproachPage({ copy }: Pick<SharedPageProps, 'copy'>) {
  return (
    <section className="approach-page" aria-labelledby="approach-title">
      <div className="approach-intro">
        <p className="kicker">{copy.approach.kicker}</p>
        <h1 id="approach-title">
          {copy.approach.title[0]}<br />
          {copy.approach.title[1]}
        </h1>
        <span className="accent-rule" aria-hidden="true"></span>
        <div>
          <p>{copy.approach.intro[0]}</p>
          <p className="approach-intro-followup">{copy.approach.intro[1]}</p>
        </div>
      </div>

      <div className="approach-section-list">
        {copy.approach.sections.map((section) => (
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
        <h2 id="workflow-title">{copy.approach.workflowKicker}</h2>
        <div>
          {copy.approach.workflow.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-goal" aria-labelledby="goal-title">
        <h2 id="goal-title">{copy.approach.goalKicker}</h2>
        <div>
          {copy.approach.goal.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </section>
  )
}

function AboutPage({ copy }: Pick<SharedPageProps, 'copy'>) {
  return (
    <section className="about-page" aria-labelledby="about-title">
      <div className="about-page-hero">
        <div className="about-page-copy">
          <p className="kicker">{copy.about.kicker}</p>
          <p className="about-name">{copy.about.name}</p>
          <h1 id="about-title">
            {copy.about.title[0]}<br />
            {copy.about.title[1]}<br />
            {copy.about.title[2]}
          </h1>
          <span className="accent-rule" aria-hidden="true"></span>
          {copy.about.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-page-portrait" aria-label="Portrait"></div>
      </div>

      <div className="about-page-sections">
        <article>
          <h2>{copy.about.backgroundKicker}</h2>
          <ul>
            {copy.about.background.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </article>

        <article>
          <h2>{copy.about.resultKicker}</h2>
          <p>{copy.about.result}</p>
        </article>
      </div>
    </section>
  )
}

function ContactPage({ copy }: Pick<SharedPageProps, 'copy'>) {
  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-card">
        <p className="kicker">{copy.contact.kicker}</p>
        <h1 id="contact-title">{copy.about.name}</h1>
        <p className="contact-credentials">{copy.contact.credentials}</p>
        <span className="accent-rule" aria-hidden="true"></span>
        <p className="contact-note">{copy.contact.note}</p>
        <div className="contact-links">
          <a href="mailto:nicolenikonenko@gmail.com">nicolenikonenko@gmail.com</a>
          <a href="tel:+436706074388">+43 6706074388</a>
        </div>
      </div>
    </section>
  )
}

function KnowledgePage({ copy }: Pick<SharedPageProps, 'copy'>) {
  return (
    <section className="knowledge-page" aria-labelledby="knowledge-title">
      <div className="knowledge-card">
        <p className="kicker">{copy.knowledge.kicker}</p>
        <h1 id="knowledge-title">{copy.knowledge.title}</h1>
        <span className="accent-rule" aria-hidden="true"></span>
        <ul>
          {copy.knowledge.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default App
