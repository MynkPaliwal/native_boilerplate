import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useGetUsersQuery, useAddUsersMutation, useDeleteUsersMutation } from '../redux/Services/ApiService';
import { SafeAreaView } from "react-native-safe-area-context";
import { setUser } from '../redux/reducers/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainScreen: React.FC = () => {
    const { data, isLoading, error, isSuccess } = useGetUsersQuery(undefined);
    const dispatch = useDispatch();

    const [addUsers, { isLoading: isAdding }] = useAddUsersMutation();
    const [deleteUsers, { isLoading: isDeleting }] = useDeleteUsersMutation();

    useEffect(() => {
        if (isSuccess && data?.users && Array.isArray(data.users) && data.users.length > 0) {
            dispatch(setUser(data.users));
        }
    }, [isSuccess, data, dispatch]);

    const newUsers = useSelector((state: any) => state.users.user);
    const users = Array.isArray(newUsers) ? newUsers : [];
    const firstFiveUsers = users.slice(0, 5);

    const handleAddUser = async () => {
        try {
            const newUser = {
                firstName: 'John',
                lastName: 'Doe',
                email: `john.doe@example.com`,
                age: 30
            };
            await addUsers(newUser).unwrap();
            Alert.alert('Success', 'User added successfully!');
        } catch (err: any) {
            Alert.alert('Error', err?.data?.message || 'Failed to add user');
        }
    };

    const handleDeleteUser = () => {
        if (users.length === 0) {
            Alert.alert('Info', 'No users to delete');
            return;
        }

        const firstUserId = users[0]?.id;
        if (!firstUserId) {
            Alert.alert('Error', 'User ID not found');
            return;
        }

        Alert.alert(
            'Delete User',
            `Are you sure you want to delete ${users[0]?.firstName} ${users[0]?.lastName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteUsers(firstUserId).unwrap();
                            Alert.alert('Success', 'User deleted successfully!');
                        } catch (err: any) {
                            Alert.alert('Error', err?.data?.message || 'Failed to delete user');
                        }
                    },
                },
            ]
        );
    };

    const renderUserItem = ({ item }: { item: any }) => (
        <View style={styles.userItem}>
            <Text style={styles.userName}>
                {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            {item.age && <Text style={styles.userAge}>Age: {item.age}</Text>}
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.centerContent}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading users...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContent}>
                <Text style={styles.errorText}>Error loading users</Text>
                <Text style={styles.errorDetail}>
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Users List (First 5)</Text>

                {/* Add and Delete Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.addButton, isAdding && styles.buttonDisabled]}
                        onPress={handleAddUser}
                        disabled={isAdding}
                    >
                        <Text style={styles.buttonText}>
                            {isAdding ? 'Adding...' : '+ Add User'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton, isDeleting && styles.buttonDisabled]}
                        onPress={handleDeleteUser}
                        disabled={isDeleting}
                    >
                        <Text style={styles.buttonText}>
                            {isDeleting ? 'Deleting...' : 'Delete User'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                {firstFiveUsers.length > 0 ? (
                    <FlatList
                        data={firstFiveUsers}
                        renderItem={renderUserItem}
                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                        scrollEnabled={false}
                        style={styles.userList}
                    />
                ) : (
                    <View style={styles.centerContent}>
                        <Text style={styles.noDataText}>No users found</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    errorText: {
        color: '#c62828',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    errorDetail: {
        color: '#c62828',
        fontSize: 12,
    },
    userList: {
        marginTop: 10,
    },
    userItem: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    userAge: {
        fontSize: 12,
        color: '#999',
    },
    noDataText: {
        color: '#999',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    addButton: {
        backgroundColor: '#007AFF',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        height: 20,
    },
});

export default MainScreen;