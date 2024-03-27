import { useCallback, useEffect, useRef, useState } from "react";

import type { TabProps } from "@shopify/polaris";
import {
  Badge,
  Bleed,
  BlockStack,
  Box,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  FormLayout,
  Icon,
  InlineStack,
  Layout,
  Page,
  Popover,
  RadioButton,
  Select,
  Tabs,
  Text,
  TextField,
} from "@shopify/polaris";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  DateAMPM,
  OnceEndsTimer,
  SupportedTranslationLanguage,
} from "interface/shared";
import {
  TimerType,
  type IProductPageTimer,
  type Translation,
} from "interface/timer";
import { AlertDiamondIcon, MenuHorizontalIcon } from "@shopify/polaris-icons";
import CustomLabel from "./UI/Label";
import InputError from "./UI/InputError";

const tabs: TabProps[] = [
  {
    id: "content",
    content: "Content",
    accessibilityLabel: "set the content of the timer",
    panelID: "timer-content",
  },
  {
    id: "style",
    content: "Style",
    accessibilityLabel: "set the style of the timer",
    panelID: "timer-style",
  },
  {
    id: "placement",
    content: "Placement",
    accessibilityLabel: "set the placement of the timer",
    panelID: "timer-placement",
    measuring: true,
  },
];
export default function NewProductTimer(): JSX.Element {
  const navigate = useNavigate();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (selectedTabIndex: number) =>
    setSelectedTab(selectedTabIndex);
  const [timerState, setTimerState] = useState<IProductPageTimer>({
    type: type as string,
    name: "New Timer",
    title: "Hurry Up!",
    subHeading: "Sale ends in:",
    timerLabel: {
      day: "Days",
      hour: "Hrs",
      minute: "Mins",
      second: "Secs",
    },
    translation: [],
    timerType: TimerType.countdownToDate,
    startNow: true,
    startDate: {
      date: new Date(),
      hour: 0,
      minute: 0,
      dateAMPM: "AM",
    },
    endDate: {
      date: new Date(),
      hour: 0,
      minute: 0,
      dateAMPM: "PM",
    },
  });
  function handleCreateNewTimer() {
    submit(JSON.stringify(timerState), {
      encType: "application/json",
      method: "POST",
    });
  }
  return (
    <Page
      title={timerState.name}
      subtitle="Timer ID: Save or Publish to show timer ID"
      titleMetadata={<Badge>Not Published</Badge>}
      backAction={{
        content: "Go Back",
        onAction: () => navigate(-1),
      }}
      primaryAction={{
        content: "Save",
        onAction: handleCreateNewTimer,
      }}
    >
      <BlockStack gap={"1600"}>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card padding={"400"}>
              <Tabs
                tabs={tabs}
                selected={selectedTab}
                onSelect={handleTabChange}
                fitted
              >
                <Form onSubmit={handleCreateNewTimer}>
                  <FormLayout>
                    {selectedTab === 0 && (
                      <TimerContentSettings
                        timerState={timerState}
                        setTimerState={setTimerState}
                      />
                    )}
                    {selectedTab === 1 && (
                      <TimerStyleSettings
                        timerState={timerState}
                        setTimerState={setTimerState}
                      />
                    )}
                    {selectedTab === 2 && (
                      <TimerPlacementSettings
                        timerState={timerState}
                        setTimerState={setTimerState}
                      />
                    )}
                  </FormLayout>
                </Form>
              </Tabs>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Text as="h6">Preview</Text>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}

function TimerContentSettings({
  timerState,
  setTimerState,
}: {
  timerState: IProductPageTimer;
  setTimerState: React.Dispatch<React.SetStateAction<IProductPageTimer>>;
}): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [addedLanguages, setAddedLanguages] = useState<
    Array<keyof typeof SupportedTranslationLanguage> | []
  >(timerState.translation.map((translation) => translation.language));

  const [languageOptions, setLanguageOptions] = useState<
    Array<{ value: keyof typeof SupportedTranslationLanguage; label: string }>
  >(
    Object.entries(SupportedTranslationLanguage)
      .map(([key, value]) => ({
        value: key as keyof typeof SupportedTranslationLanguage,
        label: value,
      }))
      .filter((language) => !addedLanguages.includes(language.value as never)),
  );

  const [currentLanguageState, setCurrentLanguageState] = useState<
    Partial<IProductPageTimer>
  >({
    title: "Title",
    subHeading: "Sub Heading",
    timerLabel: {
      day: "Days",
      hour: "Hrs",
      minute: "Mins",
      second: "Secs",
    },
  });

  const [selectedLanguage, setSelectedLanguage] = useState<
    keyof typeof SupportedTranslationLanguage | null
  >(languageOptions[0].value as keyof typeof SupportedTranslationLanguage);
  console.log("===>timer state", timerState);
  console.log("======================");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as keyof typeof SupportedTranslationLanguage);
  };

  useEffect(() => {
    preselectNextLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedLanguages]);

  function preselectNextLanguage() {
    const filteredOptions = languageOptions.filter(
      (language) => !addedLanguages.includes(language.value as never),
    );
    if (addedLanguages.length) {
      setLanguageOptions([...filteredOptions]);
      setSelectedLanguage(
        filteredOptions[0].value as keyof typeof SupportedTranslationLanguage,
      );
    }
  }

  const handleAddNewTranslation = () => {
    setOpenModal(true);
  };

  const toggleModal = useCallback(
    () => setOpenModal((openModal) => !openModal),
    [],
  );

  const confirmTranslation = () => {
    console.log(
      "confirming new translation add",
      currentLanguageState,
      selectedLanguage,
    );
    const newTranslations = [
      ...timerState.translation,
      {
        language: selectedLanguage,
        ...currentLanguageState,
      },
    ];
    setTimerState({
      ...timerState,
      translation: newTranslations as Translation[],
    });
    setAddedLanguages([
      ...addedLanguages,
      selectedLanguage as keyof typeof SupportedTranslationLanguage,
    ]);
    // if there is added language then remove it from the options

    // if (addedLanguages.length) preselectNextLanguage();
    setOpenModal(false);
  };
  const [startDatePopoverActive, setstartDatePopoverActive] = useState(false);
  const togglestartDatePopoverActive = useCallback(
    () => setstartDatePopoverActive((popoverActive) => !popoverActive),
    [],
  );
  const [endDatePopoverActive, setendDatePopoverActive] = useState(false);
  const toggleendDatePopoverActive = useCallback(
    () => setendDatePopoverActive((popoverActive) => !popoverActive),
    [],
  );
  return (
    <>
      <BlockStack gap="400">
        <TextField
          label="Title"
          value={currentLanguageState.title}
          autoComplete="off"
          autoSize
          onChange={(value) =>
            setCurrentLanguageState({
              ...currentLanguageState,
              title: value,
            })
          }
        />
        <TextField
          label="Subheading"
          value={currentLanguageState.subHeading}
          autoComplete="off"
          autoSize
          onChange={(value) =>
            setCurrentLanguageState({
              ...currentLanguageState,
              subHeading: value,
            })
          }
        />
        <Box>
          <CustomLabel>Timer Labels</CustomLabel>
          <InlineStack align="space-between" as="span" gap={"200"} wrap={false}>
            <TextField
              label=""
              placeholder="Days"
              value={
                currentLanguageState.timerLabel
                  ? currentLanguageState.timerLabel.day
                  : "Days"
              }
              autoComplete="off"
              onChange={(value) =>
                setCurrentLanguageState({
                  ...currentLanguageState,
                  timerLabel: {
                    ...timerState.timerLabel,
                    day: value,
                  },
                })
              }
            />
            <TextField
              label=""
              placeholder="Hours"
              value={
                currentLanguageState.timerLabel
                  ? currentLanguageState.timerLabel.hour
                  : "Hrs"
              }
              autoComplete="off"
              onChange={(value) =>
                setCurrentLanguageState({
                  ...currentLanguageState,
                  timerLabel: {
                    ...timerState.timerLabel,
                    hour: value,
                  },
                })
              }
            />
            <TextField
              label=""
              placeholder="Minutes"
              value={
                currentLanguageState.timerLabel
                  ? currentLanguageState.timerLabel.minute
                  : "Mins"
              }
              autoComplete="off"
              onChange={(value) =>
                setCurrentLanguageState({
                  ...currentLanguageState,
                  timerLabel: {
                    ...timerState.timerLabel,
                    minute: value,
                  },
                })
              }
            />
            <TextField
              label=""
              placeholder="Seconds"
              value={
                currentLanguageState.timerLabel
                  ? currentLanguageState.timerLabel.second
                  : "Secs"
              }
              autoComplete="off"
              onChange={(value) =>
                setCurrentLanguageState({
                  ...currentLanguageState,
                  timerLabel: {
                    ...timerState.timerLabel,
                    second: value,
                  },
                })
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
            onClick={handleAddNewTranslation}
          >
            Add Translations
          </Button>
          <Box>
            {timerState.translation?.map((translation, index) => (
              <InlineStack key={index} align="space-between">
                <Text as="h3" variant="bodyMd">
                  {SupportedTranslationLanguage[translation.language]}
                </Text>
                <Button
                  icon={MenuHorizontalIcon}
                  accessibilityLabel="Manage Translation"
                />
              </InlineStack>
            ))}
          </Box>
          {/* translation modal */}
          <Modal id="translation-modal" variant="base" open={openModal}>
            <TitleBar title="Add Translation"></TitleBar>
            <Box padding={"400"}>
              <BlockStack gap={"400"}>
                <Select
                  label="Select Language"
                  options={languageOptions}
                  onChange={handleLanguageChange}
                  value={selectedLanguage as string}
                />
                <TextField
                  label="Title"
                  value={timerState.title}
                  autoComplete="off"
                  autoSize
                  onChange={(value) =>
                    setTimerState({ ...timerState, title: value })
                  }
                />
                <TextField
                  label="Subheading"
                  value={timerState.subHeading}
                  autoComplete="off"
                  autoSize
                  onChange={(value) =>
                    setTimerState({ ...timerState, subHeading: value })
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
                      value={timerState.timerLabel.day}
                      autoComplete="off"
                      onChange={(value) =>
                        setTimerState({
                          ...timerState,
                          timerLabel: {
                            ...timerState.timerLabel,
                            day: value,
                          },
                        })
                      }
                    />
                    <TextField
                      label=""
                      placeholder="Hours"
                      value={timerState.timerLabel.hour}
                      autoComplete="off"
                      onChange={(value) =>
                        setTimerState({
                          ...timerState,
                          timerLabel: {
                            ...timerState.timerLabel,
                            hour: value,
                          },
                        })
                      }
                    />
                    <TextField
                      label=""
                      placeholder="Minutes"
                      value={timerState.timerLabel.minute}
                      autoComplete="off"
                      onChange={(value) =>
                        setTimerState({
                          ...timerState,
                          timerLabel: {
                            ...timerState.timerLabel,
                            minute: value,
                          },
                        })
                      }
                    />
                    <TextField
                      label=""
                      placeholder="Seconds"
                      value={timerState.timerLabel.second}
                      autoComplete="off"
                      onChange={(value) =>
                        // set the state for current language
                        console.log(value)
                      }
                    />
                  </InlineStack>
                </Box>

                <InlineStack align="end" gap={"400"}>
                  <Button onClick={toggleModal}>Cancel</Button>
                  <Button variant="primary" onClick={confirmTranslation}>
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
            onChange={() => {
              setTimerState({
                ...timerState,
                timerType: TimerType.countdownToDate,
              });
            }}
            helpText="Timer that ends at the specific date."
          />
          <RadioButton
            label="Fixed Minutes"
            checked={timerState.timerType === TimerType.fixedMinutes}
            onChange={() => {
              setTimerState({
                ...timerState,
                timerType: TimerType.fixedMinutes,
              });
            }}
            helpText="Individual fixed minutes countdown for each buyer session."
          />
          <RadioButton
            label="Daily Recurring Timer"
            checked={timerState.timerType === TimerType.dailyRecurring}
            onChange={() => {
              setTimerState({
                ...timerState,
                timerType: TimerType.dailyRecurring,
              });
            }}
            helpText="E.g. every weekday from 9 am to 11 am."
          />
        </BlockStack>

        {/* Countdown To date settings */}
        <Box>
          <CustomLabel>TImer starts</CustomLabel>
          <BlockStack gap={"400"}>
            <BlockStack>
              <RadioButton
                label="Right Now"
                checked={
                  timerState.timerType === TimerType.countdownToDate &&
                  timerState.startNow
                }
                onChange={() => {
                  setTimerState({
                    ...timerState,
                    timerType: TimerType.countdownToDate,
                    startNow: true,
                  });
                }}
              />

              <RadioButton
                label="Schedule to start later"
                checked={
                  timerState.timerType === TimerType.countdownToDate &&
                  !timerState.startNow
                }
                onChange={() => {
                  setTimerState({
                    ...timerState,
                    timerType: TimerType.countdownToDate,
                    startNow: false,
                  });
                }}
              />
            </BlockStack>

            <BlockStack gap={"200"}>
              <Popover
                sectioned
                active={startDatePopoverActive}
                activator={
                  <TextField
                    error={timerState.startDate.date >= timerState.endDate.date}
                    helpText={
                      timerState.startDate.date >= timerState.endDate.date && (
                        <InputError message="Start date must be earlier then end date" />
                      )
                    }
                    label="Start Date"
                    onFocus={togglestartDatePopoverActive}
                    autoComplete="off"
                    value={timerState.startDate?.date.toDateString() as string}
                    onChange={togglestartDatePopoverActive}
                  />
                }
                autofocusTarget="first-node"
                onClose={togglestartDatePopoverActive}
                fullWidth
              >
                <Card>
                  <DatePicker
                    month={timerState.startDate?.date.getMonth() as number}
                    year={timerState.startDate?.date.getFullYear() as number}
                    disableDatesBefore={new Date()}
                    onChange={(date) => {
                      setTimerState({
                        ...timerState,
                        startDate: {
                          ...timerState.startDate!,
                          date: new Date(date.start),
                        },
                      });
                      togglestartDatePopoverActive();
                    }}
                    onMonthChange={(month) => {
                      setTimerState({
                        ...timerState,
                        startDate: {
                          ...timerState.startDate,
                          date: new Date(
                            timerState.startDate?.date.getFullYear() as number,
                            month as number,
                            timerState.startDate?.date.getDate() as number,
                          ),
                        },
                      });
                    }}
                    selected={timerState.startDate?.date}
                  />
                </Card>
              </Popover>
              <InlineStack
                align="start"
                as="span"
                gap={"200"}
                wrap={false}
                blockAlign="start"
              >
                <TextField
                  autoComplete="off"
                  label="Hour"
                  value={timerState.startDate?.hour.toString()}
                  type="number"
                  onChange={(value) => {
                    setTimerState({
                      ...timerState,
                      startDate: {
                        ...timerState.startDate,
                        hour: Number(value),
                      },
                    });
                  }}
                />
                <TextField
                  autoSize
                  autoComplete="off"
                  label="Min"
                  value={timerState.startDate.minute.toString()}
                  type="number"
                  onChange={(value) => {
                    setTimerState({
                      ...timerState,
                      startDate: {
                        ...timerState.startDate,
                        minute: Number(value),
                      },
                    });
                  }}
                />
                <Select
                  label="AM/PM"
                  options={Object.values(DateAMPM).map((value) => ({
                    label: value,
                    value,
                  }))}
                  value={timerState.startDate.dateAMPM}
                  onChange={(value: keyof typeof DateAMPM) => {
                    setTimerState({
                      ...timerState,
                      startDate: {
                        ...timerState.startDate,
                        dateAMPM: value,
                      },
                    });
                  }}
                />
              </InlineStack>
            </BlockStack>

            {/* end date */}

            <BlockStack gap={"200"}>
              <Popover
                sectioned
                active={endDatePopoverActive}
                activator={
                  <TextField
                    label="End Date"
                    error={timerState.startDate.date >= timerState.endDate.date}
                    helpText={
                      timerState.startDate.date >= timerState.endDate.date && (
                        <InputError message="End date must be later then start date" />
                      )
                    }
                    onFocus={toggleendDatePopoverActive}
                    autoComplete="off"
                    value={timerState.endDate?.date.toDateString() as string}
                    onChange={toggleendDatePopoverActive}
                  />
                }
                autofocusTarget="first-node"
                onClose={toggleendDatePopoverActive}
                fullWidth
              >
                <DatePicker
                  month={timerState.endDate?.date.getMonth() as number}
                  year={timerState.endDate?.date.getFullYear() as number}
                  onChange={(date) => {
                    setTimerState({
                      ...timerState,
                      endDate: {
                        ...timerState.endDate!,
                        date: new Date(date.start),
                      },
                    });
                    toggleendDatePopoverActive();
                  }}
                  onMonthChange={(month) => {
                    setTimerState({
                      ...timerState,
                      endDate: {
                        ...timerState.endDate,
                        date: new Date(
                          timerState.endDate?.date.getFullYear() as number,
                          month as number,
                          timerState.endDate?.date.getDate() as number,
                        ),
                      },
                    });
                  }}
                  selected={timerState.endDate?.date}
                />
              </Popover>
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
                  value={timerState.endDate?.hour.toString()}
                  type="number"
                  onChange={(value) => {
                    setTimerState({
                      ...timerState,
                      endDate: {
                        ...timerState.endDate,
                        hour: Number(value),
                      },
                    });
                  }}
                />
                <TextField
                  autoComplete="off"
                  label="Min"
                  value={timerState.endDate.minute.toString()}
                  type="number"
                  onChange={(value) => {
                    setTimerState({
                      ...timerState,
                      endDate: {
                        ...timerState.endDate,
                        minute: Number(value),
                      },
                    });
                  }}
                />
                <Select
                  label="AM/PM"
                  options={Object.values(DateAMPM).map((value) => ({
                    label: value,
                    value,
                  }))}
                  value={timerState.endDate.dateAMPM}
                  onChange={(value: keyof typeof DateAMPM) => {
                    setTimerState({
                      ...timerState,
                      endDate: {
                        ...timerState.endDate,
                        dateAMPM: value,
                      },
                    });
                  }}
                />
              </InlineStack>
              <Select
                options={Object.keys(OnceEndsTimer).map((entry) => ({
                  label: entry,
                  value: OnceEndsTimer[entry as keyof typeof OnceEndsTimer],
                }))}
                label="Once in Ends"
                onChange={(value: keyof typeof OnceEndsTimer) => {
                  console.log("value", value);
                  setTimerState({
                    ...timerState,
                    onceEnds: value as keyof typeof OnceEndsTimer,
                  });
                }}
                value={timerState.onceEnds}
              />
            </BlockStack>
          </BlockStack>
        </Box>
      </BlockStack>
    </>
  );
}
function TimerStyleSettings({
  timerState,
  setTimerState,
}: {
  timerState: IProductPageTimer;
  setTimerState: React.Dispatch<React.SetStateAction<IProductPageTimer>>;
}): JSX.Element {
  return <div>Timer Style Settings</div>;
}

function TimerPlacementSettings({
  timerState,
  setTimerState,
}: {
  timerState: IProductPageTimer;
  setTimerState: React.Dispatch<React.SetStateAction<IProductPageTimer>>;
}): JSX.Element {
  return <div>Timer Placement Settings</div>;
}
