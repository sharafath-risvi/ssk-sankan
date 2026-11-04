import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import '../../styles/ssk/nav.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

const SskNavbar = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  // Menu is "open" only for the route it was opened on, so back/forward closes it without an effect.
  const [openPath, setOpenPath] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isInitialHero, setIsInitialHero] = useState(
    () => isHome && typeof window !== 'undefined' && window.scrollY <= 50
  )
  const lastScrollY = useRef(0)
  const isOpen = openPath === pathname

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    const atTop = typeof window !== 'undefined' && window.scrollY <= 50
    setIsInitialHero(isHome && atTop)
    setIsHidden(false)
  }

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const y = Math.max(0, window.scrollY)
      const prev = lastScrollY.current
      const delta = y - prev
      const nextScrolled = y > 36
      setIsScrolled((curr) => (curr !== nextScrolled ? nextScrolled : curr))

      if (delta > 2) {
        // User scrolling DOWN -> hide navbar
        setIsHidden(true)
      } else if (delta < -3) {
        // User scrolling UP -> reveal navbar anywhere on page, including hero
        setIsHidden(false)
        setIsInitialHero(false)
      } else if (y <= 10 && !isHome) {
        // Top of page on other pages -> ensure visible
        setIsHidden(false)
      }

      lastScrollY.current = y
    }

    const onWheel = (e) => {
      if (e.deltaY < -2) {
        // Scrolling UP gesture -> reveal navbar even when at y = 0
        setIsInitialHero(false)
        setIsHidden(false)
      } else if (e.deltaY > 2 && window.scrollY <= 10 && isHome) {
        // Scrolling DOWN gesture from initial top -> ensure hidden
        setIsHidden(true)
      }
    }

    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY
      const delta = currentY - touchStartY
      if (delta > 8) {
        // Swipe down = scroll UP gesture -> reveal navbar
        setIsInitialHero(false)
        setIsHidden(false)
      } else if (delta < -8 && window.scrollY <= 10 && isHome) {
        // Swipe up = scroll DOWN gesture from initial top -> ensure hidden
        setIsHidden(true)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [isHome])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpenPath(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setOpenPath(null)

  return (
    <header
      className="ssk-nav"
      data-is-home={isHome ? 'true' : 'false'}
      data-initial-hero={isInitialHero ? 'true' : 'false'}
      data-scrolled={isScrolled ? 'true' : 'false'}
      data-hidden={isHidden && !isOpen ? 'true' : 'false'}
      data-menu-open={isOpen ? 'true' : 'false'}
    >
      <nav className="ssk-nav__bar" aria-label="Primary">
        <div className="ssk-nav__inner">
          <Link to="/" className="ssk-nav__logo" aria-label="SSK Enterprises home" onClick={closeMenu}>
            <img
              src="/logos/ssk.PNG"
              alt="SSK Enterprises"
              className="ssk-nav__logo-img"
              width="260"
              height="40"
            />
          </Link>

          <ul className="ssk-nav__links">
            {LINKS.map((l) => (
              <li key={l.to} className="ssk-nav__item">
                <NavLink to={l.to} end={l.end} className="ssk-nav__link">
                  <span className="ssk-nav__link-mask">
                    <span className="ssk-nav__link-label">{l.label}</span>
                    <span className="ssk-nav__link-clone" aria-hidden="true">
                      {l.label}
                    </span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ssk-nav__actions">
            <Link to="/sankan" state={{ fromSSK: true }} className="ssk-nav__cta">
              <span className="ssk-nav__cta-dot" aria-hidden="true" />
              <span className="ssk-nav__cta-text">Discover Sankan</span>
              <ArrowUpRight size={18} className="ssk-nav__cta-icon" aria-hidden="true" />
            </Link>

            <button
              type="button"
              className="ssk-nav__toggle"
              aria-expanded={isOpen}
              aria-controls="ssk-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setOpenPath(isOpen ? null : pathname)}
            >
              <span className="ssk-nav__toggle-label">{isOpen ? 'Close' : 'Menu'}</span>
              <span className="ssk-nav__burger" aria-hidden="true">
                <span className="ssk-nav__burger-line" />
                <span className="ssk-nav__burger-line" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="ssk-menu"
        className="ssk-nav__menu"
        data-open={isOpen ? 'true' : 'false'}
        aria-hidden={!isOpen}
      >
        <div className="ssk-nav__menu-backdrop" aria-hidden="true" />
        <div className="ssk-nav__menu-inner">
          <div className="ssk-nav__menu-head">
            <p className="ssk-nav__menu-kicker">Navigation Directory</p>
            <p className="ssk-nav__menu-sub">Edge banding, panel processing &amp; architectural materials</p>
          </div>

          <ul className="ssk-nav__menu-list">
            {LINKS.map((l, idx) => (
              <li key={l.to} style={{ '--item-index': idx }}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className="ssk-nav__menu-link"
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span className="ssk-nav__menu-text">{l.label}</span>
                  <ArrowUpRight size={24} className="ssk-nav__menu-arrow" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ssk-nav__menu-footer">
            <Link
              to="/sankan"
              state={{ fromSSK: true }}
              onClick={closeMenu}
              className="ssk-nav__menu-brand"
              tabIndex={isOpen ? 0 : -1}
            >
              <div>
                <span className="ssk-nav__menu-brand-eyebrow">Sister Brand Experience</span>
                <span className="ssk-nav__menu-brand-title">Discover Sankan Interiors</span>
              </div>
              <span className="ssk-nav__menu-brand-icon" aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </Link>

            <div className="ssk-nav__menu-meta">
              <span>Tambaram, Chennai</span>
              <span aria-hidden="true">·</span>
              <span>Tamil Nadu · Kerala · Karnataka</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SskNavbar
