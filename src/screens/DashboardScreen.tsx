import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {
  Text,
  Surface,
  FAB,
  Avatar,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthContext } from '../hooks/useAuthContext';
import { getFarmsByUser } from '../services/farms';
import { Farm } from '../types/farms';
import { MainStackParamList } from '../types/navigation';

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Dashboard'>;
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const theme = useTheme();

  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadFarms = useCallback(async () => {
    if (!user) return;

    try {
      const userFarms = await getFarmsByUser(user.uid);
      setFarms(userFarms);
    } catch (error) {
      console.error('Error loading farms:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadFarms();
    }, [loadFarms])
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadFarms();
  };

  const renderFarmCard = ({ item }: { item: Farm }) => (
    <Surface
      style={styles.card}
      elevation={2}
      onTouchEnd={() => navigation.navigate('EditFarm', { farmId: item.id })}
    >
      <View style={styles.cardContent}>
        {item.imageUrl ? (
          <Avatar.Image size={48} source={{ uri: item.imageUrl }} />
        ) : (
          <Avatar.Icon
            size={48}
            icon="barn"
            style={{ backgroundColor: theme.colors.surfaceVariant }}
          />
        )}
        <View style={styles.cardText}>
          <Text variant="titleMedium" numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
            numberOfLines={1}
          >
            {item.location || t('farms.noLocation')}
          </Text>
        </View>
      </View>
    </Surface>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Avatar.Icon
        size={80}
        icon="barn"
        style={{ backgroundColor: theme.colors.surfaceVariant }}
      />
      <Text variant="titleMedium" style={styles.emptyTitle}>
        {t('farms.emptyState')}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          {t('farms.title')}
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.logout, { color: theme.colors.primary }]}
          onPress={logout}
        >
          {t('auth.logout')}
        </Text>
      </View>

      <FlatList
        data={farms}
        renderItem={renderFarmCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={farms.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('AddFarm')}
        label={t('farms.addFarm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  logout: {
    textDecorationLine: 'underline',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardText: {
    flex: 1,
    marginLeft: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default DashboardScreen;
