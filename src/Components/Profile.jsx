import { useAuth0 } from "@auth0/auth0-react";
import Pages from "../Pages/Pages";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <article>
          <h2>こんにちは {user?.nickname}</h2>
        </article>
      )}
      <Pages />
    </div>
  );
};

export default Profile;
