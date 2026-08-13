// this is for test the confirm modal.
import ConfirmModal from "../components/modals/ConfirmModal";
export default function Home() {
  return (
    <ConfirmModal
      isOpen={true}
      type="unfollow"
      onConfirm={() => console.log("confirmed")}
    />
  );
}
