import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, Title, ArcElement, Tooltip, Legend);

function Graph({ chartData }) {
    return (
        <div className="chart-container">
            <h3 style={{ textAlign: "center" }}>City Category Metrics</h3>
            <PolarArea
                data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Score out of 10"
                    }
                }
            }}
            />
        </div>
    );
}

export default Graph;




// -------------------  BAR CHART  --------------------

// import { Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     // Title,
//     Tooltip,
//     Legend, } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale,
//     LinearScale,
//     BarElement,
//     // Title,
//     Tooltip,
//     Legend);

// function Graph({ chartData }) {
//     return (
//         <div className="chart-container">
//             <h3 style={{ textAlign: "center" }}>City Category Metrics</h3>
//             <Bar
//                 data={chartData}
//                 // options={{
//                 //     plugins: {
//                 //         title: {
//                 //             display: true,
//                 //             text: "City Categories"
//                 //         }
//                 //     }
//                 // }}
//             />
//         </div>
//     );
// }

// export default Graph;