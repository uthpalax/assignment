import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";

import { makeData } from "./data";
import { CalendarDateRangePicker } from "~/components/date-range-picker";
import { format, isBefore, isAfter } from "date-fns";
import type { DateRange } from "react-day-picker";
import Header from "./header";
import DashboardTable from "./dashboard-table";

const data = makeData(20);

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (from && to) {
    return json(
      data.filter(({ plannedDeliveryDate }) => {
        const planedDate = new Date(plannedDeliveryDate);
        return (
          isAfter(planedDate, new Date(from)) &&
          isBefore(planedDate, new Date(to))
        );
      })
    );
  }

  return json(data);
}

export default function dashboard() {
  const data = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  function handleDateRangeChange(date: DateRange | undefined) {
    if (!date) {
      setSearchParams({}, { preventScrollReset: true });
    } else {
      const params = new URLSearchParams();
      if (date.from) {
        params.set("from", format(date.from, "yyyy-MM-dd"));
      }
      if (date.to) {
        params.set("to", format(date.to, "yyyy-MM-dd"));
      }
      console.log("params", params);
      setSearchParams(params, { preventScrollReset: true });
    }
  }

  let dateRange = undefined;
  if (from && to) {
    dateRange = {
      from: new Date(from),
      to: new Date(to),
    };
  } else if (from) {
    dateRange = {
      from: new Date(from),
      to: undefined,
    };
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker
            dateRange={dateRange}
            onChange={handleDateRangeChange}
          />
        </div>
      </div>
      <Header data={data} />
      <DashboardTable data={data} />
    </div>
  );
}
