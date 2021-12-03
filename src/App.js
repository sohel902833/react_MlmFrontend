import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Cashoutrequest from "./Components/AdminPages/CashoutRequest/CashoutRequest";
import IncomeGuide from "./Components/AdminPages/IncomeGuide/IncomeGuide";
import Membership from "./Components/AdminPages/Membership/Membership";
import Message from "./Components/AdminPages/Messages/Message";
import MlmUser from "./Components/AdminPages/MlmUsers/MlmUser";
import Notification from "./Components/AdminPages/Notifications/Notification";
import PurchaseRequest from "./Components/AdminPages/PurchaseRequest/PurchaseRequest";
import ResetPassword from "./Components/AdminPages/ResetPassword/ResetPassword";
import Settings from "./Components/AdminPages/Setting/Settings";
import SigleUser from "./Components/AdminPages/SingleUser/SigleUser";
import Tasks from "./Components/AdminPages/Tasks/Tasks";
import Upgraderequest from "./Components/AdminPages/UpgradeRequest/UpgradeRequest";
import Usersbypackage from "./Components/AdminPages/UserByPackage/UsersByPackage";
import VideoTutorial from "./Components/AdminPages/VideoTutorial/VideoTutorial";
import Withdrawrequest from "./Components/AdminPages/Withdraw/WithdrawRequest";
import AdminPrivateRoute from "./Components/Routes/AdminPrivateRoute";
import AdminPublicRoute from "./Components/Routes/AdminPublicRoute";
import UserPrivateRoute from "./Components/Routes/UserPrivateRoute";
import UserPublicRoute from "./Components/Routes/UserPublicRoute copy";
import DailyReport from "./Components/UserComponents/DailyReport/DailyReport";
import ForgetPassword from "./Components/UserComponents/ForgetPassword/ForgetPassword";
import IncomeBreakdown from "./Components/UserComponents/IncomeBreakdown/IncomeBreakdown";
import UserIncomeGuide from "./Components/UserComponents/IncomeGuide/IncomeGuide";
import InviteFriends from "./Components/UserComponents/InviteFriends/InviteFriends";
import UserMessage from "./Components/UserComponents/Messages/Message";
import UserNotification from "./Components/UserComponents/Notification/UserNotification";
import PersonalInformation from "./Components/UserComponents/PersonalInformation/PersonalInformation";
import PurchaseCommunity from "./Components/UserComponents/PurchaseCommunity/PurchaseCommunity";
import UserPurchasePackage from "./Components/UserComponents/PurchasePackage/PurchasePackage";
import TeamReport from "./Components/UserComponents/TeamReport/TeamReport";
import UserSetting from "./Components/UserComponents/UserSetting/UserSetting";
import UserVideoTutorial from "./Components/UserComponents/VideoTutorial/VideoTutorial";
import UserWithdraw from "./Components/UserComponents/Withdraw/UserWithdraw";
import WithdrawReport from "./Components/UserComponents/WithdrawReport/WithdrawReport";
import { AdminAuthProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import "./firebase";
import Adminhome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import Homepage from "./pages/HomePage";
import Userlogin from "./pages/UserLogin";
import Userregister from "./pages/UserRegister";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
  },
  typography: {
    fontFamily: "Roboto+Condensed",
  },
});
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AdminAuthProvider>
            <Switch>
              <UserPublicRoute exact path="/login" component={Userlogin} />
              <UserPublicRoute
                exact
                path="/register"
                component={Userregister}
              />
              <UserPublicRoute
                exact
                path="/forget-password"
                component={ForgetPassword}
              />
              <UserPrivateRoute exact path="/" component={Homepage} />
              <UserPrivateRoute
                exact
                path="/withdraw"
                component={UserWithdraw}
              />
              <UserPrivateRoute
                exact
                path="/invite-friends"
                component={InviteFriends}
              />
              <UserPrivateRoute
                exact
                path="/me"
                component={PersonalInformation}
              />
              <UserPrivateRoute
                exact
                path="/income-breakdown"
                component={IncomeBreakdown}
              />{" "}
              <UserPrivateRoute exact path="/message" component={UserMessage} />
              <UserPrivateRoute
                exact
                path="/team-report"
                component={TeamReport}
              />
              <UserPrivateRoute
                exact
                path="/purchase-community"
                component={PurchaseCommunity}
              />
              <UserPrivateRoute
                exact
                path="/withdraw-report"
                component={WithdrawReport}
              />
              <UserPrivateRoute
                exact
                path="/daily-report"
                component={DailyReport}
              />
              <UserPrivateRoute
                exact
                path="/income-guide"
                component={UserIncomeGuide}
              />
              <UserNotification
                exact
                path="/notification"
                component={UserIncomeGuide}
              />
              <UserPrivateRoute
                exact
                path="/user-setting"
                component={UserSetting}
              />
              <UserPrivateRoute
                exact
                path="/purchase-package"
                component={UserPurchasePackage}
              />
              <UserPrivateRoute
                exact
                path="/video-tutorial"
                component={UserVideoTutorial}
              />
              {/*Admi Routes */}
              <AdminPublicRoute
                exact
                path="/admin-login"
                component={AdminLogin}
              />
              <AdminPrivateRoute exact path="/admin" component={Adminhome} />
              <AdminPrivateRoute exact path="/admin/mlm" component={MlmUser} />
              <AdminPrivateRoute
                exact
                path="/admin/setting"
                component={Settings}
              />
              <AdminPrivateRoute
                exact
                path="/admin/cashout-request"
                component={Cashoutrequest}
              />
              <AdminPrivateRoute exact path="/admin/tasks" component={Tasks} />
              <AdminPrivateRoute
                exact
                path="/admin/income-guide"
                component={IncomeGuide}
              />
              <AdminPrivateRoute
                exact
                path="/admin/membership"
                component={Membership}
              />
              <AdminPrivateRoute
                exact
                path="/admin/upgrad-request"
                component={Upgraderequest}
              />
              <AdminPrivateRoute
                exact
                path="/admin/video-tutorial"
                component={VideoTutorial}
              />{" "}
              <AdminPrivateRoute
                exact
                path="/admin/purchase-request"
                component={PurchaseRequest}
              />{" "}
              <AdminPrivateRoute
                exact
                path="/admin/withdraw"
                component={Withdrawrequest}
              />{" "}
              <AdminPrivateRoute
                exact
                path="/admin/message"
                component={Message}
              />
              <AdminPrivateRoute
                exact
                path="/admin/message/:userId"
                component={Message}
              />
              <AdminPrivateRoute
                exact
                path="/admin/notification/"
                component={Notification}
              />
              <AdminPrivateRoute
                exact
                path="/admin/reset-password"
                component={ResetPassword}
              />
              <AdminPrivateRoute
                exact
                path="/admin/user/:userId"
                component={SigleUser}
              />{" "}
              <AdminPrivateRoute
                exact
                path="/admin/package-user"
                component={Usersbypackage}
              />
            </Switch>
          </AdminAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
export default App;
