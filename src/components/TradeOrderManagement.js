import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon, Overlay } from 'react-native-elements';
import { useTradeOrders } from '../hooks/useTradeOrders';

const TradeOrderManagement = () => {
  const { orders, updateOrder, cancelOrder } = useTradeOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f1c40f',
      executed: '#2ecc71',
      cancelled: '#e74c3c',
      partial: '#3498db',
    };
    return colors[status] || '#666';
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedOrder(item);
      setShowDetails(true);
    }}>
      <Card containerStyle={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.orderType}>{item.type} Order</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Quantity</Text>
            <Text style={styles.value}>{item.quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>${item.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>${(item.quantity * item.price).toFixed(2)}</Text>
          </View>
        </View>

        {item.status === 'pending' && (
          <View style={styles.actions}>
            <Button
              title="Cancel"
              type="outline"
              onPress={() => cancelOrder(item.id)}
              buttonStyle={styles.actionButton}
            />
            <Button
              title="Modify"
              onPress={() => handleModifyOrder(item)}
              buttonStyle={styles.actionButton}
            />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  const renderOrderDetails = () => (
    <Overlay
      isVisible={showDetails}
      onBackdropPress={() => setShowDetails(false)}
      overlayStyle={styles.overlay}
    >
      {selectedOrder && (
        <View>
          <Text style={styles.overlayTitle}>Order Details</Text>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>{selectedOrder.id}</Text>
          </View>
          {/* Add more order details */}
          <Button
            title="Close"
            onPress={() => setShowDetails(false)}
            containerStyle={styles.closeButton}
          />
        </View>
      )}
    </Overlay>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {renderOrderDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  orderCard: {
    borderRadius: 10,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderType: {
    color: '#666',
    fontSize: 14,
  },
  statusBadge: {
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 120,
  },
  overlay: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 15,
  },
  detailLabel: {
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 20,
  },
});

export default TradeOrderManagement; 