import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState, useEffect } from "react"
import Axios from "../../../Axios"
import HelpIcon from "@mui/icons-material/Help"


interface Faq {
  id: number;
  question: string;
  answer: string;
}

function EditerFaq() {
  const [faqList, setFaqList] = useState<Faq[]>([])
  //const [question, setQuestion] = useState("")
  const [nouvelleQuestion, setNouvelleQuestion] = useState("")
  const [nouvelleReponse, setNouvelleReponse] = useState("")
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [faqSelectionne, setFaqSelectionne] = useState<number | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [questionModif, setQuestionModif] = useState("")
  const [reponseModif, setReponseModif] = useState("")
  const [showModalAide, setShowModalAide] = useState(false)
  const [faqInfo, setFaqInfo] = useState<Faq | null>(null)
  const [showModalInfo, setShowModalInfo] = useState(false)



  useEffect(() => {
    Axios.get("/faq").then((response) => {
      setFaqList(response.data)
    })
  }, [])

  const handleEditClick = (id: number) => { //Afficher le modal de modification quand l'icone est cliquée
    setFaqSelectionne(id)
    setShowModal(true)
  }

  const handleHelpClick = () => {
    setShowModalAide(true)
  }

  const handleShowInfo = (id: number) => {
    const faqSelected = faqList.find(faq => faq.id === id)
    if (faqSelected) {
      setShowModalInfo(true)
      setFaqInfo(faqSelected)
    }
  }


  const handleShowConfirmationModal = (id : number) => {
    setShowConfirmationModal(true)
    setFaqSelectionne(id)
  }

  const handleSaveClick = async (): Promise<void> => {
    try {
      if (faqSelectionne !== null) {
        // Trouver l'entrée de la FAQ correspondante
        const faqToUpdate = faqList.find((faq) => faq.id === faqSelectionne)
  
        if (faqToUpdate) {
          // Si on a trouvé l'élément à modifier
          const updatedFaq = {
            id: faqToUpdate.id,
            question: questionModif !== "" ? questionModif : faqToUpdate.question, // Remplace la question par la modification, sinon conserve la question initiale
            answer: reponseModif !== "" ? reponseModif : faqToUpdate.answer, // Remplace la réponse par la modification, sinon conserve la réponse initiale
          }
  
          // Effectuer la requête PATCH vers l'API pour mettre à jour la FAQ
          const response = await Axios.patch(`/faq/${faqSelectionne}`, updatedFaq)
  
          // Mettre à jour la liste des FAQ avec les données mises à jour
          const updatedList = faqList.map((faq) =>
            faq.id === faqSelectionne ? response.data : faq
          )
          setFaqList(updatedList)
          setQuestionModif("")
          setReponseModif("")
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
    if (showSuccessAlert) {
      // Masquer la notification après 1 seconde
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 2000)

      // Nettoyer le timeout lors du démontage du composant ou lorsqu'il y a un changement de valeur pour showSuccessAlert
      return () => clearTimeout(timeoutId)
    }
  }, [showSuccessAlert])

  const handleDeleteQuestion = async (): Promise<void> => {
    try {
      await Axios.delete(`/faq/${faqSelectionne}`)
      // Mettre à jour la liste des restaurants après la suppression
      const response = await Axios.get("/faq")
      setFaqList(response.data)
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

  // Définir le gestionnaire d'événements pour le bouton "Valider"
  const handleAjouterQuestion = () => {
  // Vérifier si la question et la réponse sont remplies
    if (nouvelleQuestion.trim() === "" || nouvelleReponse.trim() === "") {
      setErrorMessage("Veuillez remplir tous les champs.")
      return
    }

    // Envoyer la requête POST pour ajouter la nouvelle question
    Axios.post("/faq", {
      question: nouvelleQuestion,
      answer: nouvelleReponse,
    })
      .then((response) => {
        // Mettre à jour l'état faqList avec la nouvelle question
        setFaqList([...faqList, response.data])
    
        // Réinitialiser les états pour la nouvelle question et sa réponse
        setNouvelleQuestion("")
        setNouvelleReponse("")
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer."
        setErrorMessage(errorMessage)
        setShowSuccessAlert(false)
      
        // Masquer le message d'erreur après 2 secondes
        setTimeout(() => {
          setErrorMessage("")
        }, 2000)
      })
      
  }
  
  return (
    <div>
      <title>Editer la Faq</title>
      <Navigation />
      <div className="center">
        <table className="mx-auto my-8 shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">La Faq</th>
              <th className="px-4 py-2">Infos</th>
              <th className="px-4 py-2">Supprimer</th>
              <th className="px-4 py-2">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq) => (
              <tr key={faq.id}>
                <td className="px-4 py-2 border border-black">{faq.question}</td>
                <td className="order-4 px-4 py-2 border border-black text-center">
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleShowInfo(faq.id)} className="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="8" r="7" />
                        <line x1="8" y1="11" x2="8" y2="8" />
                        <line x1="8" y1="6" x2="8" y2="6" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="order-4 px-4 py-2 border border-black b">
                  <button onClick={() => handleShowConfirmationModal(faq.id)} className="btn btn-ghost btn-circle">
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
                  <button onClick={() => handleEditClick(faq.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
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
              {faqInfo ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{faqInfo.question}</h2>
                  <div className="flex items-center mb-2">
                    <p>La question : {faqInfo.question}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <p>La réponse : {faqInfo.answer}</p>
                  </div>
  
                </div>
              ) : (
                <div className="text-center">Pas de restaurant sélectionné</div>
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
      {showModalAide && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <p className="mt-4 text-gray-600">Cette page permet de visualiser toutes les entrées de la Faq. <br /><br />
                  Vous pouvez ensuite soit ajouter une nouvelle entrée dans la faq, en supprimer une ou en modifier une.</p>
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Editer la question</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle question" className="w-full max-w-xs input bg-gray-50 input-bordered" value={questionModif}
                        onChange={(e) => setQuestionModif(e.target.value)}/>
                    </div>
                    <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">Editer la réponse</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle réponse" className="w-full max-w-xs input bg-gray-50 input-bordered" value={reponseModif}
                        onChange={(e) => setReponseModif(e.target.value)} />

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

      {showConfirmationModal && (
        <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md p-4">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button  onClick={() => setShowConfirmationModal(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Etes vous sûr de vouloir supprimer cette entrée de la Faq ? </p>
              <div className="flex items-center justify-center space-x-4">
                <button  onClick={() => setShowConfirmationModal(false)} data-modal-toggle="deleteModal" type="button" className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Annuler
                </button>
                <button  onClick={handleDeleteQuestion} type="submit" className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
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
            <span>L'entrée de la Faq a été supprimé avec succès !</span>
          </div>
        </div>
      )}
      <p><b>Ajouter une entrée dans la Faq :</b></p>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          <p className="m-4">Entrez votre question</p>
          <input type="text" placeholder="Votre question" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouvelleQuestion} onChange={(e) => setNouvelleQuestion(e.target.value)} />
          <p className="m-4">Entrez la réponse</p>
          <textarea id="message" className=" textarea textarea-bordered block p-2.5 w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="La réponse" value={nouvelleReponse}  onChange={(e) => setNouvelleReponse(e.target.value)}></textarea>
          <button onClick={handleAjouterQuestion} className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Valider</button>
        </div>
      </div>

      <Footer />
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
      <br /><br />

    </div>
  )
}

export default EditerFaq