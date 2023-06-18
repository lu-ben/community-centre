import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps, ModalStyles, ACCOUNT_TYPES, API_BASE_URL, DATE_FORMATTER, SelectOption, ANNOUNCEMENT_SUCCESS_MESSAGE, FAIL_MESSAGE } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import ReactModal from "react-modal";
import { Button } from "../../components/Button";
import { InputText } from "../../components/InputText";
import { TextArea } from "../../components/TextArea";
import { useUser } from "../../hooks/useUser";
import { SelectMulti } from "../../components/SelectMulti";
import { Toast } from "../../components/Toast";

export const Announcement = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [announcementData, setAnnouncementData] = useState<CardProps[]>();
  const [facilityOptions, setFacilityOptions] = useState<SelectOption[]>([]);
  const [eventOptions, setEventOptions] = useState<SelectOption[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState<SelectOption[]>();
  const [selectedEvents, setSelectedEvents] = useState<SelectOption[]>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleFetch = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/announcement',
        params: { accountType: userHook.hookUserCookie.user?.accountType, typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        if (res.data.announcement) setAnnouncementData(res.data.announcement);
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
        url: '/announcement/getOptions',
        params: { accountType: userHook.hookUserCookie.user?.accountType },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        if (res.data.facilityOptions) {
          const fo: SelectOption[] = [];
          res.data.facilityOptions.forEach((item: any) => {
            fo.push({ label: item.facility_name, value: item.facility_name });
          });
          setFacilityOptions(fo);
        }
        if (res.data.eventOptions) {
          const eo: SelectOption[] = [];
          res.data.eventOptions.forEach((item: any) => {
            eo.push({ label: `${item.event_id} - ${item.title}`, value: item.event_id });
          });
          setEventOptions(eo);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/announcement/create',
        params: {
          title,
          content,
          facilityNames: selectedFacilities?.map((facility) => (facility?.value)),
          eventIds: selectedEvents?.map((event) => Number(event?.value)),
          typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId,
        },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        await handleFetch();
        setSuccessMessage(ANNOUNCEMENT_SUCCESS_MESSAGE(title));
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  const setFacilities = (value: SelectOption[]) => {
    setSelectedFacilities(value);
  };

  const setEvents = (value: SelectOption[]) => {
    setSelectedEvents(value);
  };

  const onClose = () => {
    setTitle('');
    setContent('');
    setSelectedFacilities([]);
    setSelectedEvents([]);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    handleCreateAnnouncement();
    onClose();
  };

  useEffect(() => {
    handleFetch();
    handleFetchOptions();
  }, []);

  return (
    <>
      <ReactModal style={ModalStyles} isOpen={isOpen} >
        <div className="px-8 py-4">
          <div className="flex mb-4">
            <h3 className='text-3xl text-left font-bold grow'>New Announcement</h3>
            <Button name="Cancel" color="bg-white" onClick={onClose}/>
            <Button name="Post" onClick={handleSubmit}/>
          </div>
          <InputText label="Title" value={title} onChange={(e: any)=> setTitle(e.target.value)}/>
          <SelectMulti
            label="Related Facilities"
            selectedMulti={selectedFacilities}
            options={facilityOptions}
            onChange={setFacilities}
          />
          <SelectMulti
            label="Related Events"
            options={eventOptions}
            selectedMulti={selectedEvents}
            onChange={setEvents}
          />
          <TextArea label="Content" value={content} height="h-56" onChange={(e: any)=> setContent(e.target.value)}/>
        </div>
      </ReactModal>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12">
        <div className="col-span-4 min-h-screen">
          {userHook.hookUserCookie.user?.accountType === ACCOUNT_TYPES.EMPLOYEE &&
            <div className="mb-4 flex">
              <Button name="Create an Announcement +" color="bg-light-blue" onClick={ () => setIsOpen(true) }/>
            </div>
          }
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            announcementData?.map((item: CardProps, index: number) =>
              <Card
                title={item.title}
                date={DATE_FORMATTER(item.date)}
                subtitle={item.subtitle}
                content={item.content}
                disabled={item.disabled}
                typeIndex={1}
                tags={item.tags}
                key={index}
              />)
          }
        </div>
        <div>
          <Toast
            successMessage={successMessage}
            errorMessage={errorMessage}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </div>
    </>
  );
};
