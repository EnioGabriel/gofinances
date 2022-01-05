import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

import { HistoryCard } from "../HistoryCard";

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadingContainer
} from './styles'

import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number
    totalFormatted: string;
    color: string;
    percentFormatted: string;
    percent: number;
}

export function Resume() {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            const nextMonth = addMonths(selectedDate, 1)
            setSelectedDate(nextMonth);
        } else {
            const previousMonth = subMonths(selectedDate, 1)
            setSelectedDate(previousMonth);
        }
    }

    async function loadData() {
        setIsLoading(true);
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const totalByCategory: CategoryData[] = []

        //Filtrando apenas as contas de saída
        const expensives = responseFormatted.filter((expensive: TransactionData) => {
            return expensive.type === 'negative' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        })

        const expensiveTotal = expensives.reduce((accumulator: number, expensive: TransactionData) => {
            return accumulator + (expensive.amount);
        }, 0);

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = (categorySum / expensiveTotal * 100);
                const percentFormatted = `${percent.toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                    percentFormatted,
                })
            }
        })

        setTotalByCategories(totalByCategory);
        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {isLoading ?
                <LoadingContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadingContainer>
                :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >

                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange('prev')}>
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>{format(selectedDate, "MMMM, yyyy", { locale: ptBR })}</Month>

                        <MonthSelectButton onPress={() => handleDateChange('next')}>
                            <MonthSelectIcon name="chevron-right" />
                        </MonthSelectButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)} //Adicionando as respectivas cores
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape //fill: Define a cor do label no gráfico
                                }
                            }}
                            labelRadius={50}
                            x="percentFormatted"
                            y="total"
                        />
                    </ChartContainer>
                    {
                        totalByCategories.map((item) => (
                            <HistoryCard
                                key={item.key}
                                title={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                            />
                        ))
                    }
                </Content>
            }
        </Container>
    )
}