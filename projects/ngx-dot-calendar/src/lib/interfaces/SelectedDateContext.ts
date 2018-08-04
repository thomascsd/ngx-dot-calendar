export interface SelectedDateContext {
  selectedDate: string;
  selectedDateMode: selectedDateMode;
}

export enum selectedDateMode {
  fromYearPicker,
  fromDateClicked
}
