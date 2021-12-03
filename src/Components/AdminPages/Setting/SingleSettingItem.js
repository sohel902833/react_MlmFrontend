import {
  Button,
  Card,
  CardHeader,
  IconButton,
  TextField,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { axiosPut } from "../../ApiCall/axiosApi";
const Singlesettingitem = ({ option, getSetting }) => {
  // console.log({ propOption });
  // const [option, setOption] = useState(propOption);
  // console.log(option.property);
  const [value, setValue] = useState(option?.value);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitSetting = async () => {
    setLoading(true);
    const res = await axiosPut(
      `admin/setting`,
      localStorage.getItem("admin-token"),
      {
        [option.property]: value,
      }
    );
    setLoading(false);
    if (res.status === 201) {
      await getSetting();
      // setOption({
      //   ...option,
      //   [option?.property]: value,
      // });
    }
  };

  return (
    <Card elevation={1}>
      <CardHeader
        //   avatar={<Person aria-label="recipe">R</Person>}
        action={
          <IconButton onClick={() => setShow(!show)} aria-label="settings">
            <EditOutlined />
          </IconButton>
        }
        title={option?.title}
        subheader={option?.value}
      />
      {show && (
        <div style={{ marginLeft: "25px" }}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={option.title}
            variant="outlined"
            color="secondary"
            required
            type={option.inputType}
          />
          <br />
          <br />
          <p style={{ color: "red" }}>{error}</p>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            <Button
              onClick={() => submitSetting()}
              style={{ marginBottom: "10px" }}
              color="secondary"
              variant="outlined"
              type="submit"
              endIcon={<EditOutlined />}
            >
              Update
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default Singlesettingitem;
