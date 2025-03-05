/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Pagination } from 'react-bootstrap';

type Props = {
  totalPages: number;
  activePage: number;
  loading?: boolean;
  onSetPage: (value: number) => void;
};

function PaginateNumbers({
  totalPages,
  activePage,
  onSetPage,
  loading,
}: Props) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    const handlePageChange = (page: number) => {
      onSetPage(page - 1);
    };

    // Add the first page button

    if (totalPages > 1) {
      pageNumbers.push(
        <Pagination.Item
          key={1}
          active={activePage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );
    }

    // Add the page number buttons within the limit of maxButtons
    const maxButtons = 5;
    const halfMaxButtons = Math.floor(maxButtons / 2);
    let start = activePage - halfMaxButtons;
    if (start < 2) {
      start = 2;
    }
    let end = start + maxButtons - 1;
    if (end >= totalPages) {
      end = totalPages - 1;
      start = end - maxButtons + 1;
      if (start < 2) {
        start = 2;
      }
    }

    if (start > 2) {
      pageNumbers.push(<Pagination.Ellipsis disabled key="start-ellipsis" />);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={activePage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (end < totalPages - 1) {
      pageNumbers.push(<Pagination.Ellipsis disabled key="end-ellipsis" />);
    }

    // Add the last page button
    pageNumbers.push(
      <Pagination.Item
        key={totalPages}
        active={activePage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );

    return pageNumbers;
  };

  const content = !loading ? renderPageNumbers() : null;

  return <>{content}</>;
}

PaginateNumbers.defaultProps = {
  loading: false,
};

export default PaginateNumbers;
