import { useEffect, useState } from "react";
import { ModalStyles, RowProps, ACCOUNTTYPES } from "../../utils/enum";
import { fakeHistoryData } from './fakeData';
import { BarLoader } from "react-spinners";
import ReactModal from "react-modal";
import { Button } from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { Select } from "../../components/Select";
import { Row } from "../../components/Row";

export const PastEvents = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState<RowProps[]>(fakeHistoryData);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setTimeout(()=> setLoading(false), 1000);
  }, []);

  // FOR EMPLOYEES this will be a page of all the events they instructed

  return (
    <>
      <ReactModal style={ModalStyles} isOpen={isOpen} >
        <div className="px-8 py-4">
          <div className="flex mb-4">
            <h3 className='text-3xl text-left font-bold grow'>New Event Record</h3>
            <Button name="Cancel" color="bg-white" onClick={() => setIsOpen(false)}/>
            <Button name="Add" onClick={() => setIsOpen(false)}/>
          </div>
          <Select label="Unscheduled Drop-in Type" onChange={undefined} options={['Gym', 'Swimming Pool']}/>
          <Select label="Date" onChange={undefined} />
        </div>
      </ReactModal>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12">
        <div className="col-span-4 min-h-screen">
          {userHook.hookUserCookie.user?.accountType === ACCOUNTTYPES.CLIENT &&
            <div className="mb-4 flex">
              <Button name="Record an unscheduled drop-in +" color="bg-light-blue" onClick={ () => setIsOpen(true) }/>
            </div>
          }
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            historyData.map((item: RowProps, index: number) => 
              <Row 
                title={item.title} 
                date={item.date} 
                location={item.location}
                type={item.type}
                first={index === 0}
                last={index === (historyData.length - 1)}
              />)
          }
        </div>
      </div>
    </>
  );
};
