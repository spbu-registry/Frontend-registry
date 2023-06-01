import React, { FC, useState } from "react";
import { DateRangePicker, DateRangePickerValue, Divider } from "@tremor/react";
import { DatesContext } from "../context/dates";
import CommitsPerWeek from "../components/CommitsPerWeek";
import PRTimeAvg from "../components/PRTimeAvg";
import TotalPrs from "../components/TotalPRs";
import { IAPICommit } from "../../../types";

interface MetricsProps {
  commits: IAPICommit[];
}

const Metrics: FC<MetricsProps> = ({ commits }) => {
  const [dates, setDates] = useState<DateRangePickerValue>([
    new Date(2022, 0, 1),
    new Date(),
  ]);

  return (
    <DatesContext.Provider value={{ dates, setDates }}>
      <div>
        <DateRangePicker
          className="max-w-sm mx-auto"
          value={dates}
          onValueChange={setDates}
          enableDropdown={false}
        />
        <CommitsPerWeek commits={commits} />
        <Divider />
        <PRTimeAvg />
        <Divider />
        <TotalPrs />
      </div>
    </DatesContext.Provider>
  );
};

export default Metrics;
