import React, { useEffect, useRef, useState } from "react"
import { menuItems } from "@/constants/constants"
import styles from "./Navbar.module.css"
import { Link, useLocation } from "react-router-dom"
import { CONSTANTS } from "@/constants/constants"
import { capitalize } from "@/utils"

const Navbar: React.FC = () => {
  const [active, setActive] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string>(
    menuItems[0].title
  )
  const location = useLocation()
  const activeRoute = location.pathname.split("/")[1].toString()

  const drawerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setActive(!active)
  }

  const handleMenuItemClick = (title: string) => {
    setActiveMenuItem(title)
  }
  useEffect(() => {
    if (activeRoute) {
      setActiveMenuItem(capitalize(activeRoute))
    }
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !parentRef?.current?.contains(target)
      ) {
        setActive(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === CONSTANTS.ESCAPE) {
        setActive(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [activeRoute])
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navbarLogo}>{CONSTANTS.TITLE}</h1>
      <div
        ref={parentRef}
        className={`${styles.menuIcon}`}
        onClick={handleClick}
      >
        <span
          className={styles.faBars}
          dangerouslySetInnerHTML={{ __html: CONSTANTS.BARS }}
        ></span>
      </div>
      <div ref={drawerRef}>
        <ul
          className={
            active ? `${styles.navMenu} ${styles.active}` : styles.navMenu
          }
        >
          {menuItems.map((item, index) => {
            return (
              <li key={index} onClick={() => handleMenuItemClick(item.title)}>
                <Link
                  to={item.url}
                  className={`${styles.navLinks} ${
                    activeMenuItem === item.title && styles.activeMenuItem
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
