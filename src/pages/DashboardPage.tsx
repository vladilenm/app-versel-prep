import { useState, useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import type { Transaction } from "../types/transaction";
import { CATEGORY_COLORS } from "../constants/categories";
import MonthPicker from "../components/MonthPicker";

interface Props {
  transactions: Transaction[];
}

function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

const SHORT_MONTHS = [
  "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
  "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
];

function getLast6Months(): string[] {
  const result: string[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    result.push(key);
  }
  return result;
}

export default function DashboardPage({ transactions }: Props) {
  const [month, setMonth] = useState(currentMonth);

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const totalExpense = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const balance = totalIncome - totalExpense;

  // Pie data: expenses by category for selected month
  const pieData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of transactions) {
      if (t.type === "expense" && t.date.startsWith(month)) {
        map[t.category] = (map[t.category] ?? 0) + t.amount;
      }
    }
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions, month]);

  // Bar data: income vs expense per month, last 6 months
  const barData = useMemo(() => {
    const months = getLast6Months();
    return months.map((m) => {
      let income = 0;
      let expense = 0;
      for (const t of transactions) {
        if (t.date.startsWith(m)) {
          if (t.type === "income") income += t.amount;
          else expense += t.amount;
        }
      }
      const [, mon] = m.split("-");
      return { name: SHORT_MONTHS[parseInt(mon) - 1], income, expense };
    });
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 text-center">
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Баланс</div>
          <div className={`text-2xl font-bold ${balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {balance.toLocaleString("ru-RU")} ₽
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 text-center">
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Доходы</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            +{totalIncome.toLocaleString("ru-RU")} ₽
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 text-center">
          <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Расходы</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            −{totalExpense.toLocaleString("ru-RU")} ₽
          </div>
        </div>
      </div>

      {/* Pie chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Расходы по категориям</h2>
          <MonthPicker value={month} onChange={setMonth} />
        </div>
        {pieData.length === 0 ? (
          <div className="text-gray-400 dark:text-gray-500 text-sm text-center py-8">Нет расходов за этот месяц</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(props) => `${props.name ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] ?? "#6b7280"} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${Number(v).toLocaleString("ru-RU")} ₽`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bar chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Доходы vs Расходы (6 месяцев)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip formatter={(v) => `${Number(v).toLocaleString("ru-RU")} ₽`} />
            <Legend />
            <Bar dataKey="income" name="Доходы" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="Расходы" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
