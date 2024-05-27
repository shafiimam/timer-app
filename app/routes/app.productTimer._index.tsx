import {
  AppProvider,
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  Page,
  Spinner,
  Text,
} from "@shopify/polaris";
import { ClientOnly } from "remix-utils/client-only";
import NewProductTimer from "../components/ProductTimer.client";
import { Provider } from "react-redux";
import { store } from "~/redux/store";
export default function NewTimerPage() {
  return (
    <ClientOnly fallback={<Spinner />}>
      {() => (
        <Provider store={store}>
          <NewProductTimer />
        </Provider>
      )}
    </ClientOnly>
  );
}
