type MonthsNames = [string, string, string, string, string, string, string, string, string, string, string, string];
type DayNames = [string, string, string, string, string, string, string];

export type DsoLocalizedText = {
  buttonLabel: string;
  placeholder: string;
  selectedDateMessage: string;
  prevMonthLabel: string;
  nextMonthLabel: string;
  monthSelectLabel: string;
  yearSelectLabel: string;
  closeLabel: string;
  keyboardInstruction: string;
  calendarHeading: string;
  dayNames: DayNames;
  monthNames: MonthsNames;
  monthNamesShort: MonthsNames;
};

const localization: DsoLocalizedText = {
  buttonLabel: "Kies datum",
  placeholder: "dd-mm-jjjj",
  selectedDateMessage: "Geselecteerde datum is",
  prevMonthLabel: "Vorige maand",
  nextMonthLabel: "Volgende maand",
  monthSelectLabel: "Maand",
  yearSelectLabel: "Jaar",
  closeLabel: "Sluiten",
  keyboardInstruction: "Gebruik de pijltjestoetsen om een dag te kiezen",
  calendarHeading: "Kies een datum",
  dayNames: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
  monthNames: [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ],
  monthNamesShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
};

export default localization;
