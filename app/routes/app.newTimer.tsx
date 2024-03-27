import {
  AppProvider,
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  Page,
  Text,
} from "@shopify/polaris";
import { useNavigate, useLocation } from "@remix-run/react";
import bar from "../assets/bar.svg";
import cartPage from "../assets/cart_page.svg";
import landingPage from "../assets/landing_page.svg";
import productPage from "../assets/product_page.svg";
export default function NewTimerPage() {
  const navigate = useNavigate();

  const allTimerTypes = [
    {
      title: "Product Page",
      content: "Block in product page below add to cart button.",
      thumbnail: productPage,
      link: "/app/productTimer?type=product-page",
    },
    {
      title: "Top/bottom bar",
      content: "Fixed or sticky bar on the top or the bottom of any page.",
      thumbnail: bar,
      link: "barTimer",
    },
    {
      title: "Landing page",
      content: "Block in home, collection, password, or any other page.",
      thumbnail: landingPage,
      link: "/landingPageTimer",
    },
    {
      title: "Cart Page",
      content: "Block in cart page below checkout button.",
      thumbnail: cartPage,
      link: "/cartPageTimer",
    },
  ];

  return (
    <Page
      title="Choose timer type"
      narrowWidth
      backAction={{ content: "Timers", onAction: () => navigate(-1) }}
    >
      <Grid
        gap={{ xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" }}
      >
        {allTimerTypes.map((timer) => (
          <Grid.Cell
            columnSpan={{ xs: 6, sm: 4, md: 3, lg: 6, xl: 6 }}
            key={timer.title}
          >
            <Card padding="500" background="bg-fill">
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  {timer.title}
                </Text>
                <img
                  alt={timer.title}
                  src={timer.thumbnail}
                  style={{
                    width: "100%",
                    borderRadius: "0.5rem",
                    maxWidth: "400px",
                  }}
                />
                <Box minHeight="2rem">
                  <Text variant="bodySm" as="">
                    {timer.content}
                  </Text>
                </Box>
                <Button
                  size="large"
                  fullWidth
                  onClick={() => {
                    console.log("navigating to", timer.link);
                    navigate(timer.link);
                  }}
                  variant="primary"
                >
                  Select This Timer Type
                </Button>
              </BlockStack>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
  );
}
