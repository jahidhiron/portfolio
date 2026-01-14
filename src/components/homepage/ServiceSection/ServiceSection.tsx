import React from "react";
import servicesData from "../../../data/service.json";

const ServicesSection: React.FC = () => (
  <div className='bg-theme mt-7 border border-theme rounded-lg shadow-sm p-6 space-y-4'>
    {/* --- Services Header --- */}
    <h2 className='text-xl font-semibold text-theme-primary'>Services</h2>

    {/* --- Services List (Rendered dynamically) --- */}
    <p className='text-sm text-theme-secondary leading-relaxed'>
      {servicesData.map((service, index) => (
        <React.Fragment key={service.name}>
          <span className='font-medium text-theme-primary'>{service.name}</span>
          {/* Add bullet point separator between services */}
          {index < servicesData.length - 1 && (
            <span className='text-theme-secondary'> • </span>
          )}
        </React.Fragment>
      ))}
    </p>

    {/* --- Request Proposal Button --- */}
    <button className='px-5 py-2 text-blue-700 font-semibold border border-blue-700 rounded-full hover:bg-blue-50 transition duration-150 text-sm'>
      Request proposal
    </button>

    {/* --- Show All Link --- */}
    <div className='border-t border-theme mt-4 pt-3 text-center'>
      <button className='text-theme-secondary text-sm font-semibold hover:underline flex justify-center items-center w-full'>
        Show all
        <svg
          className='w-4 h-4 ml-1 mt-0.5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17 8l4 4m0 0l-4 4m4-4H3'
          />
        </svg>
      </button>
    </div>
  </div>
);

export default ServicesSection;
