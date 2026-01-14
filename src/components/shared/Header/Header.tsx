import ThemeToggle from "../Theme/ThemeToggle";

const Header = () => {
  return (
    <header className='bg-theme border-b border-theme sticky top-0 py-1 z-99 shadow-sm'>
      <nav className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <a
            href={"/#home"}
            className='text-theme-primary sm:text-3xl text-2xl font-bold'
          >
            Jahid Hiron
          </a>
        </div>
        <div className='flex items-center space-x-4'>
          <ul className='flex sm:space-x-6 space-x-4 text-theme-primary text-sm'>
            <li className='text-center hover:text-theme-secondary cursor-pointer'>
              <a href='/#experience' className='sm:text-sm text-xs'>
                Experience
              </a>
            </li>

            <li className='text-center hover:text-theme-secondary cursor-pointer'>
              <a href='/#projects' className='sm:text-sm text-xs'>
                Projects
              </a>
            </li>
            <li className='text-center hover:text-theme-secondary cursor-pointer'>
              <a href='/#skills' className='sm:text-sm text-xs'>
                Skills
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
export default Header;
