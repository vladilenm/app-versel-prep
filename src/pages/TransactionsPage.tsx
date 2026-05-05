import { useState, useMemo } from "react";
import type { Transaction } from "../types/transaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthPicker from "../components/MonthPicker";

interface Props {
  transactions: Transaction[];
  onAdd: (data: Omit<Transaction, "id">) => void;
  onRemove: (id: string) => void;
}

function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function TransactionsPage({ transactions, onAdd, onRemove }: Props) {
  const [month, setMonth] = useState(currentMonth);

  const filtered = useMemo(
    () => transactions.filter((t) => t.date.startsWith(month)),
    [transactions, month],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <MonthPicker value={month} onChange={setMonth} />
        <TransactionList transactions={filtered} onRemove={onRemove} />
      </div>
      <div>
        <TransactionForm onAdd={onAdd} />
      </div>
    </div>
  );
}
