import type {
  CountryCode,
  OnceEndsTimer,
  SupportedTranslationLanguage,
  TimerTemplate,
} from "./shared";

type TimerLabel = {
  day: string;
  hour: string;
  minute: string;
  second: string;
};

export type Translation = {
  language: keyof typeof SupportedTranslationLanguage;
  title: string;
  subHeading: string;
  timerLabel: TimerLabel;
};

type TimerTimeLine = {
  date?: string;
  hour: Number;
  minute: Number;
  dateAMPM?: "AM" | "PM";
};
export type TimerCardDesign = {
  cardBackgroundColor?: string;
  isGradiantBackground: boolean;
  cardBackgroundGradientStart: string;
  cardBackgroundGradientEnd: string;
  cardBackgroundGradientAngle: string;
  borderRadius: Number;
  borderSize: Number;
  borderColor: string;
  insideTop: Number;
  insideBottom: Number;
  outsideTop: Number;
  outsideBottom: Number;
  [key: string]: string | boolean | Number | undefined;
};

export type TimerCardDesignKeyType =
  | "borderColor"
  | "cardBackgroundGradientStart"
  | "cardBackgroundGradientEnd"
  | "cardBackgroundColor";

type TimerTypoGraphy = {
  font: string;
  titleSize: Number;
  titleColor: string;
  subHeadingSize: Number;
  subHeadingColor: string;
  timerSize: Number;
  timerColor: string;
  timerLegendSize: Number;
  timerLegendColor: string;
  showCloseIcon?: boolean;
  closeIconColor?: string;
};
export type TimerStyle = {
  template: keyof typeof TimerTemplate;
  position?: string;
  cardStyle: TimerCardDesign;
  typoGraphy: TimerTypoGraphy;
};

export enum TimerType {
  countdownToDate = "countdown-to-date",
  fixedMinutes = "fixed-minutes",
  dailyRecurring = "daily-recurring",
}

type GeoLocationSetting = {
  showOnAllCountries: boolean;
  showOnSpecificCountries: Array<keyof typeof CountryCode> | [];
};

export type IProductPageTimer = {
  type: string;
  name: string;
  title: string;
  subHeading: string;
  timerLabel: TimerLabel;
  translations: Array<Translation> | [];
  timerType: TimerType;
  onceEnds: keyof typeof OnceEndsTimer;
  style: TimerStyle;
  showOnAllProducts: boolean;
  productSelection: Array<string> | [];
  productTagsSelection: Array<string> | [];
  showOnCustomPosition: boolean;
  geoLocationSetting: GeoLocationSetting;

  fixedMinutesTimer: {
    duration: number;
  };
  countDownToDate: {
    startNow: boolean;
    startDate: TimerTimeLine;
    endDate: TimerTimeLine;
  };
  dailyRecurring: {
    days: Array<number>;
    startTime: TimerTimeLine;
    endTime: TimerTimeLine;
    startToday: boolean;
    neverEnds: boolean;
  };
};

export type TimeLineFnReturnType = {
  date?: { updateKey: string; value: any };
  hour: { updateKey: string; value: any };
  minute: { updateKey: string; value: any };
  dateAMPM: { updateKey: string; value: any };
};
