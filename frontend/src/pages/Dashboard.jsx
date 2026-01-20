import UploadFile from "../components/inputs/UploadFile";
import ViewTransactions from "../components/buttons/ViewTransactions";
import BarChart from "../components/charts/BarChart";
import CircleChart from "../components/charts/CircleChart";
import InfoBoxes from "../components/ui/InfoBoxes";
import FormDateBetween from "../components/forms/FormDateBetween";
import Loading from "../components/animations/Loading";

import {toast} from "react-toastify"

import { useDateRange } from "../hooks/useDateRange";
import { useTransactionSummary } from "../hooks/useTransactionSummary";
import { useTransaction } from "../hooks/useTransactions";

import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, authReady }) {
  /* -------------------- hooks -------------------- */
  const {
    fetchTotalDateRange,
    totalIncome,
    totalExpense,
    categories,
    loading,
    error,
  } = useDateRange();

  const {
    transactionSummary,
    loadingSummary,
    errorSummary,
  } = useTransactionSummary();

  const {transaction, loadingTransaction, errorTransaction} = useTransaction();

  const navigate = useNavigate();

  /* -------------------- state -------------------- */
  const [dashboardData, setDashboardData] = useState({
    income: null,
    expense: null,
    categories: [],
  });
  
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const hasShownToast = useRef(false);

  /* -------------------- auth guard -------------------- */
  console.log(user)
  console.log(authReady)
  useEffect(() => {
    if (!user) navigate("/signup");
    if (!authReady) return
  }, [user, navigate]);

  /* -------------------- initial load -------------------- */
  useEffect(() => {
    if (transactionSummary) {
      setDashboardData({
        income: transactionSummary,
        expense: transactionSummary,
        categories,
      });
      setLoadingState(false);
    }

    if (errorSummary) {
      setErrorState(errorSummary);
      setLoadingState(false);
    }
  }, [transactionSummary, errorSummary, categories]);

  /* -------------------- initial notification -------------------- */
  useEffect(() => {
    if (hasShownToast.current) return;

    const count = transaction.filter(
      t => t.category_name === "Other"
    ).length;

    if (count > 0) {
      const timer = setTimeout(() => {
        toast.warn(
          `You have ${count} items that marked as "Other" category. Do you want to change the category of the items?`
        );
        hasShownToast.current = true;
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [transaction]);

  /* -------------------- date filter submit -------------------- */
  const handleDateSubmit = async (payload) => {
    try {
      setLoadingState(true);
      setIsFiltered(true);
      await fetchTotalDateRange(payload);
      setDashboardData({
        income: totalIncome,
        expense: totalExpense,
        categories,
      });
    } catch (err) {
      setErrorState(err.message);
    } finally {
      setLoadingState(false);
    }
  };

  /* -------------------- reset filter -------------------- */
  const resetFilter = () => {
    setIsFiltered(false);

    setDashboardData({
      income: transactionSummary,
      expense: transactionSummary,
      categories,
    });
  };

  /* -------------------- derived values -------------------- */
  const balance = useMemo(() => {
    if (!dashboardData.income || !dashboardData.expense) return 0;
    return (
      dashboardData.income.total_income +
      dashboardData.expense.total_expense
    );
  }, [dashboardData]);

  /* -------------------- render -------------------- */
  if (errorState) {
    return (
      <div className="text-rose-700 text-xl mt-4 text-center">
        There is an error. Please contact IT support.
      </div>
    );
  }

  return (
    <nav className="font-manrope">
      <h2 className="text-center font-bold text-3xl mt-4">
        Dashboard
      </h2>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mt-3">
        <UploadFile />
        <ViewTransactions />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Date Filter */}
        <div className="flex items-end gap-4 my-4">
          <FormDateBetween
          onSubmit={handleDateSubmit}
          onReset={resetFilter}
          loading={loadingState}
          isFiltered={isFiltered}
        />
        </div>

        {loadingState ? (<Loading/>) : (<div>

 <InfoBoxes
          dataToRenderIncome={dashboardData.income}
          dataToRenderExpense={dashboardData.expense}
          balance={balance}
        />

        {/* Charts */}
        <div className="flex justify-center gap-4 mt-4">
          <BarChart categories={dashboardData.categories} />
          <CircleChart
            dataToRenderIncome={dashboardData.income?.total_income}
            dataToRenderExpense={dashboardData.expense?.total_expense}
          />
        </div>
        </div>)}
        {/* Info Boxes */}
      </div>
    </nav>
  );
}

export default Dashboard;
