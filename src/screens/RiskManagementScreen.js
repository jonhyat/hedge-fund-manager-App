import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { VictoryPie, VictoryChart, VictoryLine } from 'victory-native';
import { useRiskMetrics } from '../hooks/useRiskMetrics';

const RiskManagementScreen = () => {
  const { riskMetrics, loading } = useRiskMetrics();
  
  const renderExposureCard = () => (
    <Card>
      <Card.Title>Sector Exposure</Card.Title>
      <VictoryPie
        data={riskMetrics?.sectorExposure}
        colorScale="qualitative"
        height={200}
        labels={({ datum }) => `${datum.sector}\n${datum.percentage}%`}
      />
    </Card>
  );

  const renderVolatilityCard = () => (
    <Card>
      <Card.Title>Portfolio Volatility</Card.Title>
      <VictoryChart height={200}>
        <VictoryLine
          data={riskMetrics?.volatility}
          style={{
            data: { stroke: "#c43a31" }
          }}
        />
      </VictoryChart>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metricsGrid}>
        <Card containerStyle={styles.metricCard}>
          <Text style={styles.metricLabel}>VaR (95%)</Text>
          <Text style={styles.metricValue}>{riskMetrics?.var}%</Text>
        </Card>
        <Card containerStyle={styles.metricCard}>
          <Text style={styles.metricLabel}>Tracking Error</Text>
          <Text style={styles.metricValue}>{riskMetrics?.trackingError}%</Text>
        </Card>
      </View>
      {renderExposureCard()}
      {renderVolatilityCard()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  metricCard: {
    width: '48%',
    borderRadius: 10,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default RiskManagementScreen; 