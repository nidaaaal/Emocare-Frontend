export default function InfoCard({ label, value }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}