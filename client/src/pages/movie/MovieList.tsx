import MovieTable, { IMovieTableEvents } from '../../component/MovieTable'
import { connect } from 'react-redux'
import { IRootState } from '../../redux/reducers/RootReducer'
import { Dispatch } from 'react'
import MovieAction, { MovieActions } from '../../redux/actions/MovieAction'
import { IMovieState } from '../../redux/reducers/MovieReducer'

function mapStateToProps(state: IRootState): IMovieState {
  return state.movie
}

function mapDispatchToProps(dispatch:Dispatch<any>): IMovieTableEvents {
  return {
    onLoad() {
      dispatch(MovieAction.fetchMovies({
        page: 1,
        limit: 10,
        key: ''
      }))
    },
    onSwitchChange(type, newState, id) {
      dispatch(MovieAction.changeSwitch(type, newState, id))
    } 
  }
}

const HOC = connect(mapStateToProps, mapDispatchToProps)

const MovieContainer = HOC(MovieTable)

export default MovieContainer

