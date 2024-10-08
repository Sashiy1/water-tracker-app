
import { useState } from "react";
import Page from "../../components/Page/Page";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { getDateObject } from "../../helpers/getDate";

const TrackerPage = () => {
  const [date, setDate] = useState(getDateObject());
  // console.log('date: ', date);
  
  return (
    <Page>
      <WaterMainInfo date={date}/>
      <WaterDetailedInfo date={date} setDate={setDate}  />
    </Page>
  );
};

export default TrackerPage;
