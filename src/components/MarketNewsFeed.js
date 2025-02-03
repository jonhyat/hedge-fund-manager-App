import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import { useMarketNews } from '../hooks/useMarketNews';

const MarketNewsFeed = () => {
  const { news, loading, fetchMore } = useMarketNews();
  const [selectedCategories, setSelectedCategories] = useState(['all']);

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item)}>
      <Card containerStyle={styles.newsCard}>
        <View style={styles.newsHeader}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.headline}>{item.headline}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {item.summary}
        </Text>
        <View style={styles.tags}>
          {item.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
        <View style={styles.impact}>
          <Icon
            name={item.sentiment === 'positive' ? 'trending-up' : 'trending-down'}
            type="material"
            color={item.sentiment === 'positive' ? '#2ecc71' : '#e74c3c'}
          />
          <Text style={styles.impactText}>Market Impact: {item.impact}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={styles.categoriesContainer}>
            {['all', 'market', 'company', 'economy', 'crypto'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category) && styles.selectedCategory
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsCard: {
    borderRadius: 10,
    marginBottom: 10,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  source: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  timestamp: {
    color: '#7f8c8d',
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    color: '#34495e',
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    color: '#3498db',
    marginRight: 10,
  },
  impact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactText: {
    marginLeft: 5,
    color: '#7f8c8d',
  },
  categoriesContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    padding: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#2980b9',
  },
  categoryText: {
    color: '#2c3e50',
    fontSize: 12,
  },
});

export default MarketNewsFeed; 