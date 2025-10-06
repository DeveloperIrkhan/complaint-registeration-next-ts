import DashboardCard from "@/app/components/Admin/DashboardCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { images } from "@/app/Images";

const Page = () => {
  return (
    <>
      <SectionHeading
        title="Complaints"
        lineColor="bg-gray-500"
        subtitle="Information regarding Complaints"
        subtitleColor="text-gray-700"
        textColor="text-gray-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 mx-2">
        <DashboardCard
          Icon={images.managecomplainticon}
          className="bg-primary-color/20 hoverEffect hover:bg-primary-color/50"
          totalNumber={330}
          heading="Total"
          text="Total Complaints"
        />
        <DashboardCard
          Icon={images.completedicon}
          className="bg-secondry-color/20 hoverEffect hover:bg-secondry-color/50"
          totalNumber={344}
          heading="Completed"
          text="Completed Complaints"
        />
        <DashboardCard
          Icon={images.processingicon}
          className="bg-forth-color/20 hoverEffect hover:bg-forth-color/50"
          totalNumber={45}
          heading="Processing"
          text="Under Processing"
        />
        <DashboardCard
          Icon={images.pending}
          className="bg-accent-color/20 hoverEffect hover:bg-accent-color/50"
          totalNumber={23}
          heading="Pending"
          text="Pending Complaints"
        />
      </div>
    </>
  );
};

export default Page;
