import { useState } from "react";
import { BookCard } from "../movie-card/movie-card";
import { BookView } from "../movie-view/movie-view";

export const MainView = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Silence of the Lambs",
      description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
      genre: "Thriller",
      image:
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
      director: "Jonathan Demme",
    },
    {
      id: 2,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: "Action",
      image:
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      director: "Chistopher Nolan",
    },
    {
      id: 3,
      title: "The Godfather",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: "Crime",
      image:
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      director: "Francis Ford Coppola",
    },

  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};