import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MovieService } from './services/MovieService';
import { store } from './redux/store'
import MovieAction from './redux/actions/MovieAction';



store.dispatch(MovieAction.setLoadingAction(true))

store.dispatch(MovieAction.setConditionAction({
  page: 20
}))


ReactDOM.render(<App />, document.getElementById('root'));

// MovieService.add({
//   name: 'abc',
//   timeLong: 120,
//   types: ['喜剧'],
//   areas: ['大陆'],
//   isHot: true,
//   isClassic: true,
//   isComing: true
// }).then(data => console.log(data))

// MovieService.getMovies({

// }).then(movies => {
//   movies.data.forEach(m => {
//     console.log(m.name, m.types)
//   })
// })