import type { Transaction } from "../types/transaction";
import { CATEGORY_COLORS } from "../constants/categories";

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
}

export default function TransactionList({ transactions, onRemove }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-400 dark:text-gray-500 py-12">
        Нет транзакций за этот месяц
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm"
        >
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: CATEGORY_COLORS[t.category] ?? "#6b7280" }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                {t.category}
              </span>
              <span
                className={`text-sm font-semibold ${
                  t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {t.type === "income" ? "+" : "−"}{t.amount.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                {t.description || "—"} · {formatDate(t.date)}
              </span>
              <button
                onClick={() => onRemove(t.id)}
                className="text-xs text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-2 shrink-0"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
