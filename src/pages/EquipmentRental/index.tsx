import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import { API_BASE_URL, CardProps, SelectOption } from "../../utils/enum";
// import { fakeRentalData } from './fakeData';
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { useUser } from "../../hooks/useUser";

export const EquipmentRental = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  // const [rentalData, setRentalData] = useState<CardProps[]>(fakeRentalData);
  const [rentalData, setRentalData] = useState<CardProps[]>();

  const [facilityName, setFacilityName] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [facilityOptions, setFacilityOptions] = useState([]);


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
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
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
          setFacilityOptions(res.data.facilityOptions);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRental = async (equipment_id: any) => {
    try {
      const client_id = userHook.hookUserCookie.user?.typeSpecificId;
      const equip_id = equipment_id;
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/rental/rentEquipment',
        params: {
          client_id: client_id,
          equipment_id: equip_id
        },
      });
      if (res.status === 200) {
        console.log('equipment rented');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // setTimeout(()=> setLoading(false), 1000);
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
            rentalData.map((item: CardProps) =>
              <Card
                title={item.title}
                date={'Equipment ID: ' + item.date}
                subtitle={item.subtitle}
                tall={false}
                content={item.content}
                disabled={item.disabled}
                typeIndex={1}
                onClick={() => handleRental(item.date)}
              />)
          }
        </div>
      </div>
    </>
  );
};
