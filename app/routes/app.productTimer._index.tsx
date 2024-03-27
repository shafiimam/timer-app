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
import { useNavigate } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import NewProductTimer from "../components/ProductTimer.client";
export default function NewTimerPage() {
  const navigate = useNavigate();

  return (
    <ClientOnly fallback={<Spinner />}>{() => <NewProductTimer />}</ClientOnly>
  );
}
