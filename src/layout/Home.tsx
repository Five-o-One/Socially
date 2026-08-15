// export default function Home() {
//   return <div>Home</div>;
// }
//it is for see what we did in info card
import { AppCard } from "../components/AppCard";
import InfoCard from "../components/UserInfo/InfoCard";

export default function Home() {
  return (
    <AppCard>
      <InfoCard
        avatarSrc=""
        name="Seyed Ali Mousavi"
        username="samb.1376"
        following={30}
        followers={33}
        location="No location"
        website="No website"
      />
    </AppCard>
  );
}
