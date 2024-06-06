import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/firebase/firebase.utils";
import { use } from "react";

const HomePage = () => {
  const { currentUser } = use(AuthContext);
  return (
    <section>
      <div>HomePage</div>
      <h2>Welcome, {currentUser?.email}</h2>
      <Button onClick={signOutAccount}>Sign out</Button>
    </section>
  );
};

export default HomePage;
