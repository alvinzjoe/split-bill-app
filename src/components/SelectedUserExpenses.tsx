import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { ThunkDispatch } from "redux-thunk";
import getKeyByValue from "../helpers/Helpers";
import { BillType, ExpensesType } from "../store/reducers/expenses";
import { UsersType } from "../store/reducers/users";
import { iAppState } from "../store/store";

interface Props {
    expenseid:number, 
    expense: BillType, 
    users: UsersType[],
    expenses: ExpensesType, 
    onToggleSelected: (uid: number, eid: number) => void
}

const SelectedUserExpenses= ({ expenseid, users, expenses, expense, onToggleSelected }: Props) => {
    const [userList, setUserList] = useState<UsersType[]>([]);

    useEffect(() => {
        setUserList(users);
    }, [users]);

    const handleonclick = (uid: number) => {
        var key = getKeyByValue(users,uid);
        if(key !== undefined) {
            onToggleSelected(uid, expenseid);
        }
    }

    return (
        <>
            <Popup
                trigger={open => (
                    <button type="button">
                        <div className="inline-block">
                            {expense.user_ids.length > 0 && expense.user_ids.map(function (uid, i) {
                                let ukey: number = getKeyByValue(users, uid);
                                if(users[ukey] !== undefined) {
                                    return (<span key={i}
                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-black text-white text-center overflow-hidden"
                                    >{users[ukey].nama}</span>)
                                };
                                return true;
                            })}
                            <span
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-black text-white text-center overflow-hidden"
                            >+</span>
                        </div>
                    </button>
                )}
                position="right center"
                closeOnDocumentClick>
                <div className="px-2 py-2 shadow sm:rounded-md min-w-min bg-white">
                    {userList.map(function (object, a) {
                        return (
                            <div className="cursor-pointer inline-block" key={a} onClick={(e) => handleonclick(object.id)}>
                                <span
                                    className={((expense.user_ids.length >0 && expense.user_ids.indexOf(object.id) !== -1) ? "selected " : "") + " user-select inline-block h-6 w-6 rounded-full overflow-hidden ring-2 ring-white bg-black text-white text-center "}
                                >{object.nama}</span>
                            </div>
                        );
                    })}
                </div>
            </Popup>
        </>
    );
};
const mapStateToProps = (state: iAppState) => ({
    
});
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserExpenses);
