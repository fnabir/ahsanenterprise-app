import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../../../../packages/ui/src/contexts/AuthContext';
import { Card } from '../../../../../packages/ui/src/core/card';
import {
  ACTIVE_FILE_STATUSES,
  getCurrentYear,
  useFileLoading,
  useFileError,
  useFileYears,
  useFilesGroupedByStatus,
  FILE_STATUSES,
} from '@repo/core';
import { useMemo } from 'react';
import { Motion, AnimatePresence } from '../../../../../packages/ui/src/motion/motion.native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Button } from '../../../../../packages/ui/src/core/button';
import ContextMenu from 'react-native-context-menu-view';
import { updateFileStatus } from '../../../../../packages/firebase/src/file';

export default function HomeScreen() {
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
    <View className="bg-background pt-safe">
      <ScrollView className="h-full flex-col px-4">
        <View className="mt-2">
          <Text className="text-foreground font-sans-semibold mb-2 text-xl">Files</Text>
          {orderedYears.map(({ year, count }) => (
            <Card
              key={year}
              className={`mb-2 flex-row justify-between ${Number(year) === currentYear ? 'border-primary' : 'border-border'}`}>
              <View className="flex-row items-end gap-2">
                <Text className="text-foreground -translate-y-0.75 font-sans">YEAR</Text>
                <Text className="text-foreground font-mono-bold text-2xl">{year}</Text>
              </View>
              <View className="flex-row items-end gap-2">
                <Text className="text-foreground font-mono-bold text-2xl">{count}</Text>
                <Text className="text-foreground -translate-y-0.75 font-sans">FILES</Text>
              </View>
            </Card>
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
                      <MaterialDesignIcons name="chevron-down" size={20} />
                    </Motion.View>
                  </View>
                  <View
                    className={`h-7 w-10 flex-row items-center justify-center rounded-full border ${statusStyle[status]?.bg ?? ''} ${statusStyle[status]?.border ?? ''}`}>
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
                      <View
                        className="border-muted -mx-4 h-[66px] flex-row items-center justify-between border-t px-4"
                        key={file.fileNo}>
                        <View>
                          <Text className="text-foreground bg-muted-subtle w-14 rounded-lg px-2 py-px text-center font-mono text-sm">
                            #{file.fileNo}
                          </Text>
                          <Text className="text-foreground font-sans-bold rounded-lg px-2 py-px text-sm">
                            {file.data.importer}
                          </Text>
                          <Text className="text-foreground rounded-lg px-2 py-px font-sans text-sm">
                            {file.data.itemName}
                          </Text>
                        </View>
                        <Button Icon={<MaterialDesignIcons name="dots-vertical" size={20} />} />
                        <ContextMenu
                          title="Status"
                          actions={FILE_STATUSES.map((status) => ({
                            title: status,
                          }))}
                          onPress={(event) => {
                            const newStatus = event.nativeEvent.name;
                            console.log('Updating file status:', {
                              fileNo: file.fileNo,
                              year: file.year,
                              oldStatus: file?.data?.status ?? 'New',
                              newStatus,
                            });
                            /*updateFileStatus(
                              file.fileNo,
                              file.year,
                              file?.data?.status ?? 'New',
                              newStatus
                            );*/
                          }}>
                          <Button Icon={<MaterialDesignIcons name="dots-vertical" size={20} />} />
                        </ContextMenu>
                      </View>
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
