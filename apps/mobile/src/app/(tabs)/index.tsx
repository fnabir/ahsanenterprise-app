import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { useAuth } from '../../../../../packages/ui/src/contexts/AuthContext';
import { Card } from '../../../../../packages/ui/src/core/card';
import {
  ACTIVE_FILE_STATUSES,
  getCurrentYear,
  useFileLoading,
  useFileError,
  useFileYears,
  useFilesGroupedByStatus,
} from '@repo/core';
import {
  Motion,
  AnimatePresence,
} from '../../../../../packages/ui/src/animation/motion/motion.native';
import { CardFilesTotal } from '../../../../../packages/ui/src/custom/card-files-total';
import { ThemedIcon } from '@/components/ThemedIcon';
import { CardFileStatusList } from '../../../../../packages/ui/src';
import { useNavigationLoading } from '@/contexts/NavigationLoadingContext';
import { useNavigationWithLoading } from '@/hooks/useNavigationWithLoading';

export default function HomeScreen() {
  const { isNavigating } = useNavigationLoading();
  const { navigate } = useNavigationWithLoading();
  const [showStatus, setShowStatus] = useState<string | null>(null);

  const loading = useFileLoading();
  const error = useFileError();
  const years = useFileYears();

  const orderedYears = useMemo(() => [...years].reverse(), [years]);
  const currentYear = useMemo(() => getCurrentYear(), []);

  const { isAdmin } = useAuth();
  const statusesToShow = isAdmin
    ? ACTIVE_FILE_STATUSES
    : ACTIVE_FILE_STATUSES.filter((status) => status !== 'Bill');

  const filesByStatus = useFilesGroupedByStatus();

  const filteredStatuses = Object.entries(filesByStatus).filter(([status]) =>
    statusesToShow.includes(status)
  );

  const sortedStatuses = filteredStatuses.sort(([statusA], [statusB]) => {
    const indexA = statusesToShow.indexOf(statusA);
    const indexB = statusesToShow.indexOf(statusB);
    return indexA - indexB;
  });

  const statusStyle: Record<string, Record<'bg' | 'text' | 'border', string>> = {
    New: { bg: 'bg-muted-subtle border-muted', text: 'text-muted', border: 'border-muted' },
    Assessment: {
      bg: 'bg-primary-subtle border-primary',
      text: 'text-primary',
      border: 'border-primary',
    },
    'Duty Payment': {
      bg: 'bg-warning-subtle border-warning',
      text: 'text-warning',
      border: 'border-warning',
    },
    Delivery: {
      bg: 'bg-accent-subtle border-accent',
      text: 'text-accent',
      border: 'border-accent',
    },
    Bill: {
      bg: 'bg-secondary-subtle border-secondary',
      text: 'text-secondary',
      border: 'border-secondary',
    },
  };

  return (
    <View className="bg-background py-safe h-full">
      <ScrollView className="h-full flex-1 flex-col p-4">
        <View className="flex-col gap-2">
          {orderedYears.map(({ year, count }) => (
            <CardFilesTotal
              key={year}
              year={year}
              count={count}
              disabled={isNavigating}
              onPress={() => {
                if (isNavigating) return;
                const href = Number(year) === currentYear ? '/files' : `/files?year=${year}`;
                navigate(href);
              }}
            />
          ))}
        </View>
        <View className="bg-muted mt-4 h-px w-full opacity-50" />
        {filteredStatuses.length === 0 ? null : (
          <View className="my-4">
            {sortedStatuses.map(([status, files]) => (
              <Card key={status} className={`my-1 border-t-4 ${statusStyle[status]?.border ?? ''}`}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between pb-2"
                  onPress={() => {
                    setShowStatus(showStatus === status ? null : status);
                  }}>
                  <View className="flex-row items-center gap-2">
                    <Text className={`font-sans-semibold ${statusStyle[status]?.text ?? ''}`}>
                      {status}
                    </Text>
                    <Motion.View
                      animate={{ rotate: showStatus === status ? '180deg' : '0deg' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                      <ThemedIcon name="chevron-down" />
                    </Motion.View>
                  </View>
                  <View
                    className={`w-10 flex-row items-center justify-center rounded-full border ${statusStyle[status]?.bg ?? ''} ${statusStyle[status]?.border ?? ''}`}>
                    <Text className={`font-mono-bold ${statusStyle[status]?.text ?? ''}`}>
                      {files.length}
                    </Text>
                  </View>
                </TouchableOpacity>
                <AnimatePresence>
                  <Motion.View
                    animate={{ height: showStatus === status ? files?.length * 66 : 0 }}
                    transition={{ type: 'timing' }}
                    style={{ overflow: 'hidden' }}>
                    {files.map((file) => (
                      <CardFileStatusList key={file.fileNo} file={file} />
                    ))}
                  </Motion.View>
                </AnimatePresence>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
