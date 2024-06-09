import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/firebase/firebase.utils";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  return (
    <section>
      <div>HomePage</div>
      <h2>Welcome, {currentUser?.email}</h2>
      <Button onClick={signOutAccount}>Sign out</Button>
    </section>
  );
};

export default HomePage;
