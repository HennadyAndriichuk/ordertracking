// src/utils/calculate.js

export const sumAllValues = (dataArray) => {
  if (dataArray.length === 0) return 0; // Проверка на пустой массив

  return dataArray.reduce((totalSum, obj) => {
    const { userId, _id, id, date, ...rest } = obj;
    const sum = Object.values(rest).reduce((acc, value) => acc + Number(value), 0);
    return totalSum + sum;
  }, 0);
};

export const calculateSumOfDifferences = (dataArray, totalCostsSum) => {
  if (dataArray.length === 0) return 0; // Проверка на пустой массив

  const totalSum = dataArray.reduce((totalSum, obj) => {
    if (obj.status === 'Відправлення отримано. Грошовий переказ видано одержувачу.' || obj.status === 'Відправлення отримано') {
      const documentSum = Number(obj.documentSum);
      const cost = Number(obj.cost);
      const difference = documentSum - cost;
      return totalSum + difference;
    }
    return totalSum;
  }, 0);

  return totalSum - totalCostsSum; // Вычисляем чистую прибыль
};

export const calculateTotalDocumentSum = (dataArray) => {
  if (dataArray.length === 0) return 0; // Проверка на пустой массив

  return dataArray.reduce((total, obj) => {
    const documentSum = Number(obj.documentSum);
    return total + documentSum;
  }, 0);
};

export const calculateDeliveredOrdersProfitWithCost = (dataArray) => {
  if (dataArray.length === 0) return 0; // Проверка на пустой массив

  return dataArray.reduce((totalProfit, obj) => {
    if (obj.status === 'Відправлення отримано. Грошовий переказ видано одержувачу.' || obj.status === 'Відправлення отримано') {
      const documentSum = Number(obj.documentSum);
      const cost = Number(obj.cost);
      const profit = documentSum - cost; // Вычисляем прибыль: разница между суммой документа и себестоимостью
      return totalProfit + profit;
    }
    return totalProfit;
  }, 0);
};

