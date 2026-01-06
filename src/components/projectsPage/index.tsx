import AllProjectsPage from "./List/List";

const ProjectDetailsPage = () => {
  return (
    <div className='flex max-w-6xl m-auto items-start  sm:p-7 p-3 gap-5 md:flex-row flex-col'>
      <div className=' w-full'>
        <AllProjectsPage />
      </div>
      {/* <div className='md:w-[350px] w-full'></div> */}
    </div>
  );
};

export default ProjectDetailsPage;
