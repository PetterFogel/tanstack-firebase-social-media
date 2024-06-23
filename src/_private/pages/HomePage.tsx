import { useAuthContext } from "@/context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuthContext();

  return (
    <section>
      <div>HomePage</div>
      <h2>Welcome, {currentUser?.email}</h2>
    </section>
  );
};

export default HomePage;
