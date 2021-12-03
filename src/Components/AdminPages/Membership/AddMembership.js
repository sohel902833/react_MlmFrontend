import { Button, FormControl, Grid, TextField } from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosPost } from "../../ApiCall/axiosApi";
const AddMembership = () => {
  const [levelName, setLevelName] = React.useState("");
  const [numOfJobs, setNumOfJobs] = React.useState("");
  const [monthlyIncome, setMonthlyIncome] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [minimumWithdraw, setMinimumWithdraw] = React.useState("");
  const [validityDay, setValidityDay] = React.useState("");
  const [imageAsLink, setImageAsLink] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const storage = getStorage();

  const saveNewJob = async () => {
    if (
      levelName &&
      numOfJobs &&
      monthlyIncome &&
      price &&
      validityDay &&
      minimumWithdraw &&
      imageAsLink
    ) {
      setLoading(true);

      //upload image

      if (imageAsLink) {
        setLoading(true);
        const imageRef = ref(
          storage,
          `/images/${imageAsLink.name}+${new Date().getTime()}.jpg`
        );
        uploadBytes(imageRef, imageAsLink).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            const res = await axiosPost(
              "admin/membership",
              localStorage.getItem("admin-token"),
              {
                levelName,
                numOfJobs,
                monthlyIncome,
                price,
                validityDay,
                minimumWithdraw,
                imageUrl: downloadURL,
              }
            );
            setLoading(false);
            if (res.status === 201) {
              setLevelName("");
              setPrice("");
              setNumOfJobs("");
              setMonthlyIncome("");
              setValidityDay("");
              setMinimumWithdraw("");
            } else {
              setLoading(false);
              if (!imageAsLink) {
                setError("Choose Image");
              } else {
                setError("Enter All Input Data");
              }
            }
          });
        });
      } else {
        setError("Choose Image");
      }

      //upload image end
    } else {
      if (!imageAsLink) {
        setError("Choose Image");
      } else {
        setError("Enter All Input Data");
      }
    }
  };

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={10} sm={10} md={6}>
          <FormControl fullWidth>
            <br />
            <br />
            <TextField
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              label="Level Name"
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
              value={numOfJobs}
              onChange={(e) => setNumOfJobs(parseInt(e.target.value))}
              label="Number Of Jobs"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />
            <br />
            <TextField
              value={validityDay}
              onChange={(e) => setValidityDay(parseInt(e.target.value))}
              label="Validity Day"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />
            <br />
            <TextField
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
              label="Monthly Income"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />
            <br />{" "}
            <TextField
              value={minimumWithdraw}
              onChange={(e) => setMinimumWithdraw(parseFloat(e.target.value))}
              label="Minimum Withdraw"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />
            <br />
            <input
              type="file"
              accept="image/*"
              multiple="false"
              onChange={(e) => setImageAsLink(e.target.files[0])}
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

export default AddMembership;
