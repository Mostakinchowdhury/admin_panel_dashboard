import { ChartAreaIcons } from './ChartAreaIcons';

type prop = {
  className?: string;
};
const Flowchart = ({ className }: prop) => {
  return (
    <div className={`${className ? className : ''} bg-white p-4 space-y-3`}>
      <div className="flex items-center gap-4 justify-between">
        <h2 className="txtstlh1">
          <span className="text-[rgba(206,145,120,0.5)]">Expense</span> vs{' '}
          <span className="text-green-300">Profite</span>
        </h2>
        <h3 className="txtstlh4">Last 6 months</h3>
      </div>
      {/* flowchart */}
      <div className="p-4">
        <ChartAreaIcons />
      </div>
    </div>
  );
};

export default Flowchart;
