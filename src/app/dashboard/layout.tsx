import { ValidateToken } from "@/utils/ValidationToken";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await ValidateToken();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white p-4 flex-shrink-0">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4 flex flex-col gap-4">
            <li>
              <p>Name : {user?.Fname}</p>
            </li>
            <li>
              <p>Email : {user?.email}</p>
            </li>
            <li>
              <p>Role : {user?.role}</p>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
