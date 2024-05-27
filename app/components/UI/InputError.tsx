import { Box, Icon, InlineError, InlineStack, Text } from "@shopify/polaris";
import { AlertDiamondIcon } from "@shopify/polaris-icons";

export default function InputError({ message }: { message: string }): JSX.Element {
  return <InlineError message={message} fieldID="myFieldID" />;
}
