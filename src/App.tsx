import "./App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Faq from "./Component/Pages/Faq"
import Contact from "./Component/Pages/Contact"
import Reserver from "./Component/Pages/Reserver"
import MesReservations from "./Component/Pages/Mes_reservations"
import Mentions from "./Component/Pages/mentions"
import Compte from "./Component/Pages/Compte"
import Connexion from "./Component/Pages/Authentification/Connexion"
import Inscription from "./Component/Pages/Authentification/Inscription"
import Menu1 from "./Component/Pages/Menus/Menu1"
import Accueil from "./Component/Pages/Accueil"
import Nouveau_mdp from "./Component/Pages/Authentification/Nouveau_mdp"
import Erreur404 from "./Component/Pages/Erreur404" 
import Mdp_oublie from "./Component/Pages/Authentification/mdp_oublie"
import Editer_faq from "./Component/Pages/Edition/Editer_faq"
import Editer_menus from "./Component/Pages/Edition/Editer_menus"
import Editer_user from "./Component/Pages/Edition/Editer_user"
import Editer_restaurant from "./Component/Pages/Edition/Editer_restaurant"
import ReservationRestaurateur from "./Component/Pages/Reservation_restaurateur"
import ConfirmationEmail from "./Component/Pages/Authentification/Confirmation_email"
import Editer_contact from "./Component/Pages/Edition/Editer_contact"
// relier les différentes pages avec l'url
function App() {
  return (
    <div className ="App">
      <link rel="shortcut icon" type="image/png" href="https://www.lad.fr/sites/default/files/LOGO_LAD_favicon.png" title="Logo Les ailes déployées"/>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Accueil />} />  
          <Route path="/accueil" element={<Accueil />} />  
          <Route path="/faq" element={<Faq />} />  
          <Route path="/contact" element={<Contact />} />  
          <Route path="/reserver" element={<Reserver />} />     
          <Route path="/reservation" element={<MesReservations />} />  
          <Route path="/mentions" element={<Mentions />} />  
          <Route path="/compte" element={<Compte />} />  
          <Route path="/connexion" element={<Connexion />} />  
          <Route path="/inscription" element={<Inscription />} />  
          <Route path="/mdpoublie" element={<Mdp_oublie />} />  
          <Route path="/nouveaumdp" element={<Nouveau_mdp />} />  
          <Route path="/menu1" element={<Menu1 />} />  
          <Route path="*" element={<Erreur404 />} />  
          <Route path="/editfaq" element={<Editer_faq />} />  
          <Route path="/editmenus" element={<Editer_menus />} />  
          <Route path="/edituser" element={<Editer_user />} />  
          <Route path="/editrestaurant" element={<Editer_restaurant />} />  
          <Route path="/reservationrestaurateur" element={<ReservationRestaurateur />} />
          <Route path="/confirmation" element={<ConfirmationEmail />} />
          <Route path="/editcontact" element={<Editer_contact />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

// faire le lien avec la page index.html
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
)
export default App