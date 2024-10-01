import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MemberPollVoting = () => {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [hasVoted, setHasVoted] = useState<{ [key: number]: boolean }>({}); // Track voting state per poll
    const [voteMessage, setVoteMessage] = useState(''); // New state to display vote message

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await axios.get('http://192.168.1.10:3000/polls');
            setPolls(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const vote = async (pollId: number, optionIndex: number) => {
        if (hasVoted[pollId]) {
            setVoteMessage('You have already voted on this poll.');
            return;
        }

        try {
            await axios.post(`http://192.168.1.10:3000/polls/${pollId}/vote`, { optionIndex });
            setHasVoted(prevState => ({ ...prevState, [pollId]: true })); // Update voting state for the specific poll
            setVoteMessage('Your vote was counted.');
            fetchPolls();
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* {voteMessage ? <Text style={styles.voteMessage}>{voteMessage}</Text> : null} Display vote message */}
            <FlatList
                data={polls}
                renderItem={({ item }: { item: any }) => (
                    <View style={styles.pollContainer}>
                        <Text style={styles.question}>{item.question}</Text>
                        {item.options.map((option: string, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => vote(item.id, index)}
                                disabled={hasVoted[item.id]} // Disable button if user has voted on this poll
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    pollContainer: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    optionButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    optionText: {
        color: '#fff',
        textAlign: 'center',
    },
    voteMessage: {
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default MemberPollVoting;