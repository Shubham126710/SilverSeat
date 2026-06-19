import { NextResponse } from "next/server";

const TMDB_API_KEY = "15d2ea6d0dc1d476efbca3eba2b9bbfb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const genresParams = searchParams.get("genres");
  
  if (!genresParams) {
    return NextResponse.json([]);
  }

  const selectedGenres = genresParams.split(",");

  // Genre map for TMDB
  const genreMap: Record<string, number> = {
    "Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35,
    "Crime": 80, "Documentary": 99, "Drama": 18, "Family": 10751,
    "Fantasy": 14, "History": 36, "Horror": 27, "Music": 10402,
    "Mystery": 9648, "Romance": 10749, "Sci-Fi": 878, "Thriller": 53,
    "War": 10752, "Western": 37
  };

  const movies: any[] = [];
  const uniqueIds = new Set();

  for (const genre of selectedGenres) {
    const tmdbId = genreMap[genre];
    if (!tmdbId) continue;

    try {
      // 2010-2019 popular movies for this genre
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31&with_genres=${tmdbId}&sort_by=popularity.desc&page=1`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results) {
        // Take top 4 for each genre to build a tailored 2010s list
        const top = data.results.slice(0, 4);
        for (const m of top) {
          if (!uniqueIds.has(m.id) && m.poster_path) {
            uniqueIds.add(m.id);
            movies.push({
              id: `tmdb_${m.id}`,
              title: m.title,
              image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
              tags: [genre],
              releaseYear: m.release_date ? parseInt(m.release_date.split('-')[0]) : 2010
            });
          }
        }
      }
    } catch (e) {
      console.error("TMDB fetch failed for genre:", genre);
    }
  }

  // Shuffle array
  movies.sort(() => Math.random() - 0.5);

  return NextResponse.json(movies);
}
