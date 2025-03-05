import React from 'react';

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-6 text-start">
            <div className="mb-0">
              <div>
                <a
                  className="text-muted"
                  href="https://adminkit.io/"
                  target="_blank"
                >
                  <strong>AdminKit</strong>
                </a>{' '}
                -{' '}
                <a
                  className="text-muted"
                  href="https://github.com/MuhammadAkbar11/next-ts-adminkit"
                  target="_blank"
                >
                  <strong>
                    Bootstrap 5 Admin Template Nextjs + Typescript version
                  </strong>
                </a>{' '}
                ©
              </div>
            </div>
          </div>
          <div className="col-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  className="text-muted"
                  href="https://adminkit.io/"
                  target="_blank"
                >
                  Support
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="text-muted"
                  href="https://adminkit.io/"
                  target="_blank"
                >
                  Help Center
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="text-muted"
                  href="https://adminkit.io/"
                  target="_blank"
                >
                  Privacy
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="text-muted"
                  href="https://adminkit.io/"
                  target="_blank"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
