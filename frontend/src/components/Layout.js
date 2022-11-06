import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Application",
      path: "/application",
      icon: "ri-file-list-line",
    },
    {
      name: "Status",
      path: "/status",
      icon: "ri-check-double-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Pending Application",
      path: "/admin/pending-application",
      icon: "ri-user-add-line",
    },
    {
      name: "Approved Application",
      path: "/admin/approved-application",
      icon: "ri-user-follow-line",
    },
    {
      name: "Rejected Application",
      path: "/admin/rejected-application",
      icon: "ri-user-unfollow-line",
    },
    {
      name: "Slot Booking",
      path: "/admin/slots",
      icon: "ri-ticket-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="text-black text-center">IM</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item" //head
                  }`}
                  onClick={() => {
                    navigate(menu.path);
                  }}
                  >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(setUser(null));
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                class="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-3">
              <Badge className="mx-3" size="default" count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                <i className="ri-notification-line header-action-icon"></i>
              </Badge>
              
              <Link className="anchor" to={"/profile"}>
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
