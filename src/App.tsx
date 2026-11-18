import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { business, services, workingSteps, type Audience } from './content'
import EnquiryForm from './EnquiryForm'
import { initMotion, scrollToTarget } from './motion'
import { ArchLine, Arrow, ButtonArrow, Logo, Photo } from './visuals'

const navigation = [
  { href: '#services', label: 'Services', section: 'services' },
  { href: '#employers', label: 'For employers', section: 'employers' },
  { href: '#candidates', label: 'For candidates', section: 'candidates' },
  { href: '#enquiry', label: 'Start a conversation', section: 'enquiry' },
]

/** Delay for a reveal, in milliseconds. */
const delay = (ms: number) => ({ '--delay': ms + 'ms' }) as CSSProperties

function followsInPlace(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

/** A masked line for heading reveals. Text stays in the DOM and readable without motion. */
function Line({ children, i = 0, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <span className={'line ' + className}>
      <span className="line-inner" style={{ '--i': i } as CSSProperties}>{children}</span>
    </span>
  )
}

const pad = (value: number) => String(value).padStart(2, '0')

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [previousService, setPreviousService] = useState<number | null>(null)
  const [audience, setAudience] = useState<Audience | ''>('')
  const [enquiryRequest, setEnquiryRequest] = useState(0)
  const [currentSection, setCurrentSection] = useState('')
  const menuDialog = useRef<HTMLDialogElement>(null)
  const afterMenuClose = useRef<(() => void) | null>(null)

  useEffect(() => initMotion(), [])

  // Track the section in view so the menu can mark the reader's place.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setCurrentSection(entry.target.getAttribute('data-section') ?? '')
      }
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const dialog = menuDialog.current
    if (!dialog) return
    let cancelled = false
    let frame = 0
    if (menuOpen) {
      afterMenuClose.current = null
      document.documentElement.classList.add('menu-open')
      if (!dialog.open) dialog.showModal()
      // Establish the closed pose before the first frame, including on a cold load.
      void dialog.getBoundingClientRect()
      frame = requestAnimationFrame(() => { dialog.dataset.expanded = 'true' })
    } else if (dialog.open) {
      dialog.dataset.expanded = 'false'
      // Keep the modal, focus trap and scroll lock until the actual exit finishes.
      // Interrupted transitions reject; both completion paths still settle safely.
      const animations = dialog.getAnimations({ subtree: true })
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        if (!cancelled) dialog.close()
      })
    }
    return () => { cancelled = true; cancelAnimationFrame(frame) }
  }, [menuOpen])

  useEffect(() => () => document.documentElement.classList.remove('menu-open'), [])

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (!followsInPlace(event)) return
    event.preventDefault()
    const hash = event.currentTarget.hash
    const wasOpen = menuDialog.current?.open
    const go = () => {
      const target = document.getElementById(hash.slice(1))
      if (hash === '#main') {
        // Skip link: move focus past the header without moving the page.
        target?.focus({ preventScroll: true })
        return
      }
      // Scroll the whole section into place, then focus its heading for keyboard and screen reader users.
      const frame = target?.closest<HTMLElement>('section') ?? target
      target?.focus({ preventScroll: true })
      scrollToTarget(hash === '#top' ? null : frame)
      try { history.replaceState(null, '', hash) } catch { /* Embedded previews use an isolated origin. */ }
    }
    // Start the destination scroll only after the modal releases its scroll lock.
    if (wasOpen) {
      afterMenuClose.current = go
      setMenuOpen(false)
    }
    else requestAnimationFrame(go)
  }

  function enquire(event: MouseEvent<HTMLAnchorElement>, choice: Audience) {
    if (!followsInPlace(event)) return
    setAudience(choice)
    setEnquiryRequest((request) => request + 1)
    navigate(event)
  }

  function chooseService(index: number) {
    if (index === activeService) return
    setPreviousService(activeService)
    setActiveService(index)
  }

  return (
    <>
      <a className="skip-link" href="#main" onClick={navigate}>Skip to content</a>
      <header className="site-header">
        <div className="frame header-inner">
          <a className="brand" href="#top" aria-label={business.name + ' home'} onClick={navigate}>
            <Logo />
          </a>
          <div className="header-actions">
            <a className="header-link" href="#enquiry" onClick={(event) => enquire(event, 'Employer')}>
              <span>Hiring enquiry</span>
            </a>
            <button className="menu-trigger" type="button" aria-label="Open menu"
              aria-expanded={menuOpen} aria-controls="navigation-dialog" aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}>
              <span className="menu-word">Menu</span>
              <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
        <span className="page-progress" aria-hidden="true" />
      </header>

      <dialog className="navigation-dialog" id="navigation-dialog" ref={menuDialog}
        aria-label="Explore Wattlebridge"
        onCancel={(event) => { event.preventDefault(); setMenuOpen(false) }}
        onClose={() => {
          document.documentElement.classList.remove('menu-open')
          setMenuOpen(false)
          const go = afterMenuClose.current
          afterMenuClose.current = null
          go?.()
        }}
        onClick={(event) => { if (event.target === event.currentTarget) setMenuOpen(false) }}>
        <div className="menu-top">
            <div className="frame menu-header">
              <a className="brand" href="#top" aria-label={business.name + ' home'} onClick={navigate}><Logo /><span aria-hidden="true"><Logo reversed /></span></a>
              <button className="menu-trigger menu-close" type="button" aria-label="Close menu" autoFocus onClick={() => setMenuOpen(false)}>
                <span className="menu-word">Close</span>
                <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
              </button>
            </div>
        </div>
        <div className="menu-panel">
          <div className="frame menu-shell">
            <div className="menu-body">
              <nav className="menu-navigation" aria-label="Primary">
                {navigation.map(({ href, label, section }, index) => (
                  <a key={href} href={href} onClick={navigate} style={{ '--i': index } as CSSProperties}
                    aria-current={currentSection === section ? 'location' : undefined}>
                    <span className="menu-index">{pad(index + 1)}</span>
                    <span className="menu-label"><span>{label}</span></span>
                    <Arrow />
                  </a>
                ))}
              </nav>
              <aside className="menu-aside">
                <figure className="menu-photo">
                  <Photo name="recruitment-discussion" widths={[640, 1160]} sizes="22vw"
                    width="1160" height="773" loading="eager" fetchPriority="low" alt="" />
                </figure>
                <address className="menu-contact">
                  <a href={business.telephoneHref}>{business.telephone}</a>
                  <a href={'mailto:' + business.email}>{business.email}</a>
                </address>
              </aside>
            </div>
            <div className="menu-footer">
              <p><span className="dot" aria-hidden="true" />Perth, Western Australia</p>
              <a className="text-link text-link-light" href="#enquiry" onClick={(event) => enquire(event, 'Candidate')}>
                Make a candidate enquiry <Arrow />
              </a>
            </div>
          </div>
        </div>
      </dialog>

      <main id="main" tabIndex={-1}>
        {/* ---------------- Hero ---------------- */}
        <section className="hero" id="top" tabIndex={-1} aria-labelledby="hero-title" data-section="top">
          <div className="frame hero-grid">
            <p className="eyebrow hero-eyebrow" data-reveal="fade"><span className="dot" aria-hidden="true" />Perth, Western Australia</p>
            <h1 id="hero-title" className="hero-title" data-reveal="lines">
              <Line i={0}>IT and technical</Line>{' '}
              <Line i={1}>recruitment</Line>{' '}
              <Line i={2} className="hero-title-tail">built around your team</Line>
            </h1>
            <div className="hero-copy">
              <p className="hero-intro" data-reveal="fade" style={delay(200)}>
                Wattlebridge Technical Recruitment helps employers across Perth and Western Australia recruit IT and
                technical professionals for permanent and contract roles.
              </p>
              <p className="hero-belief" data-reveal="fade" style={delay(260)}>
                We start by understanding the work, the team and the skills that matter.
              </p>
              <div className="hero-actions" data-reveal="fade" style={delay(320)}>
                <a className="button button-primary" href="#services" onClick={navigate}>
                  Explore employer services <ButtonArrow />
                </a>
                <a className="text-link" href="#candidates" onClick={navigate}>For candidates <Arrow /></a>
              </div>
            </div>
            <div className="hero-art">
              <figure className="arch arch-main" data-reveal="mask" style={delay(120)}>
                <div className="arch-media depth-slow">
                  <Photo name="technical-collaboration-portrait" widths={[640, 960, 1280]}
                    sizes="(max-width: 599px) 54vw, (max-width: 1023px) 52vw, 27vw" width="1280" height="1772"
                    fetchPriority="high" alt="Two colleagues reviewing work together in a sunlit office" />
                </div>
              </figure>
              <figure className="arch arch-side" data-reveal="mask" style={delay(260)}>
                <div className="arch-media depth-fast">
                  <Photo name="infrastructure-specialist-portrait" widths={[420, 640]}
                    sizes="(max-width: 599px) 40vw, (max-width: 1023px) 38vw, 19vw" width="640" height="1024"
                    fetchPriority="high" alt="A technical professional working at a server rack" />
                </div>
              </figure>
              <span className="hero-rule" data-reveal="rule" style={delay(420)} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ---------------- Services ---------------- */}
        <section className="services" aria-labelledby="services" data-section="services">
          <div className="frame">
            <div className="section-head services-head">
              <p className="eyebrow" data-reveal="fade"><span className="dot" aria-hidden="true" />What we do</p>
              <h2 id="services" tabIndex={-1} className="display" data-reveal="lines">
                <Line>Our services</Line>
              </h2>
              <p className="section-intro" data-reveal="fade" style={delay(160)}>
                Have a role to fill or a hiring challenge to work through? Explore our recruitment services and tell
                us what your team needs.
              </p>
            </div>

            <div className="services-layout">
              <div className="services-visual" data-reveal="mask">
                <div className="services-frame" data-scroll>
                  {services.map(({ image, imageAlt }, index) => (
                    <figure className="services-photo" key={image}
                      data-state={activeService === index ? 'active' : previousService === index ? 'previous' : 'idle'}
                      aria-hidden={activeService !== index}>
                      <div className="services-media">
                        <Photo name={image} widths={[640, 1160]} sizes="(max-width: 767px) 90vw, 36vw"
                          width="1160" height="773" loading="lazy" alt={imageAlt} />
                      </div>
                    </figure>
                  ))}
                </div>
                <p className="services-count" aria-hidden="true">
                  <span className="services-count-current" key={activeService}>{pad(activeService + 1)}</span>
                  <span className="services-count-total">/ {pad(services.length)}</span>
                </p>
              </div>

              <div className="service-list">
                {services.map(({ name, description }, index) => {
                  const open = activeService === index
                  return (
                    <div className="service-item" key={name} data-open={open} data-reveal="fade" style={delay(index * 90)}>
                      <h3>
                        <button id={'service-button-' + index} type="button" aria-expanded={open}
                          aria-controls={'service-panel-' + index} onClick={() => chooseService(index)}>
                          <span className="service-index" aria-hidden="true">{pad(index + 1)}</span>
                          <span className="service-name">{name}</span>
                          <span className="service-toggle" aria-hidden="true" />
                        </button>
                      </h3>
                      <div className="service-panel" id={'service-panel-' + index} role="region"
                        aria-labelledby={'service-button-' + index} inert={!open}>
                        <div className="service-panel-inner">
                          <p>{description}</p>
                          <a className="text-link" href="#enquiry" onClick={(event) => enquire(event, 'Employer')}>
                            Discuss a hiring need <Arrow />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Employers ---------------- */}
        <section className="employer" aria-labelledby="employers" data-section="employers">
          <div className="frame employer-layout">
            <p className="eyebrow employer-eyebrow" data-reveal="fade"><span className="dot" aria-hidden="true" />For employers</p>
            <h2 id="employers" tabIndex={-1} className="display employer-title" data-reveal="lines">
              <Line i={0}>A clearer</Line>{' '}
              <Line i={1} className="accent">starting point.</Line>
            </h2>
            <figure className="employer-photo" data-reveal="wipe">
              <div className="employer-media depth-slow">
                <Photo name="recruitment-discussion" widths={[640, 1160]}
                  sizes="(max-width: 767px) calc(100vw - 40px), 52vw"
                  width="1160" height="773" loading="lazy"
                  alt="Two people discussing notes around a table" />
              </div>
            </figure>
            <div className="employer-copy">
              <p data-reveal="fade" style={delay(120)}>
                A useful recruitment conversation begins with a clear brief. We discuss the responsibilities, team
                context and practical requirements before agreeing the approach. From the first discussion through to
                interviews and feedback, we keep the next steps clear.
              </p>
              <div data-reveal="fade" style={delay(220)}>
                <a className="button button-primary" href="#enquiry" onClick={(event) => enquire(event, 'Employer')}>
                  Discuss a hiring need <ButtonArrow />
                </a>
              </div>
            </div>
          </div>

          <div className="frame process" aria-labelledby="process-title">
            <div className="process-head">
              <h3 id="process-title" className="process-title" data-reveal="lines"><Line>How we work</Line></h3>
            </div>
            <ol className="process-list" data-scroll>
              {workingSteps.map(({ title, description }, index) => (
                <li className="process-step" key={title} data-reveal="fade" style={delay(index * 110)}>
                  <span className="process-number" aria-hidden="true">{pad(index + 1)}</span>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- Place: ivory turns to forest ---------------- */}
        <section className="place" aria-label="Perth, Western Australia">
          <figure className="place-figure" data-scroll>
            {[0, 1].map((arch) => <div className="place-window" key={arch} aria-hidden={arch === 1 ? true : undefined}>
              <div className="place-media">
                <Photo name="perth-riverfront" widths={[960, 1536]} sizes="100vw"
                  width="1536" height="1024" loading="lazy"
                  alt={arch === 0 ? "The Perth city skyline across the river on a clear day" : ""} />
              </div>
            </div>)}
            <figcaption className="frame place-caption">
              <p className="eyebrow eyebrow-light" data-reveal="fade"><span className="dot" aria-hidden="true" />Perth, Western Australia</p>
              <p className="place-line" data-reveal="lines">
                <Line i={0}>IT and technical recruitment</Line>{' '}
                <Line i={1}>across Perth and Western Australia.</Line>
              </p>
            </figcaption>
          </figure>
        </section>

        {/* ---------------- Candidates ---------------- */}
        <section className="candidate" aria-labelledby="candidates" data-section="candidates">
          <div className="frame candidate-layout">
            <div className="candidate-copy">
              <p className="eyebrow eyebrow-light" data-reveal="fade"><span className="dot" aria-hidden="true" />For candidates</p>
              <h2 id="candidates" tabIndex={-1} className="display" data-reveal="lines">
                <Line i={0}>Considering</Line>{' '}
                <Line i={1}>your next</Line>{' '}
                <Line i={2} className="accent">technical role?</Line>
              </h2>
              <p data-reveal="fade" style={delay(160)}>
                Tell us about your experience and the opportunities that interest you. We welcome conversations with
                IT and technical professionals across Western Australia.
              </p>
              <div data-reveal="fade" style={delay(240)}>
                <a className="button button-light" href="#enquiry" onClick={(event) => enquire(event, 'Candidate')}>
                  Make a candidate enquiry <ButtonArrow />
                </a>
              </div>
            </div>
            <div className="candidate-art" data-scroll>
              <div className="candidate-outline" data-reveal="draw" style={delay(200)}><ArchLine /></div>
              <figure className="candidate-photo" data-reveal="mask">
                <div className="candidate-media depth-slow">
                  <Photo name="candidate-workspace" widths={[520, 1000]}
                    sizes="(max-width: 767px) 78vw, 34vw"
                    width="1000" height="1250" loading="lazy"
                    alt="A woman working at a laptop beside a bright window" />
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------- Enquiry ---------------- */}
        <section className="enquiry" aria-labelledby="enquiry" data-section="enquiry">
          <div className="frame enquiry-layout">
            <div className="enquiry-copy">
              <p className="eyebrow" data-reveal="fade"><span className="dot" aria-hidden="true" />Enquiries</p>
              <h2 id="enquiry" tabIndex={-1} className="display" data-reveal="lines">
                <Line i={0}>Start a</Line>{' '}
                <Line i={1} className="accent">conversation.</Line>
              </h2>
              <p data-reveal="fade" style={delay(140)}>
                Tell us what you would like to discuss. Whether you are recruiting for your team or considering your
                next technical role, select the option that best describes you and leave a short message.
              </p>
              <p className="test-guidance" id="test-guidance" data-reveal="fade" style={delay(220)}>
                <strong>This is an assessment demonstration.</strong> Use test details only. Please do not include
                sensitive personal information or attach a CV. Submissions are saved in this browser only and are not
                emailed or sent anywhere.
              </p>
            </div>
            <div className="enquiry-form-wrap" data-reveal="fade" style={delay(180)}>
              <EnquiryForm audience={audience} setAudience={setAudience} request={enquiryRequest} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="frame">
          <div className="footer-layout">
            <div className="footer-brand">
              <a className="brand" href="#top" aria-label={business.name + ' home'} onClick={navigate}>
                <Logo reversed />
              </a>
              <p className="footer-description">{business.footer}</p>
            </div>
            <div className="footer-contact">
              <h2>Contact</h2>
              <address>
                <a href={business.telephoneHref}>{business.telephone}</a>
                <a href={'mailto:' + business.email}>{business.email}</a>
                <span>{business.address}</span>
              </address>
            </div>
            <div className="footer-hours">
              <h2>Business hours</h2>
              <p>{business.hours}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Assessment demonstration</p>
            <a className="text-link text-link-light" href="#top" onClick={navigate}>Back to top <Arrow direction="up" /></a>
          </div>
        </div>
      </footer>
    </>
  )
}
