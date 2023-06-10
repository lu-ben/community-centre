import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps, ModalStyles, USERTYPES } from "../../utils/enum";
import { fakeBulletinData } from './fakeData';
import { BarLoader } from "react-spinners";
import { useUser } from "../../hooks/useUser";
import { Button } from "../../components/Button";
import ReactModal from "react-modal";
import { InputText } from "../../components/InputText";
import { TextArea } from "../../components/TextArea";

export const VirtualBulletin = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [bulletinData, setBulletinData] = useState<CardProps[]>(fakeBulletinData);
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    setTimeout(()=> setLoading(false), 1000);
  }, []);

  return (
    <>
      <ReactModal style={ModalStyles}isOpen={isOpen} >
        <div className="px-8 py-4">
          <div className="flex mb-4">
            <h3 className='text-3xl text-left font-bold grow'>New Bulletin Post</h3>
            <Button name="Cancel" color="bg-white" onClick={() => setIsOpen(false)}/>
            <Button name="Post" onClick={() => setIsOpen(false)}/>
          </div>
          <InputText label={"Title"} />
          <TextArea label={"Content"} height="h-56"/>
        </div>
      </ReactModal>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12">
        <div className="col-span-4 min-h-screen">
          {userHook.hookUserCookie.user?.userType === USERTYPES.CLIENT &&
            <div className="mb-4 flex">
              <Button name="Create a Bulletin Post +" color="bg-light-blue" onClick={ () => setIsOpen(true) }/>
            </div>
          }
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            bulletinData.map((item: CardProps) => 
              <Card 
                title={item.title} 
                date={item.date} 
                subtitle={item.subtitle}
                content={item.content}
                buttonDisabled={item.buttonDisabled}
                typeIndex={2}
                bulletin
                userType={userHook.hookUserCookie.user.userType}
              />)
          }
        </div>
      </div>
    </>
  );
};
