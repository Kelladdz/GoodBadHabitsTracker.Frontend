import { createContext, useState } from 'react';
import { CHART_TYPES } from '../constants/chart-types';

const ChartContext = createContext();

function ChartProvider({children}) {
    const [chartType, setChartType] = useState(CHART_TYPES.streaks);

    const toggleChart = (type) => {
        setChartType(type);
    }

    return <ChartContext.Provider value={{
        chartType, toggleChart}}>
            {children}
		</ChartContext.Provider>;
} 

export { ChartProvider };
export default ChartContext;