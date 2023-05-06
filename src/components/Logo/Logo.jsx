import React from "react";
import { GiUmbrellaBayonet } from "react-icons/gi";
import "./Logo.scss";

export const Logo = () => {
  return (
    <div className="logo-container">
      <GiUmbrellaBayonet className="logo-icon" />
      <h1 className="logo-title">
        <span className="logo-title--color-dark">Weath</span>
        <span className="logo-title--color-light">Umbrella</span>
      </h1>
    </div>
  );
};
