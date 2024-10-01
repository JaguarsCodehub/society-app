import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import axios from 'axios';
import { Stack } from 'expo-router';

const CheckPolls = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('https://society-backend-six.vercel.app/polls');
                setPolls(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    const getTotalVotes = (votes: number[]) => votes.reduce((sum, vote) => sum + vote, 0);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.headerText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.headerText}>Here's the Vote Count !</Text>
            <FlatList
                data={polls}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => {
                    const totalVotes = getTotalVotes(item.votes);
                    return (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Title style={styles.title}>{item.question}</Title>
                                <Paragraph style={styles.paragraph}>Total Votes: {totalVotes}</Paragraph>
                                {item.options.map((option: string, index: number) => (
                                    <View key={index} style={styles.optionContainer}>
                                        <View style={styles.optionTextContainer}>
                                            <Text style={styles.optionText}>{option}</Text>
                                            <Text style={styles.voteCount}>{item.votes[index]}</Text>
                                        </View>
                                        <ProgressBar
                                            progress={totalVotes > 0 ? item.votes[index] / totalVotes : 0}
                                            color="#4CAF50"
                                            style={styles.progressBar}
                                        />
                                    </View>
                                ))}
                            </Card.Content>
                        </Card>
                    );
                }}
            />
        </View>
    );
};

export default CheckPolls;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light grey background
    },
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#ffffff', // White background
        borderRadius: 10, // Rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    option: {
        marginTop: 5,
        backgroundColor: '#f0f0f0', // Light grey background
        padding: 5,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333', // Dark grey color
    },
    paragraph: {
        fontSize: 16,
        color: '#666666', // Medium grey color
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007bff', // Professional blue background
    },
    buttonText: {
        color: '#ffffff', // White text
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        color: '#333333',
    },
    optionContainer: {
        marginTop: 10,
    },
    optionTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    optionText: {
        fontSize: 16,
        color: '#333333',
    },
    voteCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    progressBar: {
        height: 20,
        borderRadius: 5,
    },
});