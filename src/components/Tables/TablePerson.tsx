/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  FilterFn,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Card, Form, Spinner, Table } from 'react-bootstrap';
import { IPerson } from '@utils/interfaces';
import { fetchDataPagination } from '@utils/dummyData/persons';
import FeatherIcon from '@components/Icons/FeatherIcon';
import Paginate from '@components/Paginate/Paginate';
import DebouncedInput from '@components/Inputs/DebouncedInput';
import { fuzzyFilter } from '@utils/utils';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

type Props = {};

function TablePerson({}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columnsDefs = React.useMemo<ColumnDef<IPerson>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.getValue<Date>().toLocaleString(),
      },
      {
        accessorKey: 'action',
        header: '',
        cell: () => (
          <div className="d-flex gap-1">
            <Button size="sm" variant="primary">
              <FeatherIcon name="Edit" size={14} />
            </Button>
            <Button size="sm" variant="info">
              <FeatherIcon name="Info" size={14} />
            </Button>
            <Button size="sm" variant="danger">
              <FeatherIcon name="Trash" size={14} />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const fetchDataOptions = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
      sorting,
      searchTerm: globalFilter,
    }),
    [globalFilter, sorting, pageIndex, pageSize]
  );

  const dataQuery = useQuery(
    ['data', fetchDataOptions],
    () => fetchDataPagination(fetchDataOptions),
    { keepPreviousData: true }
  );

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: dataQuery?.data?.rows ?? defaultData,
    columns: columnsDefs,
    pageCount: dataQuery?.data?.pageCount ?? -1,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    debugTable: false,
  });

  // when the globalFilter is reset page index
  React.useEffect(() => {
    if (globalFilter) {
      table.setPageIndex(0);
    }
  }, [globalFilter, table]);

  const rows = table?.getRowModel()?.rows;
  const headers = table.getFlatHeaders();

  return (
    <>
      <Alert variant="info">
        An example of a table component created using{' '}
        <code style={{ fontSize: 14 }}>@tanstack/react-table</code> version 8.
        It features pagination, sorting, and searching capabilities, and has
        been integrated with{' '}
        <code style={{ fontSize: 14 }}>@tanstack/react-query</code> for
        efficient data fetching.
      </Alert>
      <Card>
        <Card.Header>
          <Card.Title className="mb-2">React Table Example</Card.Title>
        </Card.Header>
        <Card.Body className="pb-1 table-responsive ">
          <div className=" d-flex justify-content-between mb-3 ">
            <div className="d-flex gap-3">
              <Form.Group className="mb-3">
                <Form.Select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pg) => (
                    <option key={pg} value={pg}>
                      Show {pg}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex align-items-center gap-2 "
                controlId="gotoPage"
              >
                <Form.Label className=" text-nowrap my-0">
                  Go to page :{' '}
                </Form.Label>

                <Form.Control
                  style={{
                    width: 80,
                  }}
                  type="number"
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                />
              </Form.Group>
            </div>
            <div>
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => {
                  setGlobalFilter(String(value));
                }}
                className="form-control"
                placeholder="Search all columns..."
              />
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                        className="text-nowrap"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: ` d-flex align-items-center justify-content-between ${
                                header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : ''
                              }`,
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <span className="d-flex flex-column justify-content-center ms-2">
                                  <FeatherIcon
                                    className=" text-dark mb-n1"
                                    name="ChevronUp"
                                    size={18}
                                  />
                                  <FeatherIcon
                                    className=" text-muted mt-n1 "
                                    name="ChevronDown"
                                    size={18}
                                  />
                                </span>
                              ),
                              desc: (
                                <span className="d-flex flex-column justify-content-center ms-2">
                                  <FeatherIcon
                                    className=" text-muted mb-n1"
                                    name="ChevronUp"
                                    size={18}
                                  />
                                  <FeatherIcon
                                    className=" text-dark mt-n1 "
                                    name="ChevronDown"
                                    size={18}
                                  />
                                </span>
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {dataQuery.isLoading ? (
                <tr>
                  <td colSpan={headers.length} className="text-center">
                    <Spinner
                      size="sm"
                      animation="border"
                      variant="primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              ) : rows ? (
                rows.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length}>
                      <p className="text-center mb-0">No records found</p>
                    </td>
                  </tr>
                ) : null
              ) : (
                <tr>
                  <td colSpan={headers.length}>
                    <p className="text-center mb-0">
                      Something went wrong while load records
                    </p>
                  </td>
                </tr>
              )}

              {rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer className=" d-flex gap-3 justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center gap-1">
              <span>Showing</span>
              <strong>
                {table.getState().pagination.pageIndex + 1} to{' '}
                {table.getPageCount()}
              </strong>{' '}
              of {dataQuery?.data?.totalEntries} |
              <span>Result {table.getRowModel().rows.length} Rows</span>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-end align-items-center   ">
            {dataQuery.isFetching ? (
              <div className="me-3 h-100 d-flex align-items-center ">
                <Spinner
                  size="sm"
                  animation="border"
                  variant="primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : null}
            <Paginate
              onPrevPage={() => table.previousPage()}
              isHasPrevPage={table.getCanPreviousPage()}
              onNextPage={() => table.nextPage()}
              isHasNextPage={table.getCanNextPage()}
              totalPages={table.getPageCount()}
              loading={dataQuery?.isLoading}
              activePage={table.getState().pagination.pageIndex + 1}
              onSetPage={table.setPageIndex}
            />
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default TablePerson;
