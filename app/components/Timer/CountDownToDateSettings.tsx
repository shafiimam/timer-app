import { Box, BlockStack, RadioButton } from "@shopify/polaris";
import { TimerType } from "interface/timer";
import { useDispatch } from "react-redux";
import { handleInputChange } from "~/redux/features/timerSlice";
import { useAppSelector } from "~/redux/hooks";
import CustomLabel from "../UI/Label";
import TimerTimeLine from "./TimertimeLine";

export default function CountDownToDateSettings(): JSX.Element {
  const dispatch = useDispatch();
  const timerState = useAppSelector((state) => state.timer);
  const countDownDontStartRightNow = !timerState.countDownToDate.startNow;
  return (
    <>
      {/* Countdown To date settings */}
      <Box>
        <CustomLabel>TImer starts</CustomLabel>
        <BlockStack gap={"400"}>
          <BlockStack>
            <RadioButton
              label="Right Now"
              checked={
                timerState.timerType === TimerType.countdownToDate &&
                timerState.countDownToDate.startNow
              }
              onChange={() => {
                dispatch(
                  handleInputChange({
                    name: "countDownToDate.startNow",
                    value: true,
                  }),
                );
                dispatch(
                  handleInputChange({
                    name: "timerType",
                    value: TimerType.countdownToDate,
                  }),
                );
              }}
            />

            <RadioButton
              label="Schedule to start later"
              checked={
                timerState.timerType === TimerType.countdownToDate &&
                !timerState.countDownToDate.startNow
              }
              onChange={() => {
                dispatch(
                  handleInputChange({
                    name: "countDownToDate.startNow",
                    value: false,
                  }),
                );
                dispatch(
                  handleInputChange({
                    name: "timerType",
                    value: TimerType.countdownToDate,
                  }),
                );
              }}
            />
          </BlockStack>
        </BlockStack>
      </Box>
      {countDownDontStartRightNow && (
        <TimerTimeLine
          isStartTimeline={true}
          timerType={timerState.timerType}
        />
      )}

      <TimerTimeLine isStartTimeline={false} timerType={timerState.timerType} />
    </>
  );
}
