import React from 'react';
import { Button, Toast } from 'react-bootstrap';
import reactHotToast, { Toast as IToast } from 'react-hot-toast';
import clsx from 'classnames';
import FeatherIcon from '@components/Icons/FeatherIcon';
import { FeatherIconsTypes, NotificationVariantTypes } from '@utils/types';

type Props = {
  toast: IToast;
  updateHeight: (toastId: string, height: number) => void;
};

const iconNames: { [key: string]: FeatherIconsTypes } = {
  success: 'Check',
  primary: 'Check',
  warning: 'AlertTriangle',
  info: 'AlertCircle',
  danger: 'X',
};

function ToastItem({ toast, updateHeight }: Props) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const ref = (el: HTMLDivElement) => {
    if (el && typeof toast.height !== 'number') {
      const { height } = el.getBoundingClientRect();
      updateHeight(toast.id, height);
    }
  };

  const toastIcon = toast.icon as NotificationVariantTypes;
  const toastIconName = iconNames[toastIcon] ?? iconNames.primary;

  const toastIconClsx = clsx('toast-icon', {
    'bg-primary text-white': toastIcon === 'primary' || !toastIcon,
    'bg-success text-white': toastIcon === 'success',
    'bg-danger text-white': toastIcon === 'danger',
    'bg-info text-white': toastIcon === 'info',
    'bg-warning text-white': toastIcon === 'warning',
  });

  return (
    <div className="toast-notif animate">
      <Toast key={toast.id} ref={ref} className="bg-white text-dark">
        <Toast.Body>
          <div className="toast-content">
            <div className={toastIconClsx}>
              <FeatherIcon name={toastIconName} size={16} />
            </div>
            <span className="ms-2 my-0 ">{toast.message as string}</span>
          </div>
          <div className="toast-dismiss">
            <Button
              disabled={loading}
              className="p-0 shadow-none bg-transparent border-0 p-1 text-dark "
              onClick={() => {
                reactHotToast.dismiss(toast.id);
                setLoading(true);
              }}
            >
              <FeatherIcon size={17} name="X" />
            </Button>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastItem;
