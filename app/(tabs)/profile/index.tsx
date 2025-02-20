import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  PersonIcon,
  CardIcon,
  LocationPinIcon,
  BellIcon,
  InfoIcon,
  HelpIcon,
  CameraIcon,
  ChevronForwardIcon,
} from '../../../components/icons';
import { useTheme } from '../../context/theme';

const menuItems = [
  { id: 1, title: 'Personal Information', icon: PersonIcon, color: '#007AFF', route: '/Profile/personal-info' },
  { id: 2, title: 'Payment Methods', icon: CardIcon, color: '#FF9500', route: '/Profile/payment-methods' },
  { id: 3, title: 'Addresses', icon: LocationPinIcon, color: '#FF2D55', route: '/Profile/addresses' },
  { id: 4, title: 'Notifications', icon: BellIcon, color: '#5856D6', route: '/Profile/notifications' },
  { id: 5, title: 'Help & Support', icon: HelpIcon, color: '#34C759', route: '/Profile/help-support' },
  { id: 6, title: 'About', icon: InfoIcon, color: '#8E8E93', route: '/Profile/about' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { isDark, theme, setTheme } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image');
    }
  };

  const handleLogout = () => {
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.profileSection, isDark && styles.profileSectionDark]}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
              )}
              <TouchableOpacity 
                style={[styles.editAvatarButton, isDark && styles.editAvatarButtonDark]} 
                onPress={pickImage}
              >
                <CameraIcon size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.name, isDark && styles.textDark]}>John Doe</Text>
            <Text style={[styles.email, isDark && styles.textMutedDark]}>john.doe@example.com</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Account Settings</Text>
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.menuItem, isDark && styles.menuItemDark]}
                onPress={() => router.push(item.route)}
              >
                <View style={[styles.menuItemIcon, { backgroundColor: `${item.color}20` }]}>
                  <item.icon size={22} color={item.color} />
                </View>
                <Text style={[styles.menuItemText, isDark && styles.textDark]}>{item.title}</Text>
                <ChevronForwardIcon size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.themeSection, isDark && styles.themeSectionDark]}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Appearance</Text>
            <View style={styles.themeButtons}>
              <TouchableOpacity 
                style={[
                  styles.themeButton, 
                  theme === 'light' && styles.themeButtonActive,
                  isDark && styles.themeButtonDark
                ]}
                onPress={() => setTheme('light')}
              >
                <Text style={[
                  styles.themeButtonText,
                  theme === 'light' && styles.themeButtonTextActive,
                  isDark && styles.textDark
                ]}>Light</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.themeButton, 
                  theme === 'dark' && styles.themeButtonActive,
                  isDark && styles.themeButtonDark
                ]}
                onPress={() => setTheme('dark')}
              >
                <Text style={[
                  styles.themeButtonText,
                  theme === 'dark' && styles.themeButtonTextActive,
                  isDark && styles.textDark
                ]}>Dark</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.themeButton, 
                  theme === 'system' && styles.themeButtonActive,
                  isDark && styles.themeButtonDark
                ]}
                onPress={() => setTheme('system')}
              >
                <Text style={[
                  styles.themeButtonText,
                  theme === 'system' && styles.themeButtonTextActive,
                  isDark && styles.textDark
                ]}>System</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  profileSectionDark: {
    borderBottomColor: '#2C2C2E',
    backgroundColor: '#1C1C1E',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButtonDark: {
    borderColor: '#1C1C1E',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
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
  menuItemDark: {
    backgroundColor: '#1C1C1E',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
      },
    }),
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  textMutedDark: {
    color: '#8E8E93',
  },
  themeSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
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
  themeSectionDark: {
    backgroundColor: '#1C1C1E',
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  themeButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  themeButtonActive: {
    backgroundColor: '#007AFF',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  themeButtonTextActive: {
    color: '#fff',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#FF3B30',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});