import axios from 'axios';
import { API_BASE_URL } from '../config';

class PortfolioService {
  async getPortfolioSummary() {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolio/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio summary:', error);
      throw error;
    }
  }

  async getHoldings() {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolio/holdings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching holdings:', error);
      throw error;
    }
  }

  async executeTransaction(transactionData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error;
    }
  }
}

export default new PortfolioService(); 