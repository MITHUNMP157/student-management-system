import React from "react";
import { Link } from "react-router-dom";

const CollageLogo = () => {
  return (
    <div>
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h3>
            Mid-State
            <br />
            Institute of Technology (MSIT)
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default CollageLogo;
