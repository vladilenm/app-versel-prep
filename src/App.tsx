import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";

type Tab = "dashboard" | "transactions";

function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const { transactions, addTransaction, removeTransaction } = useTransactions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">Мой бюджет</h1>
          <nav className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTab("dashboard")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === "dashboard"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Дашборд
            </button>
            <button
              onClick={() => setTab("transactions")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === "transactions"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Транзакции
            </button>
          </nav>
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
