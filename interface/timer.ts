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
  subHeadig: string;
  timerLabel: TimerLabel;
};

type TimerTimeLine = {
  date: Date;
  hour: Number;
  minute: Number;
  dateAMPM: "AM" | "PM";
};
type TimerCardDesign = {
  cardBackgroundColor?: string;
  isGradiantBackground: boolean;
  cardBackgroundGradientStart: string;
  cardBackgroundGradientEnd: string;
  cardBackgroundGradientAngle: string;
  borderRadius: Number;
  borderSize: Number;
  borderColor: string;
  spacingTop: Number;
  spacingBottom: Number;
  spacingLeft: Number;
  spacingRight: Number;
};

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
type TimerStyle = {
  template: [keyof typeof TimerTemplate];
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
  translation: Array<Translation> | [];
  timerType: TimerType;
  startNow: boolean;
  startDate: TimerTimeLine;
  endDate: TimerTimeLine;
  onceEnds: keyof typeof OnceEndsTimer;
  style: TimerStyle;
  showOnAllProducts: boolean;
  productSelection: Array<string> | [];
  productTagsSelection: Array<string> | [];
  showOnCustomPosition: boolean;
  geoLocationSetting: GeoLocationSetting;
};
