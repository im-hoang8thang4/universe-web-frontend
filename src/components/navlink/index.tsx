import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface INavLinkCustomProps extends NavLinkProps {
  notActiveIcon: React.ReactNode;
  activeIcon: React.ReactNode;
}

export const NavLinkCustom = (props: INavLinkCustomProps) => {
  return (
    <NavLink
      to={props.to}
      children={({ isActive }) => {
        return isActive ? props.activeIcon : props.notActiveIcon;
      }}
      className={props.className}
    ></NavLink>
  );
};
