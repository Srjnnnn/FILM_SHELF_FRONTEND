import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const Featured = (data) => {
  let i = 0;
  let y = 0;

  const dataArray = data.featuredMovies;

  return (
    <div className="text-center mx-3 my-4">
      <h2 className="text-center font-serif font-extrabold text-2xl pt-4 custom">
        Featured Movies
      </h2>
      <Carousel
        autoPlay={true}
        interval={2000}
        emulateTouch={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        {dataArray.map((movie) => {
          i++;
          return (
            <div className="flex justify-center mx-2" key={i}>
              <div className="my-4 bg-pink-50 shadow-2xl border-2 rounded-lg">
                <div className="my-2 py-4 px-3 font-serif font-extrabold text-xl text-indigo-600">
                  {movie.originalTitle}
                </div>
                <div className="my-2 py-4 px-3 font-serif font-bold text-blue-400">
                  {movie.genres.map((genre) => (
                    <p key={y++}>{genre} </p>
                  ))}{" "}
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
