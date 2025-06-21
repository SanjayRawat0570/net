import { User } from "../models/userModel.js";
import { Movie } from "../models/movieModel.js";

export const addToWatchHistory = async (req, res) => {
  const { userId } = req.params;
  const { movieId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.watchHistory.includes(movieId)) {
      user.watchHistory.push(movieId);
      await user.save();
    }

    res.status(200).json({ success: true, message: "Movie added to watch history" });
  } catch (error) {
    console.error("Error updating watch history:", error.message);
    res.status(500).json({ success: false, message: "Failed to update watch history" });
  }
};

export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const history = user.watchHistory || [];

    const watchedMovies = await Movie.find({ _id: { $in: history } });

    const genres = [...new Set(watchedMovies.map(movie => movie.genre))];

    const recommendations = await Movie.find({
      genre: { $in: genres },
      _id: { $nin: history },
    }).limit(10);

    res.status(200).json(recommendations);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: "Failed to get recommendations" });
  }
};


