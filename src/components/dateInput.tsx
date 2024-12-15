import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";

interface DateInputProps {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  error?: string;
}

export function DateInput({
  label,
  value,
  onChange,
  error,
}: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"year" | "month" | "day">(
    "year"
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate years (100 years back from now)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

  // Months
  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  // Generate days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    onChange(newDate);
    setIsOpen(false);
  };

  // Render years view
  const renderYears = () => (
    <div className="grid grid-cols-4 gap-2 p-2 max-h-60 overflow-y-auto">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => {
            setSelectedYear(year);
            setCurrentView("month");
          }}
          className="p-2 hover:bg-gray-100 rounded"
        >
          {year}
        </button>
      ))}
    </div>
  );

  // Render months view
  const renderMonths = () => (
    <div className="grid grid-cols-3 gap-2 p-2">
      {monthNames.map((month, index) => (
        <button
          key={month}
          onClick={() => {
            setSelectedMonth(index);
            setCurrentView("day");
          }}
          className="p-2 hover:bg-gray-100 rounded"
        >
          {month}
        </button>
      ))}
    </div>
  );

  // Render days view
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const paddedDays = Array(firstDayOfMonth).fill(null).concat(days);

    return (
      <div>
        <div className="grid grid-cols-7 text-center text-sm mb-2">
          {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((day) => (
            <div key={day} className="p-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {paddedDays.map((day, index) =>
            day ? (
              <button
                key={index}
                onClick={() => handleDateSelect(day)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                {day}
              </button>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>
        <div className="flex justify-between p-2">
          <button
            onClick={() => setCurrentView("month")}
            className="text-sm text-gray-600 hover:underline"
          >
            Zurück zu Monaten
          </button>
          <button
            onClick={() => setCurrentView("year")}
            className="text-sm text-gray-600 hover:underline"
          >
            Zurück zu Jahren
          </button>
        </div>
      </div>
    );
  };

  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("de-DE", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="relative">
      <label className="block mb-1">{label}</label>
      {error && <p className="mt-1 text-sm text-red-600">{error === "Required" && "Das Geburtsdatum ist ungültig"}</p>}
      <div className="relative">
        <input
          type="text"
          value={formatDate(value)}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          placeholder="TT / MM / JJJJ"
          className="border border-default rounded-md p-3 w-full cursor-pointer"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <Calendar size={18} />
        </button>
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg"
        >
          {currentView === "year" && renderYears()}
          {currentView === "month" && renderMonths()}
          {currentView === "day" && renderDays()}
        </div>
      )}
    </div>
  );
}

export default DateInput;
