import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { CardProps } from "../../utils/enum";
import { fakeAnnouncementData, fakeBulletinPostData, fakeEventData } from "./fakeData";
import { BarLoader } from "react-spinners";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [announcementData, setAnnouncementData] = useState<CardProps>(fakeAnnouncementData);
  const [bulletinData, setBulletinData] = useState<CardProps[]>(fakeBulletinPostData);
  const [eventData, setEventData] = useState<CardProps[]>(fakeEventData);

  useEffect(() => {
    setTimeout(()=> setLoading(false), 3000)
  }, [])

  return (
    <>
      <div className="min-w-screen-md-2 max-w-screen-md-2 bg-white rounded-xl grid grid-cols-5 gap-10 px-12 py-10 mb-12">
        <div className="col-span-3 min-h-screen">
          <div className="mb-8 min-h-announcement">
            <h2 className="text-left text-4xl font-bold mb-6">Latest Announcement</h2>
            {loading ?
              <BarLoader loading color='#343B53'/> :
              <Card title={announcementData.title} date={announcementData.date} subtitle={announcementData.subtitle} content={announcementData.content} />
            }
          </div>
          <h2 className="text-left text-4xl font-bold mb-6">Virtual Bulletin Board</h2>
          {loading ?
            <BarLoader loading color='#343B53'/> :
            bulletinData.map((item: CardProps) => (<Card title={item.title} subtitle={item.subtitle} date={item.date} content={item.content} />))
          }
        </div>
        <div className="col-span-2 min-h-screen">
          <h2 className="text-left text-4xl font-bold mb-6">Upcoming Events</h2>
          {loading ?
            <BarLoader loading color='#343B53'/> :
            eventData.map((item: CardProps) => <Card title={item.title} date={item.date} subtitle={item.subtitle} />)
          }
        </div>
      </div>
    </>
  )
}
