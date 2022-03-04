import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart ... "
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            // stroke: {
            //   curve: "smooth",
            //   width: 3,
            // },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              categories: data?.map((price) => price.time_close),
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#6c5ce7"], stops: [0, 100] },
            // },
            // colors: ["#ffeaa7"],
            tooltip: {
              custom: function ({ seriesIndex, dataPointIndex, w }) {
                const o =
                  w.globals.seriesCandleO[seriesIndex][dataPointIndex].toFixed(
                    2
                  );
                const h =
                  w.globals.seriesCandleH[seriesIndex][dataPointIndex].toFixed(
                    2
                  );
                const l =
                  w.globals.seriesCandleL[seriesIndex][dataPointIndex].toFixed(
                    2
                  );
                const c =
                  w.globals.seriesCandleC[seriesIndex][dataPointIndex].toFixed(
                    2
                  );
                return (
                  '<div class="apexcharts-tooltip-candlestick">' +
                  '<div>Open: <span class="value">' +
                  o +
                  "</span></div>" +
                  '<div>High: <span class="value">' +
                  h +
                  "</span></div>" +
                  '<div>Low: <span class="value">' +
                  l +
                  "</span></div>" +
                  '<div>Close: <span class="value">' +
                  c +
                  "</span></div>" +
                  "</div>"
                );
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
