import { ReactNode, useEffect, useState } from "react";

type Props = {
  title: string;
  children: ReactNode;
  show: boolean;
  size?: "sm" | "md" | "lg"
  close: () => void;
  actions?: ReactNode[];
}

export const ModalBootstrap = (props: Props) => {
  const [isBlock, setBlock] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (props.show) {
      setBlock(true);
      setTimeout(() => {
        setShow(true);
      }, 300)
    } else {
      setShow(false);
      setTimeout(() => {
        setBlock(false);
      }, 300)
    }

  }, [props.show])

  return <>
    <div className={`modal fade ${isShow ? 'show' : ''}`} style={{ display: isBlock ? 'block' : 'none' }} tabIndex={-1}>
      <div className={`modal-dialog modal-dialog-centered ${'modal-' + (props.size ?? 'md')}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" onClick={props.close} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          {props.actions && (
              <div className="modal-footer">
                { props.actions.map((item) => item) }
              </div>
            )
          }
        </div>
      </div>
    </div>
  </>
}