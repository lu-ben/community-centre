import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps } from "../../utils/enum";
import { fakeRentalData } from './fakeData'
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";

export const EquipmentRental = () => {
  const [loading, setLoading] = useState(true);
  const [rentalData, setRentaldata] = useState<CardProps[]>(fakeRentalData);

  useEffect(() => {
    setTimeout(()=> setLoading(false), 1000)
  }, [])

  return (
    <>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl grid grid-cols-6 gap-10 px-12 py-10 mb-12">
        <div className="col-span-2" >
          <Select label="Select Facility"/>
          <InputText label="Search" />
          <div className="my-6 flex">
            <Button name="Search" rounded="rounded-3xl"/>
          </div>
        </div>
        <div className="col-span-4 min-h-screen">
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            rentalData.map((item: CardProps) => 
              <Card 
                title={item.title} 
                date={item.date} 
                subtitle={item.subtitle}
                tall={false} 
                content={item.content}
                buttonDisabled={item.buttonDisabled}
                typeIndex={1}
              />)
          }
        </div>
      </div>
    </>
  )
}
