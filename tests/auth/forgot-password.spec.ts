/*
Для автоматизации регистрации, подтверждения email и восстановления пароля
потребуется тестовый backend endpoint для получения verification code.

Планируется реализовать после того, как у Андрея появится свободное время.

Необходимые endpoints:
- получение verification code по email;
- получение reset password code по email;
- (опционально) создание и удаление тестовых пользователей через API.
*/

/**
 * TODO:
 * Delete Account test is blocked.
 *
 * Requires backend test endpoints:
 * - retrieve verification code by email;
 * - retrieve password reset code by email;
 * - create/delete test users via API.
 *
 * Planned for implementation after backend support is available.
 */
import { test } from '@playwright/test';

test('Forgot Password', async () => {
  test.skip(
    true,
    'Under implementation. Waiting for backend verification-code endpoints.'
  );
});