import CrudOperations from "@/app/components/CrudOperations";
import Dashboard from "../dashboard/page";

export default function ModulePage({ params }) {
  const { module } = params; // This will dynamically take the module (country, city, etc.)

  return (
    <div className="flex min-h-screen">
    <Dashboard />
    <div>
      <CrudOperations module={module} />
    </div>
    </div>
  );
}
