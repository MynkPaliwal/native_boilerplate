import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, FlatList, StyleSheet } from "react-native";
import { useGetUsersQuery } from '../redux/Services/ApiService';
import { SafeAreaView } from "react-native-safe-area-context";
import { setUser } from '../redux/reducers/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainScreen: React.FC = () => {
    const { data, isLoading, error, isSuccess } = useGetUsersQuery(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && data?.users && Array.isArray(data.users) && data.users.length > 0) {
            dispatch(setUser(data.users));
        }
    }, [isSuccess, data, dispatch]);

    const newUsers = useSelector((state: any) => state.users.user);
    const users = Array.isArray(newUsers) ? newUsers : [];
    const firstFiveUsers = users.slice(0, 5);

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
});

export default MainScreen;