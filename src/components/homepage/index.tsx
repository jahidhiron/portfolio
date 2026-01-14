import Banner from "./Banner/Banner";
import ContactMethodsList from "./ContactsList/ContactsList";
import profile from "../../data/profile.json";
import AboutSection from "./About/About";
import ActivitySection from "./YouTubeSection/YouTubeSection";
import ExperienceSection from "./Experience/Experience";
import EducationSection from "./EducationSection/EducationSection";
import ProjectsSection from "./ProjectsSection/ProjectsSection";
import SkillsSection from "./SkillsSection/SkillsSection";
import InterestsSection from "./InterestsSection/InterestsSection";
import UdemySection from "./UdemySection/UdemySection";
import Top3ProjectsSection from "./Top3projects/Top3projects";

const HomePage = () => {
  return (
    <div className='flex max-w-6xl m-auto items-start  sm:p-7 p-3 gap-5 lg:flex-row flex-col'>
      <div className='lg:w-[750px] w-full'>
        <Banner data={profile as any} />
        <AboutSection />
        <div className='sm:hidden mt-8 block'>
          <ContactMethodsList />
        </div>
        {/* <ServicesSection /> */}
        {/* <FeaturedSection /> */}
        <UdemySection />
        <ActivitySection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        {/* <InterestsSection /> */}
      </div>
      <div className='lg:w-[350px] h-[5500px]  lg:block hidden w-full'>
        <ContactMethodsList />
        <Top3ProjectsSection />
      </div>
    </div>
  );
};

export default HomePage;
