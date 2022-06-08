import InputNama from "../components/InputNama";
import { connect } from "react-redux";
import { removeUser, UsersType, addUser, updateUser } from "../store/reducers/users";
import { Link } from "react-router-dom";
import { iAppState } from "../store/store";
import { removeUserFromExpenses } from "../store/reducers/expenses";
import { ThunkDispatch } from "redux-thunk";

interface Props {
  users: UsersType[]
  iAddUser: () => void ,
  iRemoveUserFromExpenses: (user_id: number) => void
  onRemove: (index: number) => void;
  onUpdate: (nama: string, index: number) => void;
}

const Home = ({ users, iAddUser, iRemoveUserFromExpenses, onRemove, onUpdate }: Props) => {
  return (
    <form>
      <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-4 bg-white">
                <h2 className="text-2xl mb-5 font-bold">Persons</h2>
                <div className="grid grid-cols-6 gap-6">
                  { users.map(function(object, i){
                    return (<InputNama nama={object.nama} userid={object.id} key={object.id} onRemove={onRemove} iRemoveUserFromExpenses={iRemoveUserFromExpenses} onUpdate={onUpdate} />);
                  } ) }
                  <div className="col-span-6">
                    <button
                      type="button"
                      className="inline-flex default-button"
                      onClick={(e) => {
                        iAddUser();
                      }}>
                      Add
                     </button>
                  </div>
                  <div className="col-span-6 hidden">
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">
                            Comments
                          </label>
                          <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


              </div>

              <div className="px-4 py-5 bg-gray-50 text-right grid grid-cols-6 gap-6">
                <div className="text-left col-span-3">
                </div>
                <div className="text-right col-span-3">
                  <Link
                    to="/expenses"
                    className="inline-flex primary-button"
                  >
                    Selanjutnya
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </form>

  );
};

const mapStateToProps = (state: iAppState) => {
  return {
    users: state.users,
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  iAddUser: () => dispatch(addUser()),
  iRemoveUserFromExpenses: (user_id: number) => dispatch(removeUserFromExpenses(user_id)),
  onRemove: (number: number) => dispatch(removeUser(number)),
  onUpdate: (nama: string, index: number) => dispatch(updateUser(nama, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);