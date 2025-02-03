import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  PortfolioSummary,
  PerformanceChart,
  RecentTransactions,
  MarketOverview 
} from '../components';
import { usePortfolioData } from '../hooks/usePortfolioData';

const DashboardScreen = () => {
  const { portfolioData, loading, error } = usePortfolioData();

  return (
    <ScrollView style={styles.container}>
      <PortfolioSummary data={portfolioData} />
      <PerformanceChart data={portfolioData?.performance} />
      <MarketOverview />
      <RecentTransactions />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});

export default DashboardScreen; 