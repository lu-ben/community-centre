import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card";
import { API_BASE_URL, CardProps, SelectOption } from "../../utils/enum";
// import { fakeRentalData } from './fakeData';
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { SelectMulti } from "../../components/SelectMulti";

export const EquipmentRental = () => {
  const [loading, setLoading] = useState(true);
  // const [rentalData, setRentalData] = useState<CardProps[]>(fakeRentalData);
  const [rentalData, setRentalData] = useState<CardProps[]>();

  const [facilityName, setFacilityName] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [facilityOptions, setFacilityOptions] = useState<SelectOption[]>([{label: 'All', value: 'All'}]);


  const handleFetch = async () => {

    console.log(facilityName);

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
        console.log('getOptions called');
        if (res.data.facilityOptions) {
          const fo: SelectOption[] = [];
          res.data.facilityOptions.forEach((item: any) => {
            fo.push({ label: item.facility_name, value: item.facility_name });
          });
          console.log(fo);
          setFacilityOptions(fo);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toStringArr = (arr: SelectOption[]) => {
    const array: string[] = [];
    arr.forEach((element: SelectOption) => {
      array.push(element.value);
    });
    return array;
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
            options={toStringArr(facilityOptions)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFacilityName(e.target.value)}
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
                date={item.date}
                subtitle={item.subtitle}
                tall={false}
                content={item.content}
                disabled={item.disabled}
                typeIndex={1}
              />)
          }
        </div>
      </div>
    </>
  );
};
