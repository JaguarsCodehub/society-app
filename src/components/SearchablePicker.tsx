import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const SearchablePicker = ({
    selectedValue,
    onValueChange,
    items,
    placeholder,
}: {
    selectedValue: string;
    onValueChange: (value: string) => void;
    items: { label: string; value: string }[];
    placeholder: string;
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        setFilteredItems(
            items.filter(item =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, items]);

    const handleSelectItem = (value: string) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.pickerButton}
            >
                <Text style={styles.pickerText}>
                    {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <FlatList
                            data={filteredItems}
                            keyExtractor={item => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelectItem(item.value)}
                                >
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SearchablePicker

const styles = StyleSheet.create({
    pickerButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    pickerText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    itemText: {
        padding: 10,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
})