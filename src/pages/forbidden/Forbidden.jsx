
import { FaBan } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 text-center">
      <div className="text-red-600 text-6xl mb-4">
        <FaBan />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        Oops! You don’t have permission to access this page.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Forbidden;
