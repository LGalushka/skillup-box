// В начале файла, после импортов
export const getWeatherGradient = (code: number): string => {
  // Основные диапазоны кодов из https://www.weatherapi.com/docs/weather_conditions.csv
  if (code >= 1000 && code <= 1009) {
    // Ясно / солнечно / частично облачно
    return 'from-yellow-200/30 via-orange-100/20 to-blue-100/10';
  }
  if (code >= 1030 && code <= 1072) {
    // Туман / дымка / пыль
    return 'from-gray-300/40 via-gray-200/30 to-blue-100/10';
  }
  if (code >= 1150 && code <= 1240) {
    // Дождь / лёгкий дождь / морось
    return 'from-blue-500/30 via-indigo-400/20 to-gray-300/10';
  }
  if (code >= 1243 && code <= 1258) {
    // Сильный дождь / ливень
    return 'from-blue-700/40 via-indigo-600/30 to-purple-500/10';
  }
  if (code >= 1261 && code <= 1264) {
    // Ледяной дождь / мокрый снег
    return 'from-cyan-400/30 via-blue-300/20 to-gray-400/10';
  }
  if (code >= 1273 && code <= 1282) {
    // Гроза
    return 'from-purple-600/40 via-indigo-500/30 to-gray-800/20';
  }
  if (code >= 1063 && code <= 1069) {
    // Снег / снежные дожди
    return 'from-blue-200/40 via-cyan-100/30 to-white/10';
  }

  // fallback для неизвестных кодов
  return 'from-gray-400/20 via-gray-300/10 to-blue-200/5';
};
