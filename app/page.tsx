import { redirect } from "next/navigation";


// Root page — redirects to the cart page to start the checkout flow.

export default function HomePage() {
  redirect("/cart");
}
