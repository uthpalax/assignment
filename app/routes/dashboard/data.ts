import { faker } from "@faker-js/faker";

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

function range(len: number) {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

function newDelivery(): Data {
  return {
    id: faker.database.mongodbObjectId(),
    status: faker.helpers.shuffle<Data["status"]>([
      "in-progress",
      "delivered",
      "unknown",
      "planned",
    ])[0]!,
    plannedDeliveryDate: faker.helpers.shuffle([
      faker.date.soon().toISOString(),
      faker.date.future().toISOString(),
      faker.date.recent().toISOString(),
    ])[0]!,
    category: faker.helpers.shuffle<Data["category"]>(["lorry", "truck"])[0]!,
    items: [
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int(20),
      },
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int(20),
      },
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int(20),
      },
    ],
  };
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Data[] => {
    const len = lens[depth]!;
    return range(len).map((): Data => {
      return {
        ...newDelivery(),
      };
    });
  };

  return makeDataLevel();
}
