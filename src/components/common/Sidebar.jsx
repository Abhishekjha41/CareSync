import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Dashboard", href: "/patient", icon: HomeIcon },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: ClipboardDocumentListIcon },
  { name: "Health Logs", href: "/patient/health-logs", icon: UserGroupIcon },
  { name: "Messages", href: "/patient/messages", icon: ChatBubbleLeftRightIcon },
  { name: "Settings", href: "/patient/settings", icon: CogIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const sidebarWidth = "w-64";

  return (
    <>
      {/* Arrow button to open sidebar - only on mobile, center left */}
      <button
        aria-label="Open Sidebar"
        className={`
          fixed z-40 left-0 top-1/2 -translate-y-1/2
          bg-primary-600 text-white rounded-r-full shadow-md p-2
          focus:outline-none focus:ring-2 focus:ring-primary-400
          transition hover:bg-primary-700
          lg:hidden
        `}
        style={{ }}
        onClick={() => setOpen(true)}
        tabIndex={open ? -1 : 0} 
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen ${sidebarWidth}
          bg-gradient-to-b from-primary-50 via-white to-medical-50
          shadow-xl border-r border-gray-200 flex flex-col z-50
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:top-auto
        `}
      >
        {/* Sidebar header/logo area */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-gray-100 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 shadow-inner">
            <span className="text-primary-600 text-2xl font-bold">🩺</span>
          </div>
          <div>
            <span className="block text-lg font-bold text-primary-700 tracking-wide">Patient Panel</span>
            <span className="block text-xs text-gray-400">Your Health Hub</span>
          </div>
          {/* Mobile close */}
          <div className="ml-auto lg:hidden">
            <button
              aria-label="Close Sidebar"
              className="p-1"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-7 w-7 text-gray-500" />
            </button>
          </div>
        </div>
        {/* Main Nav */}
        <nav className="flex-1 mt-4 px-2 lg:px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      flex items-center px-4 py-2 text-base rounded-lg transition-colors group
                      ${isActive
                        ? "bg-primary-100 text-primary-700 font-semibold shadow-inner"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"}
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 h-6 w-6
                        ${isActive ? "text-primary-500" : "text-gray-400 group-hover:text-primary-400"}
                      `}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats Widget */}
        <div className="mt-auto mb-6 mx-4 p-4 bg-medical-50 rounded-xl shadow-sm hidden md:block">
          <h3 className="text-sm font-medium text-primary-700 mb-2 tracking-wide">Quick Stats</h3>
          <div className="text-xs text-gray-600 space-y-1 font-mono">
            <p>• 3 pending reminders</p>
            <p>• 1 new prescription</p>
            <p>• Next appointment: Tomorrow</p>
          </div>
        </div>

        {/* Decorative bottom accent */}
        <div className="hidden lg:block mt-auto px-6 pb-6">
          <div className="h-2 w-full rounded-xl bg-gradient-to-r from-primary-200 via-medical-200 to-primary-100 opacity-70" />
        </div>
      </aside>
    </>
  );
}
