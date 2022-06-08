import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { getKeyByValue, getRandomInt } from "../../helpers/Helpers";
import { recalculateBills } from "./expenses";

export const REMOVE_USER = 'REMOVE_USER';
export const removeUser = (number: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch({
                type: REMOVE_USER,
                payload: { number }
            });
            let { expenses, users } = getState();
            recalculateBills(users, expenses, dispatch);
            resolve();
        })
    }
}

export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (nama: string, index: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch({
                type: UPDATE_USER,
                payload: { nama, index }
            });
            resolve();
        })
    }
}

export const ADD_USER = 'ADD_USER';
export const addUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch({
                type: ADD_USER,
                payload: {}
            });
            let { expenses, users } = getState();
            recalculateBills(users, expenses, dispatch);
            resolve();
        })
    }
}

export interface UsersType {
    id: number;
    nama: string;
}

export interface UsersGroupType {
    [key: string]: UsersType;
}

var defaultState = [
    { id: 1, nama: "Melinda" },
    { id: 2, nama: "Rhonda" },
];

let userDefault = { id: 0, nama: "" };

export const users = (state: UsersType[] = defaultState, action: { type: string, payload: any }): UsersType[] => {
    const { type, payload } = action;
    var expKey: number;
    var temp: UsersType[];
    switch (type) {
        case REMOVE_USER: {
            const { number, expenses } = payload;
            expKey = getKeyByValue(state, number);
            temp = [...state];
            if (temp[expKey] !== undefined) {
                temp = temp.filter(function (user) {
                    return user.id !== number; // this is for name/index
                });
                return temp;
            }
            return state;
        }
        case UPDATE_USER: {
            const { nama, index } = payload;
            expKey = getKeyByValue(state, index);
            temp = [...state];
            if (temp[expKey] !== undefined) {
                temp[expKey].nama = nama;
            }
            return temp;
        }

        case ADD_USER: {
            /* need to use spread operator to make it new ref object,
            * if not, new user will always use same reference
            */
            var newUser = { ...userDefault, id: getRandomInt(1000) };
            return [...state, newUser];
        }

        default:
            return state;
    }
};
