import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosGet, axiosPost } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
import Singlesettingitem from "./SingleSettingItem";
function Settings() {
  const [loading, setLoading] = React.useState(true);
  const [taskClearLoading, setTaskClearLoading] = React.useState(false);
  const [setting, setSetting] = React.useState();

  React.useEffect(() => {
    getSetting();
  }, []);

  const options = [
    {
      value: setting?.level1EarningPercent,
      title: "Level 1 Earning Parcent",
      inputType: "number",
      property: "level1EarningPercent",
    },
    {
      value: setting?.level2EarningPercent,
      title: "Level 2 Earning Parcent",
      inputType: "number",
      property: "level2EarningPercent",
    },
    {
      value: setting?.level3EarningPercent,
      title: "Level 3 Earning Parcent",
      inputType: "number",
      property: "level3EarningPercent",
    },
    {
      value: setting?.level1ReferBonous,
      title: "Level 1 Refer Parcent",
      inputType: "number",
      property: "level1ReferBonous",
    },
    {
      value: setting?.level2ReferBonous,
      title: "Level 2 Refer Parcent",
      inputType: "number",
      property: "level2ReferBonous",
    },
    {
      value: setting?.level3ReferBonous,
      title: "Level 3 Refer Parcent",
      inputType: "number",
      property: "level3ReferBonous",
    },
    {
      value: setting?.rechargeAddress,
      title: "Recharge Address",
      inputType: "text",
      property: "rechargeAddress",
    },
    {
      value: setting?.withdraw,
      title: "Withdraw (on Or of)",
      inputType: "text",
      property: "withdraw",
    },
    {
      value: setting?.joiningBonus,
      title: "Joining Bonus",
      inputType: "number",
      property: "joiningBonus",
    },
    {
      value: setting?.appLink,
      title: "App Download Link",
      inputType: "text",
      property: "appLink",
    },
    {
      value: setting?.helpCenter,
      title: "Help Center Link",
      inputType: "text",
      property: "helpCenter",
    },
  ];

  const getSetting = async () => {
    setLoading(true);
    const res = await axiosGet(
      "admin/setting",
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setSetting(res.data);
    } else {
      alert("Setting Not Found.");
    }
  };
  const clearDailyTask = async () => {
    if (window.confirm("Are you Want To Clear Today History")) {
      setTaskClearLoading(true);
      const res = await axiosPost(
        "admin/clear-daily-task",
        localStorage.getItem("admin-token")
      );
      setTaskClearLoading(false);
      if (res.status === 201) {
        alert(res?.data?.message);
      } else {
        alert(res?.data?.message);
      }
    }
  };
  if (loading) return <Loader loading={loading} />;
  return (
    <AdminLayout>
      <>
        <Typography variant="h3">Settings</Typography>
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            width: "100%",
          }}
        >
          {taskClearLoading ? (
            <BeatLoader loading={taskClearLoading} />
          ) : (
            <button onClick={(e) => clearDailyTask()}>
              Clear Today History
            </button>
          )}
        </div>
        <br />
        <Grid container spacing={5}>
          {options?.map((option) => (
            <Grid item xs={12} sm={6} md={6}>
              <Singlesettingitem option={option} getSetting={getSetting} />
            </Grid>
          ))}
        </Grid>
      </>
    </AdminLayout>
  );
}

export default Settings;
