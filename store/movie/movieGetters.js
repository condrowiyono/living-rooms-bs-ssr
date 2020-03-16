export default {
  isFetching: state => state.isFetching,
  fetchingError: state => state.fetchingError,

  isFetchingDetail: state => state.isFetchingDetail,

  movies: state => state.movies,
  latestMovies: state => state.latestMovies,
  movie: state => state.movie
}
