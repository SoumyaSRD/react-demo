import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 border-top border-white border-opacity-10 text-center text-muted-custom small fw-medium">
      <div className="container">
        <p className="mb-0">© 2026 Dashboard Application • Powered by React & Vite</p>
        <div className="d-flex justify-content-center gap-4 mt-2 opacity-75">
          <a href="#" className="text-muted-custom text-decoration-none hover-effect px-2 py-1 rounded">Privacy</a>
          <a href="#" className="text-muted-custom text-decoration-none hover-effect px-2 py-1 rounded">Terms</a>
          <a href="#" className="text-muted-custom text-decoration-none hover-effect px-2 py-1 rounded">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
