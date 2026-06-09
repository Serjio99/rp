export const serverPackages = [
  {
    id: "start_city",
    title: "Start City",
    price: "от 80 000 ₽",
    text: "База для запуска: ядро FiveM, экономика, первые фракции, хостинг и базовая донат-витрина.",
  },
  {
    id: "monetized_rp",
    title: "Monetized RP",
    price: "индивидуально",
    text: "Город под доход: Tebex, VIP, подписки, кейсы, Discord, сайт, роли и сценарии удержания.",
  },
  {
    id: "custom_empire",
    title: "Custom Empire",
    price: "под задачу",
    text: "Уникальная логика, интерфейсы, личный кабинет, CRM, сложные режимы и долгосрочное развитие.",
  },
] as const;

export const orderStatuses = [
  { id: "ordered", label: "Заказан" },
  { id: "briefing", label: "Сбор ТЗ" },
  { id: "development", label: "В разработке" },
  { id: "testing", label: "В тестировании" },
  { id: "launch", label: "Готовится запуск" },
  { id: "support", label: "На поддержке" },
  { id: "paused", label: "На паузе" },
  { id: "done", label: "Завершен" },
] as const;

export function packageById(id: string) {
  return serverPackages.find((item) => item.id === id) || serverPackages[0];
}

export function statusLabel(status: string) {
  return orderStatuses.find((item) => item.id === status)?.label || status;
}
