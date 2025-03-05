/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faker } from '@faker-js/faker';
import { ColumnSort, SortingState } from '@tanstack/react-table';
import { IPerson } from '@utils/interfaces';

export interface IPersonApiResponse {
  rows: IPerson[];
  totalEntries: number;
  pageCount: number;
}

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (index: number): IPerson => {
  const age = faker.datatype.number(40);
  return {
    id: index + 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age,
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    createdAt: faker.datatype.datetime({
      min: new Date('March 24, 2023 03:24:00').getTime(),
      max: new Date().getTime(),
    }),
    status:
      age > 15
        ? faker.helpers.shuffle<IPerson['status']>([
            'relationship',
            'complicated',
            'single',
          ])[0]!
        : 'single',
  };
};

export function makePersonData(...lens: number[]) {
  const makeDataLevel = (depth = 0): IPerson[] => {
    const len = lens[depth]!;
    return range(len).map((d): IPerson => {
      return {
        ...newPerson(d),
      };
    });
  };

  return makeDataLevel();
}

const data = makePersonData(1000);

// simulates a backend api for infinite scrolling
// export const fetchPersonData = (
//   start: number,
//   size: number,
//   sorting: SortingState,
//   searchTerm?: string | null
// ) => {
//   let dbData2 = [...data];

//   if (searchTerm) {
//     dbData2 = dbData2.filter((person) => {
//       const searchRegex = new RegExp(searchTerm, 'i');
//       return Object.values(person).some((value) =>
//         searchRegex.test(value.toString())
//       );
//     });
//   }

//   if (sorting.length) {
//     const sort = sorting[0] as ColumnSort;
//     const { id, desc } = sort as { id: keyof IPerson; desc: boolean };
//     dbData2.sort((a, b) => {
//       if (desc) {
//         return a[id] < b[id] ? 1 : -1;
//       }
//       return a[id] > b[id] ? 1 : -1;
//     });
//   }

//   return {
//     data: dbData2.slice(start, start + size),
//     meta: {
//       totalRowCount: dbData2.length,
//     },
//   };
// };

// simulates a backend api for pagination mode
export async function fetchDataPagination(options: {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  searchTerm?: string | null;
}): Promise<IPersonApiResponse> {
  let dbData = [...data];

  if (options.searchTerm) {
    dbData = dbData.filter((person) => {
      const searchRegex = new RegExp(options.searchTerm as string, 'i');
      return Object.values(person).some((value) =>
        searchRegex.test(value.toString())
      );
    });
  }

  if (options.sorting.length) {
    const sort = options.sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof IPerson; desc: boolean };
    dbData = dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }
  // Simulate some network latency
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 1000));

  return {
    rows: dbData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    totalEntries: dbData.length,
    pageCount: Math.ceil(dbData.length / options.pageSize),
  };
}
