import { PieChart as Chart, Pie, Cell, Legend, Tooltip } from "recharts";
import styles from "./Grafico.module.css";

const COLORS = ["#00a455", "#a40000"];

const PieChart = ({ totalReceitas, totalDespesas }) => {

  const data = [
    { name: "Receita", value: totalReceitas },
    { name: "Despesa", value: totalDespesas },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <Chart width={300} height={300}>
          <Pie
            data={data}
            cx={140}   // Centraliza o gráfico no eixo X
            cy={120}   // Centraliza o gráfico no eixo Y
            innerRadius={60}  
            outerRadius={100}  
            fill="#8884d8"
            paddingAngle={1} 
            dataKey="value"
            stroke="none"    
          >
            {data.map((entry, index) => (
               <Cell key={`cell-${index}`}  fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </Chart>
      </div>
    </div>
  );
};

export default PieChart;
