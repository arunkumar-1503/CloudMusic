import ProfileCardWrapper from "../animations/ProfileCardWrapper";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import "./layouts.css";

const ProfileLayout = ({ children }) => {
  return (
    <ProfileCardWrapper>
      <div className="profile-layout">
        <Navbar />
        <div className="layout-container">
          <Sidebar />
          <main className="layout-main">
            <div className="profile-content-wrapper fade-in">{children}</div>
          </main>
        </div>
      </div>
    </ProfileCardWrapper>
  );
};

export default ProfileLayout;
