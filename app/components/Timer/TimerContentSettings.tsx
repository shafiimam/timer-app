import { Modal, TitleBar } from "@shopify/app-bridge-react";
import {
  ActionList,
  Bleed,
  BlockStack,
  Box,
  Button,
  Divider,
  InlineStack,
  Popover,
  RadioButton,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { MenuHorizontalIcon } from "@shopify/polaris-icons";
import type { OnceEndsTimer } from "interface/shared";
import { SupportedTranslationLanguage, AppStaticData } from "interface/shared";
import { TimerType } from "interface/timer";
import {
  handleInputChange,
  wantToAddNewTranslation,
  handleManageTranslation,
  handleEditTranslation,
  handleLanguageChange,
  handleTranslationModalClose,
  handleConfirmAddNewTranslation,
  handleConfirmUpdateTranslation,
  handleDeleteTranslation,
} from "~/redux/features/timerSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import CustomLabel from "../UI/Label";
import CountDownToDateSettings from "./CountDownToDateSettings";
import FixedMinuteSettings from "./FixedMinuteSettings";
import DailyRecurringSettings from "./DailyRecurringSettings";

export default function TimerContentSettings(): JSX.Element {
  const timerState = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  return (
    <>
      <BlockStack gap="400">
        <TextField
          name="title"
          label="Title"
          value={timerState.title}
          autoComplete="off"
          autoSize
          onChange={(value) =>
            dispatch(handleInputChange({ name: "title", value }))
          }
        />
        <TextField
          name="subHeading"
          label="Subheading"
          value={timerState.subHeading}
          autoComplete="off"
          autoSize
          onChange={(value) =>
            dispatch(handleInputChange({ name: "subHeading", value }))
          }
        />
        <Box>
          <CustomLabel>Timer Labels</CustomLabel>
          <InlineStack align="space-between" as="span" gap={"200"} wrap={false}>
            <TextField
              label=""
              placeholder="Days"
              value={timerState.timerLabel ? timerState.timerLabel.day : "Days"}
              autoComplete="off"
              onChange={(value) =>
                dispatch(handleInputChange({ name: "timerLabel.day", value }))
              }
            />
            <TextField
              label=""
              placeholder="Hours"
              value={timerState.timerLabel ? timerState.timerLabel.hour : "Hrs"}
              autoComplete="off"
              onChange={(value) =>
                dispatch(handleInputChange({ name: "timerLabel.hour", value }))
              }
            />
            <TextField
              label=""
              placeholder="Minutes"
              value={
                timerState.timerLabel ? timerState.timerLabel.minute : "Mins"
              }
              autoComplete="off"
              onChange={(value) =>
                dispatch(
                  handleInputChange({ name: "timerLabel.minute", value }),
                )
              }
            />
            <TextField
              label=""
              placeholder="Seconds"
              value={
                timerState.timerLabel ? timerState.timerLabel.second : "Secs"
              }
              autoComplete="off"
              onChange={(value) =>
                dispatch(
                  handleInputChange({ name: "timerLabel.second", value }),
                )
              }
            />
          </InlineStack>
        </Box>
        <Bleed marginInlineStart={"400"} marginInlineEnd={"400"}>
          <Divider borderColor="border" borderWidth="025" />
        </Bleed>
        {/* translation block */}
        <BlockStack gap="400">
          <Text as="h3" variant="bodyMd" fontWeight="bold">
            Translation
          </Text>
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={() => dispatch(wantToAddNewTranslation())}
          >
            Add Translations
          </Button>
          <BlockStack gap={"300"}>
            {timerState.translations?.map((translation, translationIndex) => (
              <InlineStack key={translationIndex} align="space-between">
                <Text as="h3" variant="bodyMd">
                  {SupportedTranslationLanguage[translation.language]}
                </Text>
                <Popover
                  active={
                    timerState.translationToEditIndex === translationIndex
                  }
                  activator={
                    <Button
                      disclosure
                      variant="tertiary"
                      icon={MenuHorizontalIcon}
                      accessibilityLabel="Manage Translation"
                      onClick={() =>
                        dispatch(handleManageTranslation(translationIndex))
                      }
                    />
                  }
                  autofocusTarget="first-node"
                  onClose={() => handleManageTranslation(-1)}
                >
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        content: "Edit Translation",
                        onAction: () =>
                          dispatch(handleEditTranslation(translationIndex)),
                      },
                      {
                        content: "Delete",
                        destructive: true,
                        onAction: () =>
                          dispatch(handleDeleteTranslation(translationIndex)),
                      },
                    ]}
                  />
                </Popover>
              </InlineStack>
            ))}
          </BlockStack>
          {/* translation modal */}
          <Modal
            id="translation-modal"
            variant="base"
            open={timerState.isModalOpen}
          >
            <TitleBar title="Add Translation"></TitleBar>
            <Box padding={"400"}>
              <BlockStack gap={"400"}>
                <Select
                  disabled={timerState.translationToEditIndex !== -1}
                  label="Select Language"
                  options={timerState.languageOptions}
                  onChange={(value) =>
                    dispatch(
                      handleLanguageChange(
                        value as keyof typeof SupportedTranslationLanguage,
                      ),
                    )
                  }
                  value={timerState.selectedLanguage}
                />
                <TextField
                  label="Title"
                  value={timerState.currentLanguageInState.title}
                  autoComplete="off"
                  autoSize
                  onChange={(value) =>
                    dispatch(
                      handleInputChange({
                        name: "currentLanguageInState.title",
                        value,
                      }),
                    )
                  }
                />
                <TextField
                  label="Subheading"
                  value={timerState.currentLanguageInState.subHeading}
                  autoComplete="off"
                  autoSize
                  onChange={(value) =>
                    dispatch(
                      handleInputChange({
                        name: "currentLanguageInState.subHeading",
                        value,
                      }),
                    )
                  }
                />
                <Box>
                  <CustomLabel>Timer Labels</CustomLabel>
                  <InlineStack
                    align="space-between"
                    as="span"
                    gap={"200"}
                    wrap={false}
                  >
                    <TextField
                      label=""
                      placeholder="Days"
                      value={timerState.currentLanguageInState.timerLabel.day}
                      autoComplete="off"
                      onChange={(value) =>
                        dispatch(
                          handleInputChange({
                            name: "currentLanguageInState.timerLabel.day",
                            value,
                          }),
                        )
                      }
                    />
                    <TextField
                      label=""
                      placeholder="Hours"
                      value={timerState.currentLanguageInState.timerLabel.hour}
                      autoComplete="off"
                      onChange={(value) =>
                        dispatch(
                          handleInputChange({
                            name: "currentLanguageInState.timerLabel.hour",
                            value,
                          }),
                        )
                      }
                    />
                    <TextField
                      label=""
                      placeholder="Minutes"
                      value={
                        timerState.currentLanguageInState.timerLabel.minute
                      }
                      autoComplete="off"
                      onChange={(value) =>
                        dispatch(
                          handleInputChange({
                            name: "currentLanguageInState.timerLabel.minute",
                            value,
                          }),
                        )
                      }
                    />
                    <TextField
                      label=""
                      placeholder="Seconds"
                      value={
                        timerState.currentLanguageInState.timerLabel.second
                      }
                      autoComplete="off"
                      onChange={(value) =>
                        dispatch(
                          handleInputChange({
                            name: "currentLanguageInState.timerLabel.second",
                            value,
                          }),
                        )
                      }
                    />
                  </InlineStack>
                </Box>

                <InlineStack align="end" gap={"400"}>
                  <Button
                    onClick={() => {
                      dispatch(handleTranslationModalClose());
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      timerState.translationToEditIndex < 0
                        ? dispatch(handleConfirmAddNewTranslation())
                        : dispatch(handleConfirmUpdateTranslation())
                    }
                  >
                    Confirm Translation
                  </Button>
                </InlineStack>
              </BlockStack>
            </Box>
          </Modal>
        </BlockStack>
        {/* timer type block */}
        <Bleed marginInlineStart={"400"} marginInlineEnd={"400"}>
          <Divider borderColor="border" borderWidth="025" />
        </Bleed>

        <BlockStack>
          <CustomLabel style={{ marginBottom: "1rem" }}>
            <Text as="h3" variant="bodyMd" fontWeight="bold">
              Timer Type
            </Text>
          </CustomLabel>
          <RadioButton
            label="Countdown to date"
            checked={timerState.timerType === TimerType.countdownToDate}
            onChange={() =>
              dispatch(
                handleInputChange({
                  name: "timerType",
                  value: TimerType.countdownToDate,
                }),
              )
            }
            helpText="Timer that ends at the specific date."
          />
          <RadioButton
            label="Fixed Minutes"
            checked={timerState.timerType === TimerType.fixedMinutes}
            onChange={() =>
              dispatch(
                handleInputChange({
                  name: "timerType",
                  value: TimerType.fixedMinutes,
                }),
              )
            }
            helpText="Individual fixed minutes countdown for each buyer session."
          />
          <RadioButton
            label="Daily Recurring Timer"
            checked={timerState.timerType === TimerType.dailyRecurring}
            onChange={() =>
              dispatch(
                handleInputChange({
                  name: "timerType",
                  value: TimerType.dailyRecurring,
                }),
              )
            }
            helpText="E.g. every weekday from 9 am to 11 am."
          />
        </BlockStack>
        {/* start date */}
        {timerState.timerType === TimerType.countdownToDate && (
          <CountDownToDateSettings />
        )}
        {timerState.timerType === TimerType.fixedMinutes && (
          <FixedMinuteSettings />
        )}
        {timerState.timerType === TimerType.dailyRecurring && (
          <DailyRecurringSettings />
        )}
        <Select
          options={AppStaticData.onceTimerEndsOptions}
          label="Once in Ends"
          onChange={(value: keyof typeof OnceEndsTimer) =>
            dispatch(
              handleInputChange({
                name: "onceEnds",
                value,
              }),
            )
          }
          value={timerState.onceEnds}
        />
      </BlockStack>
    </>
  );
}
