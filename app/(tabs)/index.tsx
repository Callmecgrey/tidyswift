import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import {
  CheckmarkCircleIcon,
  LocationPinIcon,
  WaterIcon,
  CheckmarkDoneCircleIcon,
  BellIcon,
  ClockIcon,
  ChatIcon,
} from '../../components/icons';

const orderSteps = [
  {
    id: 1,
    title: 'Order Picked Up',
    description: 'Your clothes have been picked up',
    time: '10:30 AM',
    completed: true,
    icon: CheckmarkCircleIcon,
  },
  {
    id: 2,
    title: 'On the Way to Laundromat',
    description: 'Driver is heading to the laundromat',
    time: '10:45 AM',
    completed: false,
    icon: LocationPinIcon,
  },
  {
    id: 3,
    title: 'At Laundromat',
    description: 'Your clothes are being cleaned',
    time: '11:15 AM',
    completed: false,
    icon: WaterIcon,
  },
  {
    id: 4,
    title: 'Ready for Delivery',
    description: 'Your clothes will be delivered soon',
    time: '12:30 PM',
    completed: false,
    icon: CheckmarkDoneCircleIcon,
  },
];

const location = {
  latitude: 40.7128,
  longitude: -74.0060,
};

const getStaticMapUrl = (lat: number, lng: number) => {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+007AFF(${lng},${lat})/${lng},${lat},14/800x400@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGVhcjEyMzQ1Njc4OTBwbGFjZWhvbGRlciJ9.dGVpbG9ja2V5`;
};

export default function HomeScreen() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.locationContainer}>
          <LocationPinIcon size={24} color="#007AFF" />
          <Text style={[styles.location, isDark && styles.textDark]}>123 Main St, New York</Text>
        </View>
        <TouchableOpacity style={[styles.notificationButton, isDark && styles.notificationButtonDark]}>
          <BellIcon size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={[styles.orderCard, isDark && styles.orderCardDark]}>
          <View style={styles.orderHeader}>
            <View style={styles.orderInfo}>
              <Text style={[styles.orderTitle, isDark && styles.textDark]}>Live Tracking</Text>
              <Text style={[styles.orderNumber, isDark && styles.textMutedDark]}>#12345</Text>
            </View>
            <View style={[styles.estimatedTime, isDark && styles.estimatedTimeDark]}>
              <ClockIcon size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
              <Text style={[styles.estimatedTimeText, isDark && styles.textMutedDark]}>Est. completion: 12:30 PM</Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <Image
              source={{ uri: getStaticMapUrl(location.latitude, location.longitude) }}
              style={styles.map}
              resizeMode="cover"
            />
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <LocationPinIcon size={24} color="#007AFF" />
              </View>
            </View>
          </View>

          <View style={styles.progressContainer}>
            {orderSteps.map((step, index) => (
              <View key={step.id} style={styles.stepContainer}>
                <View style={styles.stepLeft}>
                  <View style={[
                    styles.stepIconContainer,
                    step.completed && styles.stepIconCompleted,
                    isDark && styles.stepIconContainerDark,
                    step.completed && isDark && styles.stepIconCompletedDark
                  ]}>
                    <step.icon 
                      size={20} 
                      color={step.completed ? '#fff' : isDark ? '#8E8E93' : '#8E8E93'} 
                    />
                  </View>
                  {index < orderSteps.length - 1 && (
                    <View style={[
                      styles.stepLine,
                      step.completed && styles.stepLineCompleted,
                      isDark && styles.stepLineDark,
                      step.completed && isDark && styles.stepLineCompletedDark
                    ]} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={[styles.stepTitle, isDark && styles.textDark]}>{step.title}</Text>
                    <Text style={[styles.stepTime, isDark && styles.textMutedDark]}>{step.time}</Text>
                  </View>
                  <Text style={[styles.stepDescription, isDark && styles.textMutedDark]}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={[styles.supportButton, isDark && styles.supportButtonDark]}>
            <ChatIcon size={20} color="#007AFF" />
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
  containerDark: {
    backgroundColor: '#000',
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
  headerDark: {
    backgroundColor: '#1C1C1E',
    borderBottomColor: '#2C2C2E',
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
    color: '#000',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  scrollView: {
    flex: 1,
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
  orderCardDark: {
    backgroundColor: '#1C1C1E',
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
    color: '#000',
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
  estimatedTimeDark: {
    backgroundColor: '#2C2C2E',
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
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -22 }, { translateY: -22 }],
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
  stepIconContainerDark: {
    backgroundColor: '#2C2C2E',
  },
  stepIconCompleted: {
    backgroundColor: '#34C759',
  },
  stepIconCompletedDark: {
    backgroundColor: '#30D158',
  },
  stepLine: {
    width: 3,
    height: 32,
    backgroundColor: '#E5E5EA',
    marginVertical: 6,
  },
  stepLineDark: {
    backgroundColor: '#2C2C2E',
  },
  stepLineCompleted: {
    backgroundColor: '#34C759',
  },
  stepLineCompletedDark: {
    backgroundColor: '#30D158',
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
    color: '#000',
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
  supportButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  supportButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  textDark: {
    color: '#fff',
  },
  textMutedDark: {
    color: '#8E8E93',
  },
});