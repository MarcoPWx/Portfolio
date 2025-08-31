'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Package,
  Download,
  Trash2,
  Settings,
  Activity,
  ChevronRight,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Key,
  Smartphone,
  Mail,
  Globe,
  Database,
  FileText,
  LogOut,
  RefreshCw,
  Zap,
  Star,
  Users,
  Building,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../auth/authStore';
import { Card, Metric, Text, Title, BarList, Flex, Grid, ProgressBar, Badge } from '@tremor/react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'active' | 'locked' | 'beta' | 'coming-soon';
  lastAccessed?: string;
  usage?: number;
  limit?: number;
  color: 'blue' | 'purple' | 'green' | 'orange';
  badge?: string;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'api_key' | '2fa';
  description: string;
  timestamp: string;
  location?: string;
  device?: string;
}

export default function AccountDashboard() {
  const { user, subscription, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [isExportingData, setIsExportingData] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  interface ApiKey {
    key: string;
    created: string;
    name: string;
  }
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const products: Product[] = [
    {
      id: 'devmentor',
      name: 'DevMentor',
      description: 'AI-powered development assistant',
      icon: Zap,
      status: subscription?.tier === 'free' ? 'locked' : 'active',
      lastAccessed: '2 hours ago',
      usage: 1250,
      limit: 5000,
      color: 'blue',
    },
    {
      id: 'quizmentor',
      name: 'QuizMentor',
      description: 'Interactive learning platform',
      icon: Star,
      status: 'active',
      lastAccessed: '1 day ago',
      usage: 450,
      limit: 1000,
      color: 'purple',
    },
    {
      id: 'harvest',
      name: 'Harvest.ai',
      description: 'Data insights and analytics',
      icon: TrendingUp,
      status:
        subscription?.tier === 'pro' || subscription?.tier === 'enterprise' ? 'active' : 'locked',
      lastAccessed: '3 days ago',
      usage: 890,
      limit: 2000,
      color: 'green',
    },
    {
      id: 'omni',
      name: 'Omni.ai',
      description: 'Free open-source AI toolkit',
      icon: Globe,
      status: 'active', // Always free and open-source
      lastAccessed: 'Never',
      usage: undefined, // No usage tracking for open-source
      limit: undefined,
      color: 'orange',
      badge: 'Open Source',
    },
  ];

  const subscriptionTiers = [
    {
      name: 'Free',
      price: '$0',
      features: ['QuizMentor Access', '100 API calls/month', 'Community support'],
      current: subscription?.tier === 'free',
    },
    {
      name: 'Pro',
      price: '$29/mo',
      features: ['All products', '5,000 API calls/month', 'Priority support', 'Advanced analytics'],
      current: subscription?.tier === 'pro',
      recommended: true,
    },
    {
      name: 'Team',
      price: '$99/mo',
      features: ['All Pro features', '20,000 API calls/month', '5 team members', 'SSO'],
      current: subscription?.tier === 'team',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited everything', 'Custom integrations', 'Dedicated support', 'SLA'],
      current: subscription?.tier === 'enterprise',
    },
  ];

  const handleDataExport = async () => {
    setIsExportingData(true);
    try {
      // Simulate API call to export user data
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success('Your data has been exported and sent to your email');
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
    } finally {
      setIsExportingData(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!window.confirm('Are you absolutely sure? This action cannot be undone.')) return;

    setIsDeletingAccount(true);
    try {
      // Simulate API call to delete account
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success('Account deletion request submitted. You will receive a confirmation email.');
      logout();
    } catch (error) {
      toast.error('Failed to delete account. Please contact support.');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const generateApiKey = async () => {
    try {
      const newKey = `nq_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      setApiKeys([
        ...apiKeys,
        { key: newKey, created: new Date().toISOString(), name: 'New API Key' },
      ]);
      toast.success('API key generated successfully');
    } catch (error) {
      toast.error('Failed to generate API key');
    }
  };

  useEffect(() => {
    // Simulate loading security events
    setSecurityEvents([
      {
        id: '1',
        type: 'login',
        description: 'Successful login',
        timestamp: '2024-01-26 14:30:00',
        location: 'San Francisco, CA',
        device: 'Chrome on Mac',
      },
      {
        id: '2',
        type: '2fa',
        description: 'Two-factor authentication enabled',
        timestamp: '2024-01-25 10:15:00',
      },
      {
        id: '3',
        type: 'api_key',
        description: 'API key generated',
        timestamp: '2024-01-24 16:45:00',
      },
    ]);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Usage Overview */}
            <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
              <Card>
                <Text>Active Products</Text>
                <Metric>{products.filter((p) => p.status === 'active').length}</Metric>
                <Text className="text-green-600">All systems operational</Text>
              </Card>
              <Card>
                <Text>API Usage This Month</Text>
                <Metric>2,590</Metric>
                <ProgressBar value={51.8} color="blue" className="mt-2" />
                <Text className="text-gray-500 text-sm">51.8% of limit</Text>
              </Card>
              <Card>
                <Text>Team Members</Text>
                <Metric>{subscription?.teamMembers || 1}</Metric>
                <Text className="text-gray-500">of {subscription?.teamLimit || 1} seats</Text>
              </Card>
              <Card>
                <Text>Current Plan</Text>
                <Metric>{subscription?.tier || 'Free'}</Metric>
                <button className="mt-2 text-blue-600 hover:text-blue-500 text-sm font-medium">
                  Upgrade →
                </button>
              </Card>
            </Grid>

            {/* Products Grid */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Your Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => {
                  const Icon = product.icon;
                  const isLocked = product.status === 'locked';

                  return (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-6 rounded-xl border ${
                        isLocked
                          ? 'bg-gray-900/50 border-gray-700 opacity-75'
                          : 'bg-gray-800/50 border-gray-600 hover:border-blue-500/50'
                      } transition-all cursor-pointer`}
                    >
                      {isLocked && (
                        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-400 font-medium">Upgrade to unlock</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg bg-${product.color}-500/10`}>
                            <Icon className={`w-6 h-6 text-${product.color}-500`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                            <p className="text-gray-400 text-sm">{product.description}</p>
                            {product.lastAccessed && (
                              <p className="text-gray-500 text-xs mt-1">
                                Last accessed: {product.lastAccessed}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge
                          color={
                            product.status === 'active'
                              ? 'green'
                              : product.status === 'beta'
                                ? 'yellow'
                                : 'gray'
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>

                      {product.usage !== undefined && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Usage</span>
                            <span className="text-gray-300">
                              {product.usage.toLocaleString()} / {product.limit?.toLocaleString()}
                            </span>
                          </div>
                          <ProgressBar
                            value={(product.usage / (product.limit || 1)) * 100}
                            color={product.color}
                          />
                        </div>
                      )}

                      <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                        {isLocked ? 'Upgrade to access' : 'Open dashboard'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <Title>Recent Activity</Title>
              <div className="mt-4 space-y-3">
                {securityEvents.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      {event.type === 'login' && <Activity className="w-4 h-4 text-green-400" />}
                      {event.type === '2fa' && <Shield className="w-4 h-4 text-blue-400" />}
                      {event.type === 'api_key' && <Key className="w-4 h-4 text-purple-400" />}
                      <div>
                        <Text className="font-medium text-white">{event.description}</Text>
                        {event.location && (
                          <Text className="text-gray-500 text-sm">
                            {event.location} • {event.device}
                          </Text>
                        )}
                      </div>
                    </div>
                    <Text className="text-gray-500 text-sm">{event.timestamp}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Subscription Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subscriptionTiers.map((tier) => (
                  <motion.div
                    key={tier.name}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 rounded-xl border ${
                      tier.current
                        ? 'bg-blue-900/20 border-blue-500'
                        : 'bg-gray-800/50 border-gray-600'
                    } ${tier.recommended ? 'ring-2 ring-green-500' : ''}`}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge color="green">Recommended</Badge>
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                    <p className="text-2xl font-bold text-white mt-2">{tier.price}</p>

                    <ul className="mt-4 space-y-2">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full mt-6 px-4 py-2 rounded-lg font-medium transition-all ${
                        tier.current
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={tier.current}
                    >
                      {tier.current ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <Card>
              <Title>Payment Method</Title>
              <div className="mt-4 p-4 bg-gray-700/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                  <div>
                    <Text className="font-medium text-white">•••• •••• •••• 4242</Text>
                    <Text className="text-gray-500 text-sm">Expires 12/25</Text>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 font-medium">Update</button>
              </div>
            </Card>

            {/* Billing History */}
            <Card>
              <Title>Billing History</Title>
              <div className="mt-4 space-y-2">
                {[
                  {
                    date: 'Jan 1, 2024',
                    amount: '$29.00',
                    status: 'Paid',
                    invoice: '#INV-2024-001',
                  },
                  {
                    date: 'Dec 1, 2023',
                    amount: '$29.00',
                    status: 'Paid',
                    invoice: '#INV-2023-012',
                  },
                  {
                    date: 'Nov 1, 2023',
                    amount: '$29.00',
                    status: 'Paid',
                    invoice: '#INV-2023-011',
                  },
                ].map((invoice, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
                  >
                    <div>
                      <Text className="font-medium text-white">{invoice.amount}</Text>
                      <Text className="text-gray-500 text-sm">
                        {invoice.date} • {invoice.invoice}
                      </Text>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge color="green">{invoice.status}</Badge>
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Security Overview */}
            <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <Text>Two-Factor Auth</Text>
                    <Metric className="mt-2">{twoFactorEnabled ? 'Enabled' : 'Disabled'}</Metric>
                  </div>
                  <Shield
                    className={`w-8 h-8 ${twoFactorEnabled ? 'text-green-400' : 'text-gray-400'}`}
                  />
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                >
                  {twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
                </button>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <Text>Active Sessions</Text>
                    <Metric className="mt-2">3</Metric>
                  </div>
                  <Smartphone className="w-8 h-8 text-blue-400" />
                </div>
                <button className="mt-4 text-blue-400 hover:text-blue-300 font-medium">
                  Manage Sessions
                </button>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <Text>API Keys</Text>
                    <Metric className="mt-2">{apiKeys.length}</Metric>
                  </div>
                  <Key className="w-8 h-8 text-purple-400" />
                </div>
                <button
                  onClick={generateApiKey}
                  className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                >
                  Generate New Key
                </button>
              </Card>
            </Grid>

            {/* API Keys */}
            {apiKeys.length > 0 && (
              <Card>
                <Title>API Keys</Title>
                <div className="mt-4 space-y-2">
                  {apiKeys.map((key, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-700/30 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <Text className="font-medium text-white font-mono">
                          {key.key.substring(0, 20)}...
                        </Text>
                        <Text className="text-gray-500 text-sm">Created: {key.created}</Text>
                      </div>
                      <button className="text-red-400 hover:text-red-300">Revoke</button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Security Events */}
            <Card>
              <Title>Security Events</Title>
              <div className="mt-4 space-y-3">
                {securityEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      {event.type === 'login' && <Activity className="w-4 h-4 text-green-400" />}
                      {event.type === 'logout' && <LogOut className="w-4 h-4 text-gray-400" />}
                      {event.type === 'password_change' && (
                        <RefreshCw className="w-4 h-4 text-yellow-400" />
                      )}
                      {event.type === '2fa' && <Shield className="w-4 h-4 text-blue-400" />}
                      {event.type === 'api_key' && <Key className="w-4 h-4 text-purple-400" />}
                      <div>
                        <Text className="font-medium text-white">{event.description}</Text>
                        {event.location && (
                          <Text className="text-gray-500 text-sm">
                            {event.location} • {event.device}
                          </Text>
                        )}
                      </div>
                    </div>
                    <Text className="text-gray-500 text-sm">{event.timestamp}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <Card>
              <Title>Privacy & Data Management</Title>
              <Text className="mt-2 text-gray-400">
                Manage your personal data in compliance with GDPR and other privacy regulations.
              </Text>
            </Card>

            {/* Data Export */}
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <Title>Export Your Data</Title>
                  <Text className="mt-2 text-gray-400">
                    Download all your personal data in a machine-readable format (JSON). This
                    includes your profile, activity history, and all associated data.
                  </Text>
                </div>
                <Download className="w-8 h-8 text-blue-400" />
              </div>
              <button
                onClick={handleDataExport}
                disabled={isExportingData}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isExportingData ? 'Exporting...' : 'Export All Data'}
              </button>
            </Card>

            {/* Data Deletion */}
            <Card className="border-red-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <Title className="text-red-400">Delete Account</Title>
                  <Text className="mt-2 text-gray-400">
                    Permanently delete your account and all associated data. This action cannot be
                    undone.
                  </Text>
                </div>
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-medium">Warning: This will permanently delete:</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-gray-400">
                      <li>Your account and profile information</li>
                      <li>All product data and settings</li>
                      <li>API keys and integrations</li>
                      <li>Billing and subscription information</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAccountDeletion}
                disabled={isDeletingAccount}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isDeletingAccount ? 'Processing...' : 'Delete Account'}
              </button>
            </Card>

            {/* Data Sharing */}
            <Card>
              <Title>Data Sharing Preferences</Title>
              <div className="mt-4 space-y-4">
                {[
                  { label: 'Share usage data for product improvement', enabled: true },
                  { label: 'Receive product updates and newsletters', enabled: true },
                  { label: 'Share data with third-party analytics', enabled: false },
                  { label: 'Participate in beta features', enabled: true },
                ].map((pref, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  >
                    <Text className="text-white">{pref.label}</Text>
                    <button
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        pref.enabled ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 ${
                          pref.enabled ? 'left-6' : 'left-0.5'
                        } w-5 h-5 bg-white rounded-full transition-all`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Data Retention */}
            <Card>
              <Title>Data Retention</Title>
              <Text className="mt-2 text-gray-400">
                Your data is retained according to our data retention policy:
              </Text>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                  <Text className="text-white">Account data</Text>
                  <Text className="text-gray-400">Until deletion requested</Text>
                </div>
                <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                  <Text className="text-white">Activity logs</Text>
                  <Text className="text-gray-400">90 days</Text>
                </div>
                <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                  <Text className="text-white">API logs</Text>
                  <Text className="text-gray-400">30 days</Text>
                </div>
                <div className="flex justify-between p-3 bg-gray-700/30 rounded-lg">
                  <Text className="text-white">Billing records</Text>
                  <Text className="text-gray-400">7 years (legal requirement)</Text>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Account Dashboard</h1>
              <p className="text-gray-400 mt-1">Manage your NatureQuest ecosystem account</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge color="green" size="lg">
                {subscription?.tier || 'Free'} Plan
              </Badge>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800/50 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'billing', label: 'Billing', icon: CreditCard },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'privacy', label: 'Privacy & GDPR', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
