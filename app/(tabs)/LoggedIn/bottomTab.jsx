import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Home, Plus, User } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import HomePage from "./home";
import CreatePost from "./createPost";
import Profile from "./profile";

const BottomTabs = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const renderActivePage = () => {
        switch (activeTab) {
            case 'Home':
                return <HomePage />;
            case 'Add':
                return <CreatePost />;
            case 'Profile':
                return <Profile />;
            default:
                return <HomePage />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {renderActivePage()}
            </View>
            
            <View style={styles.bottomNavContainer}>
                {/* SVG Curved Shape with Notch */}
                <Svg
                    width="100%"
                    height="90"
                    style={styles.svgCurve}
                    viewBox="0 0 400 90"
                    preserveAspectRatio="none"
                >
                    <Path
                        d="M0,20 L140,20 Q160,20 170,30 C175,40 180,45 190,45 L210,45 C220,45 225,40 230,30 Q240,20 260,20 L400,20 L400,90 L0,90 Z"
                        fill="#FFFFFF"
                        stroke="#E5E5EA"
                        strokeWidth="1"
                    />
                </Svg>

                {/* Tab Buttons Container */}
                <View style={styles.tabsContainer}>
                    {/* Home Tab */}
                    <TouchableOpacity
                        onPress={() => setActiveTab('Home')}
                        style={styles.tabButton}
                    >
                        <Home
                            size={24}
                            color={activeTab === 'Home' ? '#0D6EFD' : '#8E8E93'}
                            strokeWidth={activeTab === 'Home' ? 2.5 : 2}
                        />
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 'Home' && styles.activeTabLabel
                            ]}
                        >
                            Home
                        </Text>
                    </TouchableOpacity>

                    {/* Center Add Button - Sits in the notch */}
                    <TouchableOpacity
                        style={styles.addButtonContainer}
                        onPress={() => setActiveTab('Add')}
                    >
                        <View style={styles.addButton}>
                            <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
                        </View>
                    </TouchableOpacity>

                    {/* Profile Tab */}
                    <TouchableOpacity
                        style={styles.tabButton}
                        onPress={() => setActiveTab('Profile')}
                    >
                        <User
                            size={24}
                            color={activeTab === 'Profile' ? '#0D6EFD' : '#8E8E93'}
                            strokeWidth={activeTab === 'Profile' ? 2.5 : 2}
                        />
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 'Profile' && styles.activeTabLabel,
                            ]}
                        >
                            Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginBottom:15,
    },
    content: {
        flex: 1,
    },
    bottomNavContainer: {
        position: 'relative',
        height: 90,
        backgroundColor: 'transparent',
    },
    svgCurve: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 15,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    tabLabel: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 4,
    },
    activeTabLabel: {
        color: '#0D6EFD',
        fontWeight: '600',
    },
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 35,
    },
    addButton: {
        width: 55,
        height: 55,
        borderRadius: 32,
        backgroundColor: '#0D6EFD',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

export default BottomTabs;