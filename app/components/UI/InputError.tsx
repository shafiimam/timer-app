import { Box, Icon, InlineStack, Text } from "@shopify/polaris";
import { AlertDiamondIcon } from "@shopify/polaris-icons";

export default function InputError({
  message,
}: {
  message: String;
}): JSX.Element {
  return (
    <InlineStack as="span" align="start" gap={"100"}>
      <Box>
        <Icon source={AlertDiamondIcon} tone="critical" />
      </Box>
      <Text as="span" tone="critical">
        {message}
      </Text>
    </InlineStack>
  );
}
