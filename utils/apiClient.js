/**
 * Centralized API Client for RideWire AI Hub
 * 
 * Eliminates hardcoded URLs and provides a consistent interface for API calls.
 * Automatically handles authentication tokens and error responses.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get authentication token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get default headers including auth token if available
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make an HTTP request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-OK responses
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse JSON response
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // ==================== Auth Endpoints ====================

  /**
   * Login user
   */
  async login(email, password) {
    const response = await this.post('/login', { email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  }

  /**
   * Register new user
   */
  async register(email, password) {
    const response = await this.post('/register', { email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
  }

  // ==================== Legal Endpoints ====================

  /**
   * Accept legal disclaimer
   */
  async acceptDisclaimer(disclaimerType, version = '1.0.0') {
    return this.post('/api/legal/accept-disclaimer', {
      disclaimerType,
      version,
    });
  }

  /**
   * Check if user has accepted disclaimer
   */
  async checkDisclaimer(disclaimerType, version = null) {
    const params = version ? { version } : {};
    return this.get(`/api/legal/check-disclaimer/${disclaimerType}`, params);
  }

  /**
   * Get all user agreements
   */
  async getUserAgreements() {
    return this.get('/api/legal/user-agreements');
  }

  /**
   * Get current version of a disclaimer
   */
  async getCurrentDisclaimerVersion(disclaimerType) {
    return this.get(`/api/legal/current-version/${disclaimerType}`);
  }

  // ==================== Chat/Message Endpoints ====================

  /**
   * Send message to AI chat
   */
  async sendMessage(message) {
    return this.post('/api/chat/message', { message });
  }

  /**
   * Get chat history
   */
  async getChatHistory(limit = 50, offset = 0) {
    return this.get('/api/chat/history', { limit, offset });
  }

  /**
   * Delete chat history
   */
  async deleteChatHistory() {
    return this.delete('/api/chat/history');
  }

  // ==================== User Endpoints ====================

  /**
   * Get user statistics
   */
  async getUserStats() {
    return this.get('/api/user/stats');
  }

  /**
   * Get user profile
   */
  async getUserProfile() {
    return this.get('/api/user/profile');
  }

  /**
   * Update user profile
   */
  async updateUserProfile(data) {
    return this.put('/api/user/profile', data);
  }

  // ==================== Diagnostic Endpoints ====================

  /**
   * Run AI diagnostic query
   */
  async runDiagnostic(query, vehicleInfo = {}) {
    return this.post('/api/diagnostic/run', {
      query,
      vehicleInfo,
    });
  }

  /**
   * Get diagnostic history
   */
  async getDiagnosticHistory(limit = 20) {
    return this.get('/api/diagnostic/history', { limit });
  }

  // ==================== Admin Endpoints ====================

  /**
   * Get all users (admin only)
   */
  async getAllUsers() {
    return this.get('/api/admin/users');
  }

  /**
   * Get system stats (admin only)
   */
  async getSystemStats() {
    return this.get('/api/admin/stats');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

export default apiClient;

// Also export the class for testing purposes
export { ApiClient };
