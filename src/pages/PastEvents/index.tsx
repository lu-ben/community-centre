import { useEffect, useState } from "react";
import { ModalStyles, RowProps, ACCOUNT_TYPES, API_BASE_URL, DATE_FORMATTER } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import ReactModal from "react-modal";
import { Button } from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { Select } from "../../components/Select";
import { Row } from "../../components/Row";
import axios from "axios";
import { SelectButton } from "../../components/SelectButton";

export const PastEvents = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState<RowProps[]>();
  
  const [ageSelected, setAgeSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(true);
  const [locationSelected, setLocationSelected] = useState(false);
  const [typeSelected, setTypeSelected] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['pe.date', 'pe.event_type']);

  const handleFetch = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/event/past',
        params: { 
          accountType: userHook.hookUserCookie.user?.accountType, 
          typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId,
          displayColumns: selectedColumns,
        },
        headers: { 'Content-Type': null, cache: false }   
      });
      if (res.status === 200) {
        setHistoryData(res.data.events);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInsertOrRemove = (field: string) => {
    const index = selectedColumns.findIndex((item: string) => item === field);
    const newArray = [...selectedColumns];
    index >= 0 ? newArray.splice(index, 1) : newArray.push(field);
    setSelectedColumns(newArray);
  };

  const handleColumnSelect = (field: string) => {
    switch (field) {
    case 'date':
      setDateSelected(!dateSelected);
      break;
    case 'event_type':
      setTypeSelected(!typeSelected);
      break;
    case 'facility_name':
      setLocationSelected(!locationSelected);
      break;
    case 'age_range':
      setAgeSelected(!ageSelected);
      break;
    default:
      break;
    }
    handleInsertOrRemove(`pe.${field}`);
  };

  useEffect(() => {
    handleFetch();
  }, [selectedColumns]);

  return (
    <>
      <div className="min-h-screen min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12">
        <div className="mb-10 flex gap-2">
          <span className="py-2 mr-4">Select the fields to display:</span>
          <SelectButton name="Title" selected disabled onClick={() => ''}/>
          <SelectButton name="Event Type" selected={typeSelected} onClick={() => handleColumnSelect('event_type')}/>
          <SelectButton name="Age Range" selected={ageSelected} onClick={() => handleColumnSelect('age_range')}/>
          <SelectButton name="Location" selected={locationSelected} onClick={() => handleColumnSelect('facility_name')}/>
          <SelectButton name="Date" selected={dateSelected} onClick={() => handleColumnSelect('date')}/>
        </div>
        {loading ?
          <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
          historyData?.map((item: RowProps, index: number) =>
            <Row
              title={item?.title}
              date={item?.date ? DATE_FORMATTER(item.date || '') : undefined}
              facility_name={item?.facility_name || undefined}
              event_type={item.event_type?.toUpperCase() || undefined}
              age_range={item.age_range?.toUpperCase() || undefined}
              first={index === 0}
              last={index === (historyData.length - 1)}
              key={index}
            />)
        }
      </div>
    </>
  );
};
