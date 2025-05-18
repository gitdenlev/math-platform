export const features = [
  {
    icon: "mdi:code-braces",
    title: "Інтерактивні задачі",
    description:
      "Розв'язуйте математичні задачі з миттєвою перевіркою правильності рішення та підказками",
    color: "bg-emerald-500",
  },
  {
    icon: "mdi:book-open-page-variant",
    title: "Докладний довідник",
    description:
      "Повний математичний довідник з формулами, теоремами та візуальними поясненнями",
    color: "bg-green-500",
  },
  {
    icon: "mdi:flask-outline",
    title: "Експериментальна лабораторія",
    description:
      "Досліджуйте математичні концепції за допомогою інтерактивних моделей та симуляцій",
    color: "bg-teal-500",
  },
];

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}
