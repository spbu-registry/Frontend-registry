import React, { FC, useContext, useState } from "react";
import { BarChart, Flex, Title, Toggle, ToggleItem, Icon } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { DatesContext } from "../../context/dates";
import { students } from "../../static/data";
import { IAPICommit } from "../../../../types";

interface CommitsPerWeekProps {
  commits: IAPICommit[];
}

const CommitsPerWeek: FC<CommitsPerWeekProps> = ({ commits }) => {
  const students = commits
    .map((commit) => commit.author_login)
    .filter((name, index, currentVal) => currentVal.indexOf(name) === index);

  const [selectedKpi, setSelectedKpi] = useState("Все");

  const { dates, setDates } = useContext(DatesContext);

  const dataByDate = () => {
    if (!dates || !dates[0] || !dates[1]) return commits;
    return commits.filter(
      (commit) =>
        new Date(commit.created_at) > (dates[0] as Date) &&
        new Date(commit.created_at) < (dates[1] as Date)
    );
  };

  const formatData = (commits: IAPICommit[]) => {
    return commits.map((commit) => {
      return {
        date: commit.created_at,
        [commit.author_login]: 1,
      };
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Flex
            justifyContent="start"
            className="space-x-0.5"
            alignItems="center"
          >
            <Title> Число коммитов в неделю </Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Показывает число коммитов, выполненных каждым участником команды"
            />
          </Flex>
        </div>
        <div className="mt-6 md:mt-0">
          <Toggle
            color="zinc"
            defaultValue={selectedKpi}
            onValueChange={(value) => setSelectedKpi(value)}
          >
            <>
              <ToggleItem value={"Все"} text={"Все"} />
              {students.map((student) => (
                <ToggleItem key={student} value={student} text={student} />
              ))}
            </>
          </Toggle>
        </div>
      </div>
      <BarChart
        className="mt-6"
        data={formatData(dataByDate())}
        index="date"
        categories={selectedKpi == "Все" ? students : [selectedKpi]}
        colors={["sky", "violet", "fuchsia", "blue", "cyan"]}
        stack={true}
        yAxisWidth={48}
      />
    </>
  );
};

export default CommitsPerWeek;
