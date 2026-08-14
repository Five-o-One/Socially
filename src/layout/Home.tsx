import UserInfoModal, { type User } from "../components/modals/UserInfoModal";
//test data
export default function Home() {
  const testUser = {
    name: "John Doe",
    bio: "I am a software engineer from Tehran.",
    location: "Tehran, Iran",
    website: "https://my-portfolio.com",
  };

  const handleSave = (updatedData: User) => {
    console.log("Data saved successfully:", updatedData);
  };

  const handleCancel = () => {
    console.log("Modal closed without saving.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/10">
      <UserInfoModal
        user={testUser}
        onCancel={handleCancel}
        onSubmit={handleSave}
      />
    </div>
  );
}
