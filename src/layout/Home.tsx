// export default function Home() {
//   return <div>Home</div>;
// }
//it is for see what we did in userrow
import UserRow from "../components/UserInfo/UserRow";

const mockUsers = [
  {
    avatarSrc: "",
    username: "@mohammadfallah.w",
    followers: 1,
  },
  {
    avatarSrc: "",
    username: "@mohammadfallah.w",
    followers: 1,
  },
  {
    avatarSrc: "",
    name: "Farshad Hosseini",
    username: "@f.e.h.farshad",
    followers: 1,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-sm flex flex-col divide-y divide-border rounded-lg border border-border p-4">
        {mockUsers.map((user, index) => (
          <div key={index} className={index !== 0 ? "pt-4" : "pb-4"}>
            <UserRow
              avatarSrc={user.avatarSrc}
              name={user.name}
              username={user.username}
              followers={user.followers}
              onFollow={() => console.log(`followed ${user.username}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
