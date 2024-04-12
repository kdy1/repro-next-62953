/** Add your relevant code here for the issue to reproduce */
import { headers } from "next/headers";
import Counter from "@/components/counter";
export default function Home() {
  const headersList = headers();
  return <Counter />;
}
