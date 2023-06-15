import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { API_BASE_URL, CardProps, DATE_FORMATTER } from "../../utils/enum";
import { BarLoader } from "react-spinners";
import { useUser } from "../../hooks/useUser";

export const Dashboard = () => {
  const userHook = useUser();
  const [loading, setLoading] = useState(true);
  const [announcementData, setAnnouncementData] = useState<CardProps>();
  const [bulletinData, setBulletinData] = useState<CardProps[]>();
  const [eventData, setEventData] = useState<CardProps[]>();

  const handleFetch = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/dashboard',
        params: { accountType: userHook.hookUserCookie.user?.accountType, typeSpecificId: userHook.hookUserCookie.user?.typeSpecificId },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        if (res.data.announcement) setAnnouncementData(res.data.announcement);
        if (res.data.bulletinPosts) setBulletinData(res.data.bulletinPosts);
        if (res.data.events) setEventData(res.data.events);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl grid grid-cols-5 gap-10 px-12 py-10 mb-12">
        <div className="col-span-3 min-h-screen">
          <div className="mb-8 min-h-announcement">
            <h2 className="text-left text-4xl font-bold mb-6">Latest Announcement</h2>
            {loading
              ? <BarLoader loading color='#343B53'/>
              : <Card
                title={announcementData?.title || ''}
                tags={announcementData?.tags}
                date={DATE_FORMATTER(announcementData?.date || '')}
                subtitle={announcementData?.subtitle || ''}
                content={announcementData?.content}
              />
            }
          </div>
          <h2 className="text-left text-4xl font-bold mb-6">Virtual Bulletin Board</h2>
          {loading
            ? <BarLoader loading color='#343B53'/>
            : bulletinData?.map((item: CardProps, index: number) => (
              <Card
                title={item.title}
                subtitle={item.subtitle}
                date={DATE_FORMATTER(item.date)}
                content={item.content}
                key={index}
              />
            ))
          }
        </div>
        <div className="col-span-2 min-h-screen">
          <h2 className="text-left text-4xl font-bold mb-6">Upcoming Events</h2>
          {loading ?
            <BarLoader loading color='#343B53'/> :
            eventData?.map((item: CardProps, index: number) => <Card title={item.title} date={DATE_FORMATTER(item.date)} subtitle={item.subtitle} key={index}/>)
          }
        </div>
      </div>
    </>
  );
};
