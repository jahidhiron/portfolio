import SkillsSectionDetails from "./Details/Details";

const SkillsSectionDetailsPage = () => {
  return (
    <div className='flex max-w-6xl m-auto items-start  sm:p-7 p-3 gap-5 md:flex-row flex-col'>
      <div className='md:w-[750px] w-full'>
        <SkillsSectionDetails />
      </div>
      {/* <div className='md:w-[350px] w-full'></div> */}
    </div>
  );
};

export default SkillsSectionDetailsPage;
