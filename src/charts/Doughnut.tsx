import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Doughnut = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chart.destroy();
      Chart.register();
    }
  }, []);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} className="w-full h-64"></canvas>
    </div>
  );
};

export default Doughnut;
