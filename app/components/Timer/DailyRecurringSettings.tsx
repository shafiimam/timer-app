import { BlockStack, Checkbox, ChoiceList } from "@shopify/polaris";
import { AppStaticData } from "interface/shared";
import {
  handleRecurringDayChange,
  handleInputChange,
} from "~/redux/features/timerSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import CustomLabel from "../UI/Label";
import RecurringTimerDateSettings from "./RecurringTimerDateSettings";
import TimerTimeLine from "./TimertimeLine";

export default function DailyRecurringSettings(): JSX.Element {
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer);
  return (
    <>
      <CustomLabel style={{ marginTop: "1rem", marginBottom: "0rem" }}>
        Repeat on
      </CustomLabel>
      <BlockStack gap="300">
        <BlockStack gap="025">
          {AppStaticData.daysOfWeekOptions.map((day) => (
            <Checkbox
              key={day.value}
              label={day.label}
              checked={timerState.dailyRecurring.days.includes(day.value)}
              onChange={(checked) =>
                dispatch(
                  handleRecurringDayChange({
                    added: checked,
                    value: day.value,
                  }),
                )
              }
            />
          ))}
        </BlockStack>
        <TimerTimeLine
          timerType={timerState.timerType}
          isStartTimeline={true}
        />
        <TimerTimeLine
          timerType={timerState.timerType}
          isStartTimeline={false}
        />
        <ChoiceList
          title="Starts"
          choices={AppStaticData.recurringTimerStartOptions}
          selected={
            timerState.dailyRecurring.startToday === true
              ? ["today"]
              : ["specific-date"]
          }
          onChange={(value) => {
            const willStartToday = value[0] === "today";

            dispatch(
              handleInputChange({
                name: "dailyRecurring.startToday",
                value: willStartToday,
              }),
            );
          }}
        />
        <RecurringTimerDateSettings
          type="start"
          enabled={!timerState.dailyRecurring.startToday}
        />
        <ChoiceList
          title="Ends"
          choices={AppStaticData.recurringTimerEndsOptions}
          selected={
            timerState.dailyRecurring.neverEnds === true
              ? ["never"]
              : ["specific-date"]
          }
          onChange={(value) => {
            const neverEnds = value[0] === "never";
            if (neverEnds) {
              dispatch(
                handleInputChange({
                  name: "dailyRecurring.endTime.date",
                  value: null,
                }),
              );
            }
            dispatch(
              handleInputChange({
                name: "dailyRecurring.neverEnds",
                value: neverEnds,
              }),
            );
          }}
        />
        <RecurringTimerDateSettings
          type="end"
          enabled={!timerState.dailyRecurring.neverEnds}
        />
      </BlockStack>
    </>
  );
}
