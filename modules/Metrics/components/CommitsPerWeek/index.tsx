import React, { FC, useContext, useState } from "react";
import { BarChart, Flex, Title, Toggle, ToggleItem, Icon } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { DatesContext } from "../../context/dates";
import { commits, students } from "../../static/data";

interface CommitsPerWeekProps {}

const CommitsPerWeek: FC<CommitsPerWeekProps> = () => {
  const [selectedKpi, setSelectedKpi] = useState("Все");

  const { dates, setDates } = useContext(DatesContext);

  const dataByDate = () => {
    if (!dates || !dates[0] || !dates[1]) return commits;
    return commits.filter(
      (week) =>
        new Date(week.date) > (dates[0] as Date) &&
        new Date(week.date) < (dates[1] as Date)
    );
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
            <ToggleItem value="Все" text="Все" />
            <ToggleItem value="Алина" text="Алина" />
            <ToggleItem value="Даня" text="Даня" />
            <ToggleItem value="Денис" text="Денис" />
            <ToggleItem value="Дима" text="Дима" />
            <ToggleItem value="Саша" text="Саша" />
          </Toggle>
        </div>
      </div>
      <BarChart
        className="mt-6"
        data={dataByDate()}
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
