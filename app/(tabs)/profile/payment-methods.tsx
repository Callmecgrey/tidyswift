import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardIcon, ChevronForwardIcon } from '../../../components/icons';

const cards = [
  {
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiry: '12/24',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Mastercard',
    last4: '8888',
    expiry: '06/25',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Methods</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {cards.map((card) => (
            <TouchableOpacity key={card.id} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <View style={styles.cardIconContainer}>
                  <CardIcon size={24} color="#007AFF" />
                </View>
                <View>
                  <Text style={styles.cardType}>
                    {card.type} •••• {card.last4}
                    {card.isDefault && <Text style={styles.defaultBadge}> Default</Text>}
                  </Text>
                  <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
                </View>
              </View>
              <ChevronForwardIcon size={20} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <TouchableOpacity style={styles.historyItem}>
            <View>
              <Text style={styles.historyTitle}>View Transaction History</Text>
              <Text style={styles.historySubtitle}>See all your past payments</Text>
            </View>
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
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardType: {
    fontSize: 16,
    marginBottom: 4,
  },
  defaultBadge: {
    color: '#34C759',
    fontSize: 14,
  },
  cardExpiry: {
    fontSize: 14,
    color: '#8E8E93',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
});