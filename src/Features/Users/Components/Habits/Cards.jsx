export const SummaryCard = ({ title, value, icon, iconColor }) => (
  <div className="bg-green-400 p-6 rounded-2xl flex items-center justify-between shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="flex flex-col">
      <span className="text-black text-sm font-medium tracking-wide">{title}</span>
      <span className="text-4xl font-extrabold mt-1 text-white">{value}</span>
    </div>
    <div className={`text-5xl ${iconColor}`}>{icon}</div>
  </div>
);