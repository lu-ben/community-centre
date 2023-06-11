import { RowProps } from "../../utils/enum";

export const Row = ({ title, date, location, type, first = false, last = false}: RowProps) => {
  const classes = `grid grid-cols-4 bg-light-blue px-8 py-6 ${first ? 'rounded-t-2xl' : ''} ${last ? 'rounded-b-2xl' : ''} border-b-2 border-white`;
  return (
    <div className={classes}>
      <p className="col-span-1 text-left font-bold">{title}</p>
      <p className="col-span-1 text-left">{date}</p>
      <p className="col-span-1 text-left italic">{location}</p>
      <p className="col-span-1 text-left">{type}</p>
    </div>
  );
};