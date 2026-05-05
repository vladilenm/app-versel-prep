import { useState } from "react";
import type { TransactionType, Transaction } from "../types/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

interface Props {
  onAdd: (data: Omit<Transaction, "id">) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0 || !category || !date) return;
    onAdd({
      amount: parsed,
      type,
      category,
      date,
      description: description.trim() || undefined,
    });
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Новая транзакция</h2>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => { setType("expense"); setCategory(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Расход
        </button>
        <button
          type="button"
          onClick={() => { setType("income"); setCategory(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Доход
        </button>
      </div>

      <input
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Выберите категорию</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <input
        type="text"
        placeholder="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        Добавить
      </button>
    </form>
  );
}
