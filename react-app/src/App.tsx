import './App.css'
import { PopularAuthor } from './PopularAuthor'   
import { PopularBook } from './PopularBook'

function App() {
  
  const popularAuthors = [
  { id: 1, name: 'George Orwell', bio: 'Auteur britannique, célèbre pour 1984 et La Ferme des animaux.' },
  { id: 2, name: 'J.R.R. Tolkien', bio: 'Auteur britannique, connu pour Le Seigneur des Anneaux et Le Hobbit.' },
  { id: 3, name: 'Isaac Asimov', bio: 'Auteur de science-fiction américain, célèbre pour la saga Fondation.' },
  { id: 4, name: 'Frank Herbert', bio: 'Auteur américain de science-fiction, connu pour Dune.' },
  { id: 5, name: 'H.G. Wells', bio: 'Auteur britannique, célèbre pour La Guerre des Mondes et L’Homme invisible.' },
]

  return (
    <>
      <h1>
        Bienvenue sur BookManager !
      </h1>

      <h2>
        Gérez facilement votre stock de livres, suivez vos ventes et découvrez vos auteurs préférés en quelques clics.
        Que vous soyez libraire, éditeur ou passionné de littérature, notre plateforme vous permet de :

        Ajouter et organiser vos livres avec toutes leurs informations essentielles.

        Suivre vos ventes en temps réel et analyser vos performances.

        Explorer et gérer vos auteurs, leurs biographies et leurs œuvres.

        Optimiser votre stock pour ne jamais manquer les titres les plus demandés.

        BookManager simplifie la gestion de votre librairie et vous aide à prendre des décisions rapides et efficaces.
        Commencez dès maintenant et gardez votre bibliothèque sous contrôle !
      </h2>
      <PopularAuthor authors={popularAuthors} />
      <PopularBook  />
    </>
  )
}

export default App
