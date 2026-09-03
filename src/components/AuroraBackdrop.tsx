export function AuroraBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="orb-a absolute -left-40 top-[-10%] h-[560px] w-[560px] rounded-full bg-cyan/25 blur-[120px]" />
        <div className="orb-b absolute right-[-12%] top-[30%] h-[520px] w-[520px] rounded-full bg-violet/30 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[420px] w-[420px] rounded-full bg-cyan/15 blur-[120px]" />
      </div>
      <div
        aria-hidden="true"
        className="glass pointer-events-none absolute -left-24 top-1/4 hidden h-[120%] w-[320px] -skew-x-12 rounded-[2rem] lg:block"
      />
    </>
  );
}
