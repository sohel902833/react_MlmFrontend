import { Grid } from "@material-ui/core";
import React from "react";
import { axiosGet } from "../../ApiCall/axiosApi";
import Loader from "../../Layout/Loader";
import MembershipItem from "./MembershipItem";

function MembershipLists() {
  const [loading, setLoading] = React.useState(false);
  const [membershipList, setMembershipList] = React.useState([]);
  React.useEffect(() => {
    getMembershipList();
  }, []);

  const getMembershipList = async () => {
    setLoading(true);
    const res = await axiosGet(
      `admin/membership`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setMembershipList(res.data.membership);
    }
  };
  const filterMembership = (id) => {
    const fTask = membershipList.filter((t) => t.id !== id);
    setMembershipList(fTask);
  };

  if (loading) {
    return <Loader loading={loading} />;
  }
  return (
    <Grid container spacing={5}>
      {membershipList?.map((membership) => (
        <Grid item xs={12} sm={12} md={6}>
          <MembershipItem
            filterMemberShip={filterMembership}
            membership={membership}
            getMembershipList={getMembershipList}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MembershipLists;
