import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
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
                    href: null
                }}
            />
            <Tabs.Screen
                name="complaint-track"
                options={{
                    href: null
                }}
            />


        </Tabs>
    );
}
