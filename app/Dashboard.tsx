const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white shadow-lg w-64">
        <div className="py-4 px-6">
          <h2 className="text-xl font-semibold text-black">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Orders
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Products
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Customers
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Content
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Analytics
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Marketing
          </a>
          <a
            href="#"
            className="block py-2 px-6 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          >
            Discounts
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <a href="#" className="text-xl font-semibold text-gray-800">
                  Dashboard
                </a>
              </div>
              <div className="flex items-center">
                <a href="#" className="text-gray-600 hover:text-gray-800 mx-3">
                  Profile
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-800 mx-3">
                  Settings
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="container mx-auto my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cards */}
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Total Sales
              </h2>
              <p className="text-3xl font-bold text-gray-700">$10,000</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Products
              </h2>
              <p className="text-3xl font-bold text-gray-700">50</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Orders
              </h2>
              <p className="text-3xl font-bold text-gray-700">200</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Customers
              </h2>
              <p className="text-3xl font-bold text-gray-700">500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
