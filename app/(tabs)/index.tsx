import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const orderSteps = [
  {
    id: 1,
    title: 'Order Picked Up',
    description: 'Your clothes have been picked up',
    time: '10:30 AM',
    completed: true,
    icon: 'checkmark-circle',
  },
  {
    id: 2,
    title: 'On the Way to Laundromat',
    description: 'Driver is heading to the laundromat',
    time: '10:45 AM',
    completed: false,
    icon: 'car',
  },
  {
    id: 3,
    title: 'At Laundromat',
    description: 'Your clothes are being cleaned',
    time: '11:15 AM',
    completed: false,
    icon: 'water',
  },
  {
    id: 4,
    title: 'Ready for Delivery',
    description: 'Your clothes will be delivered soon',
    time: '12:30 PM',
    completed: false,
    icon: 'checkmark-done-circle',
  },
];

const driverLocation = {
  latitude: 40.7128,
  longitude: -74.0060,
};

const StaticMap = () => (
  <View style={styles.mapContainer}>
    <Image
      source={{ 
        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${driverLocation.latitude},${driverLocation.longitude}&zoom=15&size=600x300&scale=2&markers=color:blue%7C${driverLocation.latitude},${driverLocation.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY` 
      }}
      style={styles.map}
      resizeMode="cover"
      fallback={
        <View style={[styles.map, styles.mapFallback]}>
          <Ionicons name="map" size={40} color="#8E8E93" />
          <Text style={styles.mapFallbackText}>Map preview not available</Text>
        </View>
      }
    />
    <TouchableOpacity style={styles.expandMapButton}>
      <Ionicons name="expand" size={20} color="#007AFF" />
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color="#007AFF" />
          <Text style={styles.location}>123 Main St, New York</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>Live Tracking</Text>
              <Text style={styles.orderNumber}>#12345</Text>
            </View>
            <View style={styles.estimatedTime}>
              <Ionicons name="time-outline" size={20} color="#8E8E93" />
              <Text style={styles.estimatedTimeText}>Est. completion: 12:30 PM</Text>
            </View>
          </View>

          <StaticMap />

          <View style={styles.progressContainer}>
            {orderSteps.map((step, index) => (
              <View key={step.id} style={styles.stepContainer}>
                <View style={styles.stepLeft}>
                  <View style={[styles.stepIconContainer, step.completed && styles.stepIconCompleted]}>
                    <Ionicons 
                      name={step.icon} 
                      size={20} 
                      color={step.completed ? '#fff' : '#8E8E93'} 
                    />
                  </View>
                  {index < orderSteps.length - 1 && (
                    <View style={[styles.stepLine, step.completed && styles.stepLineCompleted]} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepTime}>{step.time}</Text>
                  </View>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
            <Text style={styles.supportButtonText}>Contact Support</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
    flex: 1,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
  orderHeader: {
    marginBottom: 20,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orderNumber: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 10,
    borderRadius: 8,
  },
  estimatedTimeText: {
    marginLeft: 8,
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '500',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#F2F2F7',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
  },
  mapFallbackText: {
    marginTop: 8,
    color: '#8E8E93',
    fontSize: 14,
  },
  expandMapButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  progressContainer: {
    marginTop: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepLeft: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  stepIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconCompleted: {
    backgroundColor: '#34C759',
  },
  stepLine: {
    width: 3,
    height: 32,
    backgroundColor: '#E5E5EA',
    marginVertical: 6,
  },
  stepLineCompleted: {
    backgroundColor: '#34C759',
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  stepTime: {
    fontSize: 13,
    color: '#8E8E93',
  },
  stepDescription: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  supportButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});