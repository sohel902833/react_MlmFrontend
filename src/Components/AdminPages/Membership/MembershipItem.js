import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React from "react";
import { axiosDelete } from "../../ApiCall/axiosApi";
import EditMembership from "./EditMembership";
const MembershipItem = ({
  membership,
  filterMemberShip,
  getMembershipList,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState();
  const [videoUrl, setVideoUrl] = React.useState();
  const [show, setShow] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const deleteJob = async () => {
    if (window.confirm("Are you Want To Sure Delete This Job")) {
      setLoading(true);
      const res = await axiosDelete(
        `admin/membership/${membership?.levelId}`,
        localStorage.getItem("admin-token")
      );
      setLoading(false);
      if (res.status === 201) {
        filterMemberShip(membership?.levelId);
      }
    }
  };

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <EditOutlined
                onClick={() => setShowEdit(!showEdit)}
                style={{ marginLeft: "10px" }}
              />
            </IconButton>
          }
          title={membership?.levelName}
        />
        <CardContent>
          <img
            style={{ width: "200px", height: "200px" }}
            src={membership?.imageUrl}
            alt=""
          />
          <Typography variant="h5" color="textSecondary">
            Number Of Jobs : {membership?.numOfJobs}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Monthly Income : {membership?.monthlyIncome}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Price :<span style={{ color: "red" }}>{membership?.price}</span>
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Validity Day :{membership?.validityDay}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Minimum Withdraw :{membership?.minimumWithdraw}
          </Typography>
        </CardContent>
        {showEdit && (
          <EditMembership
            setOpen={setShowEdit}
            membership={membership}
            getMembershipList={getMembershipList}
          />
        )}
      </Card>
    </div>
  );
};

export default MembershipItem;
