import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "../components/commonComponet/Navbar"
import Movie from "../pages/Movies/Movies"
import LoginSignup from "../components/LoginSignUp"
import FavoritesPage from "../pages/Favorties/FavoritesPage"
import MovieDetail from "../pages/Movies/MovieDetail"

const AllRoutes = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movie />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
          <Route path="/login" element={<LoginSignup formType="login" />}>
          </Route>
          <Route path="/signup" element={<LoginSignup formType="signup" />}>
          </Route>
          <Route path="/favorite" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default AllRoutes