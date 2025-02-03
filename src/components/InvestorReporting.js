import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Divider } from 'react-native-elements';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';
import { useInvestorReporting } from '../hooks/useInvestorReporting';

const InvestorReporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const { reportingData, loading } = useInvestorReporting();

  const renderPerformanceMetrics = () => (
    <Card containerStyle={styles.metricsCard}>
      <Text style={styles.cardTitle}>Performance Metrics</Text>
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>NAV</Text>
          <Text style={styles.metricValue}>${reportingData?.nav?.toLocaleString()}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>MTD Return</Text>
          <Text style={[
            styles.metricValue,
            { color: reportingData?.mtdReturn >= 0 ? '#2ecc71' : '#e74c3c' }
          ]}>
            {reportingData?.mtdReturn}%
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>YTD Return</Text>
          <Text style={[
            styles.metricValue,
            { color: reportingData?.ytdReturn >= 0 ? '#2ecc71' : '#e74c3c' }
          ]}>
            {reportingData?.ytdReturn}%
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Since Inception</Text>
          <Text style={[
            styles.metricValue,
            { color: reportingData?.inceptionReturn >= 0 ? '#2ecc71' : '#e74c3c' }
          ]}>
            {reportingData?.inceptionReturn}%
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderHistoricalPerformance = () => (
    <Card containerStyle={styles.chartCard}>
      <Text style={styles.cardTitle}>Historical Performance</Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          data={reportingData?.historicalPerformance}
          x="date"
          y="value"
          style={{
            data: { stroke: "#3498db" }
          }}
        />
      </VictoryChart>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Investor Report</Text>
        <Text style={styles.date}>As of {new Date().toLocaleDateString()}</Text>
      </View>

      {renderPerformanceMetrics()}
      {renderHistoricalPerformance()}

      <Card containerStyle={styles.allocationCard}>
        <Text style={styles.cardTitle}>Asset Allocation</Text>
        <View style={styles.allocationTable}>
          {reportingData?.allocations?.map((item, index) => (
            <View key={index} style={styles.allocationRow}>
              <Text style={styles.assetClass}>{item.assetClass}</Text>
              <Text style={styles.allocation}>{item.allocation}%</Text>
              <Text style={[
                styles.return,
                { color: item.return >= 0 ? '#2ecc71' : '#e74c3c' }
              ]}>
                {item.return}%
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card containerStyle={styles.actionsCard}>
        <Button
          title="Download PDF Report"
          icon={<Icon name="file-download" color="white" style={styles.buttonIcon} />}
          onPress={() => handleDownloadReport()}
        />
        <Button
          title="Share Report"
          icon={<Icon name="share" color="white" style={styles.buttonIcon} />}
          onPress={() => handleShareReport()}
          containerStyle={styles.shareButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    marginTop: 5,
  },
  metricsCard: {
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    marginBottom: 15,
  },
  metricLabel: {
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartCard: {
    borderRadius: 10,
    marginVertical: 10,
  },
  allocationCard: {
    borderRadius: 10,
  },
  allocationTable: {
    marginTop: 10,
  },
  allocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  assetClass: {
    flex: 2,
    fontWeight: '500',
  },
  allocation: {
    flex: 1,
    textAlign: 'right',
  },
  return: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  actionsCard: {
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  shareButton: {
    marginTop: 10,
  },
});

export default InvestorReporting; 