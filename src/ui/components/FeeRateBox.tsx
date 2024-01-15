interface FeeRateBox {
  title: string;
  feeRateSatVb: number;
}

export default function FeeRateBox({ title, feeRateSatVb }: FeeRateBox) {
  return (
    <div className="flex-1 text-center bg-slate-200 rounded border border-slate-300 drop-shadow p-6 mx-3">
      <h4 className="font-bold">{title}</h4>
      <div>{feeRateSatVb} sat/vB</div>
    </div>
  );
}
