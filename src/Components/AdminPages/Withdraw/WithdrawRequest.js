import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosGet, axiosPut } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
import "./withdraw.css";
function Withdrawrequest() {
  const [state, setState] = React.useState("pending");
  const [loading, setLoading] = React.useState(false);
  const [acceptLoading, setAcceptLoading] = React.useState(false);
  const [dataList, setDataList] = React.useState([]);

  React.useEffect(() => {
    getPurchaseRequest(state);
  }, []);

  const changeState = (state) => {
    setState(state);
    getPurchaseRequest(state);
  };
  const getPurchaseRequest = async (st) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/withdraw/${st}`,
      localStorage.getItem("admin-token")
    );

    setLoading(false);
    if (res.status === 201) {
      setDataList(res.data.withdraw);
    } else {
      console.log("Errr");
    }
  };
  const acceptRequest = async (id) => {
    if (window.confirm("Accept Request")) {
      setAcceptLoading(true);
      const res = await axiosPut(
        `admin/withdraw-accept/${id}`,
        localStorage.getItem("admin-token"),
        {}
      );
      setAcceptLoading(false);
      if (res.status === 201) {
        const fData = dataList.filter((d) => d.id !== id);
        setDataList(fData);
      } else {
        alert(res?.data?.message);
      }
    }
  };
  const successRequest = async (id) => {
    if (window.confirm("Success Request")) {
      setAcceptLoading(true);
      const res = await axiosPut(
        `admin/withdraw-success/${id}`,
        localStorage.getItem("admin-token"),
        {}
      );
      setAcceptLoading(false);
      if (res.status === 201) {
        const fData = dataList.filter((d) => d.id !== id);
        setDataList(fData);
      } else {
        alert(res?.data?.message);
      }
    }
  };
  const rejectRequest = async (id) => {
    if (window.confirm("Reject Request")) {
      setAcceptLoading(true);
      const res = await axiosPut(
        `admin/withdraw-reject/${id}`,
        localStorage.getItem("admin-token"),
        {}
      );
      setAcceptLoading(false);
      if (res.status === 201) {
        const fData = dataList.filter((d) => d.id !== id);
        setDataList(fData);
      } else {
      }
    }
  };

  if (loading) return <Loader loading={loading} />;

  return (
    <AdminLayout>
      <div className="purchase_type">
        <button onClick={() => changeState("pending")}>Pending</button>
        <button onClick={() => changeState("accept")}>Accepted</button>
        <button onClick={() => changeState("success")}>Success</button>
        <button onClick={() => changeState("reject")}>Rejected</button>
      </div>
      <div className="table-responsive table-bordered ">
        <table className="table  table-striped table-bordered">
          <thead
            className="text-center"
            style={{ backgroundColor: `green`, color: `#fff` }}
          >
            <th>Sl</th>
            <th>UserId</th>
            <th>User Name</th>
            <th>User Phone</th>
            <th>Withdraw Address</th>
            <th>Amount</th>
            <th>Time</th>
            {state === "accept" ? (
              <th colspan="3">action</th>
            ) : state === "pending" ? (
              <th colspan="3">action</th>
            ) : null}
          </thead>
          <tbody className="text-left">
            {dataList.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data?.userId}</td>
                <td>{data?.name}</td>
                <td>{data?.phone}</td>
                <td>{data?.withdrawAddress}</td>
                <td>{data?.amount}</td>
                <td>
                  {new Date(data.time).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                {acceptLoading ? (
                  <BeatLoader loading={acceptLoading} />
                ) : (
                  <>
                    {state === "pending" ? (
                      <>
                        <td style={{ padding: `0px` }}>
                          <button
                            onClick={() => acceptRequest(data?.id)}
                            disabled={acceptLoading}
                            className="accept"
                          >
                            Accept
                          </button>
                        </td>
                        <td style={{ padding: `0px` }}>
                          <button
                            onClick={() => rejectRequest(data?.id)}
                            disabled={acceptLoading}
                            className="reject"
                          >
                            Reject
                          </button>
                        </td>
                      </>
                    ) : state === "accept" ? (
                      <>
                        <td style={{ padding: `0px` }}>
                          <button
                            onClick={() => successRequest(data?.id)}
                            disabled={acceptLoading}
                            className="accept"
                          >
                            Success
                          </button>
                        </td>
                        <td style={{ padding: `0px` }}>
                          <button
                            onClick={() => rejectRequest(data?.id)}
                            disabled={acceptLoading}
                            className="reject"
                          >
                            Reject
                          </button>
                        </td>
                      </>
                    ) : null}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
export default Withdrawrequest;
