import { useEffect, useState } from "react";
import { RowProps, ACCOUNT_TYPES, API_BASE_URL, EMPLOYEE_ROLES, ModalStyles, FAIL_MESSAGE, USER_UPDATE_SUCCESS_MESSAGE } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Row } from "../../components/Row";
import axios from "axios";
import ReactModal from "react-modal";
import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";
import { Toast } from "../../components/Toast";

export const ManageAccounts = () => {
  const [loading, setLoading] = useState(true);
  const [accountsData, setAccountsData] = useState<RowProps[]>([]);

  const [accountTypeSelected, setAccountTypeSelected] = useState('Client');
  const [ageSelected, setAgeSelected] = useState('All');
  const [roleSelected, setRoleSelected] = useState('All');

  const accountTypeOptions = ['Client', 'Employee'];
  const ageRangeOptions = ['All', 'Child', 'Youth', 'Adult'];
  const roleOptions = ['All', 'Instructor', 'Receptionist', 'Manager'];

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<{ [key: string]: any}>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFetch = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/account',
        params: {
          accountTypeSelected,
          ageSelected,
          roleSelected,
        },
        headers: { 'Content-Type': null, cache: false }
      });
      if (res.status === 200) {
        setAccountsData(res.data.accounts);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const newInput = { ...input };
    newInput[field] = e.target.value;
    setInput(newInput);
  };

  const editClick = (item: RowProps) => {
    const newInput = { ...item };
    setInput(newInput);
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'post',
        url: '/account/updateUser',
        params: { ...input },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        setSuccessMessage(USER_UPDATE_SUCCESS_MESSAGE(input.username));
        setIsOpen(false);
        handleFetch();
      }
    } catch (err) {
      setErrorMessage(FAIL_MESSAGE);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [accountTypeSelected, ageSelected, roleSelected]);

  return (
    <>
      <div className="min-h-screen min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl gap-10 px-12 py-10 mb-12 grid-cols-6">
        <div className="flex gap-4 mb-2">
          <Select label={"Account Type"} options={accountTypeOptions} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountTypeSelected(e.target.value)} />
          <Select label={"Age Range"} options={ageRangeOptions} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgeSelected(e.target.value)} disabled={accountTypeSelected.toLowerCase() === ACCOUNT_TYPES.EMPLOYEE} />
          <Select label={"Role"} options={roleOptions} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleSelected(e.target.value)} disabled={accountTypeSelected.toLowerCase() === ACCOUNT_TYPES.CLIENT}/>
        </div>
        {loading ?
          <BarLoader className="mx-auto my-8" loading color='#343B53'/> : (
            <>
              <ReactModal style={ModalStyles} isOpen={isOpen} >
                <div className="px-8 py-4">
                  <div className="flex mb-8">
                    <h3 className='text-3xl text-left font-bold grow'>Edit User</h3>
                    <Button name="Cancel" color="bg-white" onClick={() => setIsOpen(false)}/>
                    <Button minWidth="w-6" name="Post" onClick={handleSubmit}/>
                  </div>
                  <div className=" bg-white justify-self-center grid grid-cols-4 gap-2">
                    <InputText label='First Name' width="col-span-2" value={input.first_name} onChange={(e) => handleChange(e, 'first_name')}/>
                    <InputText label ='Last Name' width="col-span-2" value={input.last_name} onChange={(e) => handleChange(e, 'last_name')} />
                    <InputText label='Username' width={accountTypeSelected.toLowerCase() === ACCOUNT_TYPES.CLIENT ? "col-span-3" : "col-span-4"} value={input.username} onChange={(e) => handleChange(e, 'username')} disabled />
                    {accountTypeSelected.toLowerCase() === ACCOUNT_TYPES.CLIENT ? (
                      <InputText label ='Age' width="col-span-1" value={input.age} onChange={(e) => handleChange(e, 'age')}  />
                    ): (
                      <Select label='Role' value={input.role} options={[EMPLOYEE_ROLES.INSTRUCTOR, EMPLOYEE_ROLES.RECEPTIONIST, EMPLOYEE_ROLES.MANAGER]} width="col-span-4" onChange={(e: any) => handleChange(e, 'role')}/>
                    )}
                    <Select label='User Type' value={input.account_type} options={[ACCOUNT_TYPES.CLIENT, ACCOUNT_TYPES.EMPLOYEE]} width="col-span-4" onChange={() => {}} disabled/>
                  </div>
                </div>
              </ReactModal>
              {accountsData.length > 0 ? (
                <div className="bg-turquoise grid grid-cols-7 text-start font-bold rounded-t-xl pl-8 py-2 border-b-2 border-white">
                  <p>ID</p>
                  <p>Username</p>
                  <p>First Name</p>
                  <p>Last Name</p>
                  <p>Account Type</p>
                  <p>{accountTypeSelected.toLowerCase() === ACCOUNT_TYPES.CLIENT ? 'Age' : 'Role'}</p>
                </div>
              ) : <p className="my-4">No Users Found</p>}
              {accountsData?.map((item: RowProps, index: number) =>
                <Row
                  title={item?.title}
                  first_name={item?.first_name}
                  account_type={item?.account_type?.toUpperCase()}
                  last_name={item?.last_name}
                  role={item?.role?.toUpperCase()}
                  age={item?.age}
                  username={item?.username}
                  last={index === (accountsData.length - 1)}
                  key={index}
                  numColumns={7}
                  textSize="text-base"
                  button
                  tall={false}
                  buttonOnChange={() => editClick(item)}
                />
              )}
            </>
          )
        }
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
