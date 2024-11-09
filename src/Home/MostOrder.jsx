import React from 'react';

const MostOrder = () => {

    return (
        <div>
            <h2>Most Ordered Gigs</h2>
            {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Service"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">
                800+ High Quality SEO Backlinks
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                High DA 50-95. White Hat Backlinks.
              </p>
              <p className="text-lg font-bold mt-4">$10</p>
              <button className="btn btn-primary btn-sm w-full mt-4">
                Order Now
              </button>
            </div>
          ))}
        </div>
        </div>
    );
};

export default MostOrder;
