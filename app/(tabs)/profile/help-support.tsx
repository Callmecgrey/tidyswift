import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronForwardIcon } from '../../../components/icons';

const faqCategories = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn the basics of using TidyRide',
  },
  {
    id: 2,
    title: 'Orders & Tracking',
    description: 'Information about your orders and delivery',
  },
  {
    id: 3,
    title: 'Payment & Billing',
    description: 'Questions about payments and charges',
  },
  {
    id: 4,
    title: 'Account & Security',
    description: 'Manage your account settings',
  },
];

export default function HelpSupportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Start a Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactButton, styles.contactButtonOutline]}>
            <Text style={styles.contactButtonTextOutline}>Send an Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQ Categories</Text>
          {faqCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
              <ChevronForwardIcon size={20} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          <TouchableOpacity style={styles.resourceItem}>
            <Text style={styles.resourceTitle}>Terms of Service</Text>
            <ChevronForwardIcon size={20} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceItem}>
            <Text style={styles.resourceTitle}>Privacy Policy</Text>
            <ChevronForwardIcon size={20} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceItem}>
            <Text style={styles.resourceTitle}>Service Guidelines</Text>
            <ChevronForwardIcon size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactButtonTextOutline: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  resourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  resourceTitle: {
    fontSize: 16,
  },
});