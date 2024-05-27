import { useEffect } from "react";

import {
  Badge,
  BlockStack,
  Card,
  FormLayout,
  Layout,
  Page,
  Tabs,
  Text,
} from "@shopify/polaris";

import { useNavigate, useSearchParams, useSubmit } from "@remix-run/react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
  handleInputChange,
  handleTabChange,
} from "~/redux/features/timerSlice";
import TimerContentSettings from "./Timer/TimerContentSettings";
import { AppStaticData } from "interface/shared";
import TimerStyleSettings from "./Timer/TimerStyleSettings";

export default function NewProductTimer(): JSX.Element {
  const navigate = useNavigate();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const timerState = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleInputChange({ name: "type", value: type }));
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
                tabs={AppStaticData.tabs}
                selected={timerState.selectedTab}
                onSelect={(index) => dispatch(handleTabChange(index))}
                fitted
              >
                <>
                  <FormLayout>
                    {timerState.selectedTab === 0 && <TimerContentSettings />}
                    {timerState.selectedTab === 1 && <TimerStyleSettings />}
                    {timerState.selectedTab === 2 && <TimerPlacementSettings />}
                  </FormLayout>
                </>
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

function TimerPlacementSettings(): JSX.Element {
  return <div>Timer Placement Settings</div>;
}
