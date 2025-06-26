import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authUser";
import { api } from "../utils/axios";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL;
const RecommendedMovies = () => {
  const { user } = useAuthStore();
  const [movies, setMovies] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await api.get(`${BASE_URL}/users/${user._id}/recommendations`,{
				withCredentials:true,
			});
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchRecommendations();
    const interval = setInterval(fetchRecommendations, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, [user]);

  if (!movies.length) return null;

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Recommended for You</h2>
      <div className="flex overflow-x-scroll gap-4 pb-2 scrollbar-hide">
        {movies.map((movie) => (
          <Link to={`/watch/${movie._id}`} key={movie._id} className="w-48 flex-shrink-0">
            <img
              src={movie.thumbnail || "/default-thumbnail.jpg"}
              alt={movie.title}
              className="w-full h-auto rounded-md"
            />
            <h4 className="text-white mt-1 font-medium">{movie.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
