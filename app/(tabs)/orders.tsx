import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Modal, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/theme';
import { CloseIcon, ShirtIcon, ChevronForwardIcon } from '../../components/icons';

const orders = [
  {
    id: 1,
    type: 'Wash & Fold',
    status: 'In Progress',
    date: 'Oct 15, 2023',
    items: [
      { name: 'T-Shirts', quantity: 3, price: '$9.00' },
      { name: 'Pants', quantity: 2, price: '$10.00' },
    ],
    totalItems: '5 items',
    price: '$25.50',
    statusColor: '#FF9500',
    address: '123 Main St, New York, NY 10001',
    notes: 'Please handle with care',
    estimatedCompletion: '5:30 PM',
  },
  {
    id: 2,
    type: 'Dry Cleaning',
    status: 'Ready',
    date: 'Oct 14, 2023',
    items: [
      { name: 'Suit', quantity: 1, price: '$25.00' },
      { name: 'Dress Shirts', quantity: 2, price: '$20.00' },
    ],
    totalItems: '3 items',
    price: '$45.00',
    statusColor: '#34C759',
    address: '456 Park Ave, New York, NY 10022',
    notes: 'Light starch on shirts',
    estimatedCompletion: 'Ready for pickup',
  },
  {
    id: 3,
    type: 'Express Service',
    status: 'Delivered',
    date: 'Oct 12, 2023',
    items: [
      { name: 'Bedding Set', quantity: 1, price: '$20.75' },
      { name: 'Towels', quantity: 6, price: '$15.00' },
    ],
    totalItems: '7 items',
    price: '$35.75',
    statusColor: '#8E8E93',
    address: '789 Broadway, New York, NY 10003',
    notes: 'Delivered to doorman',
    deliveredAt: '3:45 PM',
  },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'ready', label: 'Ready' },
  { id: 'delivered', label: 'Delivered' },
];

export default function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { isDark } = useTheme();

  const filteredOrders = useCallback(() => {
    if (activeTab === 'all') return orders;
    const statusMap = {
      'in-progress': 'In Progress',
      'ready': 'Ready',
      'delivered': 'Delivered',
    };
    return orders.filter(order => order.status === statusMap[activeTab]);
  }, [activeTab]);

  const OrderCard = ({ order, onPress }) => (
    <TouchableOpacity 
      style={[styles.orderCard, isDark && styles.orderCardDark]} 
      onPress={onPress}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderType}>
          <ShirtIcon size={24} color="#007AFF" />
          <Text style={[styles.orderTypeText, isDark && styles.textDark]}>{order.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${order.statusColor}20` }]}>
          <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>Date</Text>
          <Text style={[styles.detailValue, isDark && styles.textDark]}>{order.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>Items</Text>
          <Text style={[styles.detailValue, isDark && styles.textDark]}>{order.totalItems}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, isDark && styles.textMutedDark]}>Total</Text>
          <Text style={[styles.detailValue, isDark && styles.textDark]}>{order.price}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewDetailsButton} onPress={onPress}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronForwardIcon size={20} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const OrderDetailsModal = ({ order, visible, onClose }) => {
    if (!order) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
          <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
            <View style={[styles.modalHeader, isDark && styles.modalHeaderDark]}>
              <View style={styles.modalHeaderContent}>
                <Text style={[styles.modalTitle, isDark && styles.textDark]}>Order Details</Text>
                <View style={[styles.modalStatusBadge, { backgroundColor: `${order.statusColor}20` }]}>
                  <Text style={[styles.modalStatusText, { color: order.statusColor }]}>{order.status}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <CloseIcon size={24} color={isDark ? '#8E8E93' : '#8E8E93'} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}>
              <View style={[styles.section, isDark && styles.sectionDark]}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Order Information</Text>
                <View style={styles.sectionContent}>
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, isDark && styles.textMutedDark]}>Order Type</Text>
                    <Text style={[styles.infoValue, isDark && styles.textDark]}>{order.type}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, isDark && styles.textMutedDark]}>Date</Text>
                    <Text style={[styles.infoValue, isDark && styles.textDark]}>{order.date}</Text>
                  </View>
                  {order.estimatedCompletion && (
                    <View style={styles.infoRow}>
                      <Text style={[styles.infoLabel, isDark && styles.textMutedDark]}>Est. Completion</Text>
                      <Text style={[styles.infoValue, isDark && styles.textDark]}>{order.estimatedCompletion}</Text>
                    </View>
                  )}
                  {order.deliveredAt && (
                    <View style={styles.infoRow}>
                      <Text style={[styles.infoLabel, isDark && styles.textMutedDark]}>Delivered At</Text>
                      <Text style={[styles.infoValue, isDark && styles.textDark]}>{order.deliveredAt}</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={[styles.section, isDark && styles.sectionDark]}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Items</Text>
                <View style={styles.sectionContent}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        <Text style={[styles.itemName, isDark && styles.textDark]}>{item.name}</Text>
                        <Text style={[styles.itemQuantity, isDark && styles.textMutedDark]}>Qty: {item.quantity}</Text>
                      </View>
                      <Text style={[styles.itemPrice, isDark && styles.textDark]}>{item.price}</Text>
                    </View>
                  ))}
                  <View style={styles.totalRow}>
                    <Text style={[styles.totalLabel, isDark && styles.textDark]}>Total</Text>
                    <Text style={styles.totalAmount}>{order.price}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.section, isDark && styles.sectionDark]}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Delivery Address</Text>
                <View style={styles.sectionContent}>
                  <Text style={[styles.address, isDark && styles.textDark]}>{order.address}</Text>
                </View>
              </View>

              {order.notes && (
                <View style={[styles.section, isDark && styles.sectionDark]}>
                  <View style={styles.notesHeader}>
                    <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Notes</Text>
                    {order.status === 'In Progress' && (
                      <TouchableOpacity 
                        onPress={() => {
                          setEditingNote(!editingNote);
                          setNoteText(order.notes);
                        }}>
                        <Text style={styles.editButton}>
                          {editingNote ? 'Save' : 'Edit'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.sectionContent}>
                    {editingNote && order.status === 'In Progress' ? (
                      <TextInput
                        style={[styles.noteInput, isDark && styles.noteInputDark]}
                        value={noteText}
                        onChangeText={setNoteText}
                        multiline
                        placeholder="Add your notes here..."
                        placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                      />
                    ) : (
                      <Text style={[styles.notes, isDark && styles.textDark]}>{order.notes}</Text>
                    )}
                  </View>
                </View>
              )}

              {order.status === 'In Progress' && (
                <TouchableOpacity style={[styles.supportButton, isDark && styles.supportButtonDark]}>
                  <ShirtIcon size={20} color="#007AFF" />
                  <Text style={styles.supportButtonText}>Contact Support</Text>
                </TouchableOpacity>
              )}
              
              <View style={styles.bottomPadding} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.textDark]}>My Orders</Text>
        <TouchableOpacity style={[styles.filterButton, isDark && styles.filterButtonDark]}>
          <ShirtIcon size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabsContainer, isDark && styles.tabsContainerDark]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}>
          {TABS.map((tab) => (
            <Pressable
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.id)}>
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
                isDark && styles.textMutedDark,
                activeTab === tab.id && isDark && styles.activeTabText,
              ]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredOrders().map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onPress={() => {
              setSelectedOrder(order);
              setModalVisible(true);
              setEditingNote(false);
            }}
          />
        ))}
      </ScrollView>

      <OrderDetailsModal
        order={selectedOrder}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedOrder(null);
          setEditingNote(false);
        }}
      />
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
  },
  headerDark: {
    backgroundColor: '#1C1C1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
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
  filterButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tabsContainerDark: {
    backgroundColor: '#1C1C1E',
    borderBottomColor: '#2C2C2E',
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTypeText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  viewDetailsText: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainerDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalContentDark: {
    backgroundColor: '#000',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeaderDark: {
    backgroundColor: '#1C1C1E',
    borderBottomColor: '#2C2C2E',
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  modalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modalStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalScroll: {
    padding: 20,
  },
  modalScrollContent: {
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionDark: {
    backgroundColor: '#1C1C1E',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    color: '#000',
  },
  sectionContent: {
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
    color: '#000',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#8E8E93',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  address: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1C1C1E',
  },
  notes: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1C1C1E',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 10,
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
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  editButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  noteInput: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1C1C1E',
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  noteInputDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3C3C3E',
    color: '#fff',
  },
  bottomPadding: {
    height: 40,
  },
  textDark: {
    color: '#fff',
  },
  textMutedDark: {
    color: '#8E8E93',
  },
});