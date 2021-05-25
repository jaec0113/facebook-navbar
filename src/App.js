import { useState, useEffect, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as Arrow } from "./icons/arrow.svg"
import { ReactComponent as Bell } from "./icons/bell.svg"
import { ReactComponent as Bolt } from "./icons/bolt.svg"
import { ReactComponent as Caret } from "./icons/caret.svg"
import { ReactComponent as Chevron } from "./icons/chevron.svg"
import { ReactComponent as Cog } from "./icons/cog.svg"
import { ReactComponent as Messenger } from "./icons/messenger.svg"
import { ReactComponent as Plus } from "./icons/plus.svg"

function App() {
  return (
    <Navbar>
      <Navitem icon={<Plus />} />
      <Navitem icon={<Bell />} />
      <Navitem icon={<Messenger />} />

      <Navitem icon={<Caret />}>
        <DropdownMenu />
        <DropdownMenu />
        <DropdownMenu />
        <DropdownMenu />
        <DropdownMenu />
      </Navitem>
    </Navbar>
  )
}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  )
}

function Navitem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      <a
        href='#'
        className='menu-item'
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        className='menu-primary'
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<Cog />}
            rightIcon={<Chevron />}
            goToMenu='settings'
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        className='menu-secondary'
      >
        <div className='menu'>
          <DropdownItem leftIcon={<Arrow />} goToMenu='main' />
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default App
