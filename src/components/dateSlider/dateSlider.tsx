
import { forwardRef, useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View, } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from "react-native-reanimated";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";

const _DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const _MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",];
const _YEARS = Array.from({ length: 20 }, (_, i) => String(2020 + i));
const { width } = Dimensions.get("window");
const _ITEM_HEIGHT = 40;
const _SELECTOR_WIDTH = width * 0.8;
const _VISIBLE_ITEMS = 4;
const _ITEM_PADDING = (_VISIBLE_ITEMS - 1) / 2;

type CalendarProps = {
    currentMonth?: number;
    currentYear?: string;
    currentDay?: number;
    title?: string;
};

const CalendarPicker = forwardRef<React.ElementRef<typeof View>, CalendarProps>((props, ref) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { currentMonth, currentYear, currentDay, title } = props;
    const [selectedMonth, setSelectedMonth] = useState<string>(_MONTHS[currentMonth!]);
    const [selectedYear, setSelectedYear] = useState<string>(currentYear!);
    const [selectedDay, setSelectedDay] = useState(currentDay!);
    const [isExpanded, setExpanded] = useState<boolean>(false);

    const monthListRef = useRef<FlatList>(null);
    const yearListRef = useRef<FlatList>(null);
    const daysListRef = useRef<FlatList>(null);

    const generateDays = useCallback(() => {
        const daysInMonth = new Date(parseInt(selectedYear), _MONTHS.indexOf(selectedMonth) + 1, 0).getDate();
        const firstDayOfMonth = new Date(parseInt(selectedYear), _MONTHS.indexOf(selectedMonth), 1).getDay();
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return { days, firstDayOfMonth };
    }, [selectedYear, selectedMonth]);

    const { days } = generateDays();
    const calendarHeight = useSharedValue<number>(180);
    const pickerHeight = useSharedValue<number>(40);
    const pickerWidth = useSharedValue<number>(120);
    const dividerOpacity = useSharedValue<number>(0);

    const calendarAnimatedStyle = useAnimatedStyle(() => ({
        height: calendarHeight.value,
    }));

    const pickerAnimatedStyle = useAnimatedStyle(() => ({
        height: pickerHeight.value,
        width: pickerWidth.value,
        padding: 5,
    }));

    const dividerOpacityStyle = useAnimatedStyle(() => ({
        opacity: dividerOpacity.value
    }));

    const togglePicker = useCallback(() => {
        if (!isExpanded) {
            pickerHeight.value = withTiming(150);
            pickerWidth.value = withTiming(240);
            setTimeout(() => {
                const monthIndex = _MONTHS.findIndex((m) => m === selectedMonth);
                monthListRef.current?.scrollToIndex({
                    index: Math.max(0, monthIndex),
                    animated: true,
                    viewOffset: 0.5,
                });
                const yearIndex = _YEARS.findIndex((y) => y === selectedYear);
                yearListRef.current?.scrollToIndex({
                    index: Math.max(0, yearIndex),
                    animated: true,
                });
                dividerOpacity.value = withTiming(1, {
                    duration: 3000,
                    easing: Easing.ease
                });

            }, 500);
        } else {
            pickerHeight.value = withTiming(40);
            pickerWidth.value = withTiming(120);
            dividerOpacity.value = withTiming(0, {
                duration: 300,
                easing: Easing.ease
            });

        }
    }, [isExpanded]);

    const toggleCalender = useCallback(() => {
        if (!isExpanded) {
            setExpanded(true);
            calendarHeight.value = withSpring(330, {
                damping: 15,
                stiffness: 150,
            });
        } else {
            calendarHeight.value = withSpring(180, {
                damping: 15,
                stiffness: 150,
            });
            setExpanded(false);
        }
        togglePicker();
    }, [isExpanded]);

    const getItemLayout = (_: any, index: number) => ({
        length: _ITEM_HEIGHT,
        offset: _ITEM_HEIGHT * index,
        index,
    });

    const handleMonthSelect = (month: string) => {
        setSelectedMonth(month);
    };

    const handleYearSelect = (year: string) => {
        setSelectedYear(year);
    };

    const handleDaySelect = (day: number) => {
        setSelectedDay(day);
    };

    return (
        <View style={styles.container} ref={ref}>
            <Animated.View
                style={[styles.calendarContainer, calendarAnimatedStyle]}>
                <View style={styles.header}>
                    <Text style={styles.calendarTitle}></Text>
                    <Animated.View style={[styles.pressContainer, pickerAnimatedStyle]}>
                        {isExpanded ? (
                            <Animated.View style={[styles.selectorContainer]}>
                                <View style={styles.dualSelector}>
                                    <FlatList
                                        ref={monthListRef}
                                        data={_MONTHS}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <Pressable onPress={() => handleMonthSelect(item)}>
                                                <View
                                                    style={[
                                                        styles.selectorItem,
                                                        item === selectedMonth && styles.selectedSelectorItem,
                                                    ]}>
                                                    <Text
                                                        style={[
                                                            item === selectedMonth ? styles.selectedSelectorText : styles.unSelectedText,
                                                        ]}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        )}
                                        showsVerticalScrollIndicator={false}
                                        getItemLayout={getItemLayout}
                                        style={styles.selectorList}
                                        ListHeaderComponent={
                                            <View style={{ height: _ITEM_HEIGHT * _ITEM_PADDING }} />
                                        }
                                        ListFooterComponent={
                                            <View style={{ height: _ITEM_HEIGHT * _ITEM_PADDING }} />
                                        }
                                    />
                                    <View style={[styles.selectorDivider, dividerOpacityStyle]} />
                                    <FlatList
                                        ref={yearListRef}
                                        data={_YEARS}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <Pressable onPress={() => handleYearSelect(item)}>
                                                <View
                                                    style={[
                                                        styles.selectorItem,
                                                        item === selectedYear && styles.selectedSelectorItem
                                                    ]}>
                                                    <Text
                                                        style={[
                                                            item === selectedYear ? styles.selectedSelectorText : styles.unSelectedText
                                                        ]}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        )}
                                        showsVerticalScrollIndicator={false}
                                        getItemLayout={getItemLayout}
                                        style={[styles.selectorList]}
                                        ListHeaderComponent={
                                            <View style={{ height: _ITEM_HEIGHT * _ITEM_PADDING }} />
                                        }
                                        ListFooterComponent={
                                            <View style={{ height: _ITEM_HEIGHT * _ITEM_PADDING }} />
                                        }
                                    />
                                </View>
                            </Animated.View>
                        ) : (
                            <Pressable onPress={toggleCalender}>
                                <Text style={styles.dateText}>
                                    {selectedMonth} / {selectedYear}
                                </Text>
                            </Pressable>
                        )}
                    </Animated.View>
                </View>
                <View style={styles.scrollContainer}>
                    <FlatList
                        ref={daysListRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={days}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.dayColumn}>
                                <Text style={styles.weekDayText}>
                                    {_DAYS[(index + generateDays().firstDayOfMonth) % 7]}
                                </Text>
                                <Pressable
                                    onPress={() => handleDaySelect(item)}
                                    style={({ pressed }) => [
                                        styles.dayButton,
                                        item === selectedDay && styles.selectedDayButton,
                                        pressed && styles.pressedDayButton,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.dayText,
                                            item === selectedDay && styles.selectedDayText,
                                        ]}>
                                        {item}
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                        contentContainerStyle={styles.daysContentContainer}
                        getItemLayout={(_, index) => ({
                            length: _SELECTOR_WIDTH / 7,
                            offset: (_SELECTOR_WIDTH / 7) * index,
                            index,
                        })}
                        initialScrollIndex={Math.max(
                            0,
                            days.findIndex((d) => d === selectedDay) - 2
                        )}
                    />
                </View>
                {isExpanded && (
                    <View style={styles.actionContainer}>
                        <Pressable style={styles.actionButton} onPress={toggleCalender}>
                            <Text style={styles.actionButtonText}>Save</Text>
                        </Pressable>
                    </View>
                )}
            </Animated.View>
        </View>
    );
});

const createStyles = (theme: Colors) => {
    const { wp, scaleFontSize } = useDimension();

    return StyleSheet.create({
        container: {
            width: wp(90),
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255, 0.03)",
            borderRadius: 10,
        },
        calendarContainer: {
            width: wp(90),
            marginHorizontal: "auto",
            justifyContent: "space-between",
            alignItems: "center",
        },
        header: {
            width: wp(90),
            padding: 10,
            marginHorizontal: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        calendarTitle: {
            fontSize: scaleFontSize(FontSize.MD),
            fontWeight: FontWeight.W400,
            color: theme.white,
        },
        pressContainer: {
            shadowColor: theme.white,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 10,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: theme.black
        },
        dateText: {
            fontSize: scaleFontSize(FontSize.SM),
            color: "#FFF",
        },
        selectorContainer: {
            width: wp(50),
            marginHorizontal: "auto",
            overflow: "hidden",
        },
        dualSelector: {
            gap: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        selectorList: {
            flex: 1,
        },
        selectorDivider: {
            alignSelf: "center",
            width: 1,
            height: 80,
            backgroundColor: theme.accent,
        },
        selectorItem: {
            height: _ITEM_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
        },
        selectedSelectorItem: {
            backgroundColor: theme.secondaryText,
            borderRadius: 10,
        },
        unSelectedText: {
            fontSize: scaleFontSize(FontSize.XS),
            color: theme.accent,
        },
        selectedSelectorText: {
            fontSize: scaleFontSize(FontSize.SM),
            color: theme.black,
            fontWeight: FontWeight.W500,
        },
        weekDayText: {
            fontSize: 14,
            color: theme.secondaryText,
            width: _SELECTOR_WIDTH / 9,
            textAlign: "center",
        },
        daysContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingHorizontal: 8,
        },
        dayButton: {
            width: _SELECTOR_WIDTH / 9,
            height: _SELECTOR_WIDTH / 9,
            justifyContent: "center",
            alignItems: "center",
        },
        selectedDayButton: {
            backgroundColor: theme.secondaryText,
            borderRadius: 4,
        },
        pressedDayButton: {
            opacity: 0.7,
        },
        dayText: {
            fontSize: 16,
            color: "#CCC",
        },
        selectedDayText: {
            color: theme.black,
            fontWeight: "bold",
        },
        actionContainer: {
            width: wp(90),
            padding: 10,
            marginHorizontal: "auto",
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        actionButton: {
            backgroundColor: theme.secondaryText,
            borderRadius: 10,
            paddingHorizontal: 18,
            paddingVertical: 10,
            alignItems: "center",
        },
        actionButtonText: {
            fontSize: scaleFontSize(FontSize.DEFAULT),
            color: theme.black,
            fontWeight: FontWeight.W400
        },
        scrollContainer: {
            padding: 10,
            marginHorizontal: "auto",
            height: _ITEM_HEIGHT * 2.5,
        },
        dayColumn: {
            width: _SELECTOR_WIDTH / 7,
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 5,
        },
        daysContentContainer: {
            paddingHorizontal: _SELECTOR_WIDTH / 3.5,
        }
    });
};

export { CalendarPicker };
