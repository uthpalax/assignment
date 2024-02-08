import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Ikea Product Restock and Return" },
    {
      name: "description",
      content: "Managers the product restocking and return services",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <ul>
        <li>
          <Link to="dashboard">View Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
