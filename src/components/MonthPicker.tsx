interface Props {
  value: string; // "YYYY-MM"
  onChange: (value: string) => void;
}

const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

export default function MonthPicker({ value, onChange }: Props) {
  const [year, month] = value.split("-").map(Number);

  const shift = (delta: number) => {
    const d = new Date(year, month - 1 + delta, 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    onChange(`${y}-${m}`);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => shift(-1)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-lg"
      >
        ←
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[140px] text-center">
        {MONTH_NAMES[month - 1]} {year}
      </span>
      <button
        onClick={() => shift(1)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-lg"
      >
        →
      </button>
    </div>
  );
}
