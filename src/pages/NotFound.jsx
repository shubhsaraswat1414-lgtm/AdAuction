import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h1 className="mb-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-base text-gray-500">
        The page you are looking for doesn't exist or has been moved. Check the URL or navigate back home.
      </p>
      <Link to="/">
        <Button>
          Return Home
        </Button>
      </Link>
    </div>
  );
}
