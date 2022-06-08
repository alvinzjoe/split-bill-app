import { connect } from "react-redux";
import { ExpensesByUserType, ExpensesType } from "../store/reducers/expenses";
import { Link } from "react-router-dom";
import { iAppState } from "../store/store";
import { Dispatch } from "redux";
import { UsersType } from "../store/reducers/users";
import { formatToIDR } from "../helpers/Helpers";

interface Props {
  expenses_by_user: ExpensesByUserType[], 
  users: UsersType[], 
  expenses: ExpensesType, 
  expenses_total: number
}

const SummaryPage = ({ expenses, expenses_total, users, expenses_by_user }: Props) => {
  return (
    <form>
      <div className="mt-10 sm:mt-0">
        <div className="mt-5 md:mt-0 md:col-span-3">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
            <h2 className="text-2xl mb-5 font-bold">Summary</h2>
              <div className="">
                { expenses_by_user.length > 0 &&  expenses_by_user.map(function (object, i) {
                  return <div key={i}>
                    <div className="font-bold border-b pb-2 mb-2">{object.nama} </div>
                    {object.bills.length>0 && 
                      <div className="border-b pb-2 mb-2">
                        {object.bills.map((o,x) => { 
                          return <div className="grid grid-cols-6 text-slate-500 pb-1" key={x}>
                            <div className="col-span-3">{o.nama}</div>
                            <div className="col-span-3 text-right">{formatToIDR(o.harga/o.user_ids.length)}</div>
                          </div> })
                        }
                      </div>
                  }
                    <div className="col-span-2 text-right">{formatToIDR(object.total)}</div>
                  </div>
                })}
              </div>
            </div>

            <div className="px-4 py-5 bg-gray-50 text-right grid grid-cols-6 gap-6">
              <div className="text-left col-span-3">
                <Link
                  to="/expenses"
                  className="inline-flex default-button"
                >
                  Kembali
                </Link>
              </div>
              <div className="text-right col-span-3 flex justify-end items-center">
                <h3 className="h-auto mr-2">Total: {formatToIDR(expenses_total)}</h3>
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
    expenses: state.expenses,
    expenses_total: state.expenses.total,
    expenses_by_user: state.expenses.expenses_by_user,
    users: state.users
  }
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  
});
export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);