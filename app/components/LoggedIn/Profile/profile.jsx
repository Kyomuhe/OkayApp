import { ScrollView, Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import profile from '../../../../assets/images/profile2.png';
import MyStories from './myStories';
import Groups from './groups';
import Conversations from './conversations';
import { UserPen } from 'lucide-react-native';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('MyStories');

  const handleEdit = () => {
    console.log('Edit profile pressed');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'MyStories':
        return <MyStories/>
      case 'OngoingConversations':
        return <Conversations/>
      case 'MyGroups':
        return <Groups/>

    }
    // <View style={styles.placeholderContainer}>
    //   <Text style={styles.placeholderText}>
    //     {activeTab} will be implemented later
    //   </Text>
    // </View>

  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editIcon}><UserPen/></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image source={profile} style={styles.profileImage} />
          <Text style={styles.name}>Kyomuhendo Precious</Text>
          <Text style={styles.username}>@preciouskay</Text>
          <Text style={styles.description}>
            This is where the provided description will go
          </Text>

          <View style={styles.followContainer}>
            <Text style={styles.followText}>
              <Text style={styles.followNumber}>1,666</Text> Following
            </Text>
            <Text style={styles.followSeparator}>  </Text>
            <Text style={styles.followText}>
              <Text style={styles.followNumber}>1,686</Text> Followers
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'MyStories' && styles.activeTab]}
            onPress={() => setActiveTab('MyStories')}
          >
            <Text style={[styles.tabText, activeTab === 'MyStories' && styles.activeTabText]}>
              My Stories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'MyGroups' && styles.activeTab]}
            onPress={() => setActiveTab('MyGroups')}
          >
            <Text style={[styles.tabText, activeTab === 'MyGroups' && styles.activeTabText]}>
              My Groups
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'OngoingConversations' && styles.activeTab]}
            onPress={() => setActiveTab('OngoingConversations')}
          >
            <Text style={[styles.tabText, activeTab === 'OngoingConversations' && styles.activeTabText]}>
              Conversations
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 20,
    paddingBottom: 10,
  },
  editIcon: {
    fontSize: 18,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followText: {
    fontSize: 14,
    color: '#6c757d',
  },
  followNumber: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  followSeparator: {
    marginHorizontal: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  placeholderContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
  },
});

export default Profile;