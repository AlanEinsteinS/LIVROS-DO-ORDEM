export default function BackgroundBeams() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-red-500/25 blur-3xl animate-pulseSoft" />
      <div className="absolute left-[18%] top-[8%] h-72 w-72 rounded-full bg-red-500/15 blur-3xl animate-float" />
      <div className="absolute right-[10%] top-[16%] h-80 w-80 rounded-full bg-red-700/20 blur-3xl animate-float" />
      <div className="absolute -left-24 bottom-[10%] h-72 w-72 rounded-full bg-red-900/20 blur-3xl" />
      <div className="absolute -right-24 bottom-[6%] h-72 w-72 rounded-full bg-zinc-100/5 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(248,113,113,.12),transparent_45%)]" />
    </div>
  )
}
