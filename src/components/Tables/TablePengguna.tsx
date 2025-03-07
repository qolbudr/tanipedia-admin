/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
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
import { Button, Card, Form, Modal, Spinner, Table } from 'react-bootstrap';
import FeatherIcon from '@components/Icons/FeatherIcon';
import Paginate from '@components/Paginate/Paginate';
import DebouncedInput from '@components/Inputs/DebouncedInput';
import { fuzzyFilter } from '@utils/utils';
import { useRouter } from 'next/router';
import { Users } from '@prisma/client';
import { UserRepository } from '@/repository/user_repository';
import useNotification from '@hooks/useNotification';
import { handleError } from '@utils/handleError';
import Swal from 'sweetalert2';
import { ModalBootstrap } from '@components/Modal/Modal';
import FormEditPengguna from '@components/Forms/FormEditPengguna';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

type Props = {};

function TablePengguna({ }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const router = useRouter();
  const notification = useNotification({ duration: 500 });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user, setUser] = useState<Users>()

  const columnsDefs = React.useMemo<ColumnDef<Users>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No',
        size: 60,
      },
      {
        accessorKey: 'name',
        header: () => <span>Nama</span>,
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
      },
      {
        accessorKey: 'phone',
        header: () => <span>Telepon</span>,
        cell: (data) => '+62' + data.row.original.phone
      },
      {
        accessorKey: 'address',
        header: () => <span>Alamat</span>,
      },
      {
        accessorKey: 'action',
        header: '',
        cell: (data) => (
          <div className="d-flex gap-1">
            <Button size="sm" onClick={() => editUser(data.row.original.id)} variant="primary">
              <FeatherIcon name="Edit" size={14} />
            </Button>
            <Button size="sm" onClick={() => deleteUser(data.row.original.id)} variant="danger">
              <FeatherIcon name="Trash" size={14} />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    []
  );

  const editUser = async (userId: number) => {
    try {
      const response = await UserRepository.editUser({ id: `${userId}` })
      setUser(response?.data);
      setIsEdit(true);
    } catch (e) {
      notification.danger(handleError(e));
    }
  }

  const deleteUser = async (userId: number) => {
    try {
      Swal.fire({
        icon: "warning",
        title: "Apakah kamu yakin ingin menghapus data",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await UserRepository.deleteUser({ id: `${userId}` });
          if (response) notification.success(response.message);
          await dataQuery.refetch();
        }
      });
    } catch (e) {
      notification.danger(handleError(e));
    }
  }

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
    () => UserRepository.getUsers({ limit: fetchDataOptions.pageSize, offset: fetchDataOptions.pageIndex, search: fetchDataOptions.searchTerm }),
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
    data: dataQuery?.data?.data ?? defaultData,
    columns: columnsDefs,
    pageCount: dataQuery?.data?.count ?? -1,
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
      {user && (
        <ModalBootstrap
          show={isEdit}
          title='Edit Pengguna'
          size='sm'
          close={() => setIsEdit(false)}
        >
          <FormEditPengguna user={user} callback={() => {
            dataQuery.refetch();
            setIsEdit(false);
          }} />
        </ModalBootstrap>
      )}x
      <Card>
        <Card.Header>
          <div className='d-flex align-items-center justify-content-between'>
            <Card.Title className="mb-0">Tabel Pengguna</Card.Title>
            {/* <Button onClick={() => router.push('/user/add')}>Tambah Pengguna</Button> */}
          </div>
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
                              className: ` d-flex align-items-center justify-content-between ${header.column.getCanSort()
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
              of {dataQuery?.data?.count ?? 0} |
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

export default TablePengguna;
