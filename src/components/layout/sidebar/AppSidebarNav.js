import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { CBadge } from "@coreui/react";

const AppSidebarNav = ({ items, userRole }) => {
  const location = useLocation();
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, roles, ...rest } = item;

    // verifica si hay el rol de usuario y si lo incluye
    const isAllowed = roles ? roles?.includes(userRole) : true; //si no se mandó rol lo permite (true)

    const Component = component;
    return (
      isAllowed && ( // si tiene el rol permitido muestra el menú
        <Component
          {...(rest.to &&
            !rest.items && {
              component: NavLink,
            })}
          key={index}
          {...rest}
        >
          {navLink(name, icon, badge)}
        </Component>
      )
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, roles, ...rest } = item;

    // verifica si hay el rol de usuario y si lo incluye
    const isAllowed = roles ? roles?.includes(userRole) : true; //si no se mandó rol lo permite (true)

    const Component = component;
    const uniqueIdx = `${new Date().getMilliseconds()}-${index}`; //campo unico
    return (
      isAllowed && ( // si tiene el rol permitido muestra el menú
        <Component
          idx={uniqueIdx}
          key={index}
          toggler={navLink(name, icon)}
          visible={location.pathname.startsWith(to)}
          {...rest}
        >
          {item.items?.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index)
          )}
        </Component>
      )
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default React.memo(AppSidebarNav);
