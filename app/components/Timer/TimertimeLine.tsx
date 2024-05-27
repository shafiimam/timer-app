import {
  BlockStack,
  Popover,
  TextField,
  DatePicker,
  InlineStack,
  Select,
} from "@shopify/polaris";
import { DateAMPM } from "interface/shared";
import type { TimeLineFnReturnType } from "interface/timer";
import { TimerType } from "interface/timer";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { handleInputChange } from "~/redux/features/timerSlice";
import { useAppSelector } from "~/redux/hooks";
import InputError from "../UI/InputError";
import CustomLabel from "../UI/Label";

export default function TimerTimeLine({
  timerType,
  isStartTimeline,
}: {
  timerType: TimerType;
  isStartTimeline: boolean;
}): JSX.Element {
  const dispatch = useDispatch();
  const timerState = useAppSelector((state) => state.timer);
  const [datePopoverActive, setDatePopoverActive] = useState(false);
  const toggleDatePopoverActive = useCallback(
    () => setDatePopoverActive((popoverActive) => !popoverActive),
    [],
  );
  function getDynamicValues(
    timerType: TimerType,
    isStartTimeline: boolean,
  ): TimeLineFnReturnType {
    const isCountDownTimer: boolean = timerType === TimerType.countdownToDate;
    const isRecurringTimer: boolean = timerType === TimerType.dailyRecurring;
    const baseKey = isStartTimeline ? "start" : "end";
    const baseKey2 = isCountDownTimer ? "Date" : "Time";
    let baseKey3 = "";
    if (isCountDownTimer) baseKey3 = "countDownToDate";
    if (isRecurringTimer) baseKey3 = "dailyRecurring";
    const obj = timerState[baseKey3 as never][`${baseKey}${baseKey2}` as const];
    const { date, hour, minute, dateAMPM } = obj;
    return {
      date: {
        updateKey: `${baseKey3}.${baseKey}Date.date`,
        value: date,
      },
      hour: {
        updateKey: `${baseKey3}.${baseKey}Time.hour`,
        value: hour,
      },
      minute: {
        updateKey: `${baseKey3}.${baseKey}Time.minute`,
        value: minute,
      },
      dateAMPM: {
        updateKey: `${baseKey3}.${baseKey}Time.dateAMPM`,
        value: dateAMPM,
      },
    };
  }
  const timerTimerLineData = getDynamicValues(timerType, isStartTimeline);
  return (
    <BlockStack gap={"200"}>
      {timerType === TimerType.countdownToDate && (
        <Popover
          sectioned
          active={datePopoverActive}
          activator={
            <TextField
              label={isStartTimeline ? "Start Date" : "End Date"}
              error={
                timerState.countDownToDate.startDate.date! >=
                timerState.countDownToDate.endDate.date!
              }
              helpText={
                timerState.countDownToDate.startDate.date! >=
                  timerState.countDownToDate.endDate.date! && (
                  <InputError message="End date must be later then start date" />
                )
              }
              onFocus={toggleDatePopoverActive}
              autoComplete="off"
              value={
                new Date(
                  timerTimerLineData.date!.value,
                ).toDateString() as string
              }
              onChange={toggleDatePopoverActive}
            />
          }
          autofocusTarget="first-node"
          onClose={toggleDatePopoverActive}
          fullWidth
        >
          <DatePicker
            month={
              new Date(timerTimerLineData.date?.value).getMonth() as number
            }
            year={
              new Date(timerTimerLineData.date?.value).getFullYear() as number
            }
            disableDatesBefore={new Date()}
            onChange={(date) => {
              dispatch(
                handleInputChange({
                  name: timerTimerLineData.date!.updateKey,
                  value: date.start.toISOString(),
                }),
              );
              toggleDatePopoverActive();
            }}
            onMonthChange={(month) =>
              dispatch(
                handleInputChange({
                  name: "countDownToDate.endDate.date",
                  value: new Date(
                    new Date(
                      timerTimerLineData.date!.value,
                    ).getFullYear() as number,
                    month as number,
                    new Date(
                      timerTimerLineData.date!.value,
                    ).getDate() as number,
                  ).toISOString(),
                }),
              )
            }
            selected={new Date(timerTimerLineData.date!.value)}
          />
        </Popover>
      )}

      <CustomLabel style={{ marginTop: "10px" }}>
        {isStartTimeline &&
          timerType === TimerType.dailyRecurring &&
          "Daily Start Time"}
        {!isStartTimeline &&
          timerType === TimerType.dailyRecurring &&
          "Daily End Time"}
        {timerType === TimerType.countdownToDate && ""}
      </CustomLabel>
      <InlineStack
        align="start"
        as="span"
        gap={"200"}
        wrap={false}
        blockAlign="start"
      >
        <TextField
          connectedRight
          autoComplete="off"
          label="Hour"
          value={timerTimerLineData.hour.value.toString()}
          type="number"
          min={1}
          max={12}
          onChange={(value) =>
            dispatch(
              handleInputChange({
                name: timerTimerLineData.hour.updateKey,
                value: Number(value),
              }),
            )
          }
        />
        <TextField
          autoComplete="off"
          label="Min"
          value={timerTimerLineData.minute.value.toString()}
          type="number"
          min={0}
          max={59}
          onChange={(value) =>
            dispatch(
              handleInputChange({
                name: timerTimerLineData.minute.updateKey,
                value: Number(value),
              }),
            )
          }
        />
        <Select
          label="AM/PM"
          options={Object.values(DateAMPM).map((value) => ({
            label: value,
            value,
          }))}
          value={timerTimerLineData.dateAMPM.value}
          onChange={(value: keyof typeof DateAMPM) =>
            dispatch(
              handleInputChange({
                name: timerTimerLineData.dateAMPM.updateKey,
                value,
              }),
            )
          }
        />
      </InlineStack>
    </BlockStack>
  );
}
