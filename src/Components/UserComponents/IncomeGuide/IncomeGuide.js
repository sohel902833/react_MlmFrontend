import React from "react";
import { axiosGet } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./income.css";
function IncomeGuide() {
  const [incomeGuideList, setIncomeGuideList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getIncomeGuide();
  }, []);

  const getIncomeGuide = async () => {
    const res = await axiosGet(
      "user/income-guide",
      localStorage.getItem("token")
    );

    setLoading(false);
    if (res.status === 201) {
      setIncomeGuideList(res?.data?.incomeGuide);
    }
  };

  return (
    <MainLayout>
      <div className="income_guide_container">
        <AppBar title="Income Guide" backUrl="/" />
        <div className="image_list">
          {incomeGuideList.map((guide) => (
            <div>
              <img src={guide?.imageUrl} alt="" />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default IncomeGuide;
