import AppSpinner from "./AppSpinner";

export default function AppPageSpinner() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <AppSpinner />
      <h4>Loading Page....</h4>
      <p>Please Wait</p>
    </div>
  );
}
