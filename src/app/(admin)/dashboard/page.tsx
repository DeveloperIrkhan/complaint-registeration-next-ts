"use client";
import DashboardCard from "@/components/Admin/DashboardCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { images } from "@/app/Images";
import { useEffect } from "react";
import { useComplaintStore } from "@/features/store";
import { complaintStatus } from "@/enums/complaintStatus";

const Page = () => {
  const { complaints } = useComplaintStore();
  useEffect(() => {
    console.log("complaints", complaints);
  }, [complaints]);

  const Total = complaints.length;
  const Completed = complaints.filter(
    (item) =>
      item.complaintStatus === complaintStatus.closed ||
      item.complaintStatus === complaintStatus.resolved
  ).length;
  const Processing = complaints.filter(
    (item) => item.complaintStatus === complaintStatus.in_progress
  ).length;
  const Pending = complaints.filter(
    (item) => item.complaintStatus === complaintStatus.pending
  ).length;
  return (
    <>
      <SectionHeading
        title="Complaints"
        lineColor="bg-gray-500"
        subtitle="Information regarding Complaints"
        subtitleColor="text-gray-700"
        textColor="text-gray-500"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3 mx-2">
        <DashboardCard
          Icon={images.managecomplainticon}
          className="bg-blue-100 text-blue-800  hoverEffect hover:shadow-lg hover:drop-shadow-amber-500 transition hover:bg-blue-400"
          totalNumber={Total}
          heading="Total"
          text="Total Complaints"
        />
        <DashboardCard
          Icon={images.completedicon}
          className="hoverEffect hover:shadow-lg hover:drop-shadow-amber-500 transition bg-green-100 text-green-800 hover:bg-green-300"
          totalNumber={Completed}
          heading="Completed"
          text="Completed Complaints"
        />
        <DashboardCard
          Icon={images.processingicon}
          className="hoverEffect hover:shadow-lg hover:drop-shadow-amber-500 transition bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          totalNumber={Processing}
          heading="Processing"
          text="Under Processing"
        />
        <DashboardCard
          Icon={images.pending}
          className="bg-purple-100 text-purple-800 hoverEffect hover:shadow-lg hover:drop-shadow-amber-500 transition hover:bg-purple-300"
          totalNumber={Pending}
          heading="Pending"
          text="Pending Complaints"
        />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
  <div className="bg-blue-100 text-blue-800 p-6 rounded-2xl shadow hover:shadow-md transition">
    <h3 className="text-3xl font-bold">{Total}</h3>
    <p className="font-semibold">Total Complaints</p>
  </div>

  <div className="bg-green-100 text-green-800 p-6 rounded-2xl shadow hover:shadow-md transition">
    <h3 className="text-3xl font-bold">{Completed}</h3>
    <p className="font-semibold">Completed</p>
  </div>

  <div className="bg-yellow-100 text-yellow-800 p-6 rounded-2xl shadow hover:shadow-md transition">
    <h3 className="text-3xl font-bold">{Pending}</h3>
    <p className="font-semibold">Pending</p>
  </div>

  <div className="bg-purple-100 text-purple-800 p-6 rounded-2xl shadow hover:shadow-md transition">
    <h3 className="text-3xl font-bold">{Processing}</h3>
    <p className="font-semibold">In Progress</p>
  </div>
</div> */}
    </>
  );
};

export default Page;
