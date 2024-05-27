import { Popover, TextField, DatePicker } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { handleInputChange } from "~/redux/features/timerSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import InputError from "../UI/InputError";

export default function RecurringTimerDateSettings({
  type,
  enabled,
}: {
  type: "start" | "end";
  enabled: boolean;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer);
  const [datePopoverActive, setDatePopoverActive] = useState(false);
  const toggleDatePopoverActive = useCallback(
    () => setDatePopoverActive((popoverActive) => !popoverActive),
    [],
  );
  const isStartType = type === "start" ? true : false;
  const baseValue = isStartType ? "startTime" : "endTime";

  const validateDate = (): boolean => {
    let isError = false;
    if (!timerState.dailyRecurring.neverEnds) {
      const startDate = new Date(timerState.dailyRecurring.startTime.date!);
      const endDate = new Date(timerState.dailyRecurring.endTime.date!);
      if (startDate >= endDate) {
        isError = true;
      }
    }
    return isError;
  };

  if (!enabled) {
    return <></>;
  }
  return (
    <>
      <Popover
        sectioned
        active={datePopoverActive}
        activator={
          <TextField
            label={isStartType ? "Start Date" : "End Date"}
            error={validateDate()}
            helpText={
              validateDate() && (
                <InputError message="End date must be later then start date" />
              )
            }
            onFocus={toggleDatePopoverActive}
            autoComplete="off"
            value={
              new Date(
                timerState.dailyRecurring[baseValue].date!,
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
            new Date(
              timerState.dailyRecurring[baseValue].date!,
            ).getMonth() as number
          }
          year={
            new Date(
              timerState.dailyRecurring[baseValue].date!,
            ).getFullYear() as number
          }
          disableDatesBefore={new Date()}
          onChange={(date) => {
            dispatch(
              handleInputChange({
                name: `dailyRecurring.${baseValue}.date`,
                value: date.start.toISOString(),
              }),
            );
            toggleDatePopoverActive();
          }}
          onMonthChange={(month) =>
            dispatch(
              handleInputChange({
                name: `dailyRecurring.${baseValue}.date`,
                value: new Date(
                  new Date(
                    timerState.dailyRecurring[baseValue].date!,
                  ).getFullYear() as number,
                  month as number,
                  new Date(
                    timerState.dailyRecurring[baseValue].date!,
                  ).getDate() as number,
                ).toISOString(),
              }),
            )
          }
          selected={new Date(timerState.dailyRecurring[baseValue].date!)}
        />
      </Popover>
    </>
  );
}
