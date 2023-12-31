import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"
import HelpIcon from "@mui/icons-material/Help"


function EditerUser() {

  interface User {
    id: string;
    email: string;
    firstname: string;
    name: string;
    password: string;
    role: string;
    enabled: boolean;
  }

  const [actionSelectionnee, setActionSelectionnee] = useState("")
  const [userList, setUserList] = useState<User[]>([])
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userSelection, setUserSelection] = useState("")
  const [emailModif, setEmailModif] = useState("")
  const [nomModif, setNomModif] = useState("")
  const [prenomModif, setPrenomModif] = useState("")
  const [roleModif, setRoleModif] = useState("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showModalAide, setShowModalAide] = useState(false)
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [showModalInfo, setShowModalInfo] = useState(false)
  const [statut, setStatut] = useState(true)



  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }
  
  const handleShowInfo = (id: string) => {
    const selectedUser = userList.find(user => user.id === id)
    if (selectedUser) {
      setShowModalInfo(true)
      setUserInfo(selectedUser)
    }
  }

  const handleShowConfirmationModal = (id : string) => {
    setShowConfirmationModal(true)
    setUserSelection(id)
  }

  const handleHelpClick = () => {
    setShowModalAide(true)
  }

  /*
  const handleToggle = (userId: string) => {
    // Effectuer une requête API pour mettre à jour l'utilisateur avec la nouvelle valeur `enabled`
    Axios.put(`/user/${userId}`, { enabled: !enabled })
      .then((response) => {
        console.log("Mise à jour réussie", response.data)
        setEnabled(!enabled) // Inverser la valeur de `enabled` dans l'état local
        // Mettre à jour les données utilisateur dans votre application si nécessaire
      })
      .catch((error) => {
        console.log("Erreur lors de la mise à jour", error)
        // Gérer l'erreur de mise à jour de l'utilisateur
      })
  }
  */

  const handleEditClick = (id: string) => { //Afficher le modal de modification quand l'icone est cliquée
    setUserSelection(id)
    setShowModal(true)
  }

  const handleSaveClick = async (): Promise<void> => {
    try {
      if (userSelection !== null) {
        // Trouver l'entrée des users correspondante
        const userToUpdate = userList.find((user) => user.id === userSelection)
  
        if (userToUpdate) {
          // Si on a trouvé l'élément à modifier
          const udpatedUser = {
            id: userToUpdate.id,
            email: emailModif !== "" ? emailModif : userToUpdate.email, // Remplace la question par la modification, sinon conserve la question initiale
            firstname:  prenomModif !== "" ? prenomModif : userToUpdate.firstname, // Remplace la réponse par la modification, sinon conserve la réponse initiale
            name:  nomModif !== "" ? nomModif : userToUpdate.name,
            role:  roleModif !== "" ? roleModif : userToUpdate.role,
            //enabled: statut !== "" ? statut : userToUpdate.enabled,
          }
  
          // Effectuer la requête PATCH vers l'API pour mettre à jour la FAQ
          const response = await Axios.patch(`/user/${userSelection}`, udpatedUser)
  
          // Mettre à jour la liste des users avec les données mises à jour
          const updatedList = userList.map((user) =>
            user.id === userSelection ? response.data : user
          )
          setUserList(updatedList)
          setNomModif("")
          setPrenomModif("")
          setEmailModif("")
          setRoleModif("")
          setErrorMessage("") // Réinitialiser le message d'erreur
          setShowModal(false) // Masquer le modal
        }
      }
    } catch (error) {
      console.log(error)
      const errorMessage =
        "Une erreur s'est produite lors de la sauvegarde. Veuillez réessayer."
      setErrorMessage(errorMessage)
      setShowSuccessAlert(false)
  
      // Masquer le message d'erreur après 2 secondes
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }
  }
    
  useEffect(() => {
    Axios.get("/user", { responseType: "json" }).then(response => {
      setUserList(response.data)
    })
  },[])

  const handleDeleteUser = async (): Promise<void> => {
    try {
      await Axios.delete(`/user/${userSelection}`)
      // Mettre à jour la liste des restaurants après la suppression
      const response = await Axios.get("/user")
      setUserList(response.data)
      setErrorMessage("")
      setShowSuccessAlert(true)
      setShowConfirmationModal(false)
    }  catch (error) {
      console.log(error)
      const errorMessage =
        "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer."
      setErrorMessage(errorMessage)
      setShowSuccessAlert(false)
  
      // Masquer le message d'erreur après 2 secondes
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }
  }

  const [isActive,setIsActive] = useState(false)
  
  const handleClick = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    if (showSuccessAlert) {
      // Masquer la notification après 1 seconde
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 2000)

      // Nettoyer le timeout lors du démontage du composant ou lorsqu'il y a un changement de valeur pour showSuccessAlert
      return () => clearTimeout(timeoutId)
    }
  }, [showSuccessAlert])


  return (
    <div>
      <title>Editer les utilisateurs</title>
      <Navigation />
      <div className="center">
        <table className="mx-auto my-8 shadow-md"> 
          <thead>
            <tr>
              <th className="px-4 py-2">Les utilisateurs</th>
              <th className="px-4 py-2">Infos</th>
              <th className="px-4 py-2">Supprimer</th>
              <th className="px-4 py-2">Modifier</th>
              <th className="px-4 py-2">Activer/Désactiver</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user.id}>
                <td className="order-4 px-4 py-2 border border-black b">{user.name} {user.firstname}</td>
                <td className="order-4 px-4 py-2 border border-black text-center">
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleShowInfo(user.id)} className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="8" r="7" />
                        <line x1="8" y1="11" x2="8" y2="8" />
                        <line x1="8" y1="6" x2="8" y2="6" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="order-4 px-4 py-2 border border-black b">
                  <button onClick={() => handleShowConfirmationModal(user.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff5722" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </td>
                <td className="order-3 px-4 py-2 border border-black b">
                  <button onClick={() => handleEditClick(user.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                </td>
                <td className="order-3 px-4 py-2 border border-black b">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault01"
                  />

                </td>
                <div className="fixed z-20 flex items-center rounded-lg bottom-9 right-10">
                  <button  onClick={() => handleHelpClick()} className="ml-2 bg-blue-400 text-white font-medium text-xs px-6 py-2.5 rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
                    <HelpIcon className="mr-2" /> Besoin d'aide ?
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModalInfo && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
              {userInfo ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{userInfo.name}</h2>
                  <div className="flex items-center mb-2">
                    <p>Prenom : {userInfo.firstname}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <p>Nom : {userInfo.name}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <p>Email : {userInfo.email}</p>
                  </div>
                  <div className="flex items-center">
                    <p>Role : {userInfo.role}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">Pas d'utilisateur sélectionné</div>
              )}

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm" onClick={() => setShowModalInfo(false)}>
            Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">  
                    <p className="text-sm text-gray-500">Laisser vide pour conserver la valeur précédente.</p>                  
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Editer le nom de l'utilisateur</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveau nom" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nomModif}
                        onChange={(e) => setNomModif(e.target.value)}/>
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer le prénom de l'utilisateur</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveau prénom" className="w-full max-w-xs input bg-gray-50 input-bordered" value={prenomModif}
                        onChange={(e) => setPrenomModif(e.target.value)} />
                    </div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Editer l'email de l'utilisateur</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvel email" className="w-full max-w-xs input bg-gray-50 input-bordered" value={emailModif}
                        onChange={(e) => setEmailModif(e.target.value)}/>
                    </div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Editer le rôle de l'utilisateur</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouveau rôle" className="w-full max-w-xs input bg-gray-50 input-bordered" value={roleModif}
                        onChange={(e) => setRoleModif(e.target.value)}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-400 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSaveClick}>
            Sauvegarder
                </button>
                <button className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
            Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModalAide && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <p className="mt-4 text-gray-600">Cette page permet de visualiser tous les utilisateurs du site. <br /><br />
                  Vous pouvez ensuite soit supprimer le compte, soit modifier les informations. Il vous est possible également de désactiver un utilisateur grâce au bouton bascule.</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModalAide(false)}>
            Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md p-4">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button  onClick={() => setShowConfirmationModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Etes vous sûr de vouloir supprimer cet utilisateur ? </p>
              <div className="flex items-center justify-center space-x-4">
                <button  onClick={() => setShowConfirmationModal(false)} data-modal-toggle="deleteModal" type="button" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Annuler
                </button>
                <button  onClick={handleDeleteUser} type="submit" className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
          Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

      {showSuccessAlert && (
        <div className="flex items-center justify-center w-1/2 mx-auto shadow-lg alert alert-success">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>L'utilisateur a été supprimé avec succès !</span>
          </div>
        </div>
      )}
    
      {errorMessage && (
        <div className="flex items-center justify-center w-1/2 mx-auto transition-opacity duration-500 shadow-lg alert alert-error">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}    
      <Footer />
    </div>
  )
}
//checked={enabled} 
//onChange={() => handleToggle(user.id)} // Passer l'ID de l'utilisateur à la fonction `handleToggle`

export default EditerUser