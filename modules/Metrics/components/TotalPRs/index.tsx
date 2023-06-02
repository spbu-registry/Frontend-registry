import React, { FC, useContext, useEffect, useState } from "react";
import { Flex, Text, Card, Metric, ProgressBar } from "@tremor/react";
import { DatesContext } from "../../context/dates";
import { prs } from "../../static/data";
import { IAPIPullRequest } from "../../../../types";

interface TotalPrsProps {
  prs: IAPIPullRequest[];
}

const TotalPrs: FC<TotalPrsProps> = ({ prs }) => {
  const [data, setData] = useState({
    total: 0,
    closed: 0,
  });

  const { dates } = useContext(DatesContext);

  const calcData = (prs: IAPIPullRequest[]) => {
    const result = {
      total: 0,
      closed: 0,
    };

    return {
      total: prs.length,
      closed: prs.filter(
        (pr) =>
          !dates[1] ||
          (dates[1] && pr.closed_at && new Date(pr.closed_at) <= dates[1])
      ).length,
    };
  };

  useEffect(() => {
    const filterPrs = () => {
      if (!dates || !dates[0] || !dates[1]) return prs;
      return prs.filter(
        (pr) =>
          (new Date(pr.created_at) > (dates[0] as Date) && !pr.closed_at) ||
          (new Date(pr.created_at) > (dates[0] as Date) &&
            new Date(pr.created_at) <= (dates[1] as Date)) ||
          (pr.closed_at &&
            new Date(pr.closed_at) > (dates[0] as Date) &&
            new Date(pr.closed_at) <= (dates[1] as Date)) ||
          (new Date(pr.created_at) < (dates[0] as Date) &&
            pr.closed_at &&
            new Date(pr.closed_at) > (dates[1] as Date))
      );
    };

    setData(calcData(filterPrs()));
  }, [dates]);

  return (
    <Card className="max-w-lg">
      <Flex alignItems="start">
        <div>
          <Text>Всего PR</Text>
          <Metric>{data.total}</Metric>
        </div>
        <div>
          <Text>Закрытых PR</Text>
          <Metric>{data.closed}</Metric>
        </div>
        <div></div>
      </Flex>
      <ProgressBar
        percentageValue={data.total ? (data.closed / data.total) * 100 : 0}
        className="mt-8"
      />
    </Card>
  );
};

export default TotalPrs;
