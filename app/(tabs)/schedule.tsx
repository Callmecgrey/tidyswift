import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  { 
    id: 1, 
    name: 'Wash & Dry', 
    icon: 'shirt',
    description: 'Professional washing and drying service'
  },
  { 
    id: 2, 
    name: 'Dry Cleaning', 
    icon: 'shirt-outline',
    description: 'Expert care for delicate garments'
  },
  { 
    id: 3, 
    name: 'Shoe Cleaning', 
    icon: 'footsteps',
    description: 'Restore your shoes to like-new condition'
  },
  { 
    id: 4, 
    name: 'Car Cleaning', 
    icon: 'car',
    description: 'Interior and exterior car detailing'
  },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM',
];

export default function ScheduleScreen() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateNumber = (date) => {
    return date.getDate();
  };

  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getDateDescription = (date) => {
    if (!date) return '';
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getTimeDescription = (time) => {
    if (!time) return '';
    return time.toLowerCase().includes('am') ? 'this morning' : 'this afternoon';
  };

  const isTimeSlotAvailable = (time) => {
    if (!selectedDate) return true;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    // If selected date is in the future, all time slots are available
    if (selectedDay > today) return true;
    
    // If selected date is today, check if the time has passed
    if (selectedDay.getTime() === today.getTime()) {
      const [timeStr, period] = time.split(' ');
      const [hours, minutes] = timeStr.split(':');
      let timeHours = parseInt(hours);
      
      // Convert to 24-hour format
      if (period === 'PM' && timeHours !== 12) timeHours += 12;
      if (period === 'AM' && timeHours === 12) timeHours = 0;
      
      const timeDate = new Date();
      timeDate.setHours(timeHours, parseInt(minutes), 0, 0);
      
      return timeDate > now;
    }
    
    return false;
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Select a Service</Text>

        <Text style={styles.sectionTitle}>Select Service</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <View style={styles.dropdownButtonContent}>
              {selectedService ? (
                <>
                  <Ionicons
                    name={selectedServiceData.icon}
                    size={24}
                    color="#007AFF"
                  />
                  <Text style={styles.selectedServiceText}>
                    {selectedServiceData.name}
                  </Text>
                </>
              ) : (
                <Text style={styles.placeholderText}>Choose a service</Text>
              )}
            </View>
            <Ionicons
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#8E8E93"
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.dropdownItem,
                    selectedService === service.id && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedService(service.id);
                    setIsDropdownOpen(false);
                  }}>
                  <View style={styles.dropdownItemContent}>
                    <View style={styles.serviceIcon}>
                      <Ionicons
                        name={service.icon}
                        size={24}
                        color={selectedService === service.id ? '#007AFF' : '#8E8E93'}
                      />
                    </View>
                    <View style={styles.serviceText}>
                      <Text style={[
                        styles.serviceName,
                        selectedService === service.id && styles.serviceNameSelected,
                      ]}>
                        {service.name}
                      </Text>
                      <Text style={styles.serviceDescription}>
                        {service.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {selectedService && (
          <>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesContainer}>
              {getNextDays().map((date) => (
                <TouchableOpacity
                  key={date.toISOString()}
                  style={[
                    styles.dateCard,
                    selectedDate?.toDateString() === date.toDateString() && styles.dateCardSelected,
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setSelectedTime(null); // Reset time when date changes
                  }}>
                  <Text
                    style={[
                      styles.dayName,
                      selectedDate?.toDateString() === date.toDateString() && styles.dateTextSelected,
                    ]}>
                    {getDayName(date)}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumber,
                      selectedDate?.toDateString() === date.toDateString() && styles.dateTextSelected,
                    ]}>
                    {getDateNumber(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedDate && (
              <>
                <Text style={styles.sectionTitle}>Select Time</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlotsContainer}>
                  {timeSlots.map((time) => {
                    const available = isTimeSlotAvailable(time);
                    return (
                      <TouchableOpacity
                        key={time}
                        style={[
                          styles.timeSlot,
                          selectedTime === time && styles.timeSlotSelected,
                          !available && styles.timeSlotUnavailable,
                        ]}
                        onPress={() => available && setSelectedTime(time)}
                        disabled={!available}>
                        <Ionicons
                          name="time"
                          size={20}
                          color={
                            !available ? '#C7C7CC' :
                            selectedTime === time ? '#fff' : '#8E8E93'
                          }
                          style={styles.timeIcon}
                        />
                        <Text
                          style={[
                            styles.timeText,
                            selectedTime === time && styles.timeTextSelected,
                            !available && styles.timeTextUnavailable,
                          ]}>
                          {time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </>
            )}
          </>
        )}

        {selectedService && selectedDate && selectedTime && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Service Summary</Text>
            <Text style={styles.summaryText}>
              Service: {selectedServiceData.name}{'\n'}
              Date: {getDateDescription(selectedDate)}{'\n'}
              Time: {selectedTime} {getTimeDescription(selectedTime)}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.scheduleButton,
            (!selectedService || !selectedTime || !selectedDate) && styles.scheduleButtonDisabled,
          ]}
          disabled={!selectedService || !selectedTime || !selectedDate}>
          <Text style={styles.scheduleButtonText}>Schedule Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedServiceText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
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
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dropdownItemSelected: {
    backgroundColor: '#F2F2F7',
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceText: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceNameSelected: {
    color: '#007AFF',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  datesContainer: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateCard: {
    width: 65,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  dateCardSelected: {
    backgroundColor: '#007AFF',
  },
  dayName: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '600',
  },
  dateTextSelected: {
    color: '#fff',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
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
  timeSlotSelected: {
    backgroundColor: '#007AFF',
  },
  timeSlotUnavailable: {
    backgroundColor: '#F2F2F7',
    opacity: 0.7,
  },
  timeIcon: {
    marginRight: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
  timeTextSelected: {
    color: '#fff',
  },
  timeTextUnavailable: {
    color: '#C7C7CC',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
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
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#636366',
  },
  scheduleButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  scheduleButtonDisabled: {
    backgroundColor: '#A2A2A2',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});