export interface Movie {
  id: string;
  title: string;
  image: string;
  tags: string[];
  rating: number;
  imdbRating?: number | null;
  rtRating?: number | null;
  isNew: boolean;
  duration: string;
  releaseYear?: number | null;
  certificate: string;
  synopsis: string;
  trailerUrl?: string | null;
  imdbUrl?: string | null;
  cast: { name: string; profile: string | null }[];
}

export const CURRENT_MOVIES: any[] = [
  {
    id: "m1",
    title: "Dune: Part Two",
    image: "/hero.jpg",
    tags: ["Action", "Sci-Fi", "Adventure"],
    rating: 4.8,
    isNew: true,
    duration: "166-mins",
    certificate: "U/A",
    synopsis: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"]
  },
  {
    id: "m2",
    title: "Oppenheimer",
    image: "/loading.jpg",
    tags: ["Biography", "Drama", "History"],
    rating: 4.9,
    isNew: false,
    duration: "180-mins",
    certificate: "A",
    synopsis: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb.",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."]
  },
  {
    id: "m3",
    title: "Project Hail Mary",
    image: "/Project_Hail_Mary_movie.jpg",
    tags: ["Sci-Fi", "Adventure"],
    rating: 4.7,
    isNew: true,
    duration: "145-mins",
    certificate: "U/A",
    synopsis: "An astronaut wakes up alone on a spaceship, suffering from amnesia. He soon discovers he must save Earth from an extinction-level event.",
    cast: ["Ryan Gosling", "Sandra Hüller"]
  },
  {
    id: "m4",
    title: "F1",
    image: "/F1_movie.jpg",
    tags: ["Sports", "Drama"],
    rating: 4.5,
    isNew: true,
    duration: "150-mins",
    certificate: "U",
    synopsis: "A retired driver returns to the world of Formula 1 to mentor a young prodigy and race against the greatest.",
    cast: ["Brad Pitt", "Damson Idris", "Javier Bardem"]
  },
  {
    id: "m5",
    title: "Barbie",
    image: "/barbie_movie.jpeg",
    tags: ["Comedy", "Fantasy", "Romance", "Music"],
    rating: 4.6,
    isNew: false,
    duration: "114-mins",
    certificate: "U/A",
    synopsis: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
    cast: ["Margot Robbie", "Ryan Gosling"]
  },
  {
    id: "m6",
    title: "Super Mario Galaxy",
    image: "/super_mario_galaxy_movie.jpeg",
    tags: ["Animation", "Family", "Adventure"],
    rating: 4.8,
    isNew: true,
    duration: "105-mins",
    certificate: "U",
    synopsis: "Mario travels across the galaxy to save Princess Peach from Bowser's universal conquest.",
    cast: ["Chris Pratt", "Anya Taylor-Joy", "Jack Black"]
  },
  {
    id: "m7",
    title: "Superman: Legacy",
    image: "/superman_movie.jpeg",
    tags: ["Action", "Sci-Fi", "Adventure"],
    rating: 4.7,
    isNew: true,
    duration: "140-mins",
    certificate: "U/A",
    synopsis: "Follows the Man of Steel as he reconciles his Kryptonian heritage with his human upbringing.",
    cast: ["David Corenswet", "Rachel Brosnahan"]
  },
  {
    id: "m8",
    title: "Obsession",
    image: "/obsession_movie.jpg",
    tags: ["Thriller", "Mystery", "Crime", "Horror"],
    rating: 4.3,
    isNew: true,
    duration: "125-mins",
    certificate: "A",
    synopsis: "A gripping psychological thriller that blurs the line between reality and paranoia.",
    cast: ["Florence Pugh", "Cillian Murphy"]
  }
];
