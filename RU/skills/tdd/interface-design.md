# Дизайн интерфейсов для тестируемости

Хорошие интерфейсы делают тестирование естественным:

1. **Принимай зависимости, а не создавай их внутри**

   ```typescript
   // Легко тестировать
   function processOrder(order, paymentGateway) {}

   // Тестировать сложно
   function processOrder(order) {
     const gateway = new StripeGateway();
   }
   ```

2. **Возвращай результат, а не полагайся на побочные эффекты**

   ```typescript
   // Легко тестировать
   function calculateDiscount(cart): Discount {}

   // Тестировать сложно
   function applyDiscount(cart): void {
     cart.total -= discount;
   }
   ```

3. **Небольшая площадь интерфейса**
   - Меньше методов = меньше тестов
   - Меньше параметров = проще setup тестов
