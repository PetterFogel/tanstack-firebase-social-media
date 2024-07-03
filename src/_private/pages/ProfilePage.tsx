import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();

  return (
    <section>
      <div>ProfilePage</div>
      <h2>ID: {id}</h2>
    </section>
  );
};

export default ProfilePage;
