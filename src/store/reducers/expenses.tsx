import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import getKeyByValue, { getRandomInt } from '../../helpers/Helpers';
import { UsersType } from './users';

export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const removeExpenses = (number: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch({
                type: REMOVE_EXPENSES,
                payload: { number }
            });
            let { expenses, users } = getState();
            recalculateBills(users, expenses, dispatch);
            resolve();
        })
    }
}

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const updateExpenses = (nama: string, harga: number, eid: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch({
                type: UPDATE_EXPENSES,
                payload: { nama, harga, eid }
            });
            let { expenses, users } = getState();
            recalculateBills(users, expenses, dispatch);
            resolve();
        })
    }
}

export const UPDATE_EXPENSES_USERS = 'UPDATE_EXPENSES_USERS';
export const updateExpensesUserIds = (user_ids: number[], index: number) => ({
    type: UPDATE_EXPENSES_USERS,
    payload: { user_ids, index }
});

export const TOGGLE_EXPENSES_USERS = 'TOGGLE_EXPENSES_USERS';
export const toggleExpensesUsers = (user_id: number, expense_id: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch({
                type: TOGGLE_EXPENSES_USERS,
                payload: { user_id, expense_id }
            });
            let { expenses, users } = getState();
            recalculateBills(users, expenses, dispatch);
            resolve();
        })
    }
}

export const REMOVE_USER_FROM_EXPENSES = 'REMOVE_USER_FROM_EXPENSES';
export const removeUserFromExpenses = (user_id: number) => ({
    type: REMOVE_USER_FROM_EXPENSES,
    payload: { user_id }
});

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = () => ({
    type: ADD_EXPENSE,
    payload: {}
});

// MOCK API recalculate bills
export const UPDATE_EXPENSES_BY_USER = 'UPDATE_EXPENSES_BY_USER';
export const recalculateBills = (users: UsersType[], expenses: ExpensesType, dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    let expenses_by_user: ExpensesByUserType[] = [];
    users.map(function (user, i) {
        var total_bills = 0;
        let ex: ExpensesByUserType = {id: 0, nama: "", bills:[], total: 0};
        ex.id = user.id;
        ex.nama = user.nama;
        expenses.bills.map(function (bill, a) {
          var total_split = bill.user_ids.length;
          if(bill.user_ids.includes(user.id) && total_split >0) {
            if(bill.harga>0)
                total_bills = total_bills + (bill.harga/total_split);
            ex.total = total_bills;
            ex.bills.push(bill);
          }
          return ex;
        });
        expenses_by_user.push(ex);
        return expenses_by_user;
    });
    dispatch({
        type: UPDATE_EXPENSES_BY_USER,
        payload: { expenses_by_user }
    });
    return expenses_by_user;
}

export interface ExpensesType {
    total: number,
    additionals: Array<AdditionalType>,
    discounts: Array<DiscountType>,
    bills: Array<BillType>,
    expenses_by_user: Array<ExpensesByUserType>
}

export interface BillType {
    id: number;
    nama: string;
    harga: number;
    user_ids: Array<number>
}

export interface AdditionalType {
    type: string,
    percentage_value: number,
    custom_value:  number,
}

export interface DiscountType {
    type: string,
    percentage_value: number,
    custom_value:  number,
}
export interface ExpensesByUserType {
    id: number,
    nama: string,
    bills: Array<BillType>,
    total: number
}

var defaultState = {
    total: 0,
    additionals: [],
    discounts: [],
    bills: [
        { id: 1, nama: "Item #1", harga: 10000, user_ids: [1, 2] },
        { id: 2, nama: "Item #2", harga: 20000, user_ids: [2] },
        { id: 3, nama: "Item #3", harga: 30000, user_ids: [1] },
        { id: 4, nama: "Item #4", harga: 40000, user_ids: [] },
    ],
    expenses_by_user: []
}

var defaultBill = {
    id: 0, nama: "", harga: 0, user_ids: []
}

const countTotal = (st: BillType[]) => {
    return st.reduce((accumulator, object) => {
        return accumulator + object.harga;
    }, 0);
}

export const expenses = (state = defaultState, action: { type: string, payload: any }) => {
    const { type, payload } = action;
    var temp: ExpensesType;
    switch (type) {
        case REMOVE_EXPENSES: {
            const { number } = payload;
            var expKey: number = getKeyByValue(state.bills, number);
            temp = { ...state };
            if (temp.bills[expKey] !== undefined) {
                temp.bills = temp.bills.filter(function (user, index) {
                    return user.id !== number; // this is for name/index
                });
                temp.total = countTotal(temp.bills);
                return temp;
            }
            return state;
        }

        case REMOVE_USER_FROM_EXPENSES: {
            const { user_id } = payload;
            temp = { ...state };
            state.bills.map((object, key) => {
                temp.bills[key].user_ids = temp.bills[key].user_ids.filter(function (val, index) {
                    return val !== user_id; // this is for name/index
                });
                return true
            });
            return temp;
        }

        case UPDATE_EXPENSES: {
            const { nama, harga, eid, expenses_by_user } = payload;
            let expKey: number = getKeyByValue(state.bills, eid);
            temp = { ...state };
            temp.expenses_by_user = expenses_by_user;
            if (temp.bills[expKey] !== undefined) {
                temp.bills[expKey].nama = nama;
                temp.bills[expKey].harga = harga || 0;
                temp.total = countTotal(temp.bills);
                return temp;
            }
            return temp;
        }

        case ADD_EXPENSE: {
            /* need to use spread operator to make it reference to new object,
            * if not, new user will always use same reference
            */
            let newData = {
                ...defaultBill,
                id: getRandomInt(1000),
                user_ids: [...defaultBill.user_ids]
            };

            return { ...state, bills: [...state.bills, newData] };
        }

        case UPDATE_EXPENSES_USERS: {
            const { user_ids, index } = payload;
            temp = { ...state };
            if (temp.bills[index] !== undefined) {
                temp.bills[index].user_ids = user_ids;
            }
            return temp;
        }

        case TOGGLE_EXPENSES_USERS: {
            const { user_id, expense_id } = payload;
            let expKey: number = getKeyByValue(state.bills, expense_id);
            temp = { ...state };
            var index = temp.bills[expKey].user_ids.indexOf(user_id);
            if (index === -1) {
                temp.bills[expKey].user_ids.push(user_id);
            } else {
                temp.bills[expKey].user_ids.splice(index, 1);
            }
            return temp;
        }

        case UPDATE_EXPENSES_BY_USER: {
            const { expenses_by_user } = payload;
            temp = { ...state };
            temp.expenses_by_user = expenses_by_user;
            return temp;
        }

        default:
            return state;
    }
};