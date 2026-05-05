import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import { useDarkMode } from "./hooks/useDarkMode";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";

type Tab = "dashboard" | "transactions";

function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const { transactions, addTransaction, removeTransaction } = useTransactions();
  const { dark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Мой бюджет</h1>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setTab("dashboard")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === "dashboard"
                    ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Дашборд
              </button>
              <button
                onClick={() => setTab("transactions")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  tab === "transactions"
                    ? "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Транзакции
              </button>
            </nav>
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Переключить тему"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === "dashboard" ? (
          <DashboardPage transactions={transactions} />
        ) : (
          <TransactionsPage
            transactions={transactions}
            onAdd={addTransaction}
            onRemove={removeTransaction}
          />
        )}
      </main>
    </div>
  );
}

export default App;
