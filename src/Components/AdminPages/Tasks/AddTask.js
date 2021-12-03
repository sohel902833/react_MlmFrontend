import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosGet, axiosPost } from "../../ApiCall/axiosApi";
import Loader from "../../Layout/Loader";
const AddTask = () => {
  const [brand, setBrand] = React.useState("Facebook");
  const [title, setTitle] = React.useState("");
  const [membership, setMembership] = React.useState("");
  const [membershipList, setMembershipList] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    getMembershipList();
  }, []);

  const saveNewJob = async () => {
    if (brand && title && membership && price && videoUrl) {
      setLoading(true);
      const task = {
        brand,
        title,
        membership,
        price,
        videoUrl,
      };
      const res = await axiosPost(
        "admin/task",
        localStorage.getItem("admin-token"),
        task
      );
      setLoading(false);
      console.log(res);
      if (res.status === 201) {
        setTitle("");
        setPrice("");
        setVideoUrl("");
      }
    } else {
      setLoading(false);
      setError("Enter All Input Data");
    }
  };

  const getMembershipList = async () => {
    setPageLoading(true);
    const res = await axiosGet(
      `admin/membership`,
      localStorage.getItem("admin-token")
    );
    setPageLoading(false);
    if (res.status === 201) {
      setMembershipList(res.data.membership);
      setMembership(res.data.membership[0]?.levelName);
    }
  };

  if (pageLoading) {
    return <Loader loading={pageLoading} />;
  }

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={10} sm={10} md={6}>
          <FormControl fullWidth>
            <Typography variant="h6">Brand</Typography>
            <br />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              label="Task Brand"
            >
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Tiktak">Tiktak</MenuItem>
            </Select>

            <br />
            <br />
            <Typography variant="h6">
              Select Membertype For This Task
            </Typography>
            <br />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={membership === "" ? "Select Membership" : membership}
              onChange={(e) => setMembership(e.target.value)}
              label="Task For"
            >
              {membershipList.map((member) => (
                <MenuItem value={member?.levelId}>{member?.levelName}</MenuItem>
              ))}
            </Select>

            <br />
            <br />
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="outlined"
              color="secondary"
              required
              type="text"
            />
            <br />
            <br />
            <TextField
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              label="Price"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />
            <br />
            <TextField
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              label="Video Url"
              variant="outlined"
              color="secondary"
              required
              type="text"
            />
            <br />
            <br />
            <p style={{ color: "red" }}>{error}</p>
            <br />
            <br />
            {loading ? (
              <BeatLoader loading={loading} />
            ) : (
              <Button
                disabled={loading}
                onClick={() => saveNewJob()}
                style={{ marginBottom: "10px" }}
                color="secondary"
                variant="outlined"
                type="submit"
                endIcon={<EditOutlined />}
              >
                Save
              </Button>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTask;
