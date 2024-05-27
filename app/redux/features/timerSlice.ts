import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TimerType } from "interface/timer";
import type { Translation, IProductPageTimer } from "interface/timer";

import { SupportedTranslationLanguage, AppStaticData } from "interface/shared";

// Define a type for the slice state
interface ITimerState extends IProductPageTimer {
  selectedTab: number;
  selectedLanguage: keyof typeof SupportedTranslationLanguage;
  isModalOpen: boolean;
  addedLanguages: Array<keyof typeof SupportedTranslationLanguage>;
  currentLanguageInState: Translation;
  translationToEditIndex: number;
  languageOptions: {
    label: string;
    value: keyof typeof SupportedTranslationLanguage;
  }[];
}
function getDefaulDate(): {
  start: string;
  end: string;
} {
  return {
    start: new Date().toISOString(),
    end: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
  };
}
// Define the initial state using that type
const initialState: ITimerState = {
  selectedLanguage: "en",
  addedLanguages: [],
  languageOptions: [...AppStaticData.languageOptions],
  currentLanguageInState: AppStaticData.defaultTranslationLanguageState,
  isModalOpen: false,
  selectedTab: 0,
  translationToEditIndex: -1,
  // timer state
  name: "New Timer",
  type: "product",
  title: "Hurry Up!",
  subHeading: "Sale ends in:",
  timerLabel: {
    day: "Days",
    hour: "Hrs",
    minute: "Mins",
    second: "Secs",
  },
  translations: [],
  timerType: TimerType.countdownToDate,
  countDownToDate: {
    startNow: true,
    startDate: {
      date: getDefaulDate().start,
      hour: 0,
      minute: 0,
      dateAMPM: "AM",
    },
    endDate: {
      date: getDefaulDate().end,
      hour: 0,
      minute: 0,
      dateAMPM: "PM",
    },
  },
  fixedMinutesTimer: {
    duration: 120,
  },
  dailyRecurring: {
    days: [0, 1, 2, 3, 4, 5, 6],
    endTime: {
      date: getDefaulDate().end,
      hour: 0,
      minute: 0,
      dateAMPM: "PM",
    },
    startTime: {
      date: getDefaulDate().start,
      hour: 0,
      minute: 0,
      dateAMPM: "AM",
    },
    startToday: true,
    neverEnds: true,
  },
  geoLocationSetting: {
    showOnAllCountries: true,
    showOnSpecificCountries: [],
  },
  onceEnds: "Do Nothing",
  productSelection: [],
  productTagsSelection: [],
  showOnAllProducts: true,
  showOnCustomPosition: false,
  style: { ...AppStaticData.style },
};

export const timerSlice = createSlice({
  name: "timer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleInputChange: (
      state,
      action: PayloadAction<{
        name: string;
        value: any;
      }>,
    ) => {
      const { name, value } = action.payload;
      const fields = name.split(".");
      // Iterate over the name array, except for the last entry
      for (let i = 0; i < fields.length - 1; i++) {
        // Ensure the path exists in the state, or create it
        if (!state[fields[i]]) {
          state[fields[i]] = {};
        }
        state = state[fields[i]];
      }
      // Update the final nested field
      state[fields[fields.length - 1]] =
        value instanceof Date ? value.toISOString() : value;
    },
    handleLanguageChange: (
      state,
      action: PayloadAction<keyof typeof SupportedTranslationLanguage>,
    ) => {
      state.selectedLanguage = action.payload;
      state.currentLanguageInState.language = action.payload;
    },
    wantToAddNewTranslation: (state) => {
      state.isModalOpen = true;
      state.selectedLanguage = state.languageOptions[0]
        .value as keyof typeof SupportedTranslationLanguage;
      state.currentLanguageInState.language = state.selectedLanguage;
    },
    cancelTranslation: (state) => {
      state.isModalOpen = false;
    },
    handleConfirmAddNewTranslation: (state) => {
      state.isModalOpen = false;
      state.translations = [
        ...state.translations,
        state.currentLanguageInState,
      ];
      state.addedLanguages.push(state.currentLanguageInState.language);
      state.languageOptions = state.languageOptions.filter((entry) => {
        return !state.addedLanguages.includes(entry.value as never);
      });
      state.currentLanguageInState =
        AppStaticData.defaultTranslationLanguageState;
    },
    handleManageTranslation: (state, action: PayloadAction<number>) => {
      state.translationToEditIndex = action.payload;
    },
    handleConfirmUpdateTranslation: (state) => {
      state.isModalOpen = false;
      state.translations = state.translations.map((translation, index) => {
        if (index === state.translationToEditIndex) {
          return state.currentLanguageInState;
        }
        return translation;
      });
      state.translationToEditIndex = -1;
      state.languageOptions = state.languageOptions.filter((entry) => {
        return !state.addedLanguages.includes(entry.value as never);
      });
      state.currentLanguageInState =
        AppStaticData.defaultTranslationLanguageState;
    },
    handleEditTranslation: (state, action: PayloadAction<number>) => {
      state.translationToEditIndex = action.payload;
      const languageToEdit = state.translations[action.payload] as Translation;
      const selectedLanguage = state.translations[action.payload].language;
      state.currentLanguageInState = languageToEdit;
      state.selectedLanguage = selectedLanguage;

      // only the current language which will be edited will show in the select language languageOptions
      state.languageOptions = [
        {
          value: selectedLanguage,
          label: SupportedTranslationLanguage[selectedLanguage],
        },
      ];
      state.isModalOpen = true;
    },
    handleTranslationModalClose: (state) => {
      state.isModalOpen = false;
      state.translationToEditIndex = -1;
      state.currentLanguageInState = {
        language: "en",
        title: "",
        subHeading: "",
        timerLabel: {
          day: "Days",
          hour: "Hrs",
          minute: "Mins",
          second: "Secs",
        },
      };
      state.languageOptions = AppStaticData.languageOptions.filter((entry) => {
        return !state.addedLanguages.includes(entry.value as never);
      });
    },
    handleRecurringDayChange: (
      state,
      action: {
        payload: {
          value: number;
          added: boolean;
        };
      },
    ) => {
      const { value, added } = action.payload;
      if (added) {
        state.dailyRecurring.days.push(value);
      } else {
        state.dailyRecurring.days = state.dailyRecurring.days.filter(
          (day) => day !== value,
        );
      }
    },
    handleTabChange: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
    handleDeleteTranslation: (state, action: PayloadAction<number>) => {
      state.translations = state.translations.filter(
        (_, index) => index !== action.payload,
      );
      state.addedLanguages = state.addedLanguages.filter(
        (_, index) => index !== action.payload,
      );
      state.languageOptions = AppStaticData.languageOptions.filter((entry) => {
        return !state.addedLanguages.includes(entry.value as never);
      });

      state.translationToEditIndex = -1;
    },
  },
});

export const {
  cancelTranslation,
  wantToAddNewTranslation,
  handleManageTranslation,
  handleEditTranslation,
  handleConfirmUpdateTranslation,
  handleConfirmAddNewTranslation,
  handleLanguageChange,
  handleInputChange,
  handleTabChange,
  handleRecurringDayChange,
  handleTranslationModalClose,
  handleDeleteTranslation,
} = timerSlice.actions;

export default timerSlice.reducer;
