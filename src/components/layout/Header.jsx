export default function Header() {
  return (
    <header className="relative mx-auto mb-8 mt-6 w-full max-w-7xl px-4 md:px-8">
      <div className="spotlight-panel px-6 py-12 text-center md:px-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-900/70 to-transparent" />

        <h1 className="font-serif text-4xl font-black tracking-[0.2em] md:text-6xl">
          <span className="text-blood-title">ORDO</span>{' '}
          <span className="text-bone-title">REMIER</span>
        </h1>
        <p className="text-subtle-lead mx-auto mt-4 max-w-2xl text-sm md:text-base">
          Biblioteca de livros e homebrews para o sistema de Ordem Paranormal.
        </p>
      </div>
    </header>
  );
}
