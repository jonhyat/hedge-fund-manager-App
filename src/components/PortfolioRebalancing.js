import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Slider, Card } from 'react-native-elements';
import { usePortfolioRebalancing } from '../hooks/usePortfolioRebalancing';

const PortfolioRebalancing = () => {
  const { currentAllocations, targetAllocations, calculateRebalance } = usePortfolioRebalancing();
  const [adjustedAllocations, setAdjustedAllocations] = useState({});

  const renderAllocationSlider = (asset) => (
    <View style={styles.sliderContainer} key={asset.symbol}>
      <View style={styles.assetHeader}>
        <Text style={styles.assetSymbol}>{asset.symbol}</Text>
        <Text style={styles.currentAllocation}>
          Current: {asset.currentAllocation}%
        </Text>
      </View>
      <Slider
        value={adjustedAllocations[asset.symbol] || asset.targetAllocation}
        onValueChange={(value) => handleAllocationChange(asset.symbol, value)}
        minimumValue={0}
        maximumValue={100}
        step={1}
        thumbStyle={styles.sliderThumb}
        trackStyle={styles.sliderTrack}
      />
      <View style={styles.allocationValues}>
        <Text>Target: {adjustedAllocations[asset.symbol] || asset.targetAllocation}%</Text>
        <Text style={styles.difference}>
          Δ: {((adjustedAllocations[asset.symbol] || asset.targetAllocation) - asset.currentAllocation).toFixed(1)}%
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.summaryCard}>
        <Text style={styles.cardTitle}>Portfolio Balance</Text>
        <View style={styles.balanceRow}>
          <Text>Total Assets:</Text>
          <Text style={styles.balanceValue}>$1,234,567</Text>
        </View>
        <View style={styles.balanceRow}>
          <Text>Drift Score:</Text>
          <Text style={styles.driftScore}>4.2%</Text>
        </View>
      </Card>

      <View style={styles.allocationsContainer}>
        {currentAllocations.map(renderAllocationSlider)}
      </View>

      <View style={styles.actionsContainer}>
        <Button
          title="Calculate Trades"
          onPress={handleCalculateTrades}
          containerStyle={styles.actionButton}
        />
        <Button
          title="Reset to Targets"
          type="outline"
          onPress={handleReset}
          containerStyle={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  balanceValue: {
    fontWeight: 'bold',
  },
  driftScore: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  allocationsContainer: {
    padding: 15,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  assetSymbol: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  currentAllocation: {
    color: '#666',
  },
  sliderThumb: {
    backgroundColor: '#2980b9',
  },
  sliderTrack: {
    height: 4,
  },
  allocationValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  difference: {
    fontWeight: 'bold',
  },
  actionsContainer: {
    padding: 15,
  },
  actionButton: {
    marginBottom: 10,
  },
});

export default PortfolioRebalancing; 