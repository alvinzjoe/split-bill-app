import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { BillType, ExpensesType } from "../store/reducers/expenses";
import { UsersType } from "../store/reducers/users";
import { iAppState } from "../store/store";
import SelectedUserExpenses from "./SelectedUserExpenses";

interface Props {
    nama: string, 
    expense: BillType, 
    expenseid: number, 
    harga: number, 
    users: UsersType[], 
    expenses: ExpensesType,
    onRemove: any, 
    onUpdate: any, 
    expensekey: number, 
    onToggleSelected: (uid: number, eid: number) => void
}

const InputExpenses = ({ nama, expense, expenseid, harga, onRemove, onUpdate, onToggleSelected, users, expenses }: Props) => {
    const [iNama, setINama] = useState("");
    const [iHarga, setiHarga] = useState<number>(0);

    useEffect(() => {
        setINama(nama);
        setiHarga(harga || 0);
    }, [expenseid]);

    useEffect(() => {
        onUpdate(iNama, (iHarga || 0), expenseid);
    }, [iNama, iHarga, onUpdate, expenseid]);

    return (
        <div className="grid grid-cols-6 gap-6 col-span-6 mb-5 md:mb-2">
            <div className={"col-span-6 sm:col-span-6 md:col-span-1"}>
                <button
                    type="button"
                    className="inline-flex default-button"
                    onClick={(e) => {
                        onRemove(expenseid);
                    }}>
                    Remove
                </button>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-2">
                <input
                    type="text"
                    name="first-name"
                    placeholder="Nama"
                    value={iNama}
                    onChange={(e) => setINama(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-2">
                <input
                    type="number"
                    name="harga"
                    placeholder="Harga"
                    value={iHarga || ""}
                    min={0}
                    onChange={(e) => { setiHarga(parseInt(e.target.value)); }}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className={"col-span-6 sm:col-span-6 md:col-span-1 flex items-center"}>
                <SelectedUserExpenses users={users} expenses={expenses} expenseid={expenseid} expense={expense} onToggleSelected={onToggleSelected} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: iAppState) => ({

});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(InputExpenses);