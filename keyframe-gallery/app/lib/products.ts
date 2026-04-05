export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  tabs: {
    id: string;
    label: string;
    content: Record<string, string>;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Carbon Grey Edition",
    price: 3800,
    category: "Клавіатури",
    image: "/item8.png",
    images: ["/item8.png", "/item8-2.png", "/item8-3.png", "/item8-4.png"],
    description:
      "Класичний індустріальний дизайн з акцентом на акустичний комфорт завдяки подвійній шумоізоляції.",
    tabs: [
      {
        id: "details",
        label: "Деталі",
        content: { Колір: "Graphite", Кріплення: "Top Mount" },
      },
      {
        id: "audio",
        label: "Звук",
        content: { Шумоізоляція: "Poron", Стабілізатори: "Screw-in" },
      },
    ],
  },
  {
    id: 2,
    title: "Nebula Artisan",
    price: 700,
    category: "Кейкапи",
    image: "/keys1.png",
    images: ["/keys1.png", "/keys1-2.png", "/keys1-3.png", "/keys1-4.png"],
    description:
      "Кейкап з епоксидної смоли ручної роботи, натхненний явищами глибокого космосу.",
    tabs: [
      {
        id: "details",
        label: "Деталі",
        content: { Матеріал: "Смола", Профіль: "Cherry/OEM" },
      },
    ],
  },
  {
    id: 3,
    title: "Linear Thock V2",
    price: 800,
    category: "Перемикачі",
    image: "/item5-4.png",
    images: ["/item5.png", "/item5-2.png", "/item5-3.png", "/item5-4.png"],
    description:
      "Друга ітерація наших фірмових перемикачів, тепер з ще суворішими допусками.",
    tabs: [
      {
        id: "specs",
        label: "Характеристики",
        content: { Тип: "Лінійні", Сила: "62г" },
      },
    ],
  },
  {
    id: 4,
    title: "Drak Pink 60%",
    price: 3200,
    category: "Клавіатури",
    image: "/item4.png",
    images: ["/item4.png", "/item4-2.png", "/item4-3.png", "/item4-4.png"],
    description: "Ультракомпактний форм-фактор з чистим матовим покриттям.",
    tabs: [
      {
        id: "details",
        label: "Деталі",
        content: { Розмір: "60%", Корпус: "Полікарбонат" },
      },
    ],
  },
  {
    id: 5,
    title: "Obsidian Stealth 75%",
    price: 4500,
    category: "Клавіатури",
    image: "/item7.png",
    images: ["/item7.png", "/item7-2.png", "/item7-3.png", "/item7-4.png"],
    description:
      "Преміальна важка база з анодованого алюмінію для тих, хто цінує мінімалізм та вагу.",
    tabs: [
      {
        id: "details",
        label: "Деталі",
        content: { Матеріал: "Алюміній 6063", Вага: "2.4кг" },
      },
      {
        id: "specs",
        label: "Специфікації",
        content: { Розмір: "75%", "З'єднання": "Type-C" },
      },
    ],
  },
  {
    id: 6,
    title: "Aura Pastel TKL",
    price: 2300,
    category: "Клавіатури",
    image: "/item3.png",
    images: ["/item3.png", "/item3-2.png", "/item3-3.png", "/item3-4.png"],
    description:
      "М'яка естетика поєднується з жорсткою конструкцією. Ідеальний баланс для тривалого набору тексту.",
    tabs: [
      {
        id: "details",
        label: "Деталі",
        content: { Матеріал: "Алюміній", Кріплення: "Gasket Mount" },
      },
      {
        id: "typing",
        label: "Друкук",
        content: { Плейт: "Полікарбонат", Перемикачі: "Лінійні" },
      },
    ],
  },
  {
    id: 7,
    title: "Midnight Silent Tactile",
    price: 750,
    category: "Перемикачі",
    image: "/item6.png",
    images: ["/item6.png", "/item6-2.png", "/item6-3.png", "/item6-4.png"],
    description:
      "Тактильні перемикачі з ефектом тиші. Відчутний відгук без зайвого шуму.",
    tabs: [
      {
        id: "specs",
        label: "Характеристики",
        content: { Тип: "Тактильні", Хід: "3.8мм", Сила: "67г" },
      },
    ],
  },
];
