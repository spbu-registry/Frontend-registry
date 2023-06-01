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

const addDays = (date : Date, days : number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

const CommitsPerWeek: FC<CommitsPerWeekProps> = ({ commits }) => {

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
    allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    const groupDates : string[][] = []
    const interval = 7;

    let currentDate = new Date(allDates[0])
    while (currentDate <= new Date(allDates[allDates.length - 1])) {
      groupDates.push([])
      currentDate = addDays(currentDate, interval)
    }

    let groupIndex = 0;
    currentDate = addDays(new Date(allDates[0]), interval);

    allDates.forEach((date) => {
        while (new Date(date) >= currentDate) {
          groupIndex++; currentDate = addDays(currentDate, interval)
      }
      groupDates[groupIndex].push(date)
    })


    return groupDates.map((dates, index) => {

      const currentDate = addDays(new Date(allDates[0]), interval * index)
      const groupContributions : StringNumberPairs = {}
      students.forEach((student) => {
        dates.forEach((date) => {
          if (!groupContributions[student]) groupContributions[student] = 0
          groupContributions[student] += (contributionByDay.get(date) as StringNumberPairs)[student]
        })
      })

      return {
        date : `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
        ...groupContributions
      }
    })
    
  }, [students, filteredCommits])


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
