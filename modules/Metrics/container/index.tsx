import React, { FC, useState } from "react";
import { DateRangePicker, DateRangePickerValue, Divider } from "@tremor/react";
import { commits, prs, students } from "../static/data";
import { DatesContext } from "../context/dates";
import CommitsPerWeek from "../components/CommitsPerWeek";
import PRTimeAvg from "../components/PRTimeAvg";
import TotalPrs from "../components/TotalPRs";

interface MetricsProps {}

const Metrics: FC<MetricsProps> = () => {
  const [dates, setDates] = useState<DateRangePickerValue>([
    new Date(2022, 0, 1),
    new Date(),
  ]);

  const [selectedKpi, setSelectedKpi] = useState("Все");

  const dataByDate = () => {
    if (!dates || !dates[0] || !dates[1]) return commits;
    return commits.filter(
      (week) =>
        new Date(week.date) > (dates[0] as Date) &&
        new Date(week.date) < (dates[1] as Date)
    );
  };

  const calcPrsTimeAvg = () => {
    const data: {
      name: string;
      timeDiffs: number[];
      count: number;
    }[] = students.map((student) => ({
      name: student,
      timeDiffs: [],
      count: 0,
    }));

    prs.forEach((pr) => {
      data.forEach((student) => {
        if (student.name == pr.student) {
          const start = new Date(pr.start);
          const end = new Date(pr.end);
          student.timeDiffs.push(end.getTime() - start.getTime());
          student.count += 1;
        }
      });
    });

    return data.map((student) => ({
      name: student.name,
      value:
        student.timeDiffs.reduce((sum: number, i: number) => sum + i, 0) /
        student.count /
        1000 /
        60 /
        60 /
        24,
    }));
  };

  return (
    <DatesContext.Provider value={{ dates, setDates }}>
      <div>
        <DateRangePicker
          className="max-w-sm mx-auto"
          value={dates}
          onValueChange={setDates}
          enableDropdown={false}
        />
        <CommitsPerWeek />
        <Divider />
        <PRTimeAvg />
        <Divider />
        <TotalPrs />
      </div>
    </DatesContext.Provider>
  );
};

export default Metrics;
