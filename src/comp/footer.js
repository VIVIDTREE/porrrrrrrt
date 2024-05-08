import React from "react";
import Link from "next/link";
import "./footer.css";

function Footer() {
  return (
    <footer className='footer-warp'>
      <div className='footer pre1rem'>
        <div className='footer-text'>
          <div className='footer-de'>
            © 2024 wongi sim. All rights reserved.
          </div>
        </div>
        <div className='footer-text'>
          <Link
            href='/about/'
            as={`/about/`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className='footer-about'>About us</div>
          </Link>
        </div>
        <div className='footer-text'>
          <div className='footer-con'>Contact</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
