export type Item = {
  name: string;
  quantity: number;
};

export type Data = {
  id: string;
  status: "planned" | "in-progress" | "delivered" | "unknown";
  plannedDeliveryDate: string;
  category: "truck" | "lorry";
  items: Item[];
};

export const data: Data[] = [
  {
    id: "TR12370",
    status: "planned",
    plannedDeliveryDate: "2024-02-10T10:47:30.641Z",
    category: "truck",
    items: [
      {
        name: "chair",
        quantity: 3,
      },
      {
        name: "leg",
        quantity: 12,
      },
    ],
  },
  {
    id: "TR12380",
    status: "planned",
    plannedDeliveryDate: "2024-02-15T10:47:30.641Z",
    category: "lorry",
    items: [
      {
        name: "chair",
        quantity: 10,
      },
    ],
  },
  {
    id: "TR12390",
    status: "in-progress",
    plannedDeliveryDate: "2024-02-15T10:47:30.641Z",
    category: "truck",
    items: [
      {
        name: "chair",
        quantity: 10,
      },
    ],
  },
];
