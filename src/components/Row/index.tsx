import { RowProps } from "../../utils/enum";

export const Row = ({ title, date, facility_name, event_type, age_range, first = false, last = false}: RowProps) => {
  const columns: number = (+!!title) + (+!!date * 2) + (+!!facility_name) + (+!!event_type) + (+!!age_range);
  const classes = `grid grid-cols-${columns} bg-light-blue px-8 py-6 ${first ? 'rounded-t-2xl' : ''} ${last ? 'rounded-b-2xl' : ''} border-b-2 border-white text-xs`;

  return (
    <div className={classes}>
      <p className="col-span-1 text-left font-bold">{title}</p>
      {event_type && <p className="col-span-1 text-center">{event_type}</p>}
      {age_range && <p className="col-span-1 text-center">{age_range}</p>}
      {facility_name && <p className="col-span-1 text-center italic">{facility_name}</p>}
      {date && <p className="col-span-2 text-center">{date}</p>}
    </div>
  );
};