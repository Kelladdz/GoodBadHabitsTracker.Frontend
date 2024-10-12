import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import styles from '../../../styles/Chart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
	const chartType = 'streaks';
    const chart = () => {
		switch (chartType) {
			case 'streaks':
				return <Bar data={streaksData} options={streaksOptions} />;
			case 'completes':
				return <Bar data={completesData} options={completesOptions} />;
			case 'fails':
				return <Bar data={failsData} options={failsOptions} />;
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
				data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
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
				data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
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
				data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9],
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