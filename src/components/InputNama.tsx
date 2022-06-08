import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { iAppState } from "../store/store";

interface Props {
    nama: string,
    userid: number,
    onRemove: (index: number) => void;
    onUpdate: (nama: string, index: number) => void;
    iRemoveUserFromExpenses: (user_id: number) => void
}

const InputNama: React.FC<Props> = ({ nama, userid, onRemove, onUpdate, iRemoveUserFromExpenses }) => {
    const [iNama, setINama] = useState<string>("");

    useEffect(() => {
        setINama(nama);
    }, [userid]);

    useEffect(() => {
        onUpdate(iNama, userid);
    }, [iNama, onUpdate, userid]);

    return (
        <div className="grid grid-cols-6 gap-6 col-span-6 mb-5 md:mb-2">
            <div className="col-span-6 md:col-span-5">
                <input
                    type="text"
                    name="nama"
                    placeholder="Nama"
                    value={iNama}
                    onChange={(e) => { setINama(e.target.value); }}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div className={"col-span-6 md:col-span-1"}>
                <button
                    type="button"
                    className="inline-flex default-button"
                    onClick={(e) => {
                        onRemove(userid);
                        iRemoveUserFromExpenses(userid);
                    }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
const mapStateToProps = (state: iAppState) => ({

});
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     onRemove: (number: number) => dispatch(login(number)),
//     onUpdate: (nama: string, index: number) => dispatch(updateUser(nama, index)),
//     iRemoveUserFromExpenses: (user_id: number) => dispatch(removeUserFromExpenses(user_id))
// });
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    // onRemove: (number: number) => dispatch(removeUser(number)),
    // onUpdate: (nama: string, index: number) => dispatch(updateUser(nama, index)),
    // iRemoveUserFromExpenses: (user_id: number) => dispatch(removeUserFromExpenses(user_id))
});
export default connect(mapStateToProps, mapDispatchToProps)(InputNama);