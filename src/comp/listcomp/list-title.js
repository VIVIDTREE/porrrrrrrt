import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./list-title.css";

function ListTitle({ tag }) {
  return (
    <div className='title-nav-wrap cate-big-font'>
      <div className='title-logo'>
        <Link
          href='/'
          as={`/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className='logo-item'>
            <Image src='/src/logo.png' alt='logo' width={2560} height={900} />
          </div>
        </Link>
      </div>
      <div className='title-cate-name'>/ {tag}</div>
    </div>
  );
}
export default ListTitle;
