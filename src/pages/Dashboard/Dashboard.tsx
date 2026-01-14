import Content from "../../components/Content/Content";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Dashboard;
