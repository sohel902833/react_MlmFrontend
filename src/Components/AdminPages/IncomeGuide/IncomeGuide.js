import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosDelete, axiosGet, axiosPost } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
import "./income.css";
function IncomeGuide() {
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [incomeGuideList, setIncomeGuideList] = React.useState([]);
  const [imageAsLink, setImageAsLink] = React.useState([]);

  const storage = getStorage();

  React.useEffect(() => {
    getIncomeGuids();
  }, []);

  const deleteGuide = async (id) => {
    if (window.confirm("Are you Want To Sure Delete This Image Url")) {
      setLoading(true);
      const res = await axiosDelete(
        `admin/income-guide/${id}`,
        localStorage.getItem("admin-token")
      );
      setLoading(false);
      if (res.status === 201) {
        const fUrl = incomeGuideList.filter((inc) => inc.id !== id);
        setIncomeGuideList(fUrl);
      }
    }
  };

  const setIncomeGuide = async () => {
    if (imageAsLink) {
      setLoading(true);
      const imageRef = ref(
        storage,
        `/images/${imageAsLink.name}+${new Date().getTime()}.jpg`
      );
      uploadBytes(imageRef, imageAsLink).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          //upload done
          const res = await axiosPost(
            `admin/income-guide`,
            localStorage.getItem("admin-token"),
            { imageUrl: downloadURL }
          );
          if (res.status === 201) {
            setLoading(false);
            getIncomeGuids();
          }
        });
      });
    } else {
      setError("Choose Image");
    }
  };

  const getIncomeGuids = async () => {
    setPageLoading(true);

    const res = await axiosGet(
      `admin/income-guide`,
      localStorage.getItem("admin-token")
    );
    setPageLoading(false);
    if (res.status === 201) {
      setIncomeGuideList(res.data.incomeGuide);
    }
  };

  if (pageLoading) {
    return <Loader loading={pageLoading} />;
  }

  return (
    <AdminLayout>
      <div className="income_container">
        <div className="add_income_guid">
          <input
            type="file"
            accept="image/*"
            multiple="false"
            onChange={(e) => setImageAsLink(e.target.files[0])}
          />
          {/* <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            placeholder="Enter Image Url"
          /> */}
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            <button onClick={setIncomeGuide}>Save</button>
          )}
        </div>
        <hr />
        <div className="income_guide_lists">
          {incomeGuideList.map((guide) => (
            <div className="guide_item">
              <img src={guide.imageUrl} alt="" />
              <div className="action">
                <button onClick={() => deleteGuide(guide?.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default IncomeGuide;
