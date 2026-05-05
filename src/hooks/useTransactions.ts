import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Transaction } from "../types/transaction";

const STORAGE_KEY = "budget-tracker-transactions";

function loadTransactions(): Transaction[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback(
    (data: Omit<Transaction, "id">) => {
      setTransactions((prev) => [{ ...data, id: uuidv4() }, ...prev]);
    },
    [],
  );

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { transactions, addTransaction, removeTransaction };
}
