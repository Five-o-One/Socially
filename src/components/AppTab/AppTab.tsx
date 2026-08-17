export default function AppTab() {
  return (
    <div className="flex relative flex-wrap rounded-2xl bg-border p-1 shadow-sm text-sm font-bold gap-1">
      <label className="flex-1 flex items-center justify-center cursor-pointer">
        <input
          type="radio"
          name="radio"
          defaultChecked
          className="peer hidden"
        />
        <span className="w-full flex items-center justify-center rounded-lg py-2 text-text-secondary transition-all ease-in-out peer-checked:bg-card peer-checked:text-text peer-checked:shadow-sm">
          Posts
        </span>
      </label>

      <label className="flex-1 flex items-center justify-center cursor-pointer">
        <input type="radio" name="radio" className="peer hidden" />
        <span className="w-full flex items-center justify-center rounded-lg py-2 text-text-secondary transition-all ease-in-out peer-checked:bg-card peer-checked:text-text peer-checked:shadow-sm">
          Likes
        </span>
      </label>
    </div>
  );
}