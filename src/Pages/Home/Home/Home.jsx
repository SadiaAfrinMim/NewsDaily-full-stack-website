import React from 'react';
import TrendingArticles from '../TrendingArticles/TrendingArticles';
import Plans from '../Plans/Plans';
import StatisticsPage from '../../StatisticsPage/StatisticsPage';
import ExtraSections from '../../Extrasection/Extrasection';

const Home = () => {
    return (
        <div>
            <TrendingArticles></TrendingArticles>
            <StatisticsPage></StatisticsPage>
            <Plans></Plans>
            <ExtraSections></ExtraSections>
        </div>
    );
};

export default Home;