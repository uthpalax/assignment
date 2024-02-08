import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Data } from "./data";

export default function Header({ data }: { data: Data[] }) {
  const trucks = data.filter(({ category }) => category === "truck");
  const lorries = data.filter(({ category }) => category === "lorry");

  const deliveredCount = data.filter(({ status }) => status === "delivered").length; 

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Number of Trucks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{trucks.length}</div>
          <p className="text-xs text-muted-foreground">
            Items in trucks -{" "}
            {trucks.reduce((accumalator, { items }) => {
              return accumalator + items.length;
            }, 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Number of Lorries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lorries.length}</div>
          <p className="text-xs text-muted-foreground">
            Items in lorries -
            {lorries.reduce((accumalator, { items }) => {
              return accumalator + items.length;
            }, 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Delivered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ deliveredCount }</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
}
