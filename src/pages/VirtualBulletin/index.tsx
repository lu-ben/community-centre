import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps, ModalStyles, ACCOUNT_TYPES, API_BASE_URL, DATE_FORMATTER, POST_SUCCESS_MESSAGE, FAIL_MESSAGE } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import { useUser } from "../../hooks/useUser";
import { Button } from "../../components/Button";
import ReactModal from "react-modal";
import { InputText } from "../../components/InputText";
import { TextArea } from "../../components/TextArea";
import { Toast } from "../../components/Toast";

export const VirtualBulletin = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [bulletinData, setBulletinData] = useState<CardProps[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Modal & Toast States
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetch = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/bulletin',
        params: { accountType: userHook.hookUserCookie.user?.accountType, typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        if (res.data.bulletin) setBulletinData(res.data.bulletin);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/bulletin/create',
        params: {
          typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId,
          title,
          content,
        },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        handleFetch();
        if (res.data.bulletin.post_id !== undefined) {
          setSuccessMessage(POST_SUCCESS_MESSAGE(res.data.bulletin.title, 'created', true));
        }
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/bulletin/approve',
        params: { typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId, postId: id },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        handleFetch();
        if (res.data.bulletin.post_id !== undefined) {
          setSuccessMessage(POST_SUCCESS_MESSAGE(res.data.bulletin.title, 'approved'));
        }
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/bulletin/delete',
        params: { postId: id },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        handleFetch();
        if (res.data.bulletin.post_id !== undefined) {
          setSuccessMessage(POST_SUCCESS_MESSAGE(res.data.bulletin.title, 'deleted'));
        }
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  const handleSubmit = () => {
    handleCreate();
    setIsOpen(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <ReactModal style={ModalStyles}isOpen={isOpen} >
        <div className="px-8 py-4">
          <div className="flex mb-4">
            <h3 className='text-3xl text-left font-bold grow'>New Bulletin Post</h3>
            <Button name="Cancel" color="bg-white" onClick={() => setIsOpen(false)}/>
            <Button name="Post" onClick={handleSubmit}/>
          </div>
          <InputText label="Title" onChange={(e: any)=> setTitle(e.target.value)} />
          <TextArea label="Content" height="h-56"  onChange={(e: any)=> setContent(e.target.value)} />
        </div>
      </ReactModal>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12">
        <div className="col-span-4 min-h-screen">
          {userHook.hookUserCookie.user?.accountType === ACCOUNT_TYPES.CLIENT &&
            <div className="mb-4 flex">
              <Button name="Create a Bulletin Post +" color="bg-light-blue" onClick={ () => setIsOpen(true) }/>
            </div>
          }
          {loading ?
            <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
            bulletinData.map((item: CardProps) =>
              <Card
                title={item.title}
                date={DATE_FORMATTER(item.date)}
                subtitle={item.subtitle}
                content={item.content}
                disabled={item.disabled}
                typeIndex={2}
                onClick={handleApprove}
                deleteOnClick={handleDelete}
                hasEmployeeButtons
                accountType={userHook.hookUserCookie.user.accountType}
                id={item.id}
                buttonMinWidth="min-w-button-m"
              />
            )
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
