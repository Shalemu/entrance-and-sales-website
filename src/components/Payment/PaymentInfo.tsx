// PaymentInfo.tsx

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export default function PaymentInfo({
  icon,
  label,
  value,
}: Props) {
  return (
    <div className="p-5 border-b border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>

      <p className="font-semibold text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}