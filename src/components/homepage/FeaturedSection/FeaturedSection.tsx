import React from "react";
import featuredData from "../../../data/feature.json";

interface FeaturedCardProps {
  item: (typeof featuredData)[0];
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ item }) => (
  <a
    href={item.link}
    target='_blank'
    rel='noopener noreferrer'
    className='block border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition duration-200 bg-white'
  >
    {/* Image / Banner */}
    <div
      className='h-44 bg-gray-800 flex items-center justify-center text-white p-4'
      // Using background style placeholder to mimic the complex image background
      style={{
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className='text-sm font-semibold text-white/70'>Link</span>
    </div>

    {/* Text Content */}
    <div className='p-4'>
      <h3 className='text-lg font-semibold text-gray-800 truncate'>
        {item.title}
      </h3>
      <p className='text-sm text-gray-600 font-medium mt-1'>{item.subtitle}</p>
      <p className='text-xs text-gray-500 mt-2 line-clamp-3'>
        {item.description}
      </p>
    </div>
  </a>
);

const FeaturedSection: React.FC = () => {
  return (
    <div className='bg-white mt-7 border border-gray-300 rounded-lg shadow-sm p-6 space-y-4'>
      {/* --- Featured Header --- */}
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-gray-800'>Featured</h2>
      </div>

      {/* --- Featured Cards Grid --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {featuredData.map((item, index) => (
          <FeaturedCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
