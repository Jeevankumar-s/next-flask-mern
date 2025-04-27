"use client"; // 👈 Important! Because we're using client-side hooks

import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Correct import


export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login"); // ✅ Redirect after logout
  };

  const menus = [
    "Country", "State", "City", "Area", "Department", "Designation", "Employee", "Employee List",
    "Ledger", "Ledger List", "Ledger Group", "Unit", "Tax", "HSNSAC", "Process", "Route",
    "Item Group", "Item", "Item List", "Services", "Expense Group", "Lead Through",
    "Purpose", "Project", "Task Group", "Task Type", "Bank", "User Group", "User",
    "Terms", "Terms Type", "Branch"
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-center py-6 text-2xl font-bold border-b border-gray-700">Menu</div>
        <nav className="flex-1 overflow-y-auto p-4">
          {menus.map((menu) => (
            <Link key={menu} href={`/${menu.toLowerCase().replace(/\s+/g, "_")}`}>
              <div className="p-2 hover:bg-gray-700 rounded cursor-pointer">{menu}</div>
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="bg-red-500 m-4 p-2 rounded hover:bg-red-600">
          Logout
        </button>
      </aside>
    </div>
  );
}
