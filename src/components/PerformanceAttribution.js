import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, ButtonGroup } from 'react-native-elements';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack } from 'victory-native';
import { usePerformanceAttribution } from '../hooks/usePerformanceAttribution';

const PerformanceAttribution = () => {
  const [timeframe, setTimeframe] = useState(0);
  const { attributionData, loading } = usePerformanceAttribution();
  const timeframes = ['MTD', 'QTD', 'YTD', '1Y'];

  const renderAttributionBreakdown = () => (
    <Card containerStyle={styles.breakdownCard}>
      <Text style={styles.sectionTitle}>Return Attribution</Text>
      <VictoryChart height={300} domainPadding={{ x: 30 }}>
        <VictoryStack colorScale={["#2ecc71", "#3498db", "#e74c3c"]}>
          {["Selection", "Allocation", "Interaction"].map((effect) => (
            <VictoryBar
              key={effect}
              data={attributionData?.effects?.[effect] || []}
              x="sector"
              y="value"
            />
          ))}
        </VictoryStack>
        <VictoryAxis
          style={{ tickLabels: { angle: -45 } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}%`}
        />
      </VictoryChart>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <ButtonGroup
        onPress={setTimeframe}
        selectedIndex={timeframe}
        buttons={timeframes}
        containerStyle={styles.buttonGroup}
      />

      <Card containerStyle={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Total Return</Text>
            <Text style={styles.value}>{attributionData?.totalReturn}%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Benchmark</Text>
            <Text style={styles.value}>{attributionData?.benchmark}%</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Excess</Text>
            <Text style={[
              styles.value,
              { color: attributionData?.excess >= 0 ? '#2ecc71' : '#e74c3c' }
            ]}>
              {attributionData?.excess}%
            </Text>
          </View>
        </View>
      </Card>

      {renderAttributionBreakdown()}

      <Card containerStyle={styles.contributorsCard}>
        <Text style={styles.sectionTitle}>Top Contributors</Text>
        {attributionData?.topContributors?.map((item, index) => (
          <View key={index} style={styles.contributorRow}>
            <Text style={styles.contributorSymbol}>{item.symbol}</Text>
            <Text style={styles.contributorName}>{item.name}</Text>
            <Text style={[
              styles.contributorValue,
              { color: item.contribution >= 0 ? '#2ecc71' : '#e74c3c' }
            ]}>
              {item.contribution}%
            </Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonGroup: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  summaryCard: {
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakdownCard: {
    borderRadius: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contributorsCard: {
    borderRadius: 10,
    marginBottom: 20,
  },
  contributorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contributorSymbol: {
    fontWeight: 'bold',
    width: '20%',
  },
  contributorName: {
    width: '50%',
    color: '#666',
  },
  contributorValue: {
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'right',
  },
});

export default PerformanceAttribution; 