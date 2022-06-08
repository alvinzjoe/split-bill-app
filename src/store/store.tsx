import { createStore, combineReducers, applyMiddleware } from 'redux';
import { users, UsersType } from './reducers/users';
import { expenses, ExpensesType } from './reducers/expenses';
import thunk from 'redux-thunk'
export interface iAppState {
    users: UsersType[],
    expenses: ExpensesType,
}
const reducers = {
    users,
    expenses
};
const rootReducer = combineReducers(reducers);
export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));