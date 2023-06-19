import { RowProps } from "../../utils/enum";

export const Row = (
  { 
    title,
    date,
    facility_name,
    event_type,
    age_range,
    first = false,
    last = false, 
    first_name,
    last_name,
    username,
    role,
    age,
    account_type,
    numColumns,
    textSize = 'text-xs',
    button = false,
    buttonOnChange,
    tall = true,
  }: RowProps) => {
  const paddingX = button ? 'pl-8' : 'px-8';
  const paddingY = tall ? 'py-6' : 'py-4';
  const columns: number = numColumns ? numColumns : (+!!title) + (+!!date * 2) + (+!!facility_name) + (+!!event_type) + (+!!age_range);
  const classes = `grid grid-cols-${columns} bg-light-blue ${paddingX} ${paddingY} ${first ? 'rounded-t-xl' : ''} ${last ? 'rounded-b-xl' : ''} border-b-2 border-white ${textSize} grow`;

  return (
    <div className={classes}>
      <p className="col-span-1 text-left font-bold">{title}</p>
      {event_type && <p className="col-span-1 text-center">{event_type}</p>}
      {age_range && <p className="col-span-1 text-center">{age_range}</p>}
      {facility_name && <p className="col-span-1 text-center italic">{facility_name}</p>}
      {date && <p className="col-span-2 text-center">{date}</p>}
      {username && <p className="col-span-1 text-left">{username}</p>}
      {first_name && <p className="col-span-1 text-left">{first_name}</p>}
      {last_name && <p className="col-span-1 text-left">{last_name}</p>}
      {account_type && <p className="col-span-1 text-left">{account_type}</p>}
      {role && <p className="col-span-1 text-left">{role}</p>}
      {age && <p className="col-span-1 text-left">{age}</p>}
      {button && <button className="col-span-1 bg-medium-blue text-white py-0 mx-4 rounded-xl" onClick={buttonOnChange}>Edit</button>}
    </div>
  );
};