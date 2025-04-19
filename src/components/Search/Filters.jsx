import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const applyFilters = () => {
    const params = {};
    
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    
    // Preserve existing search query if present
    if (searchParams.get('search')) {
      params.search = searchParams.get('search');
    }
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    
    const params = {};
    if (searchParams.get('search')) {
      params.search = searchParams.get('search');
    }
    
    setSearchParams(params);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-white mb-3">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
              className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
            />
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;