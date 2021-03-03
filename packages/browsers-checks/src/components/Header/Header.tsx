import React from 'react'
import './style.css'
import {Link} from '../../routing'


export const Header = () => {

  return (
    <header className="page-header">
      <nav className="page-header_nav">
        <Link href="/">Index</Link>
      </nav>
      <div className="page-header_info">

      </div>
    </header>
  )
}

