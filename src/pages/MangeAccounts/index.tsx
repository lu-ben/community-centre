import { useEffect, useState } from "react";
import { RowProps, ACCOUNT_TYPES, API_BASE_URL } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import { Select } from "../../components/Select";
import { Row } from "../../components/Row";
import axios from "axios";

export const ManageAccounts = () => {
  const [loading, setLoading] = useState(true);
  const [accountsData, setAccountsData] = useState<RowProps[]>([]);
  
  const [accountTypeSelected, setAccountTypeSelected] = useState('Client');
  const [ageSelected, setAgeSelected] = useState('adult');
  const [roleSelected, setRoleSelected] = useState('manager');

  const accountTypeOptions = ['Client', 'Employee'];
  const ageRangeOptions = ['All', 'Child', 'Youth', 'Adult'];
  const roleOptions = ['All', 'Instructor', 'Receptionist', 'Manager'];

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

  // TODO [KC]: button on change funtion
  // TODO [KC]: modal & populating modal fields 

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
          <BarLoader className="mx-auto my-8" loading color='#343B53'/> :
          accountsData?.map((item: RowProps, index: number) =>
            <Row
              title={item?.title}
              first_name={item?.first_name}
              account_type={item?.account_type?.toUpperCase()}
              last_name={item?.last_name}
              role={item?.role?.toUpperCase()}
              age={item?.age}
              username={item?.username}
              first={index === 0}
              last={index === (accountsData.length - 1)}
              key={index}
              numColumns={7}
              textSize="text-base"
              button
              tall={false}
              buttonOnChange={()=>''}
            />)
        }
      </div>
    </>
  );
};
