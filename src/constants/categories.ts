export const EXPENSE_CATEGORIES = [
  "Еда",
  "Транспорт",
  "Жильё",
  "Развлечения",
  "Здоровье",
  "Одежда",
  "Прочее",
] as const;

export const INCOME_CATEGORIES = [
  "Зарплата",
  "Фриланс",
  "Прочее",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  "Еда": "#f97316",
  "Транспорт": "#3b82f6",
  "Жильё": "#8b5cf6",
  "Развлечения": "#ec4899",
  "Здоровье": "#14b8a6",
  "Одежда": "#f59e0b",
  "Прочее": "#6b7280",
  "Зарплата": "#22c55e",
  "Фриланс": "#06b6d4",
};
