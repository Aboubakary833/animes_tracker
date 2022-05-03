export default function AnimatedCard() {
  return (
    <div className="rounded-xl card shadow animate-pulse bg-slate-600 animated_card">
      <div className="w-full h-full pb-2 flex justify-center items-end rounded-xl">
        <div className="space-y-3 w-11/12">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}
