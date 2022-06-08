import { connect } from "react-redux";
import { addExpense, ExpensesType, removeExpenses, toggleExpensesUsers, updateExpenses } from "../store/reducers/expenses";
import { Link } from "react-router-dom";
import InputExpenses from "../components/InputExpenses";
import { iAppState } from "../store/store";
import { formatToIDR } from "../helpers/Helpers";
import { ThunkDispatch } from "redux-thunk";
import { UsersType } from "../store/reducers/users";

interface Props {
  expenses: ExpensesType,
  users: Array<UsersType>,
  expenses_total: number,
  iAddExpense: () => void,
  onRemove: (index: number) => void;
  onUpdate: (nama: string, harga: number, eid: number) => void;
  onToggleSelected: (uid: number, eid: number) => void
}

const ExpensesPage = ({ expenses, expenses_total, users, iAddExpense, onRemove, onUpdate, onToggleSelected }: Props) => {
  return (
    <form>
      <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0 md:col-span-3">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <h2 className="text-2xl mb-5 font-bold">Expenses</h2>
              <div className="grid grid-cols-6 gap-6">
                {expenses.bills.map(function (object, i) {
                  return (<InputExpenses
                    expense={object} nama={object.nama} harga={object.harga} expenseid={object.id} expensekey={i} key={i}
                    expenses={expenses} users={users}
                    onRemove={onRemove} onUpdate={onUpdate} onToggleSelected={onToggleSelected}
                  />);
                })}
                <div className="col-span-6">
                  <button
                    type="button"
                    className="inline-flex default-button"
                    onClick={(e) => {
                      iAddExpense();
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
                          PPN (10%)
                        </label>
                        <label htmlFor="comments" className="text-gray-500 block">Get notified when someones posts a comment on a posting.</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 bg-gray-50 text-right grid grid-cols-6 gap-6">
              <div className="text-left col-span-3">
                <Link
                  to="/"
                  className="inline-flex default-button"
                >
                  Kembali
                </Link>
              </div>
              <div className="text-right col-span-3 flex justify-end items-center">
                <h3 className="h-auto mr-2">Total: {formatToIDR(expenses_total)}</h3>

                <Link
                  to="/summary-page"
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

const mapStateToProps = (state: iAppState) => ({
  users: state.users,
  expenses: state.expenses,
  expenses_total: state.expenses.total,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  iAddExpense: () => dispatch(addExpense()),
  onRemove: (number: number) => dispatch(removeExpenses(number)),
  onUpdate: (nama: string, harga: number, eid: number) => dispatch(updateExpenses(nama, harga, eid)),
  onToggleSelected: (uid: number, eid: number) => dispatch(toggleExpensesUsers(uid, eid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPage);