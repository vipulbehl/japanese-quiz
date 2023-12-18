import { useAuth0 } from "@auth0/auth0-react";
import Pages from "../Pages/Pages";
import "../styling/Profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <article className="profile-container">
          <h2 className="user-name">こんにちは {user?.nickname} さん</h2>
        </article>
      )}
      <Pages />
    </div>
  );
};

export default Profile;
