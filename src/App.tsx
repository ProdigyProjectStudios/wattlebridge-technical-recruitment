import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { business, services, type Audience } from './content'
import EnquiryForm from './EnquiryForm'
import { Arrow, Logo, Photo } from './visuals'

const navigation = [
  { href: '#services', label: 'Services' },
  { href: '#employers', label: 'For employers' },
  { href: '#candidates', label: 'For candidates' },
]

function followsInPlace(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}


export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [audience, setAudience] = useState<Audience | ''>('')
  const [enquiryRequest, setEnquiryRequest] = useState(0)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = menuDialog.current
    if (!dialog) return
    if (menuOpen) dialog.showModal()
    else dialog.close()
    const previousOverflow = document.documentElement.style.overflow
    if (menuOpen) document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = previousOverflow }
  }, [menuOpen])

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (!followsInPlace(event)) return
    event.preventDefault()
    const hash = event.currentTarget.hash
    setMenuOpen(false)
    menuDialog.current?.close()
    requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
      target?.focus({ preventScroll: true })
      target?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      })
      try { history.replaceState(null, '', hash) } catch { /* Embedded previews use an isolated origin. */ }
    })
  }

  function enquire(event: MouseEvent<HTMLAnchorElement>, choice: Audience) {
    if (!followsInPlace(event)) return
    setAudience(choice)
    setEnquiryRequest((request) => request + 1)
    navigate(event)
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
            <a className="text-link header-hiring" href="#enquiry" onClick={(event) => enquire(event, 'Employer')}>
              Hiring enquiry <Arrow />
            </a>
            <button className="menu-trigger" type="button" ref={menuButton}
              aria-expanded={menuOpen} aria-controls="navigation-dialog" aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}>
              <span>Menu</span><span className="menu-orbit" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <dialog className="navigation-dialog" id="navigation-dialog" ref={menuDialog}
        aria-label="Explore Wattlebridge" onCancel={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}>
        <div className="frame menu-shell">
          <div className="menu-header">
            <a className="brand" href="#top" aria-label={business.name + ' home'} onClick={navigate}><Logo reversed /></a>
            <button className="menu-trigger menu-close" type="button" autoFocus onClick={() => setMenuOpen(false)}>
              <span>Close</span><span className="menu-orbit" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
          <div className="menu-body">
            <div>
              <p className="section-label"><span />Technical recruitment</p>
              <nav className="menu-navigation" aria-label="Primary">
                {navigation.map(({ href, label }, index) => (
                  <a key={href} href={href} onClick={navigate} style={{ transitionDelay: menuOpen ? (index * 65 + 100) + 'ms' : '0ms' }}>
                    <span>{label}</span><Arrow />
                  </a>
                ))}
                <a href="#enquiry" onClick={navigate} style={{ transitionDelay: menuOpen ? '295ms' : '0ms' }}>
                  <span>Start a conversation</span><Arrow />
                </a>
              </nav>
            </div>
            <figure className="menu-photo">
              <Photo name="recruitment-discussion" widths={[640, 1160]} sizes="35vw"
                width="1160" height="773" loading="lazy" alt="Two people discussing notes around a table" />
            </figure>
          </div>
          <div className="menu-footer">
            <p>Perth, Western Australia</p>
            <a href="#enquiry" onClick={(event) => enquire(event, 'Candidate')}>Make a candidate enquiry <Arrow /></a>
          </div>
        </div>
      </dialog>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" tabIndex={-1} aria-labelledby="hero-title">
          <div className="frame hero-inner">
            <div className="hero-topline">
              <p className="section-label"><span />Perth, Western Australia</p>
              <a className="text-link hero-toplink" href="#candidates" onClick={navigate}>For candidates <Arrow /></a>
            </div>
            <h1 id="hero-title">
              <span className="hero-title-first">IT and technical</span>{' '}
              <span className="hero-title-second">recruitment</span>{' '}
              <span className="hero-title-tail">built around<br /> your team</span>
            </h1>
            <div className="hero-copy">
              <p className="hero-intro">
                Wattlebridge Technical Recruitment helps employers across Perth and Western Australia recruit IT and
                technical professionals for permanent and contract roles.
              </p>
              <p className="hero-belief">We start by understanding the work, the team and the skills that matter.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#services" onClick={navigate}>Explore employer services <Arrow /></a>
              </div>
            </div>
            <div className="hero-art">
              <div className="hero-photo">
                <Photo name="technical-collaboration" widths={[720, 1080, 1560]}
                  sizes="(max-width: 680px) 60vw, 38vw" width="1560" height="1333" fetchPriority="high"
                  alt="Two colleagues reviewing work together in a sunlit office" />
              </div>
              <div className="hero-photo hero-photo-secondary">
                <Photo name="infrastructure-specialist" widths={[640, 1160]}
                  sizes="(max-width: 680px) 36vw, 23vw" width="1160" height="773" fetchPriority="high"
                  alt="A technical professional working at a server rack" />
              </div>
              <div className="hero-image-rule" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="services" aria-labelledby="services">
          <div className="frame">
            <div className="services-heading">
              <h2 id="services" tabIndex={-1}>Our services</h2>
              <p>Have a role to fill or a hiring challenge to work through? Explore our recruitment services and tell us what your team needs.</p>
            </div>

            <div className="services-layout">
              <div className="services-image-stack">
                {services.map(({ image, imageAlt }, index) => (
                  <figure className="services-photo" key={image} data-active={activeService === index} aria-hidden={activeService !== index}>
                    <Photo name={image} widths={[640, 1160]} sizes="(max-width: 680px) 90vw, 34vw"
                      width="1160" height="773" loading="lazy" alt={imageAlt} />
                  </figure>
                ))}
              </div>
              <div className="service-list">
                {services.map(({ name, description }, index) => (
                  <div className="service-item" key={name} data-active={activeService === index}>
                    <h3>
                      <button id={'service-button-' + index} type="button" aria-expanded={activeService === index}
                        aria-controls={'service-panel-' + index} onClick={() => setActiveService(index)}>
                        {name}<span className="service-toggle" aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="service-panel" id={'service-panel-' + index} role="region"
                      aria-labelledby={'service-button-' + index} hidden={activeService !== index}>
                      <p>{description}</p>
                      <a className="text-link" href="#enquiry" onClick={(event) => enquire(event, 'Employer')}>
                        Discuss a hiring need <Arrow />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="employer" aria-labelledby="employers">
          <div className="frame employer-layout">
            <div className="employer-copy">
              <p className="section-label"><span />For employers</p>
              <h2 id="employers" tabIndex={-1}>A clearer<br /> <span>starting point.</span></h2>
              <p>
                A useful recruitment conversation begins with a clear brief. We discuss the responsibilities, team
                context and practical requirements before agreeing the approach. From the first discussion through to
                interviews and feedback, we keep the next steps clear.
              </p>
              <a className="button button-primary" href="#enquiry" onClick={(event) => enquire(event, 'Employer')}>
                Discuss a hiring need <Arrow />
              </a>
            </div>
            <figure className="employer-photo">
              <Photo name="recruitment-discussion" widths={[640, 1160]}
                sizes="(max-width: 680px) calc(100vw - 44px), (max-width: 1120px) 47vw, 44vw"
                width="1160" height="773" loading="lazy"
                alt="Two people discussing notes around a table" />
            </figure>
          </div>
        </section>

        <section className="candidate" aria-labelledby="candidates">
          <div className="frame candidate-layout">
            <div className="candidate-copy">
              <p className="section-label"><span />For candidates</p>
              <h2 id="candidates" tabIndex={-1}>Considering<br />your next<br /><span>technical role?</span></h2>
              <p>
                Tell us about your experience and the opportunities that interest you. We welcome conversations with
                IT and technical professionals across Western Australia.
              </p>
              <a className="button button-light" href="#enquiry" onClick={(event) => enquire(event, 'Candidate')}>
                Make a candidate enquiry <Arrow />
              </a>
            </div>
            <div className="candidate-art">
              <div className="candidate-arch-line" aria-hidden="true" />
              <figure className="candidate-photo">
                <Photo name="candidate-workspace" widths={[520, 1000]}
                  sizes="(max-width: 680px) calc(100vw - 86px), 34vw"
                  width="1000" height="1250" loading="lazy"
                  alt="A woman working at a laptop beside a bright window" />
              </figure>
            </div>
          </div>
        </section>

        <section className="enquiry" aria-labelledby="enquiry">
          <div className="frame enquiry-layout">
            <div className="enquiry-copy">
              <p className="section-label"><span />Enquiries</p>
              <h2 id="enquiry" tabIndex={-1}>Start a<br />conversation.</h2>
              <p>
                Tell us what you would like to discuss. Whether you are recruiting for your team or considering your
                next technical role, select the option that best describes you and leave a short message.
              </p>
              <p className="test-guidance" id="test-guidance">
                <strong>This is an assessment demonstration.</strong> Use test details only. Please do not include
                sensitive personal information or attach a CV.
              </p>
            </div>
            <EnquiryForm audience={audience} setAudience={setAudience} request={enquiryRequest} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="frame">
          <div className="footer-layout">
            <div>
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
            <a className="text-link" href="#top" onClick={navigate}>Back to top <Arrow direction="up" /></a>
          </div>
        </div>
      </footer>
    </>
  )
}
