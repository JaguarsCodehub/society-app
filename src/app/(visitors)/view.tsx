import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import LoadingScreen from '../../components/ui/LoadingScreen';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

type VisitorData = {
  id: string;
  date: string;
  name: string;
  wingName: string;
  flatNumber: string;
  mobileNumber: string;
  photo: string;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const VisitorCard = ({ item, index }: { item: VisitorData, index: any }) => {
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const istDate = toZonedTime(date, 'Asia/Kolkata');
    return format(istDate, "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.card,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.photo }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>{item.wingName} - {item.flatNumber}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Feather name="calendar" size={16} color="#3182CE" />
          <Text style={styles.footerText} numberOfLines={1} ellipsizeMode="tail">
            {formatDate(item.date)}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Feather name="phone" size={16} color="#3182CE" />
          <Text style={styles.footerText} numberOfLines={1} ellipsizeMode="tail">
            {item.mobileNumber}
          </Text>
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
};

const ViewVisitors = () => {
  const [visitorsData, setVisitorsData] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.chsltd.net/visitors');
        setVisitorsData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(visitorsData.length / itemsPerPage);

  const paginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return visitorsData.slice(startIndex, endIndex);
  }, [visitorsData, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const headerOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>Visitor Log</Text>
        <Text style={styles.headerSubtitle}>Recent entries</Text>
      </Animated.View>
      <FlatList
        data={paginatedData()}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <VisitorCard item={item} index={index} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Feather name="chevron-left" size={24} color={currentPage === 1 ? "#A0AEC0" : "#3182CE"} />
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage} / {totalPages}</Text>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Feather name="chevron-right" size={24} color={currentPage === totalPages ? "#A0AEC0" : "#3182CE"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewVisitors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF8FF',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#3182CE',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#BEE3F8',
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#4299E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4299E1',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#4A5568',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#EBF8FF',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  footerText: {
    marginLeft: 8,
    fontSize: width > 375 ? 13 : 12,
    color: '#2D3748',
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  paginationText: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
  },
});