import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import Card from "./components/Cards";
import { getFastMovies, getSingleMovieDetails, changePage } from "./axios/axios";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import Modal from "./components/Modal";
import NotificationModal from "./components/NotificationModal";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

const App = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [fastMovies, setFastMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const [filters, setFilters] = useState({
    title: "fast",
    page: 1,
  });

  const getFastMv = async () => {
    try {
      setFilters({
        title: "fast",
        page: 1,
      });
      const response = await getFastMovies(filters.title, 1);
	  console.log(response)
      return setFastMovies(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFastMv();
  },[]);

  const home = async () => {
    try {
      const response = await getFastMovies("fast");
      return setFastMovies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showNextPage = async () => {
    try {
      const nextPage = filters.page + 1;
      setFilters({ ...filters, page: nextPage });
      const response = await changePage(filters.title, nextPage);
	  console.log('fil',response);
      return setFastMovies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const showPreviousPage = async () => {
    try {
      if (filters.page === 1) {
        return null;
      }
      const nextPage = filters.page - 1;
      setFilters({ ...filters, page: nextPage });
      const response = await changePage(filters.title, nextPage);
	  console.log(response)
      return setFastMovies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const modalShow = async (id) => {
    try {
      setShowModal(true);
      setLoading(true);
      const details = await getSingleMovieDetails(id);
      setMovieDetails(details.data.data);
      return setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const modalClose = async (e) => {
    try {
      setMovieDetails({});
      return setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    console.log("fav");
    if (favourites.includes(movie)) {
      return null;
    }
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const searchMovies = async (searchValue) => {
    try {
		setShowLoadingModal(true)
		
      const response = await getFastMovies(searchValue);
      setFilters({...filters, title:searchValue});
	  console.log('res', response)
      setFastMovies(response.data.data);

	  return setShowLoadingModal(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-50">
        <a href="#" className="text-decoration-none" onClick={home}>
          <MovieListHeading heading="JMovies" onSearch={searchMovies} />
        </a>
      </div>
      <div className="flex gap-[0] mt-[1%] justify-between h-[100%]">
	  <div className="flex md:w-full  p-[1%] md:flex-row">

  {filters.page > 1 && (
    <div className="relative h-full flex justify-center items-center">
      <button
        className="text-[#F9C209]"
        onClick={showPreviousPage}
      >
        <GrCaretPrevious className="mt-[5%]" />
      </button>
    </div>
  )}
  <div className="w-full md:w-[100%] ml-[4%] s:mr-[0%] flex flex-wrap gap-1 h-auto md:h-[100%]">
    {fastMovies && fastMovies.length > 0 ? (
      fastMovies?.map((movie, index) => (
        <div className="mb-[15px]" key={index}>
          <Card
            id={movie.imdbID}
            image={movie.poster}
            onClick={() => modalShow(movie.imdbID)}
          />
          <div className="flex justify-between">
            {favourites.includes(movie) ? (
              <>
                <button onClick={() => removeFavouriteMovie(movie)}>
                  <MdOutlineFavorite className="text-[gold]" />
                </button>
                <p className="text-[#858585]">{movie.type}</p>
                <p className="text-[#858585]">{movie.year}</p>
              </>
            ) : (
              <>
                <button onClick={() => addFavouriteMovie(movie)}>
                  <MdFavoriteBorder className="text-[#858585]" />
                </button>
                <p className="text-[#858585]">{movie.type}</p>
                <p className="text-[#858585]">{movie.year}</p>
              </>
            )}
          </div>
        </div>
      ))
    ) : (
      <p className="w-full md:pr-[900px] bg-yellow-599 text-[#F9C209]">
        No Movie Found with that title
      </p>
    )}
  </div>
<div className="relative h-full flex justify-center items-center">
  <button
    className="text-[#F9C209]"
    onClick={showNextPage}
  >
    <GrCaretNext className="" />
  </button>
</div>
</div>

          <div className="w-1 bg-[#F9C209]"></div>
		  <div className="w-full md:w-[25%] h-[100%] flex gap-2 md:justify-center md:mr-[1%]">
  <div className="flex flex-col items-center h-[100%] md:h-[700px] overflow-y-scroll w-full">
    <p className="mb-2 md:mb-5 text-[#858585] font-bold">
      <strong className="font-semibold">FAVOURITES</strong>
    </p>
    <div>
      {favourites.length !== 0 ? (
        favourites.map((movie, index) => (
          <div className="mb-2 md:mb-[15px]" key={index}>
            <Card
              id={movie.imdbID}
              image={movie.poster}
              onClick={() => modalShow(movie.imdbID)}
            />
            <div className="flex flex-col md:flex-row justify-between">
              <button onClick={() => removeFavouriteMovie(movie)}>
                <MdOutlineFavorite className="text-[gold]" />
              </button>
              <p className="text-[#858585] md:ml-2">{movie.type}</p>
              <p className="text-[#858585] md:ml-2">{movie.year}</p>
            </div>
          </div>
        ))
      ) : (
        <p>
          <strong className="text-[#858585] font-bold">
            No movies Added Yet
          </strong>
        </p>
      )}
    </div>
  </div>
</div>

      </div>

      {showModal && (
        <Modal onClose={modalClose}>
          {loading ? (
            <p className="text-[#F9C209] mb-[2%]">Loading...</p>
          ) : (
            <>
              <div className="p-[5px] flex w-full gap-6 h-[90%] mb-[10px]">
                <div>
                  <img src={movieDetails.poster} />
                </div>
                <div className="overflow-y-scroll text-[#858585] flex flex-col gap-4 overflow-x-auto whitespace-wrap h-[430px] w-[50%]">
                  <p>
                    Title:{" "}
                    <span className="text-white">{movieDetails.title}</span>
                  </p>
                  <p>Year: {movieDetails.year}</p>
                  <p>Released: {movieDetails.released}</p>
                  <p>Duration: {movieDetails.duration}</p>
                  <p>Genre: {movieDetails.genre}</p>
                  <p>Rated: {movieDetails.rated}</p>
                  <p>Plot: {movieDetails.plot}</p>
                  <p>
                    <span className="text-[#F9C209]">
                      IMDB Rating: {movieDetails.imdbRating}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
	  {showLoadingModal && (
	    <NotificationModal>
			<p className="text-[#F9C209]">Loading...</p>
        </NotificationModal>
	  )}
    </div>
  );
};

//text-[#F9C209]

export default App;
