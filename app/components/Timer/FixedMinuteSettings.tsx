import { TextField } from "@shopify/polaris";
import { handleInputChange } from "~/redux/features/timerSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";

export default function FixedMinuteSettings(): JSX.Element {
  const dispacth = useAppDispatch();
  const timerState = useAppSelector((state) => state.timer);
  return (
    <>
      <TextField
        value={timerState.fixedMinutesTimer.duration.toString()}
        autoComplete="off"
        type="number"
        label="Timer Duration (in minutes)"
        onChange={(value) =>
          dispacth(
            handleInputChange({
              name: "fixedMinutesTimer.duration",
              value: Number(value),
            }),
          )
        }
      />
    </>
  );
}
