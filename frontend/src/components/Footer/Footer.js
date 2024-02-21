import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className=" col text-center py-3">
            Copyright & copy; Note Zipper
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
