import "./movie-view.scss";


export const MovieView = ({ movie, onBackClick }) => {


  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
        <div>
          <span>Descripction:</span>
          <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{movie.Director.Birth}</span>
      </div>
      <button onClick={onBackClick}
      className="back-button"
      style={{ cursor: "pointer"}}
      >Back</button>
    </div>
  );
};

