function StatCard({ label, value, accent }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 flex flex-col gap-1">
      <p className="text-xs uppercase tracking-wide text-white/50">{label}</p>
      <p className={`text-3xl font-heading ${accent ? 'text-accent' : ''}`}>{value}</p>
    </div>
  )
}

export default StatCard