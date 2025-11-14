import './App.css'
import { PopularAuthor } from './PopularAuthor'   
import { PopularBook } from './PopularBook'

function App() {
  return (
    <>
      <section >
        <h1>
          Welcome to BookManager !
        </h1>          
        
        <p >
          Manage your book inventory, track your sales, and explore your favorite authors with ease. 
          Whether you're a bookseller, publisher, or literature enthusiast, BookManager allows you to:
        </p>

  
        <p>
          <strong>Add and organize your books</strong> with all their essential information.
        </p>
        <p>
          <strong>Track your sales in real time</strong> and analyze your performance.
        </p>
        <p>
          <strong>Explore and manage your authors</strong>, their biographies, and their works.
        </p>
        <p>
          <strong>Optimize your inventory</strong> so you never run out of your most popular titles.
        </p>
        
        <p >
          BookManager simplifies bookstore management and helps you make faster, smarter decisions. 
          Get started now and keep your library perfectly under control!
        </p>

      </section>
            <PopularAuthor />
            <PopularBook  />
          </>
  )
}

export default App
