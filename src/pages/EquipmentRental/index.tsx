import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import { API_BASE_URL, CardProps, EQUIPMENT_SUCCESS_MESSAGE, FAIL_MESSAGE } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { useUser } from "../../hooks/useUser";
import { ErrorText } from "../../components/ErrorText";
import { Toast } from "../../components/Toast";

export const EquipmentRental = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [rentalData, setRentalData] = useState<CardProps[]>([]);

  const [facilityName, setFacilityName] = useState('All');
  const [equipmentName, setEquipmentName] = useState('');
  const [facilityOptions, setFacilityOptions] = useState<string[]>([]);

  const [noResults, setNoResults] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetch = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/rental',
        params: {
          facility: facilityName,
          equipment: equipmentName
        },
        headers: { 'Content-Type': null, cache: false }
      });
      if (res.status === 200) {
        if (res.data.equipment) setRentalData(res.data.equipment);
        setNoResults(res.data.equipment.length <= 0);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setNoResults(true);
    }
  };

  const handleFetchOptions = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/rental/getOptions',
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        if (res.data.facilityOptions) {
          setFacilityOptions(['All', ...res.data.facilityOptions]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRental = async (equipment_id?: number) => {
    try {
      if (!equipment_id) return;
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/rental/rentEquipment',
        params: {
          client_id: userHook.hookUserCookie.user?.typeSpecificId,
          equipment_id,
        },
      });
      if (res.status === 200) {
        setSuccessMessage(EQUIPMENT_SUCCESS_MESSAGE(res.data.id, res.data.name));
        handleFetch();
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  useEffect(() => {
    handleFetch();
    handleFetchOptions();
  }, []);

  return (
    <>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl grid grid-cols-6 gap-10 px-12 py-10 mb-12">
        <div className="col-span-2" >
          <Select
            label="Select Facility"
            options={facilityOptions}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFacilityName(e.target.value)}
          />
          <InputText label="Search" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEquipmentName(e.target.value)} />
          <div className="my-6 flex">
            <Button name="Search" rounded="rounded-3xl" onClick={() => handleFetch()} />
          </div>
        </div>
        <div className="col-span-4 min-h-screen">
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53' /> :
            <>
              {noResults && <ErrorText color='dark-blue' message={"No records found."} />}
              {rentalData?.map((item: CardProps, index: number) =>
                <Card
                  title={item.title}
                  date={'Equipment ID: ' + item.id}
                  subtitle={item.subtitle}
                  tall={false}
                  content={item.content}
                  disabled={item.disabled}
                  typeIndex={1}
                  onClick={() => handleRental(item?.id)}
                  key={index}
                />)}
            </>
          }
        </div>
      </div>
      <div>
        <Toast
          successMessage={successMessage}
          errorMessage={errorMessage}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </>
  );
};
