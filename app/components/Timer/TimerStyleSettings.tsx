import {
  Bleed,
  BlockStack,
  Box,
  Button,
  ColorPicker,
  Divider,
  hexToRgb,
  hsbToHex,
  InlineGrid,
  InlineStack,
  Popover,
  RadioButton,
  RangeSlider,
  rgbToHsb,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { AppStaticData } from "interface/shared";
import { useDispatch } from "react-redux";
import { handleInputChange } from "~/redux/features/timerSlice";
import { useAppSelector } from "~/redux/hooks";
import CustomLabel from "../UI/Label";
import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import type { TimerCardDesignKeyType } from "~/../interface/timer";
const spacingObject = [
  { key: "insideTop", helpText: "Inside Top" },
  { key: "insideBottom", helpText: "Inside Bottom" },
  { key: "outsideTop", helpText: "Outdie Top" },
  { key: "outsideBottoms", helpText: "Outside Bottom" },
];
export default function TimerStyleSettings(): JSX.Element {
  const dispatch = useDispatch();
  const timerState = useAppSelector((state) => state.timer);

  const isGradiantBackground = timerState.style.cardStyle.isGradiantBackground;
  return (
    <Box>
      <BlockStack gap={"400"}>
        <Select
          label="Template"
          options={AppStaticData.timerTemplateOptions}
          value={timerState.style.template}
          onChange={(value) => {
            console.log(value);
            dispatch(handleInputChange({ name: "style.template", value }));
          }}
        />
        <Bleed marginInlineStart={"400"} marginInlineEnd={"400"}>
          <Divider borderColor="border" borderWidth="025" />
        </Bleed>

        <CustomLabel
          style={{
            fontWeight: "bold",
            fontSize: "var(--p-font-size-300)",
          }}
        >
          Card
        </CustomLabel>

        <RadioButton
          label="Single Color Background"
          checked={!isGradiantBackground}
          onChange={(value) =>
            dispatch(
              handleInputChange({
                name: "style.cardStyle.isGradiantBackground",
                value: !value,
              }),
            )
          }
        />
        <ColorSelectorPopup
          typeName="cardBackgroundColor"
          disabled={isGradiantBackground}
        />
        <RadioButton
          label="Gradiant Color Background"
          checked={isGradiantBackground}
          onChange={(value) =>
            dispatch(
              handleInputChange({
                name: "style.cardStyle.isGradiantBackground",
                value: value,
              }),
            )
          }
        />
        <RangeSlider
          disabled={!isGradiantBackground}
          label="Gradient angle degree"
          value={timerState.style.cardStyle.cardBackgroundGradientAngle as any}
          step={1}
          min={0}
          max={360}
          onChange={(value) =>
            dispatch(
              handleInputChange({
                name: "style.cardStyle.cardBackgroundGradientAngle",
                value: value,
              }),
            )
          }
        />
        <ColorSelectorPopup
          typeName="cardBackgroundGradientStart"
          disabled={!isGradiantBackground}
        />
        <ColorSelectorPopup
          typeName="cardBackgroundGradientEnd"
          disabled={!isGradiantBackground}
        />
        <TextField
          autoComplete="off"
          prefix="px"
          label="Border Radius"
          type="number"
          value={timerState.style.cardStyle.borderRadius as any}
          onChange={(value) =>
            dispatch(
              handleInputChange({
                name: "style.cardStyle.borderRadius",
                value: value,
              }),
            )
          }
        />
        <InlineGrid gap="200" columns={2} alignItems="center">
          <TextField
            autoComplete="off"
            prefix="px"
            label="Border width"
            type="number"
            value={timerState.style.cardStyle.borderSize as any}
            onChange={(value) =>
              dispatch(
                handleInputChange({
                  name: "style.cardStyle.borderSize",
                  value: value,
                }),
              )
            }
          />
          <InlineStack>
            <CustomLabel>Border Color</CustomLabel>
            <ColorSelectorPopup typeName="borderColor" disabled={false} />
          </InlineStack>
        </InlineGrid>
        <CustomLabel style={{ fontWeight: "bold" }}>Spacing</CustomLabel>
        <InlineGrid gap={"200"} columns={2}>
          {spacingObject.map((item) => (
            <TextField
              key={item.key}
              autoComplete="off"
              prefix="px"
              label=""
              helpText={item.helpText}
              type="number"
              value={timerState.style.cardStyle[item.key] as any}
              onChange={(value) =>
                dispatch(
                  handleInputChange({
                    name: `style.cardStyle.${item.key}`,
                    value: value,
                  }),
                )
              }
            />
          ))}
        </InlineGrid>
        <Bleed marginInlineStart={"400"} marginInlineEnd={"400"}>
          <Divider borderColor="border" borderWidth="025" />
        </Bleed>
        <CustomLabel
          style={{ fontWeight: "bold", fontSize: "var(--p-font-size-300)" }}
        >
          Typography
        </CustomLabel>
        <TimeTypography />
      </BlockStack>
    </Box>
  );
}

function TimeTypography() {
  const dispatch = useDispatch();
  const timerState = useAppSelector((state) => state.timer);
  return (
    <>
      <Select
        label="Font"
        helpText="Theme fonts are not available in the preview mode. Publish timer to preview it in store"
        value={timerState.style.typoGraphy.font}
        options={AppStaticData.timerFontOptions}
        onChange={(value) =>
          dispatch(
            handleInputChange({
              name: "style.typoGraphy.font",
              value,
            }),
          )
        }
      />
    </>
  );
}

function ColorSelectorPopup({
  typeName,
  disabled,
}: {
  typeName: TimerCardDesignKeyType;
  disabled: boolean;
}) {
  const dispatch = useDispatch();
  const [popoverActive, setPopoverActive] = useState<boolean>(false);

  const timerState = useAppSelector((state) => state.timer);
  console.log("style state", timerState.style);
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );
  const [, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
  });
  return (
    <InlineStack gap={"200"}>
      <Popover
        preventFocusOnClose
        fixed={false}
        preferInputActivator={true}
        sectioned
        preferredAlignment="left"
        active={popoverActive}
        activator={
          <Button
            onClick={togglePopoverActive}
            disclosure
            disabled={disabled}
            children={
              (
                <div
                  style={{
                    backgroundColor: timerState.style.cardStyle[typeName],
                    width: "16px",
                    height: "16px",
                    borderRadius: "8px",
                  }}
                ></div>
              ) as unknown
            }
          ></Button>
        }
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
        preventCloseOnChildOverlayClick={false}
      >
        <ColorPicker
          onChange={(color) => {
            setColor(color);
            console.log("changing", `style.cardStyle.${typeName}`);
            dispatch(
              handleInputChange({
                name: `style.cardStyle.${typeName}`,
                value: hsbToHex(color),
              }),
            );
          }}
          color={rgbToHsb(
            hexToRgb(timerState.style.cardStyle[typeName] as string),
          )}
        />
      </Popover>
      <TextField
        autoSize={true}
        label=""
        autoComplete="off"
        size="slim"
        value={timerState.style.cardStyle[typeName] as string}
        onChange={(value) =>
          dispatch(
            handleInputChange({
              name: `style.cardStyle.${typeName}`,
              value,
            }),
          )
        }
        disabled={disabled}
      />
    </InlineStack>
  );
}
