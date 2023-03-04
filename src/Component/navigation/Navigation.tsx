import React from "react"
import { Link } from "react-router-dom"

// créer une nav bar
function Navigation() {
  return (
    <nav className="bg-blue-400 py-4">
      <div className="container mx-auto flex items-center justify-between sm:text-left">
        <h1 className="text-white font-bold text-lg flex-1">Les ailes déployées</h1>
        <ul className="flex justify left">
          <li className="px-4"><Link to="/reserver" className="text-white hover:bg-blue-300">Réserver</Link></li>
          <li className="px-4"><Link to="/reservation" className="text-white hover:bg-blue-300">Mes réservations</Link></li>
          <li className="px-4"><Link to="/faq" className="text-white hover:bg-blue-300">FAQ</Link></li>
          <li className="px-4"><Link to="/contact" className="text-white hover:bg-blue-300">Contact</Link></li>
          <li className="px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation