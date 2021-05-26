import React, { useState, useEffect } from "react";
import CanvasJSReact from "./canvasjs.react";
// import randomColor from "randomcolor";
import { CSVLink, CSVDownload } from "react-csv";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = ({ index, result }) => {
  const [data, setData] = useState([]);

  const colors = [
    "#0B84A5",
    "#F6C85F",
    "#6F4E7C",
    "#CA472F",
    "#FFA056",
    "#8DDDD0",
    "#718F50",
    "#F17853",
  ];

  useEffect(() => {
    if (result !== null) {
      const tempData = [];
      // const dataFromResult = [...result].map((arr) => ({
      //   x: arr[0],
      //   y: arr[index],
      // }));
      // setData(dataFromResult);

      index.forEach((el, index) => {
        if (el.visible) {
          tempData.push({
            type: "line",
            name: `c${el.value}(t)`,
            color: colors[index],
            showInLegend: true,
            dataPoints: [...result].map((arr) => ({
              x: arr[0],
              y: arr[el.value],
            })),
          });
        }
      });
      console.log(tempData);
      setData(tempData);
    }
  }, [index, result]);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: `c(t)`,
    },
    axisY: {
      title: "c(t)",
      includeZero: false,
      // suffix: "%",
    },
    axisX: {
      title: "time ",
      interval: 25,
    },
    // axisX2: [
    //   {
    //     title: "Axis X - 1 Title",
    //     titleFontColor: "#369EAD",
    //     lineColor: "#369EAD",
    //     tickColor: "#369EAD",
    //     labelFontColor: "#369EAD",
    //   },
    // ],
    data: data,
  };
  return (
    <div>
      <br />
      <p>
        Aby pobrać dane jako plik .csv, {"  "}
        <CSVLink data={result || []} separator={":"}>
          kliknij tutaj
        </CSVLink>
      </p>
      <br />
      {index ? <CanvasJSChart options={options} /> : null}
    </div>
  );
};

export default Chart;
