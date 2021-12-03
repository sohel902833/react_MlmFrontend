import { Button, FormControl, TextField } from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosPut } from "../../ApiCall/axiosApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "red",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const EditMembership = ({
  membership: pMembership,
  setOpen,
  getMembershipList,
}) => {
  const [membership, setMembership] = React.useState(pMembership);
  const [levelName, setLevelName] = React.useState(membership?.levelName);
  const [numOfJobs, setNumOfJobs] = React.useState(membership?.numOfJobs);
  const [imageUrl, setImageUrl] = React.useState(membership?.imageUrl);
  const [imageAsLink, setImageAsLink] = React.useState([]);

  const [monthlyIncome, setMonthlyIncome] = React.useState(
    membership?.monthlyIncome
  );
  const [minimumWithdraw, setMinimumWithdraw] = React.useState(
    membership?.minimumWithdraw
  );
  const [price, setPrice] = React.useState(membership?.price);
  const [validityDay, setValidityDay] = React.useState(membership?.validityDay);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const storage = getStorage();

  const updateMembership = async () => {
    if (levelName && numOfJobs && monthlyIncome && validityDay) {
      if (imageAsLink) {
        setLoading(true);
        const imageRef = ref(
          storage,
          `/images/${imageAsLink.name}+${new Date().getTime()}.jpg`
        );

        uploadBytes(imageRef, imageAsLink).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (downloadURL) => {
            const mem = {
              levelName,
              numOfJobs,
              monthlyIncome,
              price: price ? price : 0,
              validityDay,
              minimumWithdraw,
              imageUrl: downloadURL,
            };

            setLoading(true);
            uploadMembershpToMy(mem);
          });
        });
      } else {
        const mem = {
          levelName,
          numOfJobs,
          monthlyIncome,
          price,
          validityDay,
          minimumWithdraw,
          imageUrl,
        };

        setLoading(true);
        uploadMembershpToMy(mem);
      }
    }
  };
  const uploadMembershpToMy = async (mem) => {
    const res = await axiosPut(
      `admin/membership/${membership?.levelId}`,
      localStorage.getItem("admin-token"),
      mem
    );
    setLoading(false);
    if (res.status === 201) {
      setOpen(false);
      await getMembershipList();
    } else {
      setLoading(false);
      setError("Enter All Input Data");
    }
  };

  return (
    <div>
      <FormControl fullWidth>
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
        <br />
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
        <p style={{ color: "red" }}>{error}</p>
        <br />
        <br />
        {loading ? (
          <BeatLoader loading={loading} />
        ) : (
          <Button
            disabled={loading}
            onClick={() => updateMembership()}
            style={{ marginBottom: "10px" }}
            color="secondary"
            variant="outlined"
            type="submit"
            endIcon={<EditOutlined />}
          >
            Update
          </Button>
        )}
      </FormControl>
    </div>
  );
};

export default EditMembership;
