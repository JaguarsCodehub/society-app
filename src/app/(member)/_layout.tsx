import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import NotificationProvider from '../../providers/NotificationProvider';
import { Provider as PaperProvider } from 'react-native-paper';

export default function TabLayout() {
    return (
        // <NotificationProvider>
        <PaperProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: '#A67B5B', headerShown: true, }}>
                <Tabs.Screen
                    name="dashboard/dashboard"
                    options={{
                        title: 'Dashboard',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="ledger"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="nomination"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="onlinePayment"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="receipt"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="book-services"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="complaint-register"
                    options={{
                        href: null,
                        headerTitle: "Log a Complaint"
                    }}
                />
                <Tabs.Screen
                    name="complaint-track"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="request-service"
                    options={{
                        href: null,
                        headerTitle: "Request A Service",
                    }}
                />
                <Tabs.Screen
                    name="parking-slot"
                    options={{
                        href: null,
                        headerTitle: "Check Parking Slot",
                    }}
                />
                <Tabs.Screen
                    name="account-ledger"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="bill-details"
                    options={{
                        href: null,
                        headerTitle: "Bill Details",
                    }}
                />
                <Tabs.Screen
                    name="services/airconditioning"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="positions"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="package-requests"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="vote-polls"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="noticeboard"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="showNotification"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="emergency-numbers"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="create-register"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="check-visitors"
                    options={{
                        href: null,
                        headerShown: false
                    }}
                />


            </Tabs>
        </PaperProvider>
        // </NotificationProvider>
    );
}
