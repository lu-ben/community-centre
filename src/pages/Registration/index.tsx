import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps, ACCOUNTTYPES } from "../../utils/enum";
import { fakeEventData } from "./fakeData";
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { useUser } from "../../hooks/useUser";

export const Registration = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<CardProps[]>(fakeEventData);

  useEffect(() => {
    setTimeout(()=> setLoading(false), 1000);
  }, []);

  return (
    <>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl grid grid-cols-6 gap-10 px-12 py-10 mb-12">
        <div className="col-span-2" >
          <Select label="Select Date"/>
          <Select label="Select Type"/>
          <Select label="Select Age Range"/>
          <InputText label="Search" />
          <div className="my-6 flex">
            <Button name="Search" rounded="rounded-3xl"/>
          </div>
        </div>
        <div className="col-span-4 min-h-screen">
          {userHook.hookUserCookie.user?.accountType === ACCOUNTTYPES.EMPLOYEE &&
            <div className="my-4 flex">
              <Button name="Add Events +" color="bg-light-blue"/>
            </div>
          }
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            eventData.map((item: CardProps) => 
              <Card 
                title={item.title} 
                date={item.date} 
                subtitle={item.subtitle}
                tall={false} 
                content={item.content}
                buttonDisabled={item.buttonDisabled}
                typeIndex={0}
                ageRange={item.ageRange}
                eventType={item.eventType}
              />)
          }
        </div>
      </div>
    </>
  );
};
