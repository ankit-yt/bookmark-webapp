export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-6">🔖</div>
      <h2 className="text-xl text-gray-500 font-semibold mb-2">
        No bookmarks yet
      </h2>
      <p className="text-neutral-500">
        Start adding your favorite links and organize them privately.
      </p>
    </div>
  )
}
