import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

interface Props {
  data: GraphData[];
}

const Graphic = ({ data }: Props) => {
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        maxHeight: "100%",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey="month" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="sales"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="quantity" stroke="#82ca9d" />
      <RechartsDevtools />
    </LineChart>
  );
};

export default Graphic;
