"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Heart, ThumbsDown, ChevronLeft } from "lucide-react";
import { Movie } from "@/lib/data";
import { FastAverageColor } from "fast-average-color";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [step, setStep] = useState(1);
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/movies")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMovies(data);
        }
      });
  }, []);

  const genresList = [
    "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy",
    "History", "Horror", "Music", "Mystery", "Romance",
    "Sci-Fi", "Sports", "Thriller", "War", "Western"
  ];

  // Filter movies for swiping based on selected genres, fallback to classics if sparse
  const swipeMovies = useMemo(() => {
    if (selectedGenres.length === 0) return [];
    
    const matched = movies.filter(m => (m.tags || []).some(g => selectedGenres.includes(g)));
    
    if (matched.length < 5 && movies.length > 0) {
      // Find popular classic movies (older release years first as fallback)
      const classics = [...movies]
        .sort((a, b) => (a.releaseYear || 2025) - (b.releaseYear || 2025))
        .slice(0, 15);
      
      const combined = [...matched];
      for (const c of classics) {
        if (!combined.some(m => m.id === c.id)) {
          combined.push(c);
        }
      }
      // Shuffle slightly for variety
      return combined.sort(() => Math.random() - 0.5);
    }
    
    return matched.sort(() => Math.random() - 0.5); // Randomize the stack
  }, [movies, selectedGenres]);

  const currentSwipeIndex = likedMovies.length + dislikedMovies.length;
  const currentMovie = swipeMovies[currentSwipeIndex];

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const handleSwipe = (action: 'like' | 'dislike') => {
    if (!currentMovie) return;
    
    if (action === 'like') setLikedMovies(prev => [...prev, currentMovie.id]);
    if (action === 'dislike') setDislikedMovies(prev => [...prev, currentMovie.id]);
    
    if (currentSwipeIndex + 1 >= Math.min(swipeMovies.length, 10)) { // limit to 10 swipes
      finishOnboarding(action === 'like' ? [...likedMovies, currentMovie.id] : likedMovies);
    }
  };

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe('like');
    } else if (info.offset.x < -threshold) {
      handleSwipe('dislike');
    }
  };

  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    if (step === 2 && currentMovie && currentMovie.image) {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = currentMovie.image.startsWith('http') 
        ? `/api/proxy-image?url=${encodeURIComponent(currentMovie.image)}` 
        : currentMovie.image;
      img.onload = () => {
        try {
          const color = fac.getColor(img);
          setDominantColor(color.hex);
        } catch (e) {
          console.error(e);
          setDominantColor(null);
        }
      };
    } else {
      setDominantColor(null);
    }
  }, [step, currentMovie]);

  const finishOnboarding = (finalLikes: string[]) => {
    localStorage.setItem('silverSeat_genres', JSON.stringify(selectedGenres));
    localStorage.setItem('silverSeat_likes', JSON.stringify(finalLikes));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg-base text-gray-100 font-sans relative overflow-hidden flex items-center justify-center p-4">
      {/* Glowing Background */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000" style={{
        backgroundColor: dominantColor ? `${dominantColor}15` : undefined
      }}>
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000" 
          style={{ backgroundColor: dominantColor ? `${dominantColor}60` : 'rgba(219, 39, 119, 0.2)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000" 
          style={{ backgroundColor: dominantColor ? `${dominantColor}50` : 'rgba(147, 51, 234, 0.2)' }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <button 
          onClick={() => router.back()}
          className="absolute -top-16 left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <Sparkles className="w-7 h-7 text-pink-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Taste Preferences</h1>
              <p className="text-sm md:text-base text-gray-400 mt-1">Train your personal recommendation engine.</p>
            </div>
          </div>

          <div className="relative min-h-[450px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full absolute top-0"
                >
                  <h4 className="text-2xl text-white font-bold mb-2">Step 1: What do you love?</h4>
                  <p className="text-gray-400 mb-8 text-lg">Select the genres you enjoy watching.</p>
                  
                  <div className="flex flex-wrap gap-3 mb-12">
                    {genresList.map(g => {
                      const active = selectedGenres.includes(g);
                      return (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={g}
                          onClick={() => toggleGenre(g)}
                          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                            active 
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-transparent" 
                              : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/30"
                          }`}
                        >
                          {g}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(2)}
                      disabled={selectedGenres.length === 0}
                      className="px-8 py-3.5 bg-white text-black font-bold text-lg rounded-xl disabled:opacity-50 transition-all hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
                    >
                      Next Step <span className="text-xl">→</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && currentMovie && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center w-full absolute top-0"
                >
                  <h4 className="text-2xl text-white font-bold mb-2">Step 2: Rate these movies</h4>
                  <p className="text-gray-400 mb-8">Swipe left to dislike, swipe right to like.</p>
                  
                  {/* Tinder Card wrapper for animation */}
                  <div className="relative w-80 h-[28rem] perspective-1000">
                    <AnimatePresence>
                      <motion.div 
                        key={currentMovie.id}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gray-900 cursor-grab active:cursor-grabbing backdrop-blur-xl"
                        style={{
                          boxShadow: dominantColor ? `0 20px 50px -20px ${dominantColor}80` : undefined,
                          x, 
                          rotate, 
                          opacity 
                        }}
                      >
                        <img 
                          src={currentMovie.image} 
                          alt={currentMovie.title} 
                          className="w-full h-full object-cover pointer-events-none" 
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-20 pointer-events-none" />
                        
                        <div className="absolute bottom-6 left-6 right-6 text-center z-30 pointer-events-none">
                          <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">{currentMovie.title}</h3>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {currentMovie.tags.slice(0, 3).map(t => (
                              <span key={t} className="text-[11px] uppercase tracking-wider font-bold text-gray-300 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-16 mt-8 z-20">
                    <motion.button 
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe('dislike')}
                      className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg hover:shadow-red-500/40"
                    >
                      <ThumbsDown className="w-7 h-7" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe('like')}
                      className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/50 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-colors shadow-lg hover:shadow-green-500/40"
                    >
                      <Heart className="w-10 h-10 fill-current" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {step === 2 && !currentMovie && (
                <motion.div 
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center absolute inset-0"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-6 border border-pink-500/30"
                  >
                    <Sparkles className="w-10 h-10 text-pink-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2">All Set!</h3>
                  <p className="text-gray-400 text-lg">We've saved your preferences. Redirecting to your dashboard...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
