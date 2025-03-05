import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useToaster } from 'react-hot-toast';
import ToastItem from './ToastItem';

type Props = {};

function ToastsWrapper({}: Props) {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, updateHeight } = handlers;
  return (
    <ToastContainer
      className="toast-container-fixed pt-3 px-3 d-flex flex-column "
      position="top-end" // position
      style={{
        top: 8,
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((tst) => {
        return (
          <ToastItem toast={tst} key={tst.id} updateHeight={updateHeight} />
        );
      })}
    </ToastContainer>
  );
}

export default ToastsWrapper;
