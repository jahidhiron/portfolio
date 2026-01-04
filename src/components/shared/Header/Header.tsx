const Header = () => {
  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 py-1 z-99 shadow-sm'>
      <nav className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <a
            href={"/#home"}
            className='text-[#262956] sm:text-3xl text-2xl font-bold'
          >
            Jahid Hiron
          </a>
        </div>
        <ul className='flex sm:space-x-6 space-x-4 text-gray-700 text-sm'>
          <li className='text-center hover:text-gray-900 cursor-pointer'>
            <a href='/#experience' className='sm:text-sm text-xs'>
              Experience
            </a>
          </li>

          <li className='text-center hover:text-gray-900 cursor-pointer'>
            <a href='/#projects' className='sm:text-sm text-xs'>
              Projects
            </a>
          </li>
          <li className='text-center hover:text-gray-900 cursor-pointer'>
            <a href='/#skills' className='sm:text-sm text-xs'>
              Skils
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
