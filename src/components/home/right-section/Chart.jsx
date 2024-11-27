
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';


import { useChart } from '../../../hooks/useChart';

import styles from '../../../styles/Chart.module.css';
import { useContext } from 'react';
import ChartContext from '../../../context/chart';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
	const {getStreaks, getCompletes, getFails} = useChart();
	const {chartType} = useContext(ChartContext);
    const chart = () => {
		switch (chartType) {
			case 'streaks':
				return <Bar data={streaksData} options={streaksOptions} />;
			case 'completes':
				return <Bar data={completesData} options={completesOptions} />;
			case 'fails':
				return <Bar data={failsData} options={failsOptions} />;
			default:
				return <Bar data={streaksData} options={streaksOptions} />; // default to streaks
		}
	};

	const streaksOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Streaks',
			},
		},
	};
	const streaksData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Streak',
				data: [getStreaks(0), getStreaks(1), getStreaks(2), getStreaks(3), getStreaks(4), 
					getStreaks(5), getStreaks(6), getStreaks(7), getStreaks(8), getStreaks(9), 
					getStreaks(10), getStreaks(11)],
				backgroundColor: '#e8b923',
				borderColor: '#e8b923',
			},
		],
	};
	const completesOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Completes',
			},
		},
	};
	const completesData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Completes',
				data: [getCompletes(0), getCompletes(1), getCompletes(2), getCompletes(3), getCompletes(4), 
					getCompletes(5), getCompletes(6), getCompletes(7), getCompletes(8), getCompletes(9), 
					getCompletes(10), getCompletes(11)],
				backgroundColor: '#3C9A3E',
				borderColor: '#3C9A3E',
			},
		],
	};
	const failsOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Fails',
			},
		},
	};
	const failsData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Fails',
				data: [getFails(0), getFails(1), getFails(2), getFails(3), getFails(4),
					getFails(5), getFails(6), getFails(7), getFails(8), getFails(9), 
					getFails(10), getFails(11)
				],
				backgroundColor: '#AF0000',
				borderColor: '#AF0000',
			},
		],
	};
    return (
        <div className={styles.chart}>
            {chart()}
        </div>
    )
}

export default Chart;