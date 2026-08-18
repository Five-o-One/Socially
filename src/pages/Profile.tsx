import { useParams } from "react-router";

export default function Profile() {
  const params = useParams();
  console.log("params", params);
  return <h1 className="text-3xl font-bold underline">Profile</h1>;
}
