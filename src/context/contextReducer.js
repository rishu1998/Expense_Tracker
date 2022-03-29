const contextReducer = (state, action) => {
  let transactions
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter((t) => t.id !== action.payload)
      return transactions
      break
    case 'ADD_TRANSACTION':
      transactions = [action.payload, ...state]
      return transactions
      break

    default:
      return state
      break
  }
}
export default contextReducer
