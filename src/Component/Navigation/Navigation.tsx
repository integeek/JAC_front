import { Link } from "react-router-dom"
import { useState } from "react"

// créer une nav bar
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="bg-blue-400 desktop:bg-blue-400 py-4 tablet:bg-red-700  tel:bg-green-700">
      <div className="container mx-auto flex items-center justify-between tel:text-left">
        <h1 className="text-white font-bold text-lg">Les ailes déployées</h1>
        <ul className="flex justify fill-current hover:bg-blue-400 left menu menu-horizontal">
          <li className="px-4"><Link to="/reserver" className="text-white hover:bg-blue-300">Réserver</Link></li>
          <li className="px-4"><Link to="/reservation" className="text-white hover:bg-blue-300">Mes réservations</Link></li>
          <li className="px-4"><Link to="/faq" className="text-white hover:bg-blue-300">FAQ</Link></li>
          <li className="px-4"><Link to="/contact" className="text-white hover:bg-blue-300">Contact</Link></li>
          <li tabIndex={0}>
            <a className="text-white hover:bg-blue-300 active:bg-blue-400">
              Compte
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="p-2 bg-base-100 rounded shadow-xl">
              <li><Link to="/compte" className="active:bg-gray-200">Mon compte</Link></li>
              <li><a className="active:bg-gray-200">Se déconnecter</a></li>
              <li><Link to="/editer" className="active:bg-gray-200">Editer</Link></li>

            </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
