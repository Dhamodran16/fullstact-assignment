import React from 'react';

type NavbarProps = {
  activeTab: 'departments' | 'faculty';
  setActiveTab: (tab: 'departments' | 'faculty') => void;
};

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => (
  <>
    {/* Header */}
    <header className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <i className="fas fa-university text-3xl text-blue-600"></i>
              <h1 className="text-2xl font-bold text-gray-900">Faculty Management System</h1>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Navigation */}
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center space-x-12">
          <button
            onClick={() => setActiveTab('departments')}
            className={`py-5 px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap transition-all duration-200 ${
              activeTab === 'departments'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-building mr-2"></i>
            Department Management
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`py-5 px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap transition-all duration-200 ${
              activeTab === 'faculty'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-users mr-2"></i>
            Faculty Management
          </button>
        </div>
      </div>
    </nav>
  </>
);

export default Navbar; 