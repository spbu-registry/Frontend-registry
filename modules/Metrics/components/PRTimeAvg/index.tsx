import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import {
  Flex,
  Title,
  Text,
  Grid,
  Card,
  Metric,
  DateRangePickerValue,
} from "@tremor/react";
import { DatesContext } from "../../context/dates";
import { IAPIPullRequest } from "../../../../types";

interface PRTimeAvgProps {
  prs: IAPIPullRequest[];
}

const PRTimeAvg: FC<PRTimeAvgProps> = ({ prs }) => {
  const [data, setData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  const { dates } = useContext(DatesContext);

  const students = useMemo(() => {
    return Array.from(new Set<string>(prs.map((pr) => pr.author_login)));
  }, [prs]);

  const calcPrsTimeAvg = (prs: IAPIPullRequest[]) => {
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
        if (student.name == pr.author_login) {
          const start = new Date(pr.created_at);
          const end = pr.closed_at ? new Date(pr.closed_at) : new Date();
          student.timeDiffs.push(end.getTime() - start.getTime());
          student.count += 1;
        }
      });
    });

    return data.map((student) => ({
      name: student.name,
      value: Math.floor(
        student.timeDiffs.reduce((sum: number, i: number) => sum + i, 0) /
          student.count /
          1000 /
          60 /
          60 /
          24
      ),
    }));
  };

  useEffect(() => {
    const filterPrs = () => {
      if (!dates || !dates[0] || !dates[1]) return prs;
      return prs.filter(
        (pr) =>
          new Date(pr.created_at) > (dates[0] as Date) &&
          pr.closed_at &&
          new Date(pr.closed_at) <= (dates[1] as Date)
      );
    };

    setData(calcPrsTimeAvg(filterPrs()));
  }, [dates]);

  return (
    <>
      <Title>Среднее время на закрытие PR</Title>
      <Grid numCols={5} className="mt-6 gap-6" style={{ gap: "40px" }}>
        {data &&
          data.map((student) => (
            <Card key={student.name}>
              <Flex alignItems="center" justifyContent="center">
                <div className="text-center">
                  <Text>{student.name}</Text>
                  <Metric className="truncate">
                    {Number.isNaN(student.value) ? "N/A" : student.value}
                  </Metric>
                  <Text> Дней </Text>
                </div>
              </Flex>
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default PRTimeAvg;
