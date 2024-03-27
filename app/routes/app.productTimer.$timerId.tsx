import { useParams } from "@remix-run/react";
export default function ProductTimerPage() {
  const { timerId } = useParams();
  return <div>Product Timer {timerId}</div>;
}
