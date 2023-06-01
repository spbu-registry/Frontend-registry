import React, { FC, useContext, useState, useMemo } from "react";
import { BarChart, Flex, Title, Toggle, ToggleItem, Icon } from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { DatesContext } from "../../context/dates";
import { students } from "../../static/data";
import { IAPICommit } from "../../../../types";

interface CommitsPerWeekProps {
  commits: IAPICommit[];
}

interface StringNumberPairs {
  [key : string] : number
}

const CommitsPerWeek: FC<CommitsPerWeekProps> = ({ commits }) => {

  console.log(commits)

  const { dates } = useContext(DatesContext);

  const students = useMemo(() => {

    return Array.from(new Set<string>(
      commits.map((commit) => commit.author_login)
    ))

  }, [commits])

  const filteredCommits = useMemo(() => {
    if (!dates || !dates[0] || !dates[1]) return commits;
    return commits.filter(
      (commit) =>
        new Date(commit.created_at) > (dates[0] as Date) &&
        new Date(commit.created_at) < (dates[1] as Date)
    );
  }, [commits, dates])

  const contributionArray = useMemo(() => {

    const contributionByDay = new Map<string, StringNumberPairs>();

    filteredCommits.forEach((commit) => {

      // Add object on that day if it doesn't exist
      if (!contributionByDay.has(commit.created_at)) {
        contributionByDay.set(commit.created_at, {})
        const day = (contributionByDay.get(commit.created_at) as StringNumberPairs)

        // Add contributors
        students.forEach((student) => {
          day[student] = 0
        })
      }

      const day = (contributionByDay.get(commit.created_at) as StringNumberPairs)
      day[commit.author_login] += 1
    })

    const allDates = Array.from(new Set(contributionByDay.keys()))
    allDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    return allDates.map((date) => {

      const cDate = new Date(date)

      return {
        date : `${cDate.getDay()}.${cDate.getMonth()}.${cDate.getFullYear()}`,
        ...contributionByDay.get(date)
      }
    })
    
  }, [students, filteredCommits])

  console.log(contributionArray)


  const [selectedKpi, setSelectedKpi] = useState("Все");

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
        data={contributionArray}
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
