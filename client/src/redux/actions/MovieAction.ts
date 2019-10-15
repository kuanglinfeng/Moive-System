// action的创建函数

function saveMovieAction(movies, total) {
  return {
    type: 'move_save',
    payload: {
      // 负载、负荷
      movies,
      total
    }
  }
}