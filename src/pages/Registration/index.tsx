import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import { CardProps, ACCOUNT_TYPES, API_BASE_URL, DATE_FORMATTER, FAIL_MESSAGE, REGISTRATION_SUCCESS_MESSAGE } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { ErrorText } from "../../components/ErrorText";
import { Toast } from "../../components/Toast";

export const Registration = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<CardProps[]>();

  const [selectedType, setSelectedType] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [employeeError, setEmployeeError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/event',
        params: {
          accountType: userHook.hookUserCookie.user?.accountType,
          typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId,
          selectedType,
          selectedAgeRange,
        },
        headers: { 'Content-Type': null, cache: false }
      });
      if (res.status === 200) {
        if (res.data.events) {
          setEventData(res.data.events);
          setNoResults(res.data.events.length <= 0);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (id: number | undefined, title: string, date: string) => {
    if (userHook.hookUserCookie.user?.accountType === ACCOUNT_TYPES.EMPLOYEE) {
      setEmployeeError(true);
      return;
    }
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/event/register',
        params: {
          eventId: id,
          typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId,
        },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        await handleFetch();
        setSuccessMessage(REGISTRATION_SUCCESS_MESSAGE(title, DATE_FORMATTER(date)));
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl grid grid-cols-6 gap-10 px-12 py-10 mb-12">
        {userHook.hookUserCookie.user.accountType ===  ACCOUNT_TYPES.CLIENT && (
          <div className="col-span-2" >
            <Select label="Select Type" options={['All', 'Drop-in', 'Program']} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSelectedType(e.target.value)}/>
            <Select label="Select Age Range" options={['All', 'Adult', 'Child', 'Youth']} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSelectedAgeRange(e.target.value)}/>
            <div className="my-6 flex">
              <Button name="Apply Filters" rounded="rounded-3xl" onClick={()=> handleFetch()}/>
            </div>
          </div>)}
        <div className={`${userHook.hookUserCookie.user.accountType === ACCOUNT_TYPES.CLIENT ? 'col-span-4' : 'col-span-6'} min-h-screen`}>
          {employeeError && <ErrorText message={"Employees cannot register for events. Please log in as a Client if you wish to do so."} />}
          {noResults && <ErrorText color='dark-blue' message={"No records found."} />}
          {userHook.hookUserCookie.user?.accountType === ACCOUNT_TYPES.EMPLOYEE && <div className="my-4 flex"><Button name="Add Events +" color="text-dark-blue"/></div>}
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            eventData?.map((item: CardProps, index: number) =>
              <Card
                title={item.title}
                date={DATE_FORMATTER(item.date)}
                subtitle={item.subtitle}
                tall={false}
                content={item.content}
                disabled={item.disabled}
                typeIndex={0}
                age={item.age}
                type={item.type}
                onClick={() => handleRegister(item.id, item.title, item.date)}
                id={item.id}
                key={index}
              />)
          }
        </div>
        <div>
          <Toast
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </div>
    </>
  );
};
