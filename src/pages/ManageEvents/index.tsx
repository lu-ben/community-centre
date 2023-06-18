import { useEffect, useState } from "react";
import { SelectButton } from "../../components/SelectButton";
import { API_BASE_URL, DATE_FORMATTER, EVENT_PROP_VALUES } from "../../utils/enum";
import { Card } from "../../components/Card";
import { useUser } from "../../hooks/useUser";
import axios from "axios";

export const ManageEvents = () => {
  const userHook = useUser();
  const [eventData, setEventData] = useState([]);

  // Event Stats States
  const [selectedEventType, setSelectedEventType] = useState(EVENT_PROP_VALUES.DROP_IN);
  const [selectedAge, setSelectedAge] = useState(EVENT_PROP_VALUES.CHILD);
  const [averageCount, setAverageCount] = useState<number>();
  const [minCount, setMinCount] = useState<number>();
  const [maxCount, setMaxCount] = useState<number>();

  // Client Stats States
  const [childSignUpCount, setChildSignUpCount] = useState<number>();
  const [youthSignUpCount, setYouthSignUpCount] = useState<number>();
  const [adultSignUpCount, setAdultSignUpCount] = useState<number>();
  const [accountsWithAllSignedUp, setAccountsWithAllSignedUp] = useState([]);

  const handleClick = (value: string, field?: string) => {
    if (field === 'type') {
      setSelectedEventType(value);
    } else {
      setSelectedAge(value);
    }
  };

  const handleFetchStats = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/event/stats',
        params: {
          age: selectedAge,
          type: selectedEventType
        },
        headers: { 'Content-Type': null, cache: false }
      });
      if (res.status === 200) {
        setAverageCount(res.data.eventStats.average);
        setMaxCount(res.data.eventStats.max);
        setMinCount(res.data.eventStats.min);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchClientStats = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/event/clientStats',
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        res.data.avgSignUpPerAgeGroup.forEach((item: { age_range: string, count: number}) => {
          switch (item.age_range) {
          case EVENT_PROP_VALUES.CHILD:
            setChildSignUpCount(item.count);
            break;
          case EVENT_PROP_VALUES.YOUTH:
            setYouthSignUpCount(item.count);
            break;
          case EVENT_PROP_VALUES.ADULT:
            setAdultSignUpCount(item.count);
            break;
          default:
            break;
          }
        });
        setAccountsWithAllSignedUp(res.data.accountWithAllSignedUp);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchEvents = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/event/allUpcoming',
        headers: { 'Content-Type': null, cache: false }
      });
      if (res.status === 200) {
        setEventData(res.data.events);
      }
    } catch(err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/event/delete',
        params: { eventId: id },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        if (res.data.event.event_id !== undefined) {
          handleFetchEvents();
          handleFetchClientStats();
          handleFetchStats();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchStats();
  }, [selectedEventType, selectedAge]);

  useEffect(() => {
    handleFetchClientStats();
    handleFetchEvents();
  }, []);

  return (
    <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12">
      <div className="grid grid-cols-6 gap-10 min-h-screen">
        <div className="col-span-2">
          <h2 className="text-left text-4xl font-bold mb-4">Event Statistics</h2>
          <div className="mb-4 flex gap-4">
            <SelectButton color="bg-dark-blue" selected={selectedEventType === EVENT_PROP_VALUES.DROP_IN} name={"Drop-in"} onClick={()=>handleClick(EVENT_PROP_VALUES.DROP_IN, 'type')} />
            <SelectButton color="bg-dark-blue" selected={selectedEventType === EVENT_PROP_VALUES.PROGRAM} name={"Program"} onClick={()=>handleClick(EVENT_PROP_VALUES.PROGRAM, 'type')} />
          </div>
          <div className="mb-4 flex gap-4">
            <SelectButton color="bg-dark-blue" selected={selectedAge === EVENT_PROP_VALUES.CHILD} name={"Child"} onClick={()=>handleClick(EVENT_PROP_VALUES.CHILD)}/>
            <SelectButton color="bg-dark-blue" selected={selectedAge === EVENT_PROP_VALUES.YOUTH} name={"Youth"} onClick={()=>handleClick(EVENT_PROP_VALUES.YOUTH)}/>
            <SelectButton color="bg-dark-blue" selected={selectedAge === EVENT_PROP_VALUES.ADULT} name={"Adult"} onClick={()=>handleClick(EVENT_PROP_VALUES.ADULT)}/>
          </div>
          <div className="bg-light-blue py-4 px-6 rounded-2xl mb-8">
            <div className="text-left flex"><p className="grow"><strong>Average</strong> Sign-up Count</p> {averageCount || 0}</div>
            <div className="text-left flex"><p className="grow"><strong>Minimum</strong> Sign-up Count</p> {minCount || 0}</div>
            <div className="text-left flex"><p className="grow"><strong>Maximum</strong> Sign-up Count</p> {maxCount || 0}</div>
          </div>
          <h2 className="text-left text-4xl font-bold mb-4">Client Statistics</h2>
          <div className="bg-light-blue py-4 px-4 rounded-2xl mb-4">
            <h3 className="mb-2 underline">Average Sign-up Per Account</h3>
            <div className="text-left px-2 flex"><p className="font-bold grow">Child Accounts</p> {childSignUpCount || 0}</div>
            <div className="text-left px-2 flex"><p className="font-bold grow">Youth Accounts</p> {youthSignUpCount || 0}</div>
            <div className="text-left px-2 flex"><p className="font-bold grow">Adult Accounts</p> {adultSignUpCount || 0}</div>
          </div>
          <div className="bg-light-blue py-4 px-4 rounded-2xl mb-4">
            <h3 className="mb-2 underline">Clients Registered for All Events</h3>
            {accountsWithAllSignedUp.map((item: { first_name: string, last_name: string, client_id: number}, index: number) => (
              <div className="grid grid-cols-4" key={index}>
                <div className="col-span-1 pl-2 text-left"><strong>ID:</strong> {item.client_id} </div>
                <div className="col-span-3 pl-2 text-left"><strong>Name:</strong> {item.first_name} {item.last_name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4">
          {eventData.map((item: any, index: number) =>
            <Card
              title={item.title}
              date={DATE_FORMATTER(item.date)}
              subtitle={item.subtitle}
              content={item.content}
              disabled={item.is_full}
              typeIndex={0}
              onClick={() => ''}
              deleteOnClick={handleDelete}
              hasEmployeeButtons
              customButtonText={item.is_full ? 'Full' : `${item.sign_up_count}/${item.capacity}`}
              accountType={userHook.hookUserCookie.user.accountType}
              id={item.id}
              key={index}
              age={item.age_range}
              type={item.event_type}
              buttonMinWidth="min-w-button"
            />)}
        </div>
      </div>
    </div>
  );
};
