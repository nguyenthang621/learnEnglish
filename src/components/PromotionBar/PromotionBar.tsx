export default function PromotionBar() {
  return (
    <div className="bg-green-700 text-white text-sm py-2 px-4 flex justify-between items-center position-fixed top-0 left-0 right-0 z-2 primary-bg ">

      <div className="flex items-center gap-2">
        <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
          NEW
        </div>
        <span>Zenlish Plus: New experience w/ AI learning. Check it out ›</span>
      </div>
      <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs font-semibold">
        LEARN MORE
      </button>
    </div>
  );
}
