import React from 'react';
import { Pagination } from 'react-bootstrap';
import PaginateNumbers from './PaginateNumbers';

type Props = {
  isHasNextPage: boolean;
  isHasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onSetPage: (page: number) => void;
  totalPages: number;
  activePage: number;
  loading: boolean;
};

function Paginate({
  isHasNextPage,
  isHasPrevPage,
  onNextPage,
  onPrevPage,
  onSetPage,
  totalPages,
  activePage,
  loading,
}: Props) {
  return (
    <Pagination className="align-self-center my-auto">
      <Pagination.Prev onClick={() => onPrevPage()} disabled={!isHasPrevPage}>
        Previous
      </Pagination.Prev>
      {totalPages > 0 ? (
        <PaginateNumbers
          totalPages={totalPages}
          activePage={activePage}
          onSetPage={onSetPage}
          loading={loading}
        />
      ) : null}

      <Pagination.Next onClick={() => onNextPage()} disabled={!isHasNextPage}>
        Next
      </Pagination.Next>
    </Pagination>
  );
}

export default Paginate;
