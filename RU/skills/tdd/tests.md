# Хорошие и плохие тесты

## Хорошие тесты

**Интеграционный стиль**: тестируют через реальные интерфейсы, а не через моки внутренних частей.

```typescript
// ХОРОШО: проверяется наблюдаемое поведение
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

Признаки:

- Проверяют поведение, важное для пользователя/вызывающего кода
- Используют только публичный API
- Переживают внутренние рефакторинги
- Описывают ЧТО, а не КАК
- Одна логическая проверка на тест

## Плохие тесты

**Тесты деталей реализации**: жестко привязаны к внутренней структуре.

```typescript
// ПЛОХО: тестирует детали реализации
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

Красные флаги:

- Мокирование внутренних зависимостей
- Тестирование приватных методов
- Проверки количества/порядка вызовов
- Тесты падают при рефакторинге без изменения поведения
- Название теста описывает КАК, а не ЧТО
- Проверка обходным путем вместо проверки через интерфейс

```typescript
// ПЛОХО: обход интерфейса ради проверки
test("createUser saves to database", async () => {
  await createUser({ name: "Alice" });
  const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
  expect(row).toBeDefined();
});

// ХОРОШО: проверка через интерфейс
test("createUser makes user retrievable", async () => {
  const user = await createUser({ name: "Alice" });
  const retrieved = await getUser(user.id);
  expect(retrieved.name).toBe("Alice");
});
```
